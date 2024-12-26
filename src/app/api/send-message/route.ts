import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/user.model";

export async function POST(request: Request){
    await dbConnect()

    const {username,content} =  await request.json();
    try {
       const user =  await UserModel.findOne({username});
       if(!user){
        return Response.json(
            {
                success: false,
                message: "User not found"
            },
            {status: 404}
        )
       }

       //is User accesping the messages
       if(!user.isAcceptingMessage){
        return Response.json(
            {
                success: false,
                message: "User not accepting message"
            },
            {status:403}
        )
       }

       const newMsg = {content, createdAt: new Date()}
       user.messages.push(newMsg as Message)
       await user.save()

       return Response.json(
        {
            success: true,
            message: "Message sent successfully"
        },
        {status:201}
    )
       

    } catch (error) {
        console.log("Error in sending msg: ", error);
        
        return Response.json(
            {
                success: false,
                message: "Unexpected Server error"
            },
            {status:500}
        )
    }
}