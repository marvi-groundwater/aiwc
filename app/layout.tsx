import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;
  const title = "AIWC — Australia India Water Centre";
  const description =
    "A bilateral platform connecting research, education, training and communities for sustainable water futures across Australia and India.";

  return {
    title: {
      default: title,
      template: "%s · AIWC",
    },
    description,
    icons: {
      icon: "https://aiwc.org.au/wp-content/uploads/2022/06/AIWC-Favicon-150x150.png",
      shortcut: "https://aiwc.org.au/wp-content/uploads/2022/06/AIWC-Favicon-150x150.png",
    },
    openGraph: {
      type: "website",
      title,
      description,
      images: [{ url: `${baseUrl}/og.png`, width: 1731, height: 909, alt: "AIWC — Two countries. One water future." }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
