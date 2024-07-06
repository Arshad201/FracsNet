import { Comment } from "@/lib/models/commentModel";
import { Reply } from "@/lib/models/replyModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { uploadAssetsToCloudinary } from "@/lib/utils/CloudinaryUpload";
import { NextResponse } from "next/server";


export const POST  = async (req, {params}) =>{

    try {

        connectToDB();

        const commentId = req.nextUrl.searchParams.get('commentId');
        const createdBy = req.nextUrl.searchParams.get('createdBy');

        const body = await req.json(); 
        let { replyText, replyImage } = body;

        const comment = await Comment.findById(commentId);

        if(!comment){
            return {error: "something went wrong!"}
        }


        const replyObj = {createdBy}

        if(replyText !==""){
            replyObj.replyText = replyText
        }
        
        if(replyImage.url){
            replyImage = await uploadAssetsToCloudinary(replyImage.url, replyImage.name, { type: "image", folder: "images/replyImages" })
            replyObj.replyImage = replyImage
        }


        let reply = await Reply.create(replyObj);


        comment.replies.unshift(reply._id);

        await comment.save({validateBeforeSave: true});

        reply = await Reply.findById(reply._id).populate("createdBy");

        return NextResponse.json({
            message: "Reply added successfully!",
            reply
        }, {status: 201});

        
    } catch (error) {

        return NextResponse.json(error);

    }
}