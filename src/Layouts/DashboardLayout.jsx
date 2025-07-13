import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { PlusCircle, List, Heart, Megaphone, HandCoins, Menu, X, PlusSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/Shared/Logo';
import {ModeToggle} from '@/Shared/MoodToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { signOUtUser } from '../../firebase/firebasePanel';
import { useAuth } from '@/hooks/Auth';

const navLinks = [
  { to: '/dashboard/add-pet', icon: <PlusCircle className="h-5 w-5" />, text: 'Add a pet' },
  { to: '/dashboard/my-added-pets', icon: <List className="h-5 w-5" />, text: 'My added pets' },
  { to: '/dashboard/adoption-request', icon: <Heart className="h-5 w-5" />, text: 'Adoption Request' },
  { to: '/dashboard/create-donation-campaign', icon: <PlusSquare className="h-5 w-5" />, text: 'Create Donation Campaign' },
  { to: '/dashboard/my-donation-campaigns', icon: <Megaphone className="h-5 w-5" />, text: 'My Donation Campaigns' },
  { to: '/dashboard/my-donations', icon: <HandCoins className="h-5 w-5" />, text: 'My Donations' },
];


const DashboardLayout = () => {
  const currentUser=useAuth()
  console.log(currentUser);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const status = currentUser.data ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-12">
          <AvatarImage src={currentUser?.data?.photoURL||"https://github.com/shadcn.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem><Link to='/'>Home</Link></DropdownMenuItem>
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

  return (
    <div className="flex min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-accent shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-between">
          <Logo />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-8 flex flex-col gap-2 px-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isActive ? 'bg-gray-200 dark:bg-gray-700 font-semibold' : ''
                }`
              }
            >
              {link.icon}
              {link.text}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-accent px-6">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-4 ml-auto">
            {status}
            <ModeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;