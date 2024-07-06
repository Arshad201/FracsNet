import { Group } from "@/lib/models/groupModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


//Creatin Thread
export const POST  = async (req, {params}) =>{

    try {

        connectToDB();

        const body = await req.json(); 
        const { groupTitle, groupDescription, groupAdmin, members} = body;

        const group = await Group.create({groupTitle, groupDescription, groupAdmin, members});

        return NextResponse.json({
            success: true,
            group
        }, {status: 201});
        
    } catch (error) {

        return NextResponse.json(error);

    }
}