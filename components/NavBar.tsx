"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown, ShoppingCart, Menu, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleCart } from "@/store/cartSlice";
import { CartItem } from "@/types/product";
import CartDrawer from "./CartDrawer";
import { useScrollLock } from "@/lib/useScrollLock";

const NavBar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const totalCount = items.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0,
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useScrollLock(mobileOpen);

  const navPages = [
    { link: "/", name: "Home" },
    { link: "/about", name: "About" },
  ];

  const isActive = (path: string) => pathname === path;
  const linkClass = (path: string) =>
    `font-semibold text-lg transition-colors cursor-pointer ${
      isActive(path) ? "text-[#B2A088]" : "text-white hover:text-[#B2A088]"
    }`;

  const tapStyle: React.CSSProperties = {
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
  };

  return (
    <>
      <nav
        className={`flex w-full h-17.5 items-center justify-between
          px-6 md:px-12 lg:px-45 fixed top-0 transition-all duration-300
          ${scrolled ? "bg-[#26352F] border-b border-white/10 shadow-md" : "bg-transparent"}`}
        style={{ zIndex: 9999 }}
      >
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wider text-white hover:text-[#B2A088] transition-colors"
        >
          CK
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navPages.map((page) => (
            <Link
              key={page.name}
              href={page.link}
              className={linkClass(page.link)}
            >
              {page.name}
            </Link>
          ))}

          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <div
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <DropdownMenuTrigger>
                <Button
                  type="button"
                  variant="ghost"
                  style={tapStyle}
                  className="bg-transparent border-none font-semibold text-lg text-white
                    hover:bg-transparent hover:text-[#B2A088] focus-visible:ring-0 shadow-none"
                >
                  Pages <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-52 border-none bg-white shadow-xl"
                style={{ zIndex: 9999 }}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem >
                    <Link href="/services" className="w-full cursor-pointer">
                      Services
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem >
                    <Link href="/products" className="w-full cursor-pointer">
                      All Products
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </div>
          </DropdownMenu>

          <Link href="/contact" className={linkClass("/contact")}>
            Contact Us
          </Link>
        </div>

        <div
          className="flex items-center gap-2"
          style={{ position: "relative", zIndex: 9999 }}
        >
          <Button
            type="button"
            onClick={() => dispatch(toggleCart())}
            style={tapStyle}
            className="relative flex items-center justify-center p-2 rounded-full
              hover:bg-white/10 transition-colors focus:outline-none"
          >
            <ShoppingCart size={23} color="white" />
            {totalCount > 0 && (
              <div
                className="absolute -top-0.5 -right-0.5 bg-[#B2A088] text-white
                rounded-full w-4.5 h-4.5 flex items-center justify-center
                text-xs font-bold shadow-md animate-bounce"
              >
                {totalCount}
              </div>
            )}
          </Button>

          <Button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            style={tapStyle}
            className="md:hidden p-2 rounded-full hover:bg-white/10
              transition-colors focus:outline-none text-white"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-[#1E2A24] flex flex-col pt-17.5 md:hidden
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"}`}
        style={{ zIndex: 9998 }}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col px-6 py-8 gap-6 text-white text-xl font-semibold">
          {navPages.map((page) => (
            <Link
              key={page.name}
              href={page.link}
              onClick={() => setMobileOpen(false)}
              style={tapStyle}
              className={
                isActive(page.link)
                  ? "text-[#B2A088]"
                  : "hover:text-[#B2A088] transition-colors"
              }
            >
              {page.name}
            </Link>
          ))}
          <Link
            href="/services"
            onClick={() => setMobileOpen(false)}
            style={tapStyle}
            className={
              isActive("/services")
                ? "text-[#B2A088]"
                : "hover:text-[#B2A088] transition-colors"
            }
          >
            Services
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileOpen(false)}
            style={tapStyle}
            className={
              isActive("/products")
                ? "text-[#B2A088]"
                : "hover:text-[#B2A088] transition-colors"
            }
          >
            All Products
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            style={tapStyle}
            className={
              isActive("/contact")
                ? "text-[#B2A088]"
                : "hover:text-[#B2A088] transition-colors"
            }
          >
            Contact Us
          </Link>
        </div>
      </div>

      <CartDrawer />
    </>
  );
};

export default NavBar;
