"use client";
import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default function ImagesToPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function convert() {
    setBusy(true); setError(null);
    try {
      const pdfDoc = await PDFDocument.create();
      for (const f of files) {
        const bytes = new Uint8Array(await f.arrayBuffer());
        let img;
        if (f.type === "image/png") img = await pdfDoc.embedPng(bytes);
        else img = await pdfDoc.embedJpg(bytes);
        const page = pdfDoc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "images.pdf"; a.click();
      URL.revokeObjectURL(url);
    } catch (e:any) {
      setError(e?.message || "Failed to convert images.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <h1 className="title mb-4">Images → PDF</h1>
      <input type="file" multiple accept="image/png,image/jpeg" onChange={(e)=>{
        if (e.target.files) setFiles(Array.from(e.target.files));
      }} />
      <div className="mt-4">
        <button className="btn" onClick={convert} disabled={!files.length || busy}>
          {busy ? "Converting..." : "Create PDF"}
        </button>
      </div>
      {error && <div className="text-red-400 mt-3">{error}</div>}
    </div>
  );
}
