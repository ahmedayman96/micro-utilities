"use client";
import { useState, DragEvent } from "react";

export default function DropZone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const [hover, setHover] = useState(false);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setHover(false);
    const files = Array.from(e.dataTransfer.files);
    onFiles(files);
  }
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setHover(true); }}
      onDragLeave={() => setHover(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-2xl p-10 text-center ${hover ? "border-white" : "border-white/30"}`}
    >
      <div className="text-white/70">Drag & drop files here, or click to select</div>
      <input type="file" multiple className="hidden" onChange={(e)=>{
        if (e.target.files) onFiles(Array.from(e.target.files));
      }} />
    </div>
  );
}
