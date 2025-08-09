import Link from "next/link";

const tools = [
  { href: "/tools/pdf/merge", title: "Merge PDF", desc: "Combine multiple PDFs into one." },
  { href: "/tools/pdf/split", title: "Split PDF", desc: "Extract a page range into a new PDF." },
  { href: "/tools/pdf/images-to-pdf", title: "Images → PDF", desc: "Convert JPG/PNG to a single PDF." },
  { href: "/tools/qr", title: "QR Code Generator", desc: "Create and download QR codes." },
  { href: "/tools/pdf/compress", title: "Compress PDF (beta)", desc: "Reduce size (lossy) — coming soon." },
  { href: "/tools/media/mp4-to-gif", title: "MP4 → GIF (beta)", desc: "Convert short MP4 to GIF — coming soon." },
];

export default function Page() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {tools.map(t => (
        <Link key={t.href} href={t.href} className="card block hover:bg-white/5">
          <div className="title mb-2">{t.title}</div>
          <div className="text-white/70">{t.desc}</div>
        </Link>
      ))}
    </div>
  );
}
