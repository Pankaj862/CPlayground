export default function ChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-5">
        <div className="h-5 w-40 bg-gray-200 rounded" />
        <div className="h-8 w-36 bg-gray-100 rounded-lg" />
      </div>
      <div className="h-52 bg-gray-100 rounded-xl" />
    </div>
  );
}
