import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-[#FF6B00] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" aria-hidden="true" />
          Join 12,000+ competitive programmers
        </span>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
          Ready to Break Your Peak?
        </h2>
        <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
          Join the next generation of competitive programmers and start your
          performance-driven era today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/sign-up">
            <Button size="lg" variant="primary">
              Sign Up Now
            </Button>
          </Link>
          <Link href="/sign-up">
            <button
              className="inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 cursor-pointer select-none whitespace-nowrap h-12 px-7 text-[15px] rounded-xl border border-gray-600 text-white bg-transparent hover:bg-white/10 hover:border-gray-400"
            >
              Claim Handle
            </button>
          </Link>
        </div>

        {/* Social proof */}
        <p className="mt-10 text-sm text-gray-600">
          No credit card required &bull; Free forever on the starter plan
        </p>
      </div>
    </section>
  );
}
