import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

//Send Undo Request
export const POST = async (req, { params }) => {

    connectToDB();

    try {

        const loggedInUserId = req.nextUrl.searchParams.get('from');
        const userId = req.nextUrl.searchParams.get('to');
        const operationType = req.nextUrl.searchParams.get('operationType');

        const fromUser = await User.findById(loggedInUserId);
        const toUser = await User.findById(userId);

        const fromUserNetworks = fromUser.network;
        const fromUserSendRequests = fromUser.sendRequest;
        const fromUserPendingRequests = fromUser.pendingRequest;

        const toUserNetworks = toUser.network;
        const toUserSendRequests = toUser.sendRequest;
        const toUserPendingRequests = toUser.pendingRequest;

        const alreadyToInNetworks = fromUserNetworks.includes(userId);
        const alreadyToInSendRequests = fromUserSendRequests.includes(userId);
        const alreadyToInPendingRequests = fromUserPendingRequests.includes(userId);

        if(alreadyToInNetworks){
            throw new Error(`This user is already in your network`);
        }

        let message = "";

        // If loggedInUser not sended the network request then send the request
        if(!alreadyToInSendRequests){
            // send the request
            fromUserSendRequests.unshift(userId);
            toUserPendingRequests.unshift(loggedInUserId);
             message = "Send Request!";
        }else{

            // Undo the request

             // Remove Id from Send request array of loggedIn User
             const indexOfSenderId = fromUserSendRequests.indexOf(loggedInUserId);
             fromUserSendRequests.splice(indexOfSenderId, 1);

             // Remove Id from Pending request array of receive User
             const indexOfRecieverId = toUserPendingRequests.indexOf(userId);
             toUserPendingRequests.splice(indexOfRecieverId, 1);

             message = "Undo Request!";

        }


        await fromUser.save({validateBeforeSave: true});
        await toUser.save({validateBeforeSave: true});


        return NextResponse.json({
            fromUserSendRequests,
            toUserPendingRequests,
            message
        }, { status: 200 })

    } catch (error) {

        console.log(error)
        return NextResponse.json(error.message);

    }
}