import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    await dbConnect()

    try{
       const{username, email, password} = await request.json()
       if (!username || !email || !password) {
            return Response.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                {
                    status: 400,
                }
            );
        }

       const  existingUserByUsername  = await userModel.findOne({
        username,
       })

       if( existingUserByUsername ) {
        return Response.json({
            success: false,
            message: "User already exists"
        },{status: 400})
       }

       const  existingUserByEmail= await userModel.findOne({email})
       if ( existingUserByEmail) {
             return Response.json(
        {
            success: false,
            message: "Email already exists",
        },
        {
            status: 400,
        }
            );
       } else {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser =new userModel({
            username,
            email,
            password: hashedPassword,
            
        })
        await newUser.save()
        return Response.json(
        {
        success: true,
        message: "User registered successfully",
        },
        {
        status: 201,
        }
            );
       }
        } catch(error){
        console.error("error while registering user")
        return Response.json(
        {
            success: false,
            messsage: "Error while registering user"
        },
        {
            status: 500
        }
    )
    }
}