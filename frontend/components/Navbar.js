import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "About", href: "#about" },
  { label: "Sponsors", href: "#sponsors" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="NEXX Esports" width={120} height={48} />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold tracking-wide text-white lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-2 py-1 transition-colors hover:text-cyan-100"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-1 h-0.5 scale-x-0 bg-cyan-400 transition-transform group-hover:scale-x-100" />
            </Link>
          ))}
          <Link
            href="/admin"
            className="rounded-full border border-cyan-400/50 px-4 py-1 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-500/10"
          >
            Admin
          </Link>
        </nav>

        <button
          className="lg:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle navigation"
        >
          <span
            className={`block h-0.5 w-6 bg-cyan-200 transition-transform ${
              open ? "translate-y-1 rotate-45" : "-translate-y-1"
            }`}
          />
          <span
            className={`mt-1 block h-0.5 w-6 bg-cyan-200 transition-opacity ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`mt-1 block h-0.5 w-6 bg-cyan-200 transition-transform ${
              open ? "-translate-y-1 -rotate-45" : "translate-y-1"
            }`}
          />
        </button>
      </div>

      {open ? (
        <div className="lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 pb-5 pt-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-white/90 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="rounded-lg border border-cyan-400/40 px-3 py-2 text-cyan-100 hover:bg-cyan-500/10"
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
