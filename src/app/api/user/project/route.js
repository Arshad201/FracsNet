import { Project } from "@/lib/models/projectModel";
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

const update_Media_NFiles = async (bodyArr, dbFieldArr, uploaderObj) => {

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


//Create Project
export const POST = async (req, { params }) => {

    try {

        connectToDB();

        const postedBy = req.nextUrl.searchParams.get('postedBy');

        const body = await req.json();
        let { title, description, files, link } = body;

        const projects = await Project.find({ postedBy });

        if(projects.length > 5) return NextResponse.json({ error: "You Already reached the Limit of 5 Projects" }, { status: 400 });

        files = await uploadItemsToCloudinary(files, uploadAssetsToCloudinary, {type: "auto", folder: "files/projectFiles"});

        if(!files) return NextResponse.json({ error: "Something went wrong, please try again!" }, { status: 400 });
        
        const created = await Project.create({title, description, files, link, postedBy})

        if(!created) return NextResponse.json({ error: "Something went wrong, please try again!" }, { status: 400 });

        return NextResponse.json({ message: "Project is created!" }, { status: 201 });

    } catch (error) {

        return NextResponse.json({ error: error.message });

    }
}

//Update Project
export const PUT = async (req, { params }) => {

    try {


        connectToDB();

        const postedBy = req.nextUrl.searchParams.get('postedBy');
        const projectId = req.nextUrl.searchParams.get('projectId');

        const body = await req.json();
        let { title, description, files, link } = body;

        const project = await Project.findOne({ _id: projectId, postedBy });

        if(!project) return NextResponse.json({ error: "Project Not Found!" }, { status: 400 });

        files = await update_Media_NFiles(files, project.files, {type: "auto", folder: "files/projectFiles"});

        if(!files) return NextResponse.json({ error: "Something went wrong, please try again!" }, { status: 400 });
        
        project.title = title
        project.description = description
        project.link = link
        project.files = files

        await project.save({validateBeforeSave: true});

        return NextResponse.json({ message: "Project is Updated!" }, { status: 201 });

    } catch (error) {

        return NextResponse.json({ error: error.message });

    }
}