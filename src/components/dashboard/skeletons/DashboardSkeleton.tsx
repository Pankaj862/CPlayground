import ChartSkeleton from "./ChartSkeleton";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import StatCardSkeleton from "./StatCardSkeleton";
import TableSkeleton from "./TableSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-label="Loading dashboard" role="status">
      <div className="animate-pulse space-y-2">
        <div className="h-7 w-56 rounded bg-gray-200" />
        <div className="h-4 w-80 max-w-full rounded bg-gray-100" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => <StatCardSkeleton key={index} />)}
          </div>
          <ChartSkeleton />
          <ChartSkeleton />
          <TableSkeleton />
        </div>
        <div className="space-y-6">
          <ProfileCardSkeleton />
          <div className="h-44 animate-pulse rounded-2xl border border-gray-100 bg-white p-5">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="mx-auto mt-5 h-20 w-20 rounded-full border-8 border-gray-100" />
          </div>
          <div className="h-32 animate-pulse rounded-2xl border border-gray-100 bg-white p-5">
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="mt-4 flex flex-wrap gap-2"><span className="h-6 w-24 rounded-full bg-gray-100" /><span className="h-6 w-16 rounded-full bg-gray-100" /><span className="h-6 w-20 rounded-full bg-gray-100" /></div>
          </div>
          <div className="h-44 animate-pulse rounded-2xl border border-gray-100 bg-white p-5">
            <div className="h-4 w-20 rounded bg-gray-200" />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading dashboard content</span>
    </div>
  );
}
