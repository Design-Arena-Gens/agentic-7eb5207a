"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

type Content = {
  services: Array<{ id: string; title: string; why: string; items: string[]; icon: string }>;
  testimonials: Array<{ name: string; role: string; text: string }>;
  pricing: Array<{ name: string; price: string; audience: string; features: string[] }>;
  portfolio: Array<{ title: string; image: string; link?: string }>;
  partners: string[];
};

const defaultContent: Content = {
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

export default function HomePage() {
  const [content, setContent] = useState<Content>(defaultContent);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setContent(data);
      })
      .catch(() => {});
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="section hero-gradient">
        <div className="container grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <span className="badge">S10 Digital Solutions</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Transform Your Digital Presence with AI-Powered Creativity
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              From stunning designs to smart automation — S10 Digital Solutions helps you grow, impress, and save time.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#contact" className="btn btn-primary">Get Started</a>
              <a href="#portfolio" className="btn btn-secondary">See Our Work</a>
            </div>
          </div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square w-full max-w-lg mx-auto"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-100 to-brand-200" />
              <div className="absolute inset-6 rounded-full bg-white shadow-xl" />
              {["🎨","📈","📝","🤖","💻"].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="absolute text-3xl"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                  style={{
                    top: `${10 + i*15}%`,
                    left: i % 2 === 0 ? "5%" : "80%"
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-3xl font-bold">S10</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="container grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">A Modern Digital Partner for Modern Challenges</h2>
            <p className="mt-4 text-gray-600">
              We blend design, strategy, and AI to help small businesses, students, and professionals create powerful digital experiences.
            </p>
            <p className="mt-2 text-gray-600">
              Founded in Sri Lanka, we serve clients worldwide with a focus on efficiency and transparency.
            </p>
          </div>
          <div className="card">
            <blockquote className="text-lg italic text-gray-700">
              “You don’t need a big team to achieve big results. You just need smart solutions.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section bg-gray-50">
        <div className="container">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold">Everything You Need to Stand Out in the Digital World</h2>
            <a href="#contact" className="btn btn-secondary">Explore All Services</a>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.map((s) => (
              <div key={s.id} className="card">
                <div className="text-3xl">{s.icon}</div>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-gray-600">{s.why}</p>
                <ul className="mt-4 list-disc pl-5 text-gray-600">
                  {s.items.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section id="why" className="section">
        <div className="container">
          <h2 className="text-3xl font-bold">Why Businesses and Professionals Trust S10</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[{i:"⚡",t:"AI-Driven Efficiency"},{i:"🎯",t:"Customized for You"},{i:"🤝",t:"Reliable & Transparent"}].map((k) => (
              <div key={k.t} className="card text-center">
                <div className="text-3xl">{k.i}</div>
                <div className="mt-2 font-semibold">{k.t}</div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a href="#contact" className="btn btn-primary">Get Your Free Consultation</a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="process" className="section bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold">Getting Started Is Simple</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {["Share Your Vision","We Craft the Solution","Launch & Grow"].map((step, i) => (
              <div key={step} className="card">
                <div className="badge">Step {i+1}</div>
                <div className="mt-2 font-semibold">{step}</div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a href="#contact" className="btn btn-primary">Start Your Project</a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section">
        <div className="container">
          <h2 className="text-3xl font-bold">What Our Early Clients Say</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {content.testimonials.map((t, idx) => (
              <div key={idx} className="card">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-gray-500">{t.role}</div>
                <p className="mt-3 text-gray-700">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold">Flexible Packages for Every Need</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {content.pricing.map((plan) => (
              <div key={plan.name} className="card">
                <div className="text-sm text-gray-500">{plan.audience}</div>
                <div className="mt-1 text-2xl font-semibold">{plan.name}</div>
                <div className="mt-1 text-brand-700 text-xl">{plan.price}</div>
                <ul className="mt-4 list-disc pl-5 text-gray-600">
                  {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <a href="#contact" className="mt-4 btn btn-primary w-full">Get a Quote</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="section">
        <div className="container">
          <h2 className="text-3xl font-bold">Trusted by These Brands</h2>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {content.partners.map((src, i) => (
              <div key={i} className="card grid place-items-center py-6">
                <img className="h-8 opacity-70" src={src} alt="Partner logo" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="section bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold">Our Recent Projects</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.portfolio.map((p, i) => (
              <a key={i} href={p.link || "#"} className="group card overflow-hidden">
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="mt-3 font-semibold">{p.title}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="text-3xl font-bold">Let’s Build Something Smart Together</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <form className="card" onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const formData = new FormData(form);
              const res = await fetch('/api/contact', { method: 'POST', body: formData });
              if (res.ok) {
                alert('Thanks! We will get back to you.');
                form.reset();
              } else {
                alert('Failed to send. Please try WhatsApp.');
              }
            }}>
              <div className="grid gap-4">
                <input name="name" required placeholder="Name" className="rounded-lg border px-3 py-2" />
                <input name="email" type="email" required placeholder="Email" className="rounded-lg border px-3 py-2" />
                <select name="service" className="rounded-lg border px-3 py-2">
                  {content.services.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                </select>
                <textarea name="message" required placeholder="Message" className="rounded-lg border px-3 py-2" rows={4} />
                <div className="flex gap-3">
                  <button className="btn btn-primary" type="submit">Send Message</button>
                  <a className="btn btn-secondary" href="https://wa.me/94700000000" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
                </div>
                <div className="text-sm text-gray-600">📧 hello@s10digitalsolutions.com · Sri Lanka, serving clients worldwide</div>
              </div>
            </form>
            <div className="card">
              <h3 className="text-xl font-semibold">Update Site Content</h3>
              <p className="text-sm text-gray-600">Admin can update services, testimonials, pricing, and portfolio.</p>
              <Link href="/admin" className="mt-4 inline-block text-brand-700 underline">Go to Admin</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section border-t">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-gray-600">© 2025 S10 Digital Solutions. All rights reserved.</div>
          <nav className="flex gap-4 text-sm text-gray-600">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://wa.me/94700000000" target="_blank" rel="noreferrer">WhatsApp</a>
          </nav>
        </div>
      </footer>

      {/* Floating actions */}
      <a href="#" onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="fixed bottom-6 right-6 grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-white shadow-lg">↑</a>
      <a href="https://wa.me/94700000000" target="_blank" rel="noreferrer" className="fixed bottom-6 left-6 grid h-12 w-12 place-items-center rounded-full bg-green-500 text-white shadow-lg">🟢</a>
    </main>
  );
}
