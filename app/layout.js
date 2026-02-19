import { Bodoni_Moda, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-bodoni-moda",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  title: "AI-Powered Music Technology Education | Mike Lehnert",
  description:
    "How one teacher built a complete AI-powered learning platform for A-Level Music Technology — with interactive tools, AI marking, and real-time data sync.",
  metadataBase: new URL("https://mike-lehnert-portfolio.vercel.app"),
  alternates: {
    canonical: "https://mike-lehnert-portfolio.vercel.app",
  },
  openGraph: {
    title: "AI-Powered Music Technology Education",
    description:
      "How one teacher used AI to build interactive learning tools, automated marking, and a real-time student dashboard — from scratch.",
    type: "website",
    locale: "en_GB",
    url: "https://mike-lehnert-portfolio.vercel.app",
    images: [{ url: "/og-image", width: 1200, height: 630, alt: "AI-Powered Music Technology Education Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Music Technology Education",
    description:
      "How one teacher used AI to build interactive learning tools, automated marking, and a real-time student dashboard — from scratch.",
    images: ["/og-image"],
  },
  authors: [{ name: "Mike Lehnert" }],
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://mike-lehnert-portfolio.vercel.app/#website",
      name: "AI-Powered Music Technology Education",
      url: "https://mike-lehnert-portfolio.vercel.app",
      description:
        "How one teacher built a complete AI-powered learning platform for A-Level Music Technology.",
      inLanguage: "en-GB",
      author: { "@id": "https://mike-lehnert-portfolio.vercel.app/#person" },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://mike-lehnert-portfolio.vercel.app/#profilepage",
      name: "Mike Lehnert — AI-Powered Music Technology Education",
      url: "https://mike-lehnert-portfolio.vercel.app",
      description:
        "Professional portfolio showcasing AI-powered educational tools built for A-Level Music Technology.",
      dateCreated: "2026-02-01",
      dateModified: "2026-02-19",
      isPartOf: { "@id": "https://mike-lehnert-portfolio.vercel.app/#website" },
      mainEntity: { "@id": "https://mike-lehnert-portfolio.vercel.app/#person" },
    },
    {
      "@type": "Person",
      "@id": "https://mike-lehnert-portfolio.vercel.app/#person",
      name: "Mike Lehnert",
      alternateName: "Michael Lehnert",
      jobTitle: "Music Technology Teacher",
      description:
        "A-Level Music Technology teacher and digital innovation lead building AI-powered educational tools.",
      knowsAbout: [
        "Music Technology",
        "A-Level Education",
        "AI in Education",
        "Educational Technology",
      ],
      sameAs: ["https://www.linkedin.com/in/michael-lehnert-9a784790/"],
    },
    {
      "@type": "ItemList",
      "@id": "https://mike-lehnert-portfolio.vercel.app/#features",
      name: "AI-Powered Education Features",
      numberOfItems: 5,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "AI-Powered Marking", description: "AI marks MCQs, calculations, and written responses against official mark schemes with instant feedback." },
        { "@type": "ListItem", position: 2, name: "Blind Marking", description: "Anonymous student IDs hide identity during marking, removing unconscious bias." },
        { "@type": "ListItem", position: 3, name: "Live Data Sync", description: "Grades sync automatically between spreadsheets and the student portal in both directions." },
        { "@type": "ListItem", position: 4, name: "Interactive Tools", description: "14 interactive resources where students learn by doing — synth patches, EQ curves, compression in real time." },
        { "@type": "ListItem", position: 5, name: "Revision Hub", description: "AI-marked quizzes across 6 topics with progress tracking and targeted feedback." },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" className={`${bodoniModa.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
