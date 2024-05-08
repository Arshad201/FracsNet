import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server"

export const GET  = async (req, {params}) =>{
    
    try {

        const page = parseInt(req.nextUrl.searchParams.get('page'));
        const limit = parseInt(req.nextUrl.searchParams.get('resultPerPage'));

        connectToDB();

        const threads = await Thread.find({})
        .populate('author')
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });


        const totalPages = Math.ceil((await Thread.find({})).length/limit);

  
        return NextResponse.json({
            totalPages,
            threads,
        }, {status: 200})
        
    } catch (error) {

        console.log(error)
        NextResponse.json(error);
        
    }
}