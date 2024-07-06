import { BlogPost } from "@/lib/models/blogModel";
import { Comment } from "@/lib/models/commentModel";
import { Job } from "@/lib/models/jobModel";
import { Poll } from "@/lib/models/pollModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { uploadAssetsToCloudinary } from "@/lib/utils/CloudinaryUpload";
import { NextResponse } from "next/server";


//Creating Comment
export const POST  = async (req, {params}) =>{

    try {


        connectToDB();

        //Holder can be - thread, blogPost, Poll, job
        const holderId = req.nextUrl.searchParams.get('holderId');
        const holderType = req.nextUrl.searchParams.get('holderType');
        const createdBy = req.nextUrl.searchParams.get('createdBy');

        const body = await req.json(); 
        let { commentText, commentImage} = body;

        const commentObj = {createdBy}

        if(commentText !==""){
            commentObj.commentText = commentText
        }
        
        if(commentImage.url){
            commentImage = await uploadAssetsToCloudinary(commentImage.url, commentImage.name, { type: "image", folder: "images/commentImages" })
            commentObj.commentImage = commentImage
        }

        let comment = await Comment.create(commentObj);

        if( holderType === "thread"){

            const thread = await Thread.findOne({_id: holderId});

            if(!thread){
                return {error: "something went wrong"};
            }
            
            thread.comments.unshift(comment._id);

            await thread.save({validateBeforeSave: true})
        }

        if( holderType === "poll"){

            const poll = await Poll.findOne({_id: holderId});

            if(!poll){
                return {error: "something went wrong"};
            }
            
            poll.comments.unshift(comment._id);

            await poll.save({validateBeforeSave: true})
        }

        if( holderType === "blogpost"){

            const blogpost = await BlogPost.findOne({_id: holderId});

            if(!blogpost){
                return {error: "something went wrong"};
            }
            
            blogpost.comments.unshift(comment._id);

            await blogpost.save({validateBeforeSave: true})
        }

        if( holderType === "job"){

            const job = await Job.findOne({_id: holderId});

            if(!job){
                return {error: "something went wrong"};
            }

            const alreadyApplied = job.applicants.includes(createdBy);

            if(alreadyApplied){
                return {error: "You're already a applicants on this job post"}
            }
            
            job.applicants.unshift(comment._id);

            await job.save({validateBeforeSave: true})
        }

        let message = "Comment added!"

        if(holderType === "job"){
            message = "Applied!"
        }

        comment = await Comment.findById(comment._id).populate("createdBy");
        

        return NextResponse.json({
            message,
            comment
        }, {status: 201});

        
    } catch (error) {

        return NextResponse.json(error);

    }
}