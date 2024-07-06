import { Comment } from "@/lib/models/commentModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


//Delete Comment through holder Id
export const DELETE  = async (req, {params}) =>{

    try {

        connectToDB();

        //Holder can be - thread, blogPost
        const commentId = req.nextUrl.searchParams.get('commentId');
        const holderType = req.nextUrl.searchParams.get('holderType');

        if(holderType === 'thread'){
            const thread = await Thread.findOne({ comments: commentId });
            thread.comments = thread.comments.filter(i=>i!=commentId);
            thread.save({validateBeforeSave: true});

        }
        
        await Comment.findByIdAndDelete(commentId);
        
        return NextResponse.json({
            success: true,
            message: "comment deleted successfully!",
        }, {status: 200});

        
    } catch (error) {

        return NextResponse.json(error);

    }
}