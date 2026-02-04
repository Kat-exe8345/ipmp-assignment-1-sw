"use client";

import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LogoutPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.message || "Failed to logout");
          setIsLoggingOut(false);
          return;
        }

        setIsLoggingOut(false);
      } catch (err) {
        setError(
          `An error occurred during logout: ${err instanceof Error ? err.message : String(err)}`,
        );
        setIsLoggingOut(false);
      }
    };

    logout();
  }, []);

  useEffect(() => {
    if (!isLoggingOut && !error) {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        router.push("/");
      }
    }
  }, [countdown, isLoggingOut, error, router]);

  const handleRedirectNow = () => {
    router.push("/");
  };

  if (isLoggingOut) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
        <div className="text-center">
          <LoaderIcon
            className="animate-spin mx-auto mb-6 text-gray-600 dark:text-gray-300"
            size={48}
          />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Logging out...
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we log you out
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
        <div className="text-center">
          <div className="text-6xl mb-6">❌</div>
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
            Logout Failed
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
          <button
            type="button"
            onClick={handleRedirectNow}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="text-center">
        <div className="text-6xl mb-6">✅</div>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
          Logout Successful
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Redirecting to home page in {countdown} seconds...
        </p>
        <button
          type="button"
          onClick={handleRedirectNow}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
