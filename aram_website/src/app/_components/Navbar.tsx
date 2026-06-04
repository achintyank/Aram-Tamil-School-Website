import Link from "next/link";

const navItems = [
  { href: "/enroll", label: "Enrollment" },
  { href: "/structure", label: "Structure" },
  { href: "/calendar", label: "Annual Calendar" },
  { href: "/announcements", label: "Announcements" },
  { href: "/syllabus", label: "Syllabus" },
  { href: "/contact", label: "Contact" },
  { href: "/media", label: "Media" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_50%,transparent)]" />
      <div className="relative flex items-center px-8 py-5">
        <Link
          href="/"
          aria-label="Aram Tamil School home"
          className="text-base font-bold tracking-[0.18em] text-slate-900 transition-colors hover:text-sky-700"
        >
          ATS
        </Link>
        <nav className="absolute left-1/2 -translate-x-1/2">
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
      </div>
    </header>
  );
}
