
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, PawPrint, PlusCircle, List, Heart, Megaphone, HandCoins, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Logo from '@/Shared/Logo';
import MoodToggle from '@/Shared/MoodToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const navLinks = [
  { to: '/dashboard/add-pet', icon: <PlusCircle className="h-5 w-5" />, text: 'Add a pet' },
  { to: '/dashboard/my-added-pets', icon: <List className="h-5 w-5" />, text: 'My added pets' },
  { to: '/dashboard/adoption-request', icon: <Heart className="h-5 w-5" />, text: 'Adoption Request' },
  { to: '/dashboard/create-donation-campaign', icon: <PlusSquare className="h-5 w-5" />, text: 'Create Donation Campaign' },
  { to: '/dashboard/my-donation-campaigns', icon: <Megaphone className="h-5 w-5" />, text: 'My Donation Campaigns' },
  { to: '/dashboard/my-donations', icon: <HandCoins className="h-5 w-5" />, text: 'My Donations' },
];

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`}
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

      <div className="flex flex-col md:ml-64">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-white dark:bg-gray-800 px-6">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-4 ml-auto">
            <MoodToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">shadcn</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      m@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
