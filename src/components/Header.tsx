"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Games", href: "/games" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 40);

      if (isMenuOpen && Math.abs(currentScrollY - lastScrollY) > 5) {
        setIsMenuOpen(false);
      }

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen]);

  const inHero = isHomePage && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled || isMenuOpen
          ? "border-b border-border bg-void/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link
          href="/"
                    className={`font-display text-4xl tracking-wide transition-colors duration-200 ${
            inHero
              ? "text-white hover:text-white/80"
              : "text-text hover:text-accent-purple"
          }`}
        >
          AnnieRealm
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none ${
                    isActive
                      ? "text-accent-purple"
                      : inHero
                      ? "text-white/80 hover:text-white"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-accent-purple" />
                  )}
                </Link>
              </li>
            );
          })}
          <li className="ml-3">
            <Link
              href="/games"
              className="inline-flex items-center rounded-md border border-accent-purple/40 bg-accent-purple/10 px-4 py-2 text-sm font-medium text-accent-purple transition-all duration-200 hover:border-accent-purple/70 hover:bg-accent-purple/20 focus:outline-none"
            >
              View Work
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden p-2 rounded-md transition-colors focus:outline-none ${
            inHero ? "text-white hover:text-white/80" : "text-text-muted hover:text-text"
          }`}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-void/95 backdrop-blur-xl">
          <ul className="mx-auto max-w-7xl px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-md px-4 py-3 text-sm font-medium transition-colors focus:outline-none ${
                      isActive
                        ? "bg-accent-purple/10 text-accent-purple"
                        : "text-text-muted hover:bg-surface hover:text-text"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2 pb-1">
              <Link
                href="/games"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-md border border-accent-purple/40 bg-accent-purple/10 px-4 py-3 text-sm font-medium text-accent-purple text-center"
              >
                View Work
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
