"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { SignOutBtn } from "@components/auth/signoutbtn";

interface NavbarProps {
  isAuthenticated: boolean;
  userName?: string;
}

export function Navbar({ isAuthenticated }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              TaskFlow
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <SignOutBtn />
            ) : (
              <>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-2"
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-zinc-700 dark:text-zinc-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col gap-4 pt-4">
              <Link
                href="/"
                className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              )}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
                {isAuthenticated ? (
                  <SignOutBtn />
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="px-4 py-2 text-center text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="px-4 py-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
