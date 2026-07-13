import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";

import userModel from "@/model/user.model";
import connectedAccountModel from "@/model/connectedAccount.model";
import profileModel from "@/model/profile.model";


export async function POST() {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
    return Response.json(
        {
            success: false,
            message: "Unauthorized",
        },
        {
            status: 401,
        }
    );
}

    const user = await userModel.findOne({
    email: session.user.email,
}).select("_id");

if (!user) {
    return Response.json(
        {
            success: false,
            message: "User not found",
        },
        {
            status: 404,
        }
    );
}

const connectedAccount = await connectedAccountModel.findOne({
    userId: user._id,
    platform: "codeforces",
});

if (!connectedAccount) {
    return Response.json(
        {
            success: false,
            message: "Codeforces account not connected",
        },
        {
            status: 404,
        }
    );
}

const response = await fetch(
    `https://codeforces.com/api/user.info?handles=${connectedAccount.handle}`
);

if (!response.ok) {
    return Response.json(
        {
            success: false,
            message: "Failed to fetch Codeforces profile",
        },
        {
            status: 502,
        }
    );
}

const data = await response.json();
if (data.status !== "OK") {
    return Response.json(
        {
            success: false,
            message: "Failed to fetch profile",
        },
        {
            status: 400,
        }
    );
}
const profile = data.result[0];

const savedProfile = await  profileModel.findOneAndUpdate(
    {
        connectedAccountId: connectedAccount._id,
    },
    {
        connectedAccountId: connectedAccount._id,

        handle: profile.handle,

        rating: profile.rating,
        maxRating: profile.maxRating,

        rank: profile.rank,
        maxRank: profile.maxRank,

        avatar: profile.avatar,
        titlePhoto: profile.titlePhoto,

        country: profile.country,
        city: profile.city,
        organization: profile.organization,

        contribution: profile.contribution,
        friendOfCount: profile.friendOfCount,

        lastSynced: new Date(),
    },
    {
        new: true,
        upsert: true,
        runValidators: true,
    }
);

return Response.json(
    {
        success: true,
        message: "Profile synced successfully",
        profile: {
            handle: savedProfile.handle,
            rating: savedProfile.rating,
            maxRating: savedProfile.maxRating,
            rank: savedProfile.rank,
            maxRank: savedProfile.maxRank,
            avatar: savedProfile.avatar,
 }
    },
    {
        status: 200,
    }
);
} catch(error) {
       console.error("Error syncing profile:", error);

    return Response.json(
        {
            success: false,
            message: "Internal Server Error",
        },
        {
            status: 500,
        }
    );
  }
}