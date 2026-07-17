import type { Metadata } from "next";
import { PageFrame } from "@/app/components/SiteChrome";
import { entries, getEntryImage, images } from "@/app/data/content";

type Props = { params: Promise<{ slug: string }> };

const tagSlugs = [
  "banaras-hindu-university-members", "indian-institute-of-information-technology-dharwad",
  "indian-institute-of-technology-guwahati", "national-institute-of-technology-karnataka",
  "sardar-vallabhbhai-national-institute-of-technology", "g-b-university-of-agriculture-technology",
  "pantnagar", "india", "indian-institute-of-technology-roorkee", "indian-institute-of-science",
  "bangalore", "jawaharlal-nehru-technological-university", "hyderabad",
  "jss-science-and-technology-university", "mysuru", "maharana-pratap-university-of-agriculture-and-technology",
  "udaipur", "rajasthan", "uas-bengaluru", "iit-indian-institute-of-technology-kharagpur",
  "research", "news-events", "blogs",
];

export function generateStaticParams() { return tagSlugs.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug.replaceAll("-", " ")} media tag`, robots: { index: false, follow: true } };
}

export default async function AttachmentTagPage({ params }: Props) {
  const { slug } = await params;
  const tokens = slug.split("-").filter((token) => token.length > 4 && !["indian", "institute", "university", "technology"].includes(token));
  const personImages = entries
    .filter((entry) => entry.categories.some((category) => tokens.some((token) => category.slug.includes(token))))
    .map(getEntryImage)
    .filter((item) => item !== undefined);
  const found = new Map(personImages.map((item) => [item.id, item]));
  for (const image of images) {
    if (tokens.some((token) => `${image.slug} ${image.title}`.toLowerCase().includes(token))) found.set(image.id, image);
  }
  const items = [...found.values()];

  return (
    <PageFrame>
      <section className="taxonomy-hero"><div className="content-wrap"><p className="eyebrow light">Historical attachment tag</p><h1>{slug.replaceAll("-", " ")}</h1><p className="lede">A preserved route into AIWC’s visual archive, reorganised around the original people and media records.</p></div></section>
      <section className="content-wrap taxonomy-results">
        <div className="collection-heading"><p className="eyebrow">Preserved media</p><h2>{items.length} related images.</h2></div>
        {items.length ? <div className="taxonomy-media-grid">{items.map((item) => <figure key={item.id}><a href={item.localSrc}><img src={item.localSrc} alt={item.alt || item.title} loading="lazy" /></a><figcaption>{item.title}</figcaption></figure>)}</div> : <div className="empty-archive"><p>No unique media was attached to this historical tag. The route remains available for link continuity.</p></div>}
        <a className="button" href="/media-library">Browse all preserved media ↗</a>
      </section>
    </PageFrame>
  );
}
