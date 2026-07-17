import {
  type EntryRecord,
  entryHref,
  entryLabel,
  formatDate,
  getEntryImage,
} from "@/app/data/content";

export function ContentCard({ entry, compact = false }: { entry: EntryRecord; compact?: boolean }) {
  const image = getEntryImage(entry);

  return (
    <article className={`content-card${compact ? " compact" : ""}`}>
      {image && (
        <a className="content-card-image" href={entryHref(entry)} aria-hidden="true" tabIndex={-1}>
          <img src={image.localSrc} alt="" loading="lazy" />
        </a>
      )}
      <div className="content-card-copy">
        <p className="meta">{entryLabel(entry)} · {formatDate(entry.date)}</p>
        <h3><a href={entryHref(entry)}>{entry.title}</a></h3>
        {!compact && entry.excerpt && <p>{entry.excerpt}</p>}
        <a className="text-link" href={entryHref(entry)}>Read this record <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}
