/** biome-ignore-all lint/correctness/noChildrenProp: Using tanstack forms */
"use client";

import { loginSchema } from "@features/auth/validators";
import { useForm } from "@tanstack/react-form-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircleIcon } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });
        const data = await res.json();

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
      onChangeAsync: loginSchema,
      onSubmit: ({ value }) => {
        if (!value.email || !value.password) {
          return "Please fill all the fields";
        }
        return undefined;
      },
    },
  });

  return (
    <form
      className="w-full max-w-md mx-auto p-8 bg-linear-to-br from-gray-950 to-gray-900 rounded-lg shadow-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Login</h1>

      <form.Field
        name="email"
        children={(field) => (
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-white font-semibold text-sm block mb-2"
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
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition"
              placeholder="you@example.com"
            />
            {!field.state.meta.isValid && (
              <em className="text-red-400 text-sm mt-1 block">
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
              className="text-white font-semibold text-sm block mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition"
            />
            {!field.state.meta.isValid && (
              <em className="text-red-400 text-sm mt-1 block">
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
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-400 rounded-md text-sm">
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
            className="w-full bg-linear-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <LoaderCircleIcon className="animate-spin" /> Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        )}
      />
    </form>
  );
}
