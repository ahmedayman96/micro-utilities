import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Micro Utilities – Fast everyday tools",
  description: "Blazing-fast everyday file and text tools. No signup.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-white/10">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">⚡ Micro Utilities</Link>
            <nav className="flex gap-4 text-sm text-white/70">
              <Link href="/tools/pdf/merge">Merge PDF</Link>
              <Link href="/tools/pdf/split">Split PDF</Link>
              <Link href="/tools/pdf/images-to-pdf">Images→PDF</Link>
              <Link href="/tools/qr">QR</Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="container py-10 text-center text-white/50 text-sm">
          © {new Date().getFullYear()} Micro Utilities — Fast tools, no BS.
        </footer>
      </body>
    </html>
  );
}
