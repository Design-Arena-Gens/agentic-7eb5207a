import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://agentic-7eb5207a.vercel.app"),
  title: {
    default: "S10 Digital Solutions | AI Digital Solutions | Web Development | Resume Builder | Sri Lanka",
    template: "%s | S10 Digital Solutions",
  },
  description: "Transform your digital presence with AI-powered creativity. Design, marketing, resumes, AI tools, and web development.",
  keywords: [
    "AI Digital Solutions",
    "Web Development",
    "Resume Builder",
    "AI tools",
    "Sri Lanka",
    "S10 Digital Solutions"
  ],
  openGraph: {
    title: "S10 Digital Solutions",
    description: "AI-powered design, marketing, resumes, productivity tools, and web development.",
    url: "/",
    siteName: "S10 Digital Solutions",
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "S10 Digital Solutions",
    description: "AI-powered digital services to help you grow.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
