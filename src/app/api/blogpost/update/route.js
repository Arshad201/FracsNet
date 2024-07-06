import { BlogPost } from "@/lib/models/blogModel";
import { connectToDB } from "@/lib/utils";
import { deleteAssetsFromCloudinary, uploadAssetsToCloudinary } from "@/lib/utils/CloudinaryUpload";
import { NextResponse } from "next/server";



const uploadItemsToCloudinary = async (content, itemsArr, cloundinaryUploaderFunc, uploaderObj) => {

    if (itemsArr.length != 0) {

        const arr = [];
        let newContent = "";
        const myPromise = itemsArr.map(async item => {
            let data = await cloundinaryUploaderFunc(item.url, item.name, uploaderObj)
            if (content) {
                newContent = content.replace(item.url, data.url);
            }
            arr.push(data);
        });

        await Promise.all(myPromise)
        return { arr, newContent };

    } else {
        return false
    }
}

const update_Media_NFiles = async (content, bodyArr, dbFieldArr, uploaderObj) => {

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
    let newContent = "";
    if (newUploadedFiles.length > 0) {

        const data = await uploadItemsToCloudinary(content, newUploadedFiles, uploadAssetsToCloudinary, uploaderObj);

        newUploadedFiles = data.arr;
        newContent = data.newContent;

    }

    const newArrOfFiles = [...remainingFiles, ...newUploadedFiles];

    return { newArrOfFiles, newContent };
}


const upload_single_file = async (newfile, dbFile, uploaderObj) => {

    if (newfile.public_id) {
        return dbFile
    } else {
        deleteAssetsFromCloudinary(dbFile.public_id)
        const data = await uploadAssetsToCloudinary(newfile.url, newfile.name, uploaderObj)
        return data;
    }
}

export const PUT = async (req, { params }) => {

    try {

        connectToDB();

        const postedBy = req.nextUrl.searchParams.get('userId');

        const body = await req.json();

        let {
            title,
            description,
            content,
            category,
            tags,
            featuredImage,
            images,
            blogPostId
        } = body;


        const blogPost = await BlogPost.findById(blogPostId)

        if (!blogPost) {
            return NextResponse.json({
                error: "Blog post is not found!"
            }, { status: 400 });
        }

        if (blogPost.author != postedBy) NextResponse.json({
            error: "You can't update other's post"
        }, { status: 400 });


        featuredImage = await upload_single_file(featuredImage[0], blogPost.featuredImage, { type: "image", folder: "images/blogImages" })

        const updateImages = await update_Media_NFiles(content, images, blogPost.images, { type: "image", folder: "images/blogImages" })

        images = updateImages.newArrOfFiles

        if (updateImages.newContent !== "") {
            content = updateImages.newContent
        }


        const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

        blogPost.title = title
        blogPost.featuredImage = featuredImage
        blogPost.images = images
        blogPost.slug = slug
        blogPost.content = content
        blogPost.excerpt = description
        blogPost.metaDescription = description
        blogPost.category = category
        blogPost.tags = tags

        await blogPost.save({ validateBeforeSave: true });

        return NextResponse.json({
            message: "Blogpost updated!",
            blogPost
        }, { status: 201 });


    } catch (error) {

        return NextResponse.json(error);

    }
}