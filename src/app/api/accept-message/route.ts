import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { User } from "next-auth";

export async function POST(request: Request){
await dbConnect()

    const session = await getServerSession(authOptions)
    const user= session?.user as User

    if(!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not authenticated"
            },
            {
                status:401
            }
        )
    }

    const userId = user._id;
    const {acceptmessages} = await request.json()

    try {
       const updatedUser =  await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage: acceptmessages},
            {new : true}
        )
        if(!updatedUser){

            return Response.json(
                {
                    success: false,
                    message: "Failed to update the user"
                },
                {
                    status:401
                }
            )
        }

        return Response.json(
            {
                success: true,
                message: "Message acceptance status updated"
            },
            {
                status:200
            }
        )
    } catch (error) {
        console.log("Failed to update user status to accept messages");
        
        return Response.json(
            {
                success: false,
                message: "Failed to update user status to accept messages"
            },
            {
                status:500
            }
        )
    }

}


export async function GET(request: Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user= session?.user as User

    if(!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not authenticated"
            },
            {
                status:401
            }
        )
    }

    const userId = user._id;
   try {
     const foundUser = await UserModel.findById(userId)
     if(!foundUser){
         return Response.json(
             {
                 success: false,
                 message: "User not found"
             },
             {
                 status:404
             }
         ) 
     } 
     return Response.json(
         {
             success: true,
            isAcceptingMessages: foundUser.isAcceptingMessage
         },
         {
             status:200
         }
     )
 
   } catch (error) {
    console.log("Error is getting message acceptance status");
    return Response.json(
        {
            success: false,
            message: "Error is getting message acceptance status"
        },
        {status:500}
    )
    
   }

}