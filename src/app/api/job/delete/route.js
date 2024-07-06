import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


//Deleting thread
export const DELETE  = async (req, {params}) =>{

    try {

        connectToDB();

        const threadId = req.nextUrl.searchParams.get('threadId');

        const thread = await Thread.findByIdAndDelete(threadId)

        return NextResponse.json({
            success: true,
            message: "Thread deleted successfully!"
        }, {status: 200});
        
    } catch (error) {
        return NextResponse.json(error);

    }
}