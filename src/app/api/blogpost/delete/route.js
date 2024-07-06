import { BlogPost } from "@/lib/models/blogModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


//Getting Thread
export const DELETE  = async (req, {params}) =>{

    try {

        connectToDB();

        const blogPostId = req.nextUrl.searchParams.get('blogPostId');
        const blogPost = await BlogPost.findByIdAndDelete(blogPostId)

        return NextResponse.json({
            success: true,
            message: "Blog post Deleted successfully!"
        }, {status: 201});

        
    } catch (error) {

        return NextResponse.json(error);

    }
}