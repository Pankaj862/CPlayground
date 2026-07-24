import { PageHeading } from "../profile/page";

export default function AnalyticsPage() {
  return <div className="space-y-6"><PageHeading title="Analytics" description="More detailed Codeforces insights will appear here as analytics data becomes available." /><section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"><h2 className="text-sm font-semibold text-gray-900">Analytics coming soon</h2><p className="mt-2 text-sm leading-6 text-gray-500">Your dashboard already includes rating, contest, and submission insights. Topic mastery and advanced activity analytics will be added when backend support is available.</p></section></div>;
}
