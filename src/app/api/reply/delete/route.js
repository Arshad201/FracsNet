import { Comment } from "@/lib/models/commentModel";
import { Reply } from "@/lib/models/replyModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


//Delete Comment through holder Id
export const DELETE = async (req, { params }) => {

    try {

        connectToDB();

        //Holder can be - thread, blogPost
        const replyId = req.nextUrl.searchParams.get('replyId');

        const comment = await Comment.findOne({ replies: replyId });
        comment.replies = comment.replies.filter(i => i != replyId);
        comment.save({ validateBeforeSave: true });

        await Reply.findByIdAndDelete(replyId);

        return NextResponse.json({
            success: true,
            message: "Reply deleted successfully!",
        }, { status: 200 });


    } catch (error) {

        return NextResponse.json(error);

    }
}