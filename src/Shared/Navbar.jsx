import { Button } from "@/components/ui/button";
import React from "react";
import Logo from "./Logo";
import { Menu } from "lucide-react";
import { ModeToggle } from "./MoodToggle";

function Navbar() {
  const navigators = (
    <>
      <a href="/adopt" className="hover:text-primary transition-colors">
        Home
      </a>
      <a href="/about" className="hover:text-primary transition-colors">
        Pet Listing
      </a>
      <a href="/contact" className="hover:text-primary transition-colors">
        Donation Campaigns
      </a>
    </>
  );
  return (
    <nav className="w-full bg-accent rounded-sm shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex justify-center gap-2 items-center">
          <Menu className="md:hidden" />
          <Logo />
        </div>
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">
          {navigators}
        </div>
        <div className="flex items-center gap-2">
          <Button>Login</Button>
          <Button variant="outline">Register</Button>
          <ModeToggle/>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
