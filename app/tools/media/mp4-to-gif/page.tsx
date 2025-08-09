export default function MP4toGIFStub() {
  return (
    <div className="card">
      <h1 className="title mb-4">MP4 → GIF (beta)</h1>
      <p className="text-white/70">
        Converting MP4 → GIF will use ffmpeg.wasm in-browser for short clips,
        and a Cloudflare Worker for larger files. Coming soon.
      </p>
    </div>
  );
}
