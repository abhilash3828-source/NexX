import Link from "next/link";

const socials = [
  { name: "Discord", href: "https://discord.gg/your-server", label: "Discord" },
  { name: "Twitter", href: "https://twitter.com/nexxesports", label: "Twitter" },
  { name: "Instagram", href: "https://instagram.com/nexxesports", label: "Instagram" }
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 py-12 text-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">NEXX Esports</h3>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            Join the fastest growing competitive community. Play with friends, win prizes, and show the world what you are
            made of.
          </p>
          <p className="text-xs text-white/50">&copy; {new Date().getFullYear()} NEXX Esports. All rights reserved.</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold text-white/90">Quick links</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <Link href="/events" className="hover:text-white">
                  Upcoming tournaments
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Past tournaments
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/90">Support</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <Link href="mailto:support@nexxesports.com" className="hover:text-white">
                  support@nexxesports.com
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/90">Community</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {socials.map((social) => (
                <li key={social.name}>
                  <Link href={social.href} className="hover:text-white" target="_blank" rel="noreferrer">
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
