import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user.model"; 


export async function GET() {
 try{await dbConnect();
const session = await getServerSession(authOptions);

    if(!session || !session.user || !session.user.email) {
        return Response.json({
           success: false,
           message: "unauthorized"
        },
        {
            status: 401
        }
    );
    }

    const user = await userModel.findOne({
        email: session.user.email,
    }).select("-password")

    if(!user) {
        return Response.json({
            success: false,
            message: 'user not found ',
        },
        {
            status: 404,
        }
    )
    }
    return Response.json(
    {
        success: true,
        user: {
            username: user.username,
            email: user.email,
            image: user.image,
        },
    },
    {
        status: 200,
    }
);
}
 catch (error ){
    console.error(error);

    return Response.json(
        {
            success: false,
            message: "Error fetching dashboard",
        },
        {
            status: 500,
        }
    );
}
}
