/** biome-ignore-all lint/correctness/noChildrenProp: Using tanstack forms */
"use client";

import { signupSchema } from "@features/auth/validators";
import { useForm } from "@tanstack/react-form-nextjs";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });
        const data = await res.json();
        console.log(data);

        if (!res.ok || !data.ok) {
          form.setErrorMap({
            onSubmit: data.message || "An error occurred",
          });
          throw new Error(data.message || "An error occurred");
        }

        router.push(redirectUrl);
        router.refresh();
      } catch (_error) {
        return null;
      }
    },
    validators: {
      onChangeAsyncDebounceMs: 500,
      onChangeAsync: signupSchema,
      onSubmit: ({ value }) => {
        if (!value.name || !value.email || !value.password) {
          return "Please fill all the fields";
        }
        return undefined;
      },
    },
  });

  return (
    <form
      className="w-full p-8 bg-white dark:bg-zinc-950"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 text-center">
        Create Account
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 text-center mb-8">
        Sign up to get started
      </p>

      <form.Field
        name="name"
        children={(field) => (
          <div className="mb-6">
            <label
              htmlFor="name"
              className="text-zinc-900 dark:text-white font-semibold text-sm block mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              placeholder="John Doe"
            />
            {!field.state.meta.isValid && (
              <em className="text-red-500 dark:text-red-400 text-sm mt-1 block">
                {field.state.meta.errors[0]?.message}
              </em>
            )}
          </div>
        )}
      />

      <form.Field
        name="email"
        children={(field) => (
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-zinc-900 dark:text-white font-semibold text-sm block mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              placeholder="you@example.com"
            />
            {!field.state.meta.isValid && (
              <em className="text-red-500 dark:text-red-400 text-sm mt-1 block">
                {field.state.meta.errors[0]?.message}
              </em>
            )}
          </div>
        )}
      />

      <form.Field
        name="password"
        children={(field) => (
          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-zinc-900 dark:text-white font-semibold text-sm block mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              placeholder="••••••••"
            />
            {!field.state.meta.isValid && (
              <em className="text-red-500 dark:text-red-400 text-sm mt-1 block">
                {field.state.meta.errors[0]?.message}
              </em>
            )}
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.errorMap]}
        children={([errorMap]) =>
          errorMap.onSubmit ? (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500 text-red-700 dark:text-red-400 rounded-md text-sm">
              {errorMap.onSubmit}
            </div>
          ) : null
        }
      />

      <form.Subscribe
        selector={(state) => [state.isSubmitting]}
        children={([isSubmitting]) => (
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                Creating account...{" "}
                <LoaderCircleIcon className="animate-spin" />
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        )}
      />
    </form>
  );
}
