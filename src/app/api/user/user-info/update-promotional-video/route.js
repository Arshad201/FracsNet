import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import { deleteAssetsFromCloudinary, uploadAssetsToCloudinary } from "@/lib/utils/CloudinaryUpload";
import { NextResponse } from "next/server";


export const PUT = async (req, { params }) => {

    try {

        connectToDB();

        const userId = req.nextUrl.searchParams.get('userId');

        const body = await req.json();

        const { videoObj } = body;

        const user = await User.findById(userId)


        if(user.promotionalVideo.url){
            await deleteAssetsFromCloudinary(user.promotionalVideo.url)
        }

        const uploadedItem = await uploadAssetsToCloudinary(videoObj.url, videoObj.name, { type: "video", folder: "videos/promotionalVideo" })

       user.promotionalVideo = uploadedItem

        await user.save();

        return NextResponse.json({
            message: "Video Uploaded!",
            uploadedItem
        }, { status: 200 });

    } catch (error) {

        return NextResponse.json({error: error.message});

    }
}