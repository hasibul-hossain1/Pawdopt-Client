import { Button } from "@/components/ui/button";
import React from "react";
import Logo from "./Logo";
import { Menu } from "lucide-react";
import { ModeToggle } from "./MoodToggle";
import { Link, NavLink } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {signOUtUser} from '../../firebase/firebasePanel'
import { useAuth } from "@/hooks/Auth";

function Navbar() {
  const currentUser = useAuth();
  const status = currentUser.data ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-12">
          <AvatarImage src={currentUser.data.photoURL||"https://github.com/shadcn.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem><Link to='/dashboard'>Dashboard</Link></DropdownMenuItem>
        <DropdownMenuItem onClick={()=>signOUtUser()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
      <Link to="/register">
        <Button variant="outline">Register</Button>
      </Link>
    </>
  );

  const navigators = (
    <>
      <NavLink to='/' className="hover:text-primary transition-colors">
        Home
      </NavLink>
      <NavLink to='/pet-list' className="hover:text-primary transition-colors">
        Pet Listing
      </NavLink>
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
          {status}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
