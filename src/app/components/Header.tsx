'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

interface NavItem {
  label: string;
  href: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<any | null>(null);

  // Check auth state on component mount
  useState(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();

    // Set up auth state listener
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  });

  const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Food Log', href: '/food-log' },
    { label: 'Recipes', href: '/recipes' },
    { label: 'Profile', href: '/profile' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-800 dark:shadow-gray-700/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-green-600 dark:text-green-400">FoodTracker</span>
            </Link>

            {/* Desktop navigation */}
            <nav className="ml-10 hidden space-x-8 md:flex">
              {user && navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium ${
                    pathname === item.href
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Auth buttons or user menu */}
          <div className="hidden md:block">
            {user ? (
              <Link
                href="/sign-out"
                className="rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-200 dark:bg-green-700/20 dark:text-green-300 dark:hover:bg-green-700/30"
              >
                Sign Out
              </Link>
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/sign-in"
                  className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="space-y-1 px-2 pb-3 pt-2">
          {user && navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                pathname === item.href
                  ? 'bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-300'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-green-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-green-400'
              }`}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <Link
              href="/sign-out"
              className="mt-4 block rounded-md bg-green-100 px-3 py-2 text-base font-medium text-green-700 hover:bg-green-200 dark:bg-green-700/20 dark:text-green-300 dark:hover:bg-green-700/30"
              onClick={closeMenu}
            >
              Sign Out
            </Link>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-green-400"
                onClick={closeMenu}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="mt-1 block rounded-md bg-green-600 px-3 py-2 text-base font-medium text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}