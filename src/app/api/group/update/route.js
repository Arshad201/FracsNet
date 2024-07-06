import { Group } from "@/lib/models/groupModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

//Updating Thread
export const POST  = async (req, {params}) =>{

    try {

        connectToDB();

        const groupId = req.nextUrl.searchParams.get('groupId');

        const body = await req.json(); 
        const {groupTitle, groupDescription} = body;

        const updateData = {
            groupTitle, 
            groupDescription,
            //We can update more fields here!
        }

        const group = await Group.findByIdAndUpdate(groupId, updateData, { new: true, runValidators: true },)

        return NextResponse.json({
            success: true,
            group
        }, {status: 201});

        
    } catch (error) {

        return NextResponse.json(error);

    }
}