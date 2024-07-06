import { Reply } from "@/lib/models/replyModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { deleteAssetsFromCloudinary, uploadAssetsToCloudinary } from "@/lib/utils/CloudinaryUpload";
import { NextResponse } from "next/server";


//Update Reply
export const PUT  = async (req, {params}) =>{

    try {

        connectToDB();

        console.log({check: "update reply called!"})

        const body = await req.json(); 
        let { replyText, replyImage } = body;

        const replyId = req.nextUrl.searchParams.get('replyId');
        const createdBy = req.nextUrl.searchParams.get('createdBy');

        const reply = await Reply.findById(replyId).populate("createdBy");


        if(reply.createdBy._id != createdBy){
            return NextResponse.json({
                error: "You can't change other's reply"
            }, {status: 400});
        }


        if(replyImage.name){

            replyImage = await uploadAssetsToCloudinary(replyImage.url, replyImage.name, { type: "image", folder: "images/replyImages" })

            if(reply.replyImage.public_id){
                await deleteAssetsFromCloudinary(reply.replyImage.public_id)
            }
        }
        
        if(reply.replyImage.public_id && !replyImage.url){
            await deleteAssetsFromCloudinary(reply.replyImage.public_id)
        }

        reply.replyText = replyText;
        reply.replyImage = replyImage;
        reply.save({validateBeforeSave: true});

        console.log({reply});


        return NextResponse.json({
            message: "reply updated!",
            reply
        }, {status: 201});

        
    } catch (error) {

        return NextResponse.json({error: error.message});

    }
}