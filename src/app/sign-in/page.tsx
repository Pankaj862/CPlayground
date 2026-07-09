"use client";

import { useState, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

/* ─── Types ─────────────────────────────────────────────── */
interface FormFields {
  email: string;
  password: string;
}
interface FormErrors {
  email?: string;
  password?: string;
}

/* ─── Validation ─────────────────────────────────────────── */
function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.password) {
    errors.password = "Password is required.";
  } else if (fields.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  return errors;
}

/* ─── Eye icon (show / hide password) ───────────────────── */
function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      className="w-4.5 h-4.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  ) : (
    <svg
      className="w-4.5 h-4.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  );
}

/* ─── Sign In Form Component ────────────────────────────── */
function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("success") === "registered";

  const [fields, setFields] = useState<FormFields>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) setServerError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setServerError("");

    try {
      const result = await signIn("credentials", {
        email: fields.email.toLowerCase().trim(),
        password: fields.password,
        redirect: false,
      });

      if (result?.error) {
        // NextAuth wraps thrown errors — map known messages to friendly copy
        if (
          result.error.includes("No user") ||
          result.error.includes("incorrect password") ||
          result.error.includes("Login failed")
        ) {
          setServerError("Invalid email or password. Please try again.");
        } else {
          setServerError("Something went wrong. Please try again.");
        }
      } else {
        router.push("/dashboard");
      }
    } catch {
      setServerError("A network error occurred. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-bold text-gray-900 hover:text-[#FF6B00] transition-colors"
          aria-label="Back to CPlayground home"
        >
          <span
            className="flex items-center justify-center w-7 h-7 rounded-md bg-[#FF6B00] text-white text-sm font-bold"
            aria-hidden="true"
          >
            C
          </span>
          CPlayground
        </Link>
        <p className="text-sm text-gray-500">
          No account?{" "}
          <Link
            href="/sign-up"
            className="text-[#FF6B00] font-semibold hover:underline"
          >
            Sign up free
          </Link>
        </p>
      </div>

      {/* Form card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
              <p className="text-sm text-gray-500 mt-1">
                Sign in to your CPlayground account.
              </p>
            </div>

            {/* Registered success banner */}
            {registered && (
              <div
                className="mb-6 flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200"
                role="status"
              >
                <svg
                  className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-green-700 font-medium">
                  Account created! You can now sign in.
                </p>
              </div>
            )}

            {/* Server error */}
            {serverError && (
              <div
                className="mb-6 flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200"
                role="alert"
              >
                <svg
                  className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-600">{serverError}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <Input
                label="Email"
                type="email"
                name="email"
                id="sign-in-email"
                autoComplete="email"
                placeholder="you@example.com"
                value={fields.email}
                onChange={handleChange}
                error={errors.email}
                disabled={isLoading}
              />

              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                id="sign-in-password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={fields.password}
                onChange={handleChange}
                error={errors.password}
                disabled={isLoading}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-gray-400 hover:text-gray-600 transition-colors focus-visible:outline-none"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                }
              />



              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
              >
                {isLoading ? "Signing in…" : "Sign In"}
              </Button>
            </form>

            {/* Footer link */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-[#FF6B00] font-semibold hover:underline"
              >
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B00]"></div>
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}

