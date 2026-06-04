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
import { ChevronDown, ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleCart } from "@/store/cartSlice";
import CartDrawer from "./CartDrawer";

const NavBar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalCount = items.reduce((sum: any, item: { quantity: any; }) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navPages = [
    { link: "/", name: "Home" },
    { link: "/about", name: "About" },
  ];

  return (
    <>
      <nav
        className={`flex w-full h-17.5 items-center justify-between px-10 md:px-45 fixed top-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-[#26352F] backdrop-blur-md border-b border-white/10 shadow-md"
            : "bg-transparent"
        }`}
      >
        <Link href="/">
          <span className="text-3xl font-extrabold tracking-wider text-white hover:text-[#B2A088] transition-colors cursor-pointer">
            CK
          </span>
        </Link>

        <div className="flex gap-6 items-center">
          {navPages.map((page) => {
            const isActive = pathname === page.link;

            return (
              <Link key={page.name} href={page.link}>
                <span
                  className={`font-semibold text-lg transition-colors cursor-pointer ${
                    isActive ? "text-[#B2A088]" : "text-white"
                  }`}
                >
                  {page.name}
                </span>
              </Link>
            );
          })}

          <DropdownMenu open={open} onOpenChange={setOpen}>
            <div onMouseEnter={() => setOpen(true)}>
              <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  className="bg-transparent border-none font-semibold text-lg text-white hover:bg-transparent hover:text-[#B2A088] focus-visible:ring-0 shadow-none cursor-pointer"
                >
                  <Link href="/services">Pages</Link>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="center"
                className="w-52 border-none bg-white shadow-xl cursor-pointer"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/services" className="w-full">Services</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/products" className="w-full">All Products</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </div>
          </DropdownMenu>

          <Link href="/contact">
            <span
              className={`font-semibold text-lg cursor-pointer ${
                pathname === "/contact" ? "text-[#B2A088]" : "text-white"
              }`}
            >
              Contact Us
            </span>
          </Link>
        </div>

        {/* Cart Icon trigger */}
        <button
          onClick={() => dispatch(toggleCart())}
          className="relative flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer focus:outline-none"
        >
          <div>
            <ShoppingCart size={23} color="white" />
          </div>
          {totalCount > 0 && (
            <div className="absolute -top-0.5 -right-0.5 bg-[#B2A088] text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-xs font-bold shadow-md animate-bounce">
              {totalCount}
            </div>
          )}
        </button>
      </nav>

      {/* Cart Drawer element */}
      <CartDrawer />
    </>
  );
};

export default NavBar;
