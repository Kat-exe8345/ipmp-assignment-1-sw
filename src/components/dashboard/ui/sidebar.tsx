"use client";

import { useState } from "react";
import { LayoutDashboard, User, Settings, Menu, X } from "lucide-react";
import { SignOutBtnSimple } from "@components/auth/signoutbtn";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "boards", label: "Boards", icon: LayoutDashboard },
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: Settings },
  ];

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 lg:hidden z-30 flex items-center px-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 z-50 lg:translate-x-0 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between lg:hidden">
          <h1 className="text-lg font-bold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 border-b border-gray-200 dark:border-gray-800 hidden lg:block">
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSectionChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                      activeSection === item.id
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <SignOutBtnSimple />
        </div>
      </aside>
    </>
  );
}
