import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";

import userModel from "@/model/user.model";
import connectedAccountModel from "@/model/connectedAccount.model";
import profileModel from "@/model/profile.model";

export async function GET() {
    try {
        await dbConnect();

        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
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

        const connectedAccount =
            await connectedAccountModel.findOne({
                userId: user._id,
                platform: "codeforces",
            });

        if (!connectedAccount) {
            return Response.json({
                success: true,
                connected: false,
            });
        }

        const profile = await profileModel.findOne({
            connectedAccountId: connectedAccount._id,
        });

        return Response.json({
            success: true,
            connected: true,
            profile,
        });
    } catch (error) {
        console.error(error);

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