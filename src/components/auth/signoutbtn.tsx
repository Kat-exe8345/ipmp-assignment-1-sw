"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignOutBtn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleSignOut() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      return;
    } finally {
      setLoading(false);
    }
  }
  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="bg-red-500 text-white p-2 rounded"
      disabled={loading}
    >
      {loading ? "Signing Out..." : "Sign Out"}
    </button>
  );
}
