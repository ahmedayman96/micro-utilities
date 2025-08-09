export default function CompressStub() {
  return (
    <div className="card">
      <h1 className="title mb-4">Compress PDF (beta)</h1>
      <p className="text-white/70">
        Lossy compression requires re-encoding embedded images. In the hosted version,
        this will run in a background worker for larger files.
      </p>
      <p className="text-white/70 mt-3">
        For now, try Merge/Split/Images→PDF. Compression arrives in the next release.
      </p>
    </div>
  );
}
