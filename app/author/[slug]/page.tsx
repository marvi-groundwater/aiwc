import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentCard } from "@/app/components/ContentCards";
import { PageFrame } from "@/app/components/SiteChrome";
import { entries, siteContent } from "@/app/data/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return siteContent.authors.map((author) => ({ slug: author.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = siteContent.authors.find((item) => item.slug === slug);
  return author ? { title: `Records by ${author.name}`, robots: { index: false, follow: true } } : {};
}

export default async function AuthorArchivePage({ params }: Props) {
  const { slug } = await params;
  const author = siteContent.authors.find((item) => item.slug === slug);
  if (!author) notFound();
  const authored = entries.filter((entry) => entry.authorId === author.id).sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  return (
    <PageFrame>
      <section className="taxonomy-hero"><div className="content-wrap"><p className="eyebrow light">Historical author archive</p><h1>{author.name}</h1><p className="lede">{authored.length} AIWC records preserved from this author archive.</p></div></section>
      <section className="content-wrap taxonomy-results"><div className="collection-grid">{authored.map((entry) => <ContentCard entry={entry} key={entry.id} />)}</div></section>
    </PageFrame>
  );
}
