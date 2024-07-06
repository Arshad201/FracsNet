import { BlogPost } from "@/lib/models/blogModel";
import { connectToDB } from "@/lib/utils";
import { uploadAssetsToCloudinary } from "@/lib/utils/CloudinaryUpload";
import { NextResponse } from "next/server";




const uploadItemsToCloudinary = async (itemsArr, cloundinaryUploaderFunc, uploaderObj) => {

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

const uploadItemsToCloudinaryAndUpdateContent = async (content, itemsArr, cloundinaryUploaderFunc, uploaderObj) => {

    if (itemsArr.length != 0) {

        const arr = [];
        let updatedContent = "";
        const myPromise = itemsArr.map(async item => {
            let data = await cloundinaryUploaderFunc(item.url, item.name, uploaderObj)
            console.log(data);
            updatedContent = content.replace(item.url, data.url);
            arr.push(data);
        });

        await Promise.all(myPromise)
        return {arr, updatedContent};

    } else {
        return false
    }
}
//Creating Blogpost
export const POST = async (req, { params }) => {

    try {

        connectToDB();

        const author = req.nextUrl.searchParams.get('postedBy');

        const body = await req.json();

        let {
            title,
            description,
            content,
            category,
            tags,
            featuredImage,
            images,
        } = body;


        const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

        let blogPost = await BlogPost.findOne({slug});

        if(blogPost){

            return NextResponse.json({
                error: "This title is already exist!",
                blogPost
            }, { status: 400 });

        }


        featuredImage = await uploadItemsToCloudinary(featuredImage, uploadAssetsToCloudinary, { type: "image", folder: "images/blogImages" });


        if(images.length !=0){

            const uploadedImages = await uploadItemsToCloudinaryAndUpdateContent( content, images, uploadAssetsToCloudinary, { type: "image", folder: "images/blogImages" });

            content = uploadedImages.updatedContent;
            images = uploadedImages.arr;
            
        }


        const blogpostObj = {
            title,
            featuredImage: featuredImage[0],
            images, 
            slug,
            content,
            excerpt: description,
            metaDescription : description,
            author,
            category,
            tags,
        }

        blogPost = await BlogPost.create(blogpostObj);

        return NextResponse.json({
            message: "Blog post is created sucessfully!",
            blogPost
        }, { status: 201 });

    } catch (error) {

        console.log({error: error.message});

        return NextResponse.json({error: error.message});

    }
}