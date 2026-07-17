import type { Metadata } from "next";
import { PageFrame } from "@/app/components/SiteChrome";
import { files, images, siteContent } from "@/app/data/content";

export const metadata: Metadata = {
  title: "Media library",
  description: "Every image, AIWC video, partner map and downloadable document preserved from the original Australia India Water Centre website.",
};

function getVideoId(url: string) {
  const parsed = new URL(url);
  if (parsed.hostname === "youtu.be") return parsed.pathname.split("/").filter(Boolean)[0];
  return parsed.searchParams.get("v") || parsed.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1] || null;
}

function videoLabel(label: string, index: number) {
  if (!label || label === "AIWC video") return `AIWC water knowledge video ${index + 1}`;
  return label.replace(/WATER TALKS AUGUST 202$/, "Water Talks — August 2025");
}

export default function MediaLibraryPage() {
  const videos = siteContent.videos.filter((item) => !item.url.includes("@"));
  const channel = siteContent.videos.find((item) => item.url.includes("@"));
  const imagesByYear = Map.groupBy(
    [...images].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || b.id - a.id),
    (item) => item.date?.slice(0, 4) ?? "Archive",
  );

  return (
    <PageFrame>
      <section className="media-hero">
        <img src="/media/134-Water-Splash.webp" alt="Water in motion" />
        <div>
          <p className="eyebrow light">AIWC media & resource library</p>
          <h1>The visual record of a bilateral partnership.</h1>
          <p>
            Every original image is preserved here, together with all discoverable AIWC YouTube videos, partner maps and downloadable documents.
          </p>
          <a className="button inverse" href="#videos">Watch the archive <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="content-wrap media-stats" aria-label="Media library totals">
        <div><strong>{images.length + 1}</strong><span>images preserved</span></div>
        <div><strong>{videos.length}</strong><span>YouTube videos</span></div>
        <div><strong>{siteContent.maps.length}</strong><span>partner maps</span></div>
        <div><strong>{files.length}</strong><span>preserved documents</span></div>
      </section>

      <section className="content-wrap video-library" id="videos">
        <div className="subsection-head split-heading">
          <div><p className="eyebrow">Watch & learn</p><h2>Every AIWC video link.</h2></div>
          {channel && <a className="button" href={channel.url} target="_blank" rel="noreferrer">Visit the YouTube channel ↗</a>}
        </div>
        <div className="video-grid">
          {videos.map((video, index) => {
            const id = getVideoId(video.url);
            if (!id) return null;
            const label = videoLabel(video.label, index);
            return (
              <article className="video-card" key={video.url}>
                <div className="video-frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${id}`}
                    title={label}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <p>{label}</p>
                <a href={video.url} target="_blank" rel="noreferrer">Watch on YouTube ↗</a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="maps-section">
        <div className="content-wrap">
          <div className="subsection-head">
            <p className="eyebrow light">Partners across two countries</p>
            <h2>Explore the network.</h2>
          </div>
          <div className="map-grid">
            {siteContent.maps.map((map) => (
              <article key={map.url}>
                <h3>{map.label}</h3>
                <iframe src={map.url} title={map.label} loading="lazy" />
                <a href={map.url} target="_blank" rel="noreferrer">Open the full map ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-wrap document-library">
        <div className="subsection-head">
          <p className="eyebrow">Downloads</p>
          <h2>Documents & programs.</h2>
        </div>
        <div className="download-list">
          {files.map((file) => (
            <a href={file.localSrc} key={file.id}>
              <span>PDF</span><strong>{file.title}</strong><i aria-hidden="true">↓</i>
            </a>
          ))}
          {siteContent.documents
            .filter((document) => !files.some((file) => file.sourceUrl === document.sourceUrl))
            .map((document) => (
              <a href={document.url} key={document.sourceUrl} target="_blank" rel="noreferrer">
                <span>LINK</span><strong>{document.label}</strong><i aria-hidden="true">↗</i>
              </a>
            ))}
        </div>
      </section>

      <section className="image-archive">
        <div className="content-wrap image-archive-intro">
          <div><p className="eyebrow light">Complete preservation set</p><h2>{images.length} originals + one external legacy image.</h2></div>
          <p>
            Active photographs, portraits, event graphics and partner logos are shown alongside 42 historical library assets that were no longer visible on the former public pages.
          </p>
        </div>
        {[...imagesByYear.entries()].map(([year, yearImages]) => (
          <section className="media-year content-wrap" key={year}>
            <h3>{year}</h3>
            <div className="media-masonry">
              {yearImages.map((item) => (
                <figure key={item.id}>
                  <a href={item.localSrc}>
                    <img
                      src={item.localSrc}
                      alt={item.alt || `${item.title}, AIWC archival image`}
                      width={item.width ?? undefined}
                      height={item.height ?? undefined}
                      loading="lazy"
                    />
                  </a>
                  <figcaption><span>{item.title}</span><small>AIWC archive · {item.id}</small></figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}
        <section className="media-year content-wrap">
          <h3>External legacy record</h3>
          <div className="external-legacy-image">
            <img src="/media/external-kadambot-profile.gif" width="16" height="16" alt="Tiny legacy image marker from the original Kadambot H. M. Siddique profile" />
            <div><strong>Embedded profile marker</strong><p>The only non-WordPress image found in the public crawl was a 16×16 embedded GIF. It is preserved here for completeness.</p></div>
          </div>
        </section>
      </section>
    </PageFrame>
  );
}
