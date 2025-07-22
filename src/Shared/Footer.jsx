import React from "react";
import Logo from "./Logo";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Pet Listing", href: "/pet-list" },
    { name: "Donation Campaigns", href: "/donation-campaign" },
  ];

  return (
    <footer className="w-full bg-accent/80 text-foreground pt-12 pb-8 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Logo & Mission */}
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
            Pawdopt connects kind souls with animals in need. Every adoption brings love, every donation creates hope.
          </p>
        </div>

        {/* Navigation */}
        <div className="md:col-span-2 flex flex-col md:flex-row justify-between">
          <div className="space-y-2">
            <h4 className="text-base font-semibold uppercase text-primary">Explore</h4>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2 mt-6 md:mt-0">
            <h4 className="text-base font-semibold uppercase text-primary">Connect</h4>
            <div className="text-sm space-y-1 text-muted-foreground">
              <p>Email: hasibul.hossain.dev@gmail.com</p>
              <p>Phone: +880-1701084479</p>
              <p>Location: Jessore, Khulna, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <Separator className="my-8 bg-border" />

      {/* Bottom */}
      <div className="text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Pawdopt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
