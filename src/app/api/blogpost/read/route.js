import { BlogPost } from "@/lib/models/blogModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


//Getting Thread
export const GET  = async (req, {params}) =>{

    try {

        connectToDB();


        const blogPosts = await BlogPost.find({});

        return NextResponse.json({
            success: true,
            blogPosts
        }, {status: 201});

        
    } catch (error) {

        return NextResponse.json(error);

    }
}