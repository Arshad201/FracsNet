import { Group } from "@/lib/models/groupModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


//Deleting thread
export const DELETE  = async (req, {params}) =>{

    try {

        connectToDB();

        const groupId = req.nextUrl.searchParams.get('groupId');

        await Group.findByIdAndDelete(groupId)

        return NextResponse.json({
            success: true,
            message: "Group deleted successfully!"
        }, {status: 200});
        
    } catch (error) {
        return NextResponse.json(error);

    }
}