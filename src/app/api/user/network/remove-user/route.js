import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

//Remove User from Network

export const POST = async (req, { params }) => {

    connectToDB();

    try {

        const loggedInUserId = req.nextUrl.searchParams.get('loggedInUserId');
        const userId = req.nextUrl.searchParams.get('userId');

        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        const loggedInUserNetwork = loggedInUser.network
        const userNetwork = user.network

        if(!loggedInUserNetwork.includes(userId) && !loggedInUserNetwork.includes(userId)){
            throw new Error(`User is not found to remove from the network`);
        }

         // Remove Id from the Network of logged in user
         const indexOfUserId = loggedInUserNetwork.indexOf(userId);
         loggedInUserNetwork.splice(indexOfUserId, 1);

         // Remove Id from the Network of user
         const indexOfLoggedInUserId = userNetwork.indexOf(loggedInUserId);
         userNetwork.splice(indexOfLoggedInUserId, 1);


        await loggedInUser.save({validateBeforeSave: true});
        await user.save({validateBeforeSave: true});


        return NextResponse.json({
            message: "Removed user successfully!"
        }, { status: 200 })

    } catch (error) {

        console.log(error)
        return NextResponse.json(error.message);

    }
}