"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.message || "An error occurred");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 w-full text-center">Sign Up</h1>
      <form
        className="flex flex-col justify-between items-center"
        id="signup-form"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="name"
          className="text-white mb-2 font-medium text-lg w-full px-2"
        >
          Name
        </label>
        <input
          type="text"
          placeholder="Example: John Doe"
          className="border-2 p-4 rounded-md mb-6 w-lg focus:ring-0 focus:outline-none"
          onChange={(e) => setName(e.target.value)}
        />
        <label
          htmlFor="email"
          className="text-white mb-2 font-medium text-lg w-full px-2"
        >
          Email
        </label>
        <input
          type="email"
          placeholder="Example: user@example.com"
          className="border-2 p-4 rounded-md mb-6 w-lg focus:ring-0 focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          htmlFor="password"
          className="text-white mb-2 font-medium text-lg w-full px-2"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          className="border-2 p-4 rounded-md mb-6 w-lg focus:ring-0 focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-4 rounded w-lg"
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : "Sign Up"}
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </div>
  );
}
