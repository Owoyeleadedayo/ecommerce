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

const NavBar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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
    <nav
      className={`flex w-full h-17.5 items-center justify-between px-25 fixed top-0 z-50 transition-all duration-300
      ${
        scrolled
          ? "bg-[#26352F] backdrop-blur-md border-b border-white/10 shadow-md"
          : "bg-transparent"
      }`}
    >
      <p className="text-5xl text-white">CK</p>

      <div className="flex gap-6 items-center">
        {navPages.map((page) => {
          const isActive = pathname === page.link;

          return (
            <Link key={page.name} href={page.link}>
              <span
                className={`font-semibold text-lg transition-colors ${
                  isActive ? "text-[#B2A088]" : "text-white"
                }`}
              >
                {page.name}
              </span>
            </Link>
          );
        })}

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline">Pages</Button>}
            className="bg-transparent border-none font-semibold text-lg text-white hover:bg-transparent hover:text-[#B2A088] focus:ring-0"
          />

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/services">Services</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/products">All Product</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/collections">All Collections</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/contact">
          <span
            className={`font-semibold text-lg ${
              pathname === "/contact" ? "text-[#B2A088]" : "text-white"
            }`}
          >
            Contact Us
          </span>
        </Link>
      </div>

      <div />
    </nav>
  );
};

export default NavBar;
