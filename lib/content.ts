import { put } from "@vercel/blob";
import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";

export type Content = {
  services: Array<{ id: string; title: string; why: string; items: string[]; icon: string }>;
  testimonials: Array<{ name: string; role: string; text: string }>;
  pricing: Array<{ name: string; price: string; audience: string; features: string[] }>;
  portfolio: Array<{ title: string; image: string; link?: string }>;
  partners: string[];
};

export const defaultContent: Content = {
  services: [
    { id: "design", title: "Design & Branding", why: "Eye-catching visuals capture attention and make your brand memorable.", items: ["Social media posts", "Marketing graphics", "Brand visuals"], icon: "🎨" },
    { id: "marketing", title: "Digital Marketing", why: "Reach more customers effectively and maximize ROI with AI-enhanced strategies.", items: ["Social media planning", "Ad optimization", "Marketing strategy"], icon: "📈" },
    { id: "resume", title: "Resume Building", why: "Professionally crafted resumes increase interview call rates.", items: ["AI-enhanced resumes", "LinkedIn optimization"], icon: "📝" },
    { id: "productivity", title: "AI-Powered Productivity Tools", why: "Automate repetitive tasks to save time and focus on growth.", items: ["Chatbots", "Workflow automation", "Personalized AI tools"], icon: "🤖" },
    { id: "webdev", title: "Web Development", why: "Modern, responsive websites engage users and drive conversions.", items: ["Brand sites", "Portfolios", "Digital stores"], icon: "💻" },
  ],
  testimonials: [
    { name: "Ayesha", role: "Founder, Ceylon Crafts", text: "S10 revamped our brand with fresh visuals and a fast website. Sales improved within weeks." },
    { name: "Ravi", role: "Marketing Lead, Lanka Foods", text: "Their AI-driven marketing saved us hours and increased our ad ROI." },
    { name: "Maya", role: "Graduate Student", text: "The resume service helped me land interviews at top firms." },
  ],
  pricing: [
    { name: "Starter", price: "$199+", audience: "Students & solo founders", features: ["1-page website or resume", "Basic branding pack", "Email support"] },
    { name: "Professional", price: "$699+", audience: "Growing startups & SMBs", features: ["Multi-page site", "Marketing setup", "Light automation", "Priority support"] },
    { name: "Business Pro", price: "Custom", audience: "Scaling teams", features: ["Custom AI tools", "Ecommerce", "Advanced automation", "Ongoing optimization"] },
  ],
  portfolio: [
    { title: "Ceylon Crafts Shop", image: "/placeholders/work1.jpg", link: "#" },
    { title: "Lanka Foods Campaign", image: "/placeholders/work2.jpg" },
    { title: "Resume Revamp", image: "/placeholders/work3.jpg" },
  ],
  partners: ["/placeholders/logo1.svg", "/placeholders/logo2.svg", "/placeholders/logo3.svg", "/placeholders/logo4.svg"],
};

const CONTENT_BLOB_NAME = "content.json";

const localPath = path.join(process.cwd(), "data", CONTENT_BLOB_NAME);

async function ensureLocalDir() {
  const dir = path.dirname(localPath);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
}

export const readContent = cache(async (): Promise<Content> => {
  // Try Vercel Blob first
  try {
    const url = process.env.CONTENT_BLOB_URL;
    if (url) {
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
        return JSON.parse(text) as Content;
      }
    }
  } catch {}
  // Fallback to local JSON file
  try {
    const text = await fs.readFile(localPath, "utf8");
    return JSON.parse(text) as Content;
  } catch {
    await ensureLocalDir();
    await fs.writeFile(localPath, JSON.stringify(defaultContent, null, 2));
    return defaultContent;
  }
});

export async function writeContent(content: Content): Promise<void> {
  const body = JSON.stringify(content, null, 2);
  // Try Vercel Blob write if token configured via env on Vercel
  try {
    const blob = await put(CONTENT_BLOB_NAME, body, { access: "public", contentType: "application/json" });
    process.env.CONTENT_BLOB_URL = blob.url;
  } catch {}
  await ensureLocalDir();
  await fs.writeFile(localPath, body);
}
