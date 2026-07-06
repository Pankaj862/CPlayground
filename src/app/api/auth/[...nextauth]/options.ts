import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user.model";


export const authOptions: NextAuthOptions = {
    providers: [
       Credentials({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: {label: "Email", type:"text"},
                password: {label: "Password", type:"password"}
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                        if (!credentials?.email || !credentials?.password) {
                        throw new Error("Email and password are required");
                    }

                try{
                 const user = await userModel.findOne({
                       email: credentials.email.toLowerCase().trim(),
                    })
                    if(!user){
                        throw new Error('No user with this email')
                    }
                const isPasswordCorrect= await bcrypt.compare(credentials.password, user.password)
                if(isPasswordCorrect){
                    return user
                } else {
                    throw new Error('incorrect password')
                }
                }catch (error) {
                    console.error(error);
                    throw new Error("Login failed");
                }
            }
        })
    ],

callbacks: {
  async jwt({ token, user }) {
    if (user) {
     token._id = user._id;
    }
    return token;
  },

  async session({ session, token }) {
    if (session.user) {
     session.user._id = token._id as string;
    }
    return session;
    },
  },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET 

}
