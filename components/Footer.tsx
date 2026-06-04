import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faXTwitter,
  faFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const shopLinks = [
    { href: "/products", label: "All Products" },
    { href: "/products?category=cookware", label: "Cookware" },
    { href: "/products?category=bakeware", label: "Bakeware" },
    { href: "/products?category=utensils", label: "Utensils" },
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  const supportLinks = [
    { href: "/faq", label: "FAQ" },
    { href: "/shipping", label: "Shipping & Returns" },
    { href: "/contact", label: "Get Help" },
  ];

  const socials = [
    { icon: faInstagram, href: "#", label: "Instagram" },
    { icon: faXTwitter, href: "#", label: "Twitter" },
    { icon: faFacebook, href: "#", label: "Facebook" },
    { icon: faYoutube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-[#111a16] text-white">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-25 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-3xl font-extrabold tracking-wider">CK</span>
            <p className="text-sm text-white/50 mt-3 mb-5 leading-relaxed max-w-xs">
              Premium cookware crafted for every kitchen. Built to last,
              designed to inspire.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/60 hover:border-[#B2A088] hover:text-[#B2A088] transition-colors"
                >
                  <FontAwesomeIcon icon={Icon} className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B2A088] mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B2A088] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B2A088] mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6">
          <p className="text-xs text-white/35">
            &copy; {new Date().getFullYear()} CK Cookware. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="text-xs text-white/35 hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/35 hover:text-white/70 transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;