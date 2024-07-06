import { Poll } from "@/lib/models/pollModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


//Deleting thread
export const DELETE  = async (req, {params}) =>{

    try {

        connectToDB();

        const pollId = req.nextUrl.searchParams.get('pollId');

        await Poll.findByIdAndDelete(pollId)

        return NextResponse.json({
            success: true,
            message: "poll deleted successfully!"
        }, {status: 200});
        
    } catch (error) {
        return NextResponse.json(error);
    }
}