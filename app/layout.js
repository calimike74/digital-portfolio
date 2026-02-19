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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bodoniModa.variable} ${spaceGrotesk.variable}`}>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
