import Link from "next/link";

const footerLinks = [
  { label: "Games", href: "/games" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-void">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <Link href="/" className="font-display text-base text-text hover:text-accent-purple transition-colors">
              AnnieRealm
            </Link>
            <p className="mt-1.5 text-xs text-text-muted max-w-xs">
              Game design &amp; development portfolio.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text transition-colors focus:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} AnnieRealm. All rights reserved.
          </p>
          <p className="text-xs text-text-muted/60 font-mono">
            Built with Next.js · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
