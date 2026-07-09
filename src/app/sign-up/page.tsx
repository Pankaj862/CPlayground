"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

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

/* ─── Password Strength Evaluator ───────────────────────── */
interface StrengthScore {
  score: number; // 0 to 4
  label: string;
  color: string;
}

function evaluatePasswordStrength(password: string): StrengthScore {
  if (!password) return { score: 0, label: "Too short", color: "bg-gray-200" };
  let points = 0;
  
  if (password.length >= 8) points++;
  if (/[A-Z]/.test(password)) points++;
  if (/[0-9]/.test(password)) points++;
  if (/[^A-Za-z0-9]/.test(password)) points++;

  if (password.length < 6) {
    return { score: 1, label: "Too weak", color: "bg-red-500" };
  }

  switch (points) {
    case 0:
    case 1:
      return { score: 1, label: "Weak", color: "bg-red-500" };
    case 2:
      return { score: 2, label: "Fair", color: "bg-yellow-500" };
    case 3:
      return { score: 3, label: "Good", color: "bg-blue-500" };
    case 4:
      return { score: 4, label: "Strong", color: "bg-green-500" };
    default:
      return { score: 0, label: "Too short", color: "bg-gray-200" };
  }
}

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [strength, setStrength] = useState<StrengthScore>({
    score: 0,
    label: "Too short",
    color: "bg-gray-200",
  });

  useEffect(() => {
    setStrength(evaluatePasswordStrength(formData.password));
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear dynamic field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) {
      setServerError("");
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain alphanumeric characters and underscores.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setServerError("");

    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username.trim().toLowerCase(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || data.messsage || "An error occurred during registration.");
      } else {
        router.push("/sign-in?success=registered");
      }
    } catch (err) {
      console.error("Sign-up error:", err);
      setServerError("A network error occurred. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">
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
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-[#FF6B00] font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </header>

      {/* Main card container */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
              <p className="text-sm text-gray-500 mt-1">
                Start tracking your competitive programming growth.
              </p>
            </div>

            {/* Server Error Notification */}
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
                <p className="text-sm text-red-600 font-medium">{serverError}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <Input
                label="Username"
                type="text"
                name="username"
                id="sign-up-username"
                placeholder="codemaster_123"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                disabled={isLoading}
              />

              <Input
                label="Email"
                type="email"
                name="email"
                id="sign-up-email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                disabled={isLoading}
              />

              <div className="space-y-1.5">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="sign-up-password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  disabled={isLoading}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-gray-400 hover:text-gray-600 transition-colors focus-visible:outline-none"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  }
                />

                {/* Password strength indicators */}
                {formData.password && (
                  <div className="pt-1.5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] text-gray-500 font-medium">Password strength:</span>
                      <span className="text-[11px] font-bold text-gray-700">{strength.label}</span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden flex gap-0.5">
                      {Array.from({ length: 4 }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-full flex-1 transition-all duration-300 ${
                            idx < strength.score ? strength.color : "bg-gray-100"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Input
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="sign-up-confirm-password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                disabled={isLoading}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="text-gray-400 hover:text-gray-600 transition-colors focus-visible:outline-none"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    <EyeIcon open={showConfirmPassword} />
                  </button>
                }
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                >
                  {isLoading ? "Creating account…" : "Create Account"}
                </Button>
              </div>
            </form>

            {/* Footer */}
            <footer className="mt-6 text-center text-sm text-gray-500">
              By registering, you agree to our{" "}
              <Link href="/privacy-policy" className="text-[#FF6B00] hover:underline font-semibold">
                Privacy Policy
              </Link>.
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
