import type { DashboardProfile } from "@/types/dashboard";

interface ProfileCardProps {
  profile: DashboardProfile;
  username: string;
}

const RANK_COLORS: Record<string, string> = {
  Master: "text-orange-500",
  "International Master": "text-orange-600",
  Grandmaster: "text-red-500",
  "Legendary Grandmaster": "text-red-700",
  Expert: "text-blue-600",
  "Candidate Master": "text-violet-600",
  Specialist: "text-cyan-600",
  Pupil: "text-green-600",
};

export default function ProfileCard({ profile, username }: ProfileCardProps) {
  const rankColor = RANK_COLORS[profile.rank] ?? "text-orange-500";
  const initial = (username || profile.handle).charAt(username ? 0 : 1).toUpperCase();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-fade-in">
      <div className="flex flex-col items-center">
        <div className="relative mb-3">
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.handle} className="w-20 h-20 rounded-full object-cover border-2 border-white shadow" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow">
              {initial}
            </div>
          )}
          {profile.isOnline && (
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>
        <p className="text-sm font-bold text-gray-900">{profile.handle}</p>
        <p className={`text-xs font-semibold mt-0.5 ${rankColor}`}>{profile.rank}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <div className="bg-gray-50 rounded-xl p-3"><p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Rating</p><p className="text-xs font-semibold text-gray-900 truncate">{profile.rating}</p></div>
        <div className="bg-gray-50 rounded-xl p-3"><p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Max Rating</p><p className="text-xs font-semibold text-gray-900 truncate">{profile.maxRating}</p></div>
        <div className="bg-gray-50 rounded-xl p-3"><p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Max Rank</p><p className="text-xs font-semibold text-gray-900 truncate">{profile.maxRank}</p></div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Country</p>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">&#127470;&#127475;</span>
            <span className="text-xs font-semibold text-gray-900 truncate">{profile.country}</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 col-span-2">
          <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Organization</p>
          <p className="text-xs font-semibold text-gray-900 truncate">{profile.organization}</p>
        </div>
      </div>

      <button className="mt-4 w-full py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors">
        Edit Profile
      </button>
    </div>
  );
}
