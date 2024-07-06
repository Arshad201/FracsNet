import { Group } from "@/lib/models/groupModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


//Getting Joined Groups
export const GET  = async (req, {params}) =>{

    try {

        connectToDB();

        const userId = req.nextUrl.searchParams.get('userID');
        const page = parseInt(req.nextUrl.searchParams.get('page'));
        const limit = parseInt(req.nextUrl.searchParams.get('resultPerPage'));

        
        let groups = await Group.find({members: {$in: userId}});
        const totalPages = Math.ceil(groups.length/limit);

        groups = await Group.find({members: {$in: userId}})
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

        return NextResponse.json({
            totalPages,
            groups
        }, {status: 200});

        
    } catch (error) {

        return NextResponse.json(error.message);

    }
}