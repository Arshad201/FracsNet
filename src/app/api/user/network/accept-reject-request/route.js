import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

//Accept Reject Request
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

        if (alreadyToInNetworks) {
            throw new Error(`This user is already in your network`);
        }

        let message = "";

        // If Receive Network Request from sender
        if (alreadyToInPendingRequests) {


            // operation type = "accept" then "accept the request"

            if (operationType === "accept") {

                //Unshift both users to each other's network array
                fromUserNetworks.unshift(userId);
                toUserNetworks.unshift(loggedInUserId);

                // Remove Id from Pending request array of loggedIn User
                const indexOfSenderId = fromUserPendingRequests.indexOf(userId);
                fromUserPendingRequests.splice(indexOfSenderId, 1);

                // Remove Id from Send request array of sender User
                const indexOfRecieverId = toUserSendRequests.indexOf(loggedInUserId);
                toUserSendRequests.splice(indexOfRecieverId, 1);

                message = "Request Accepted!";

            } else {

                // operation type = "reject" then "reject the request"


                // Remove Id from Pending request array of loggedIn User
                const indexOfSenderId = fromUserPendingRequests.indexOf(userId);
                fromUserPendingRequests.splice(indexOfSenderId, 1);

                // Remove Id from Send request array of sender User
                const indexOfRecieverId = toUserSendRequests.indexOf(loggedInUserId);
                toUserSendRequests.splice(indexOfRecieverId, 1);

                message = "Request Rejected!";
            }

        }


        await fromUser.save({ validateBeforeSave: true });
        await toUser.save({ validateBeforeSave: true });


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