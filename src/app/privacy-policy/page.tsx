import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            
            <p className="text-sm text-gray-500 mb-8">
              Last updated: July 9, 2026
            </p>

            <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
              <p>
                At CPlayground, we respect your privacy and are committed to protecting the personal data we hold about you. This privacy policy explains how we collect, use, and safeguard your data when you use our services.
              </p>

              <h2 className="text-lg font-bold text-gray-900 pt-4">
                1. Data We Collect
              </h2>
              <p>
                We only collect data necessary to provide a high-quality analysis platform for competitive programmers. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Account credentials (username, email address, password hashes).</li>
                <li>Competitive programming handles (specifically Codeforces username) to retrieve public rating data and submissions.</li>
                <li>Usage telemetry data for application performance tracking.</li>
              </ul>

              <h2 className="text-lg font-bold text-gray-900 pt-4">
                2. How We Use Data
              </h2>
              <p>
                We process your personal data for the following purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To authenticate you and secure your access to CPlayground.</li>
                <li>To import, analyze, and present statistics of your Codeforces contests and submissions.</li>
                <li>To troubleshoot problems, optimize database performance, and improve the user experience.</li>
              </ul>

              <h2 className="text-lg font-bold text-gray-900 pt-4">
                3. Data Storage and Security
              </h2>
              <p>
                All databases are securely hosted on MongoDB Atlas. We apply bcrypt encryption for user passwords. We do not sell or share your data with third parties.
              </p>

              <h2 className="text-lg font-bold text-gray-900 pt-4">
                4. Policy Updates
              </h2>
              <p>
                This policy may change occasionally. We will notify you of any material changes by posting the new policy on this page and updating the date above.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-start items-center">
              <Link
                href="/"
                className="text-[#FF6B00] font-medium hover:underline text-sm flex items-center gap-1"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
