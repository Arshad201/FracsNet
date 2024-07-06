import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { deleteAssetsFromCloudinary, uploadAssetsToCloudinary } from "@/lib/utils/CloudinaryUpload";
import { NextResponse } from "next/server";


const uploadItemsToCloudinary = async (itemsArr, cloundinaryUploaderFunc, uploaderObj) => {

    if (itemsArr.length != 0) {

        const arr = [];
        const myPromise = itemsArr.map(async item => {
            let data = await cloundinaryUploaderFunc(item.url, item.name, uploaderObj)
            arr.push(data);
        });

        await Promise.all(myPromise)
        return arr;

    } else {
        return false
    }
}

const update_Media_NFiles = async (bodyArr, dbFieldArr, uploaderObj) =>{

    const alreadyOnCloud = bodyArr.filter(i => i.public_id);

        // Get all the deleted Files
        const deletedFiles = dbFieldArr.filter(item1 =>
            alreadyOnCloud.every(item2 => item2.public_id != item1.public_id)
        );         

        // Delete Files from cloudinary
        if (deletedFiles.length > 0) {

            deletedFiles.forEach(item => {
                deleteAssetsFromCloudinary(item.public_id)
            });
        }

        // Remaining Files after deletion
        const remainingFiles = dbFieldArr.filter(item1 =>
            deletedFiles.every(item2 => item2.public_id != item1.public_id)
        );

        // Uplaod the new Files
        let newUploadedFiles = bodyArr.filter(i => !i.public_id);

        if (newUploadedFiles.length > 0) {
            newUploadedFiles = await uploadItemsToCloudinary(newUploadedFiles, uploadAssetsToCloudinary, uploaderObj);
        }

        const newArrOfFiles = [...remainingFiles, ...newUploadedFiles];

        return newArrOfFiles;
}


//Updating Thread
export const PUT = async (req, { params }) => {

    try {

        connectToDB();

        const postedBy = req.nextUrl.searchParams.get('userId');

        const body = await req.json();

        let {
            threadId,
            threadText,
            threadImage,
            threadVideo,
            youTubeVideoId,
            files
        } = body;


        let thread = await Thread.findOne({ _id: threadId });
        if (thread.postedBy != postedBy) return { error: "You can't Update other's thread" }

        const updatedThreadImages = await update_Media_NFiles(threadImage, thread.threadImage, { type: "image", folder: "images/threadImages" })

        const updatedThreadVideo = await update_Media_NFiles(threadVideo, thread.threadVideo, {type: "video", folder: "videos/threadVideos"})

        const updatedThreadFiles = await update_Media_NFiles(files, thread.files, {type: "auto", folder: "files/threadFiles"})

        thread.threadText = threadText
        thread.youTubeVideo = youTubeVideoId
        thread.threadImage = updatedThreadImages
        thread.threadVideo = updatedThreadVideo
        thread.files = updatedThreadFiles
        await thread.save({ validateBeforeSave: true });

        return NextResponse.json({
            success: true,
            thread
        }, { status: 201 });


    } catch (error) {

        return NextResponse.json(error);

    }
}