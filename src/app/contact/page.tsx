import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 pt-28 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-xs font-semibold text-[#FF6B00] mb-3">
                Get in touch
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Contact CPlayground
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Have questions, feature suggestions, or need database support?
              </p>
            </div>

            <div className="space-y-6 text-gray-600 text-sm leading-relaxed mb-8">
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 text-orange-800 text-sm">
                <p className="font-semibold text-[#FF6B00] mb-1">📬 Direct Support Email</p>
                <p>
                  You can reach the core engineering team directly at{" "}
                  <a href="mailto:support@cplayground.dev" className="underline font-bold hover:text-[#e55e00]">
                    support@cplayground.dev
                  </a>
                  . We typically respond within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-base font-bold text-gray-900">Other Channels</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-100 rounded-xl">
                    <p className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-1">GitHub Issues</p>
                    <p className="text-xs text-gray-500 mb-2">Report bugs or request analytics metrics.</p>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#FF6B00] hover:underline"
                    >
                      Open GitHub →
                    </a>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-xl">
                    <p className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-1">Documentation</p>
                    <p className="text-xs text-gray-500 mb-2">Read guides on syncing handles and rating formulas.</p>
                    <Link href="/docs" className="text-xs font-semibold text-[#FF6B00] hover:underline">
                      View Docs →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8 flex justify-center">
              <Link href="/">
                <Button variant="outline" size="md">
                  ← Back to Home Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
