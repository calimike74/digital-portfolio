import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: 'AI-Powered Music Technology Education | Digital Portfolio',
  description: 'How one teacher built a complete AI-powered learning platform for A-Level Music Technology — with interactive tools, AI marking, and real-time data sync.',
  openGraph: {
    title: 'AI-Powered Music Technology Education',
    description: 'A teacher-built platform with AI marking, interactive tools, and real-time data sync.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        {children}
      </body>
    </html>
  );
}
