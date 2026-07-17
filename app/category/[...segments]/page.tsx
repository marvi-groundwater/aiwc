import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentCard } from "@/app/components/ContentCards";
import { PageFrame } from "@/app/components/SiteChrome";
import { entriesInCategory, siteContent } from "@/app/data/content";

type Props = { params: Promise<{ segments: string[] }> };

export const dynamicParams = false;

function categoryPath(categoryId: number): string[] {
  const category = siteContent.categories.find((item) => item.id === categoryId);
  if (!category) return [];
  return category.parent ? [...categoryPath(category.parent), category.slug] : [category.slug];
}

export function generateStaticParams() {
  const paths = siteContent.categories.map((category) => ({ segments: categoryPath(category.id) }));
  const aliases = paths
    .filter((path) => path.segments.length > 1 && path.segments[0] === "australian-partner-institutes")
    .map((path) => ({ segments: ["australia-partner-institutes", ...path.segments.slice(1)] }));
  return [...paths, ...aliases];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const slug = segments.at(-1);
  const category = siteContent.categories.find((item) => item.slug === slug);
  return category ? {
    title: `${category.name} archive`,
    description: `Explore AIWC people, projects and records connected with ${category.name}.`,
    robots: { index: false, follow: true },
  } : {};
}

export default async function CategoryArchivePage({ params }: Props) {
  const { segments } = await params;
  const slug = segments.at(-1);
  const category = siteContent.categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const items = entriesInCategory(category.slug);
  const isPartner = segments.some((segment) => segment.includes("partner-institutes"));

  return (
    <PageFrame>
      <section className="taxonomy-hero">
        <div className="content-wrap">
          <p className="eyebrow light">Preserved category archive · {items.length} records</p>
          <h1>{category.name}</h1>
          <p className="lede">
            {isPartner
              ? "Institutional context, associated members and preserved records from the Australia–India partner network."
              : "A reorganised view of the public records carried by this category on the original AIWC website."}
          </p>
          <div className="hero-actions">
            <a className="button inverse" href={isPartner ? "/partners" : "/archive"}>{isPartner ? "All partners" : "Complete archive"} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
      <section className="content-wrap taxonomy-results">
        <div className="collection-heading"><p className="eyebrow">Archive contents</p><h2>{items.length ? `${items.length} connected records.` : "No current records."}</h2></div>
        {items.length > 0 ? (
          <div className="collection-grid">{items.map((entry) => <ContentCard entry={entry} key={entry.id} />)}</div>
        ) : (
          <div className="empty-archive"><p>This historical category is preserved for link continuity. Its current material is available through the complete archive.</p><a className="button" href="/archive">Browse all records ↗</a></div>
        )}
      </section>
    </PageFrame>
  );
}
