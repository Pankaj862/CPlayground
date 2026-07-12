import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user.model";
import connectedAccountModel from "@/model/connectedAccount.model";


export async function POST(request: Request) {
    
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
const { handle } = await request.json();
const trimmedHandle = handle?.trim();
if (!trimmedHandle) {
    return Response.json(
        {
            success: false,
            message: "Handle is required",
        },
        {
            status: 400,
        }
    );
}
const response = await fetch(
    `https://codeforces.com/api/user.info?handles=${trimmedHandle}`
);

const data = await response.json();
if (data.status !== "OK") {
    return Response.json(
        {
            success: false,
            message: "Invalid Codeforces handle",
        },
        {
            status: 400,
        }
    );
}

const existingAccount = await connectedAccountModel.findOne({
    userId: user._id,
    platform: "codeforces",
});

if (existingAccount) {
    return Response.json(
        {
            success: false,
            message: "Codeforces account already connected",
        },
        {
            status: 409,
        }
    );
}

const existingHandle = await connectedAccountModel.findOne({
    platform: "codeforces",
    handle: trimmedHandle,
});

if (existingHandle) {
    return Response.json(
        {
            success: false,
            message: "This Codeforces handle is already connected",
        },
        {
            status: 409,
        }
    );
}

const connectedAccount = await connectedAccountModel.create({
    userId: user._id,
    platform: "codeforces",
    handle: trimmedHandle,
    verified: true,
});
return Response.json(
    {
        success: true,
        message: "Codeforces account connected successfully",
        account: {
    platform: connectedAccount.platform,
    handle: connectedAccount.handle,
    verified: connectedAccount.verified,
      },
    },
    {
        status: 201,
    }
);
}
 catch (error ){
    console.error(error);

    return Response.json(
        {
            success: false,
            message: "Error connecting Codeforces account",
        },
        {
            status: 500,
        }
    );
 }
}