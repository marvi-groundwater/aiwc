import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentCard } from "@/app/components/ContentCards";
import { PageFrame } from "@/app/components/SiteChrome";
import {
  type EntryRecord,
  type MediaRecord,
  entries,
  entriesInCategory,
  entryHref,
  entryLabel,
  formatDate,
  getEntry,
  getEntryImage,
  getEntryMedia,
  getMediaBySlug,
  media,
  peopleInCountry,
  relatedEntries,
} from "@/app/data/content";

type RouteProps = { params: Promise<{ slug: string }> };

const collectionIntroductions: Record<string, { eyebrow: string; headline: string; copy: string }> = {
  "our-work": {
    eyebrow: "Research · education · training · outreach",
    headline: "Knowledge becomes useful when it moves into action.",
    copy: "Explore the Centre’s complete program portfolio—from groundwater citizen science and water leadership to dam safety, higher education and community dialogue.",
  },
  research: {
    eyebrow: "Transdisciplinary inquiry",
    headline: "Water systems, seen whole.",
    copy: "Joint work connects groundwater, catchments, agriculture, infrastructure, climate resilience, policy and the communities living with change.",
  },
  education: {
    eyebrow: "Sustainable Water Futures",
    headline: "Learning beyond disciplines.",
    copy: "Programs combine technical knowledge with policy, governance, culture, leadership and systems thinking for the next generation of water professionals.",
  },
  "training-capacity-building": {
    eyebrow: "Skills for practice",
    headline: "Capacity grows through exchange.",
    copy: "Long-term professional relationships, practical workshops and field learning help water leaders translate evidence into better decisions.",
  },
  outreach: {
    eyebrow: "Open knowledge",
    headline: "A continuing conversation about water.",
    copy: "Webinars, WaterWise stories and public dialogue connect specialist knowledge with the people, institutions and places it can serve.",
  },
  news: {
    eyebrow: "News & events",
    headline: "What the network is doing now.",
    copy: "Conference updates, workshops, programs and milestones from the Australia India Water Centre.",
  },
  "waterwise-blog": {
    eyebrow: "WaterWise",
    headline: "A dialogue for sustainable water futures.",
    copy: "Field experience, research perspectives and lived knowledge from across the bilateral water community.",
  },
};

const collectionCategory: Record<string, string> = {
  research: "research-aiwc-activities",
  education: "education",
  "training-capacity-building": "training-and-capacity-building",
  outreach: "outreach",
  news: "news-events",
  "waterwise-blog": "aiwc-blog-waterwise",
};

const workSlugs = [
  "research-activities",
  "masters-program-in-sustainable-water-futures",
  "australia-india-technical-exchange-program-in-water-and-food-securitys-workshop-series",
  "managing-groundwater-use-and-sustaining-aquifer-recharge-through-village-level-interventions-marvi",
  "the-young-water-professionals-program-ywp",
  "dam-rehabilitation-improvement-project-drip-ii",
  "training-program-on-dam-safety-and-risk-management-in-australia",
  "village-groundwater-cooperatives-vgcs",
  "webinar-series-water-talks-2025",
  "aiwc5-conference",
];

function uniqueEntries(items: Array<EntryRecord | undefined>) {
  return [...new Map(items.filter((item): item is EntryRecord => Boolean(item)).map((item) => [item.id, item])).values()];
}

function collectionEntries(slug: string) {
  if (slug === "our-work") {
    return uniqueEntries([
      ...workSlugs.map((item) => getEntry(item)),
      ...entriesInCategory("research-aiwc-activities"),
      ...entriesInCategory("education"),
      ...entriesInCategory("training-and-capacity-building"),
      ...entriesInCategory("outreach"),
    ]);
  }
  const category = collectionCategory[slug];
  return category ? entriesInCategory(category) : [];
}

function videoId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.split("/").filter(Boolean)[0];
    return parsed.searchParams.get("v") || parsed.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1] || null;
  } catch {
    return null;
  }
}

