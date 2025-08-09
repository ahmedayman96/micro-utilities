"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [range, setRange] = useState("1-1");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function split() {
    if (!file) return;
    setBusy(true); setError(null);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const src = await PDFDocument.load(bytes);
      const out = await PDFDocument.create();

      const [startStr, endStr] = range.split("-");
      const start = Math.max(1, parseInt(startStr || "1", 10));
      const end = Math.min(src.getPageCount(), parseInt(endStr || startStr, 10));

      const pageIndices = Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i);
      const pages = await out.copyPages(src, pageIndices);
      pages.forEach(p => out.addPage(p));
      const data = await out.save();
      const blob = new Blob([data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `split_${start}-${end}.pdf`; a.click();
      URL.revokeObjectURL(url);
    } catch (e:any) {
      setError(e?.message || "Failed to split PDF.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <h1 className="title mb-4">Split PDF</h1>
      <input type="file" accept="application/pdf" onChange={(e)=> setFile(e.target.files?.[0] || null)} />
      <div className="mt-3">
        <label className="block text-sm text-white/70 mb-1">Page range (e.g., 1-3)</label>
        <input className="input w-40" value={range} onChange={(e)=> setRange(e.target.value)} />
      </div>
      <div className="mt-4">
        <button className="btn" onClick={split} disabled={!file || busy}>
          {busy ? "Processing..." : "Extract Range"}
        </button>
      </div>
      {error && <div className="text-red-400 mt-3">{error}</div>}
    </div>
  );
}
