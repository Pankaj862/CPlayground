export default function TableSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
      <div className="h-5 w-48 bg-gray-200 rounded mb-6" />
      <div className="space-y-5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-48 bg-gray-200 rounded" />
              <div className="h-3 w-36 bg-gray-100 rounded" />
            </div>
            <div className="w-16 h-6 bg-gray-100 rounded-full" />
            <div className="w-24 h-5 bg-gray-100 rounded" />
            <div className="w-20 h-4 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
