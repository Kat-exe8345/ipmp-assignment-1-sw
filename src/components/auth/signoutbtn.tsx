"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircleIcon } from "lucide-react";

export function SignOutBtn() {
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
      disabled={loading}
      className={`text-white p-2 rounded flex items-center justify-center gap-2 transition ${
        loading
          ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600"
      }`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          Signing Out... <LoaderCircleIcon className="animate-spin" />
        </span>
      ) : (
        <span>Sign Out</span>
      )}
    </button>
  );
}

export function SignOutBtnSimple() {
  const router = useRouter();
  async function handleSignOut() {
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
    }
  }
  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="text-red-500 font-semibold p-2 w-full rounded-lg transition hover:cursor-pointer bg-red-500/10 hover:bg-red-500/20"
    >
      Sign Out
    </button>
  );
}
