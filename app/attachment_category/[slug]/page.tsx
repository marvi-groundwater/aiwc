import type { Metadata } from "next";
import { PageFrame } from "@/app/components/SiteChrome";
import { entriesInCategory, getEntryMedia, images } from "@/app/data/content";

type Props = { params: Promise<{ slug: string }> };

const archiveSlugs = [
  "logos-india", "logos-australia", "hero-images", "maps", "australia-india-insitute",
  "deakin-university", "flinders-university", "griffith-university", "qut-queensland-university-of-technology",
  "university-of-melbourne", "university-of-new-south-wales", "university-of-western-australia",
  "university-of-wollongong", "western-sydney-university", "about-us-images", "our-work", "aiwc5",
];

export function generateStaticParams() { return archiveSlugs.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug.replaceAll("-", " ")} media archive`, robots: { index: false, follow: true } };
}

function relatedImages(slug: string) {
  const exactIds = new Set(entriesInCategory(slug).flatMap((entry) => getEntryMedia(entry).map((item) => item.id)));
  const tokens = slug.split("-").filter((token) => token.length > 4 && !["university", "institute"].includes(token));
  const matched = images.filter((image) => exactIds.has(image.id) || tokens.some((token) => `${image.slug} ${image.title}`.toLowerCase().includes(token)));
  if (slug === "logos-india") return images.filter((image) => image.id >= 92 && image.id <= 106 || image.id >= 2470 && image.id <= 2482);
  if (slug === "logos-australia") return images.filter((image) => image.id >= 337 && image.id <= 362);
  if (slug === "hero-images") return images.filter((image) => [91, 134].includes(image.id));
  if (slug === "maps" || slug === "about-us-images") return images.filter((image) => /map|principle|org.chart/i.test(`${image.slug} ${image.title}`));
  if (slug === "aiwc5") return images.filter((image) => image.id >= 2490 && image.id <= 2497);
  return matched;
}

export default async function AttachmentCategoryPage({ params }: Props) {
  const { slug } = await params;
  const items = relatedImages(slug);
  const title = slug.replaceAll("-", " ");
  return (
    <PageFrame>
      <section className="taxonomy-hero"><div className="content-wrap"><p className="eyebrow light">Historical media category</p><h1>{title}</h1><p className="lede">This former WordPress media archive now points to its preserved original images and the complete AIWC media library.</p></div></section>
      <section className="content-wrap taxonomy-results">
        <div className="collection-heading"><p className="eyebrow">Preserved media</p><h2>{items.length} related images.</h2></div>
        {items.length ? <div className="taxonomy-media-grid">{items.map((item) => <figure key={item.id}><a href={item.localSrc}><img src={item.localSrc} alt={item.alt || item.title} loading="lazy" /></a><figcaption>{item.title}</figcaption></figure>)}</div> : <div className="empty-archive"><p>This thin historical archive has no unique editorial material. All original assets remain available in the media library.</p></div>}
        <a className="button" href="/media-library">Open the complete media library ↗</a>
      </section>
    </PageFrame>
  );
}
