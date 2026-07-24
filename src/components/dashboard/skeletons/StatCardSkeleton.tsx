export default function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
      <div className="h-3 w-28 bg-gray-100 rounded mb-4" />
      <div className="h-8 w-24 bg-gray-200 rounded mb-3" />
      <div className="h-2 w-full bg-gray-100 rounded-full mb-2" />
      <div className="h-3 w-20 bg-gray-100 rounded" />
    </div>
  );
}
