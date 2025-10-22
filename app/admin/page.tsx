"use client";
import { useEffect, useState } from "react";

type Content = {
  services: Array<{ id: string; title: string; why: string; items: string[]; icon: string }>;
  testimonials: Array<{ name: string; role: string; text: string }>;
  pricing: Array<{ name: string; price: string; audience: string; features: string[] }>;
  portfolio: Array<{ title: string; image: string; link?: string }>;
  partners: string[];
};

export default function AdminPage() {
  const [content, setContent] = useState<Content | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content").then((r) => r.json()).then(setContent);
  }, []);

  if (!content) return <div className="p-8">Loading…</div>;

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Admin: Edit Site Content</h1>
      <form className="mt-6 grid gap-8" onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        const res = await fetch('/api/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) });
        setSaving(false);
        alert(res.ok ? 'Saved' : 'Failed to save');
      }}>
        {/* Services */}
        <section className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Services</h2>
            <button type="button" className="btn btn-secondary" onClick={() => setContent({ ...content, services: [...content.services, { id: `s${Date.now()}`, title: "New Service", why: "", items: [], icon: "✨" }] })}>Add</button>
          </div>
          <div className="mt-4 grid gap-4">
            {content.services.map((s, idx) => (
              <div key={s.id} className="grid gap-2 rounded-lg border p-4">
                <input className="rounded border px-2 py-1" value={s.title} onChange={(e) => {
                  const copy = [...content.services]; copy[idx] = { ...s, title: e.target.value }; setContent({ ...content, services: copy });
                }} />
                <input className="rounded border px-2 py-1" value={s.icon} onChange={(e) => { const copy = [...content.services]; copy[idx] = { ...s, icon: e.target.value }; setContent({ ...content, services: copy }); }} />
                <textarea className="rounded border px-2 py-1" value={s.why} onChange={(e) => { const copy = [...content.services]; copy[idx] = { ...s, why: e.target.value }; setContent({ ...content, services: copy }); }} />
                <input className="rounded border px-2 py-1" placeholder="Comma separated items" value={s.items.join(", ")} onChange={(e) => { const copy = [...content.services]; copy[idx] = { ...s, items: e.target.value.split(/,\s*/) }; setContent({ ...content, services: copy }); }} />
                <button type="button" className="text-red-600 text-sm" onClick={() => setContent({ ...content, services: content.services.filter((_, i) => i !== idx) })}>Remove</button>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Testimonials</h2>
            <button type="button" className="btn btn-secondary" onClick={() => setContent({ ...content, testimonials: [...content.testimonials, { name: "Name", role: "Role", text: "Feedback" }] })}>Add</button>
          </div>
          <div className="mt-4 grid gap-4">
            {content.testimonials.map((t, idx) => (
              <div key={idx} className="grid gap-2 rounded-lg border p-4">
                <input className="rounded border px-2 py-1" value={t.name} onChange={(e) => { const copy = [...content.testimonials]; copy[idx] = { ...t, name: e.target.value }; setContent({ ...content, testimonials: copy }); }} />
                <input className="rounded border px-2 py-1" value={t.role} onChange={(e) => { const copy = [...content.testimonials]; copy[idx] = { ...t, role: e.target.value }; setContent({ ...content, testimonials: copy }); }} />
                <textarea className="rounded border px-2 py-1" value={t.text} onChange={(e) => { const copy = [...content.testimonials]; copy[idx] = { ...t, text: e.target.value }; setContent({ ...content, testimonials: copy }); }} />
                <button type="button" className="text-red-600 text-sm" onClick={() => setContent({ ...content, testimonials: content.testimonials.filter((_, i) => i !== idx) })}>Remove</button>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Pricing</h2>
            <button type="button" className="btn btn-secondary" onClick={() => setContent({ ...content, pricing: [...content.pricing, { name: "Package", price: "$0", audience: "", features: [] }] })}>Add</button>
          </div>
          <div className="mt-4 grid gap-4">
            {content.pricing.map((p, idx) => (
              <div key={idx} className="grid gap-2 rounded-lg border p-4">
                <input className="rounded border px-2 py-1" value={p.name} onChange={(e) => { const copy = [...content.pricing]; copy[idx] = { ...p, name: e.target.value }; setContent({ ...content, pricing: copy }); }} />
                <input className="rounded border px-2 py-1" value={p.price} onChange={(e) => { const copy = [...content.pricing]; copy[idx] = { ...p, price: e.target.value }; setContent({ ...content, pricing: copy }); }} />
                <input className="rounded border px-2 py-1" value={p.audience} onChange={(e) => { const copy = [...content.pricing]; copy[idx] = { ...p, audience: e.target.value }; setContent({ ...content, pricing: copy }); }} />
                <input className="rounded border px-2 py-1" placeholder="Comma separated features" value={p.features.join(", ")} onChange={(e) => { const copy = [...content.pricing]; copy[idx] = { ...p, features: e.target.value.split(/,\s*/) }; setContent({ ...content, pricing: copy }); }} />
                <button type="button" className="text-red-600 text-sm" onClick={() => setContent({ ...content, pricing: content.pricing.filter((_, i) => i !== idx) })}>Remove</button>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Portfolio</h2>
            <button type="button" className="btn btn-secondary" onClick={() => setContent({ ...content, portfolio: [...content.portfolio, { title: "Project", image: "/placeholders/work1.jpg", link: "#" }] })}>Add</button>
          </div>
          <div className="mt-4 grid gap-4">
            {content.portfolio.map((p, idx) => (
              <div key={idx} className="grid gap-2 rounded-lg border p-4">
                <input className="rounded border px-2 py-1" value={p.title} onChange={(e) => { const copy = [...content.portfolio]; copy[idx] = { ...p, title: e.target.value }; setContent({ ...content, portfolio: copy }); }} />
                <input className="rounded border px-2 py-1" value={p.image} onChange={(e) => { const copy = [...content.portfolio]; copy[idx] = { ...p, image: e.target.value }; setContent({ ...content, portfolio: copy }); }} />
                <input className="rounded border px-2 py-1" value={p.link || ''} onChange={(e) => { const copy = [...content.portfolio]; copy[idx] = { ...p, link: e.target.value }; setContent({ ...content, portfolio: copy }); }} />
                <button type="button" className="text-red-600 text-sm" onClick={() => setContent({ ...content, portfolio: content.portfolio.filter((_, i) => i !== idx) })}>Remove</button>
              </div>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Partners</h2>
            <button type="button" className="btn btn-secondary" onClick={() => setContent({ ...content, partners: [...content.partners, "/placeholders/logo1.svg"] })}>Add</button>
          </div>
          <div className="mt-4 grid gap-2">
            {content.partners.map((logo, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input className="flex-1 rounded border px-2 py-1" value={logo} onChange={(e) => { const copy = [...content.partners]; copy[idx] = e.target.value; setContent({ ...content, partners: copy }); }} />
                <button type="button" className="text-red-600 text-sm" onClick={() => setContent({ ...content, partners: content.partners.filter((_, i) => i !== idx) })}>Remove</button>
              </div>
            ))}
          </div>
        </section>

        <div>
          <button disabled={saving} className="btn btn-primary">{saving ? 'Saving…' : 'Save Changes'}</button>
        </div>
      </form>
    </main>
  );
}
