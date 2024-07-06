import { Comment } from "@/lib/models/commentModel";
import { connectToDB } from "@/lib/utils";
import { deleteAssetsFromCloudinary, uploadAssetsToCloudinary } from "@/lib/utils/CloudinaryUpload";
import { NextResponse } from "next/server";


//Update Comment
export const PUT  = async (req, {params}) =>{

    try {

        connectToDB();

        const body = await req.json(); 
        let { commentText, commentImage } = body;

        const commentId = req.nextUrl.searchParams.get('commentId');
        const createdBy = req.nextUrl.searchParams.get('createdBy');

        const comment = await Comment.findById(commentId).populate("createdBy");;

        if(comment.createdBy._id != createdBy){
            return NextResponse.json({
                error: "You can't change other's comment"
            }, {status: 400});
        }


        if(commentImage.name){

            commentImage = await uploadAssetsToCloudinary(commentImage.url, commentImage.name, { type: "image", folder: "images/commentImages" })

            if(comment.commentImage.public_id){
                await deleteAssetsFromCloudinary(comment.commentImage.public_id)
            }
        }
        
        if(comment.commentImage.public_id && !commentImage.url){
            await deleteAssetsFromCloudinary(comment.commentImage.public_id)
        }

        comment.commentText = commentText;
        comment.commentImage = commentImage;
        comment.save({validateBeforeSave: true});

        return NextResponse.json({
            message: "Comment updated!",
            comment
        }, {status: 201});

        
    } catch (error) {

        return NextResponse.json(error);

    }
}