function EntryVideos({ entry }: { entry: EntryRecord }) {
  const videos = entry.youtube
    .map((url) => ({ url, id: videoId(url) }))
    .filter((item) => item.id);

  if (!videos.length) return null;

  return (
    <section className="content-wrap entry-videos" aria-labelledby="entry-videos-title">
      <div className="subsection-head">
        <p className="eyebrow">Watch</p>
        <h2 id="entry-videos-title">Video from this record.</h2>
      </div>
      <div className="video-grid">
        {videos.map((video) => (
          <article className="video-card" key={video.url}>
            <div className="video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={`${entry.title} video`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <a href={video.url} target="_blank" rel="noreferrer">Watch on YouTube ↗</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function EntryMedia({ entry }: { entry: EntryRecord }) {
  const hero = getEntryImage(entry);
  const items = getEntryMedia(entry).filter((item) => item.id !== hero?.id);
  const imageItems = items.filter((item) => item.type === "image");
  const fileItems = items.filter((item) => item.type !== "image");

  if (!imageItems.length && !fileItems.length) return null;

  return (
    <section className="content-wrap entry-media" aria-labelledby="entry-media-title">
      <div className="subsection-head">
        <p className="eyebrow">From the original record</p>
        <h2 id="entry-media-title">Images & resources.</h2>
      </div>
      {imageItems.length > 0 && (
        <div className="entry-gallery">
          {imageItems.map((item) => (
            <figure key={item.id}>
              <img src={item.localSrc} alt={item.alt || item.title} loading="lazy" />
              <figcaption>{item.caption || item.title}</figcaption>
            </figure>
          ))}
        </div>
      )}
      {fileItems.length > 0 && (
        <div className="download-list">
          {fileItems.map((item) => (
            <a href={item.localSrc} key={item.id}>
              <span>PDF</span>
              <strong>{item.title}</strong>
              <i aria-hidden="true">↓</i>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

function PeopleDirectory({ country }: { country?: "Australia" | "India" }) {
  const people = peopleInCountry(country);
  return (
    <section className="content-wrap people-archive" aria-label={`${country ?? "AIWC"} people`}>
      <div className="people-archive-head">
        <p className="eyebrow">{country ? `${country} network` : "The bilateral network"}</p>
        <p>{people.length} researchers, practitioners and institutional leaders</p>
      </div>
      <div className="people-card-grid">
        {people.map((person) => {
          const portrait = getEntryImage(person);
          return (
            <article className="person-card" key={person.id}>
              <a href={entryHref(person)}>
                {portrait ? <img src={portrait.localSrc} alt={`Portrait of ${person.title}`} loading="lazy" /> : <span className="portrait-fallback">AIWC</span>}
                <div>
                  <small>{person.countries.join(" + ")}</small>
                  <h2>{person.title}</h2>
                  <span>View profile ↗</span>
                </div>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CollectionPage({ entry, slug }: { entry: EntryRecord; slug: string }) {
  const intro = collectionIntroductions[slug];
  const items = collectionEntries(slug);
  const image = getEntryImage(entry);

  return (
    <PageFrame>
      <section className="inner-hero editorial-hero">
        <div className="inner-hero-copy">
          <p className="eyebrow">{intro.eyebrow}</p>
          <h1>{intro.headline}</h1>
          <p className="lede">{intro.copy}</p>
          <div className="hero-actions">
            <a className="button primary" href="#collection">Explore the collection <span aria-hidden="true">↓</span></a>
            <a className="button" href="/archive">Complete archive <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="inner-hero-image">
          {image ? <img src={image.localSrc} alt={image.alt || image.title} /> : <img src="/media/91-Homepage-Hero-Images.webp" alt="Water landscapes across Australia and India" />}
          <p>{entry.title} · AIWC</p>
        </div>
      </section>

      <section className="content-wrap collection-section" id="collection">
        <div className="collection-heading">
          <p className="eyebrow">{String(items.length).padStart(2, "0")} records</p>
          <h2>The complete collection.</h2>
        </div>
        <div className="collection-grid">
          {items.map((item) => <ContentCard entry={item} key={item.id} />)}
        </div>

        {entry.bodyHtml && (
          <details className="source-content-disclosure">
            <summary>Original page content and links</summary>
            <div className="legacy-content" dangerouslySetInnerHTML={{ __html: entry.bodyHtml }} />
          </details>
        )}
      </section>
    </PageFrame>
  );
}

function PeoplePage({ entry, country }: { entry: EntryRecord; country?: "Australia" | "India" }) {
  return (
    <PageFrame>
      <section className="directory-hero content-wrap">
        <p className="eyebrow">Our people {country ? `in ${country}` : "across two countries"}</p>
        <h1>Expertise travels both ways.</h1>
        <p className="lede">
          AIWC is a working network of water researchers, educators, practitioners and institutional leaders—not simply a list of members.
        </p>
        <div className="directory-switcher" aria-label="Filter the people directory">
          <a href="/our-people">Everyone</a>
          <a href="/our-people-in-australia">Australia</a>
          <a href="/our-people-in-india">India</a>
        </div>
      </section>
      <PeopleDirectory country={country} />
      <details className="source-content-disclosure content-wrap">
        <summary>Original directory content and links</summary>
        <div className="legacy-content" dangerouslySetInnerHTML={{ __html: entry.bodyHtml }} />
      </details>
    </PageFrame>
  );
}

function EntryPage({ entry }: { entry: EntryRecord }) {
  const image = getEntryImage(entry);
  const related = relatedEntries(entry);
  const isPerson = entry.countries.length > 0;

  return (
    <PageFrame>
      <article>
        <header className={`record-hero${isPerson ? " person-record-hero" : ""}`}>
          <div className="record-hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span>
              <a href={isPerson ? "/our-people" : "/archive"}>{isPerson ? "People" : "Archive"}</a>
            </nav>
            <p className="eyebrow">{entryLabel(entry)}</p>
            <h1>{entry.title}</h1>
            {entry.excerpt && <p className="lede">{entry.excerpt}</p>}
            <p className="record-date">Published {formatDate(entry.date)} · Updated {formatDate(entry.modified)}</p>
          </div>
          {image && (
            <figure className="record-hero-media">
              <img src={image.localSrc} alt={image.alt || image.title} />
              <figcaption>{image.caption || image.title}</figcaption>
            </figure>
          )}
        </header>

        <section className="content-wrap article-layout">
          <aside className="article-aside">
            <span className="meta">Record {entry.id}</span>
            <p>{entry.sourceType === "page" ? "Centre information" : "AIWC knowledge archive"}</p>
            {entry.categories.map((category) => <span className="record-tag" key={category.id}>{category.name}</span>)}
            <a href={entry.sourceUrl} target="_blank" rel="noreferrer">Original web address ↗</a>
          </aside>
          <div className="legacy-content">
            {entry.bodyHtml ? (
              <div dangerouslySetInnerHTML={{ __html: entry.bodyHtml }} />
            ) : (
              <p>{entry.excerpt || "This archival record contains an image or linked resource from the original AIWC website."}</p>
            )}
          </div>
        </section>
      </article>

      <EntryVideos entry={entry} />
      <EntryMedia entry={entry} />

      {related.length > 0 && (
        <section className="related-section content-wrap">
          <div className="subsection-head">
            <p className="eyebrow">Continue exploring</p>
            <h2>Related records.</h2>
          </div>
          <div className="related-grid">
            {related.map((item) => <ContentCard entry={item} compact key={item.id} />)}
          </div>
        </section>
      )}
    </PageFrame>
  );
}

function MediaAttachmentPage({ item }: { item: MediaRecord }) {
  return (
    <PageFrame>
      <article className="attachment-record content-wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span aria-hidden="true">/</span><a href="/media-library">Media library</a>
        </nav>
        <header>
          <p className="eyebrow">Preserved AIWC media record · {item.id}</p>
          <h1>{item.title}</h1>
          {item.caption && <p className="lede">{item.caption}</p>}
        </header>
        {item.type === "image" ? (
          <figure>
            <img src={item.localSrc} alt={item.alt || item.title} />
            <figcaption>{item.description || item.caption || `${item.title}, preserved from the original AIWC website.`}</figcaption>
          </figure>
        ) : (
          <a className="button primary" href={item.localSrc}>Download {item.title} <span aria-hidden="true">↓</span></a>
        )}
        <div className="attachment-links">
          <a href="/media-library">Browse every image and video ↗</a>
          <a href={item.sourceUrl} target="_blank" rel="noreferrer">Original asset address ↗</a>
        </div>
      </article>
    </PageFrame>
  );
}

export function generateStaticParams() {
  const slugs = new Set([
    ...entries.map((entry) => entry.slug),
    ...media.map((item) => item.slug),
  ].filter(Boolean));
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) {
    const item = getMediaBySlug(slug);
    if (!item) return {};
    return {
      title: item.title,
      description: item.description || item.caption || `${item.title}, preserved in the AIWC media archive.`,
      openGraph: item.type === "image" ? { images: [{ url: item.localSrc, alt: item.alt || item.title }] } : undefined,
    };
  }
  const image = getEntryImage(entry);
  return {
    title: entry.title,
    description: entry.excerpt || `Explore ${entry.title} from the Australia India Water Centre.`,
    openGraph: image ? { images: [{ url: image.localSrc, alt: image.alt || image.title }] } : undefined,
  };
}

export default async function DynamicEntryPage({ params }: RouteProps) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) {
    const item = getMediaBySlug(slug);
    if (!item) notFound();
    return <MediaAttachmentPage item={item} />;
  }

  if (slug === "our-people") return <PeoplePage entry={entry} />;
  if (slug === "our-people-in-australia") return <PeoplePage entry={entry} country="Australia" />;
  if (slug === "our-people-in-india") return <PeoplePage entry={entry} country="India" />;
  if (collectionIntroductions[slug]) return <CollectionPage entry={entry} slug={slug} />;

  return <EntryPage entry={entry} />;
}
