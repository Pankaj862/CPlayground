import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";

import userModel from "@/model/user.model";
import connectedAccountModel from "@/model/connectedAccount.model";
import contestModel from "@/model/contest.model";

interface CodeforcesContest {
    contestId: number;
    contestName: string;
    rank: number;
    oldRating: number;
    newRating: number;
    ratingUpdateTimeSeconds: number;
}

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
    `https://codeforces.com/api/user.rating?handle=${connectedAccount.handle}`
);

if (!response.ok) {
    return Response.json(
        {
            success: false,
            message: "Failed to fetch contest history",
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
            message: "Failed to fetch contests",
        },
        {
            status: 400,
        }
    );
}
const contests: CodeforcesContest[] = data.result;
for (const contest of contests) {
 await contestModel.updateOne(
    {
        connectedAccountId: connectedAccount._id,
        contestId: contest.contestId,
    },
    {
        connectedAccountId: connectedAccount._id,

        contestId: contest.contestId,

        contestName: contest.contestName,

        rank: contest.rank,

        oldRating: contest.oldRating,

        newRating: contest.newRating,

        delta: contest.newRating - contest.oldRating,

        contestDate: new Date(
            contest.ratingUpdateTimeSeconds * 1000
        ),
    },
    {
        upsert: true,
        runValidators: true,
    }
);

} return Response.json(
    {
        success: true,
        message: "Contest history synced successfully",
        totalContests: contests.length,
    },
    {
        status: 200,
    }
);


    } catch (error) {
        console.error("Error syncing contests:", error);

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