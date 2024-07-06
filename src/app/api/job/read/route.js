import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


//Getting Thread
export const GET  = async (req, {params}) =>{

    try {

        connectToDB();


        const thread = await Thread.find({});

        return NextResponse.json({
            success: true,
            thread
        }, {status: 201});

        
    } catch (error) {

        return NextResponse.json(error);

    }
}