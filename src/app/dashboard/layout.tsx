'use client';

import React, { useEffect, useState } from 'react';
import {toast} from 'react-hot-toast';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sun, Moon } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        router.push('/login');
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    toast.success("You have logged out successfully")
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-muted text-muted-foreground p-6 space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">PropalAI</h2>
            <p className="text-sm text-muted-foreground">Welcome, {user.username}</p>
          </div>

          <nav className="space-y-2">
          <Link
  href="/dashboard/profile"
  className={`block px-4 py-2 rounded transition ${
    pathname === '/dashboard/profile'
      ? theme === 'light'
        ? 'bg-red-500 text-white'
        : 'bg-primary text-black'
      : `hover:bg-accent ${
          theme === 'light' ? 'hover:text-primary' : 'hover:text-accent-foreground'
        }`
  }`}
>
  Profile
</Link>
            <Link
              href="/dashboard/agent"
              className={`block px-4 py-2 rounded transition ${
                pathname === '/dashboard/agent'
                ? theme === 'light'
                ? 'bg-red-500 text-white'
                : 'bg-primary text-black'
                : `hover:bg-accent ${
                  theme === 'light' ? 'hover:text-primary' : 'hover:text-accent-foreground'
                }`
          }`}
            >
              Agent
            </Link>
          </nav>
        </div>

        <div className="space-y-4">
          {/* Theme Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between">
                Theme {theme === 'dark' ? <Moon className="ml-2 h-4 w-4" /> : <Sun className="ml-2 h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={handleLogout} variant="destructive" className="w-full">
            Logout
          </Button>
        </div>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
