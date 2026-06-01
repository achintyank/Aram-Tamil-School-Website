"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/history", label: "History" },
  { href: "/structure", label: "Structure" },
  { href: "/calendar", label: "Annual Calendar" },
  { href: "/announcements", label: "Announcements" },
  { href: "/syllabus", label: "Syllabus" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        setHidden(false);
      } else if (y > lastY + 4) {
        setHidden(true);
      } else if (y < lastY - 4) {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hideClass = hidden
    ? "pointer-events-none -translate-y-32 opacity-0"
    : "translate-y-0 opacity-100";

  return (
    <>
      <Link
        href="/"
        aria-label="Aram Tamil School home"
        className={`fixed left-8 top-8 z-50 text-base font-bold tracking-[0.18em] text-slate-900 transition-all duration-300 ease-out hover:text-sky-700 ${hideClass}`}
      >
        ATS
      </Link>

      <header
        className={`fixed left-1/2 top-8 z-50 -translate-x-1/2 transition-all duration-300 ease-out ${hideClass}`}
      >
        <nav>
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative inline-block text-sm font-medium text-slate-800 transition-colors hover:text-sky-700"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-sky-700 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
