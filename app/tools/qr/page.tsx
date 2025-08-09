"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export default function QRTool() {
  const [text, setText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, text || "Hello world", { margin: 2, width: 320 }).catch(console.error);
  }, [text]);

  function download() {
    const c = canvasRef.current;
    if (!c) return;
    const url = c.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url; a.download = "qr.png"; a.click();
  }

  return (
    <div className="card">
      <h1 className="title mb-4">QR Code Generator</h1>
      <input className="input w-full mb-4" placeholder="Text or URL" value={text} onChange={(e)=> setText(e.target.value)} />
      <canvas ref={canvasRef} className="mx-auto bg-white rounded-xl p-2" />
      <div className="mt-4">
        <button className="btn" onClick={download}>Download PNG</button>
      </div>
    </div>
  );
}
