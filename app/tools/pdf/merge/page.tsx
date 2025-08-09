"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function MergePDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function merge() {
    setBusy(true); setError(null);
    try {
      const out = await PDFDocument.create();
      for (const f of files) {
        const bytes = new Uint8Array(await f.arrayBuffer());
        const doc = await PDFDocument.load(bytes);
        const pages = await out.copyPages(doc, doc.getPageIndices());
        pages.forEach(p => out.addPage(p));
      }
      const merged = await out.save();
      const blob = new Blob([merged], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "merged.pdf"; a.click();
      URL.revokeObjectURL(url);
    } catch (e:any) {
      setError(e?.message || "Failed to merge PDFs.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <h1 className="title mb-4">Merge PDF</h1>
      <input type="file" multiple accept="application/pdf" onChange={(e)=>{
        if (e.target.files) setFiles(Array.from(e.target.files));
      }} />
      <div className="mt-4 flex gap-2">
        <button className="btn" onClick={merge} disabled={!files.length || busy}>
          {busy ? "Merging..." : "Merge and Download"}
        </button>
        <div className="text-white/60 text-sm self-center">{files.length} file(s) selected</div>
      </div>
      {error && <div className="text-red-400 mt-3">{error}</div>}
    </div>
  );
}
