import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { uploadAssetsToCloudinary } from "@/lib/utils/CloudinaryUpload";
import { NextResponse } from "next/server";


//Creating Thread

const uploadItemsToCloudinary = async(itemsArr, cloundinaryUploaderFunc, uploaderObj) => {

    if (itemsArr.length != 0) {

        const arr = [];
        const myPromise = itemsArr.map(async item => {
            let data = await cloundinaryUploaderFunc(item.url, item.name, uploaderObj)
            console.log(data);
            arr.push(data);
        });

        await Promise.all(myPromise)
        return arr;
        
    } else {
        return false
    }
}
export const POST = async (req, { params }) => {

    try {
        connectToDB();

        const postedBy = req.nextUrl.searchParams.get('userId');

        const body = await req.json();

        let {
            threadText,
            threadImage,
            threadVideo,
            youTubeVideoId,
            files
        } = body;


        const threadObj = {};

        threadImage = await uploadItemsToCloudinary(threadImage, uploadAssetsToCloudinary, {type: "image", folder: "images/threadImages"});
        files = await uploadItemsToCloudinary(files, uploadAssetsToCloudinary, {type: "auto", folder: "files/threadFiles"});
        threadVideo = await uploadItemsToCloudinary(threadVideo, uploadAssetsToCloudinary, {type: "video", folder: "videos/threadVideos"});

        threadObj.postedBy = postedBy
        if(threadText)threadObj.threadText = threadText
        if(youTubeVideoId)threadObj.youTubeVideo = youTubeVideoId
        if(threadImage)threadObj.threadImage = threadImage
        if(threadVideo)threadObj.threadVideo = threadVideo
        if(files)threadObj.files = files

        const thread = await Thread.create(threadObj);

        return NextResponse.json({
            thread
        }, { status: 201 });


    } catch (error) {

        return NextResponse.json({ error: error.message });

    }
}