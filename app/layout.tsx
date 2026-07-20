import type { Metadata } from "next";
import "./globals.css";

const title = "AIWC — Australia India Water Centre";
const description =
  "A bilateral platform connecting research, education, training and communities for sustainable water futures across Australia and India.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aiwc.org.au"),
  title: {
    default: title,
    template: "%s · AIWC",
  },
  description,
  icons: {
    icon: "/media/994-AIWC-Favicon.png",
    shortcut: "/media/994-AIWC-Favicon.png",
  },
  openGraph: {
    type: "website",
    title,
    description,
    images: [{ url: "/og.png", width: 1729, height: 910, alt: "AIWC — Two countries. One water future." }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

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
