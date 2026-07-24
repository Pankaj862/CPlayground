export default function ProfileCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse flex flex-col items-center gap-4">
      <div className="w-20 h-20 rounded-full bg-gray-200" />
      <div className="space-y-2 text-center w-full">
        <div className="h-4 w-32 bg-gray-200 rounded mx-auto" />
        <div className="h-3 w-20 bg-gray-100 rounded mx-auto" />
      </div>
      <div className="w-full grid grid-cols-2 gap-3">
        <div className="h-12 bg-gray-100 rounded-xl" />
        <div className="h-12 bg-gray-100 rounded-xl" />
      </div>
      <div className="h-9 w-full bg-gray-100 rounded-xl" />
    </div>
  );
}
