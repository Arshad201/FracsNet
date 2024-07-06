import { BlogPost } from "@/lib/models/blogModel";
import { Comment } from "@/lib/models/commentModel";
import { Job } from "@/lib/models/jobModel";
import { Poll } from "@/lib/models/pollModel";
import { Reply } from "@/lib/models/replyModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


const doUndoLike = async (holderId, holderType, userId) => {

    let Model;

    if(holderType === "thread"){
        Model = Thread;
    }
    if(holderType === "poll"){
        Model = Poll;
    }
    if(holderType === "job"){
        Model = Job;
    }
    if(holderType === "blogpost"){
        Model = BlogPost;
    }
    if(holderType === "comment"){
        Model = Comment;
    }
    if(holderType === "reply"){
        Model = Reply;
    }

    let message;
    const data = await Model.findById(holderId);

    const alreadyLiked = data.likes.includes(userId)

    message = `${alreadyLiked ? "Unliked successfully!" : "liked successfully!"}`;


    if (alreadyLiked) {
        const updatedLikes = data.likes.filter(i => i != userId);
        data.likes = updatedLikes;
    } else {
        data.likes.unshift(userId);
    }

    await data.save({ validateBeforeSave: true });

    return {
        success: true,
        message,
    }
}

export const POST = async (req, { params }) => {

    try {

        console.log("like route call")
        connectToDB();

        //Holder can be - data, blogPost
        const holderId = req.nextUrl.searchParams.get('holderId');
        const userId = req.nextUrl.searchParams.get('userId');
        const holderType = req.nextUrl.searchParams.get('holderType');

        console.log({holderId, holderType, userId});

        const res = await doUndoLike(holderId, holderType, userId);



        return NextResponse.json(res, { status: 201 });


    } catch (error) {

        console.log(error.message);
        return NextResponse.json(error);

    }
}