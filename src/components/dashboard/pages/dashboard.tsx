"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/ui/sidebar";
import { BoardsSection } from "@/components/dashboard/ui/boards-section";
import { ProfileSection } from "@/components/dashboard/ui/profile-section";
import { AccountSection } from "@/components/dashboard/ui/account-section";

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("boards");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Prevent hydration mismatching before the component is mounted
    //
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const renderSection = () => {
    switch (activeSection) {
      case "boards":
        return <BoardsSection />;
      case "profile":
        return <ProfileSection />;
      case "account":
        return <AccountSection />;
      default:
        return <BoardsSection />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="flex-1 lg:ml-64 overflow-auto">
        <div className="p-4 lg:p-8 mt-16 lg:mt-0">{renderSection()}</div>
      </main>
    </div>
  );
}
