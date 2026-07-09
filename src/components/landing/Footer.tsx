import Link from "next/link";

const FOOTER_LINKS = {
  "Quick Links": [
    { label: "Features", href: "/#features" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "API", href: "/docs" },
  ],
  Others: [
    { label: "Documentation", href: "/docs" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-gray-900 hover:text-[#FF6B00] transition-colors mb-3"
              aria-label="CPlayground home"
            >
              <span
                className="flex items-center justify-center w-6 h-6 rounded bg-[#FF6B00] text-white text-xs font-bold"
                aria-hidden="true"
              >
                C
              </span>
              CPlayground
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed">
              © {new Date().getFullYear()} CPlayground.
              <br />
              Built for performance.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-4">
                {group}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-[#FF6B00] transition-colors duration-150"
                      >
                        {link.label}
                        <span className="sr-only"> (opens in new tab)</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-[#FF6B00] transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
