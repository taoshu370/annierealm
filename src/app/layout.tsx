import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://annierealm.com"),
  title: {
    default: "AnnieRealm — Game Design & Development",
    template: "%s — AnnieRealm",
  },
  description: "Annie's game portfolio — shipped titles, prototypes, and case studies across horror, strategy, VR, and narrative adventure.",
  keywords: ["game design", "game development", "indie games", "Unity", "Unreal Engine", "game portfolio"],
  authors: [{ name: "Annie" }],
  creator: "Annie",
  openGraph: {
    title: "AnnieRealm — Game Design & Development",
    description: "Annie's game portfolio — shipped titles, prototypes, and case studies across horror, strategy, VR, and narrative adventure.",
    type: "website",
    locale: "en_US",
    siteName: "AnnieRealm",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnnieRealm — Game Design & Development",
    description: "Annie's game portfolio — shipped titles, prototypes, and case studies across horror, strategy, VR, and narrative adventure.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&family=Press+Start+2P&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Header />
        <main className="pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
