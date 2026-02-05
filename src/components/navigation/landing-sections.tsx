"use client";

import { CheckCircle, Zap, Users, BarChart3, Trello } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-zinc-900 dark:to-zinc-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
          Organize Your Tasks,{" "}
          <span className="text-blue-600 dark:text-blue-400">
            Amplify Your Productivity
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
          TaskFlow is your all-in-one task management solution. Create boards,
          organize tasks, and collaborate with your team seamlessly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Start Free Today
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-zinc-800 transition font-semibold"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Trello className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Board Management",
      description:
        "Create unlimited boards to organize your projects and workflows.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Task Tracking",
      description:
        "Track tasks with detailed information, deadlines, and progress status.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Collaboration",
      description:
        "Work together seamlessly with real-time updates and comments.",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Lightning Fast",
      description:
        "Built for speed with instant synchronization and smooth interactions.",
    },
    {
      icon: (
        <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      ),
      title: "Task Organization",
      description: "Organize tasks with tags, lists, and custom workflows.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Team Support",
      description: "Perfect for individuals, teams, and entire organizations.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            Everything you need to succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-600 transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-zinc-700 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="bg-blue-600 dark:bg-blue-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Boost Your Productivity?
        </h2>
        <p className="text-lg text-blue-100 mb-8">
          Join thousands of users who are already organizing their tasks with
          TaskFlow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="px-8 py-3 bg-white text-blue-600 dark:bg-zinc-900 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-zinc-800 transition font-semibold"
          >
            Get Started Free
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Already a Member? Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 dark:bg-black text-zinc-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">TaskFlow</h3>
            <p className="text-sm text-zinc-400">
              Your all-in-one task management solution for productivity.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-white transition"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-white transition"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-white transition"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-white transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-white transition"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-white transition"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-white transition"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-white transition"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-zinc-400">
              © {currentYear} TaskFlow. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="/" className="text-zinc-400 hover:text-white transition">
                Twitter
              </a>
              <a href="/" className="text-zinc-400 hover:text-white transition">
                GitHub
              </a>
              <a href="/" className="text-zinc-400 hover:text-white transition">
                Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
