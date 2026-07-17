import type { Metadata } from "next";
import { ContentCard } from "@/app/components/ContentCards";
import { PageFrame } from "@/app/components/SiteChrome";
import {
  entries,
  entriesInCategory,
  entryHref,
  entryLabel,
  formatDate,
  siteContent,
} from "@/app/data/content";

export const metadata: Metadata = {
  title: "Knowledge archive",
  description: "The complete AIWC archive of pages, people, projects, news, publications, events and resources.",
};

const highlightedSlugs = [
  "managing-groundwater-use-and-sustaining-aquifer-recharge-through-village-level-interventions-marvi",
  "the-young-water-professionals-program-ywp",
  "dam-rehabilitation-improvement-project-drip-ii",
  "village-groundwater-cooperatives-vgcs",
];

export default function ArchivePage() {
  const latest = entriesInCategory("news-events").slice(0, 3);
  const highlights = highlightedSlugs
    .map((slug) => entries.find((entry) => entry.slug === slug))
    .filter((entry) => entry !== undefined);
  const alphabetical = [...entries].sort((a, b) => a.title.localeCompare(b.title));
  const groups = Map.groupBy(alphabetical, (entry) => entry.title[0]?.toUpperCase().match(/[A-Z]/) ? entry.title[0].toUpperCase() : "#");

  return (
    <PageFrame>
      <section className="archive-hero">
        <div className="content-wrap archive-hero-grid">
          <div>
            <p className="eyebrow light">The complete AIWC knowledge platform</p>
            <h1>Every record.<br />One clear path in.</h1>
            <p className="lede">
              Projects, people, events, publications, learning programs and the full WaterWise archive—preserved from every public AIWC page and reorganised for discovery.
            </p>
          </div>
          <dl className="archive-stats">
            <div><dt>{siteContent.counts.entries}</dt><dd>pages & records</dd></div>
            <div><dt>{siteContent.counts.images + 1}</dt><dd>preserved images</dd></div>
            <div><dt>{siteContent.videos.length - 1}</dt><dd>individual videos</dd></div>
            <div><dt>2</dt><dd>countries, one network</dd></div>
          </dl>
        </div>
      </section>

      <section className="content-wrap archive-pathways">
        <div className="collection-heading">
          <p className="eyebrow">Choose a pathway</p>
          <h2>Explore by purpose.</h2>
        </div>
        <div className="pathway-grid">
          <a href="/research"><span>01</span><h3>Research</h3><p>Joint inquiry, projects and applied evidence.</p><i>↗</i></a>
          <a href="/education"><span>02</span><h3>Education</h3><p>Programs for sustainable water futures.</p><i>↗</i></a>
          <a href="/training-capacity-building"><span>03</span><h3>Training</h3><p>Skills, leadership and professional exchange.</p><i>↗</i></a>
          <a href="/outreach"><span>04</span><h3>Outreach</h3><p>WaterWise, webinars and public dialogue.</p><i>↗</i></a>
          <a href="/our-people"><span>05</span><h3>People</h3><p>The complete Australia–India network.</p><i>↗</i></a>
          <a href="/partners"><span>06</span><h3>Partners</h3><p>Institutions that make the Centre possible.</p><i>↗</i></a>
          <a href="/journal-articles"><span>07</span><h3>Publications</h3><p>Articles, papers, books and resources.</p><i>↗</i></a>
          <a href="/media-library"><span>08</span><h3>Media</h3><p>Images, videos, maps and documents.</p><i>↗</i></a>
        </div>
      </section>

      {latest.length > 0 && (
        <section className="content-wrap archive-featured">
          <div className="subsection-head">
            <p className="eyebrow">Latest from the Centre</p>
            <h2>News & events.</h2>
          </div>
          <div className="collection-grid three-up">
            {latest.map((entry) => <ContentCard entry={entry} key={entry.id} />)}
          </div>
        </section>
      )}

      <section className="content-wrap archive-featured">
        <div className="subsection-head">
          <p className="eyebrow">Programs in focus</p>
          <h2>Work grounded in place.</h2>
        </div>
        <div className="collection-grid">
          {highlights.map((entry) => <ContentCard entry={entry} key={entry.id} />)}
        </div>
      </section>

      <section className="complete-index" id="complete-index">
        <div className="content-wrap">
          <div className="complete-index-head">
            <div>
              <p className="eyebrow light">Complete A–Z</p>
              <h2>All {entries.length} records.</h2>
            </div>
            <p>Nothing has been discarded: even historical, duplicate and placeholder records remain clearly labelled in this preservation index.</p>
          </div>
          <nav className="letter-nav" aria-label="Alphabetical archive">
            {[...groups.keys()].map((letter) => <a href={`#letter-${letter}`} key={letter}>{letter}</a>)}
          </nav>
          <div className="alphabetical-groups">
            {[...groups.entries()].map(([letter, items]) => (
              <section id={`letter-${letter}`} key={letter}>
                <h3>{letter}</h3>
                <ol>
                  {items.map((entry) => (
                    <li key={entry.id}>
                      <a href={entryHref(entry)}>
                        <span>{entry.title}</span>
                        <small>{entryLabel(entry)} · {formatDate(entry.date)}</small>
                        <i aria-hidden="true">↗</i>
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
