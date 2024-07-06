import { Job } from "@/lib/models/jobModel";
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


//Creating Job
export const POST = async (req, { params }) => {

    try {

        connectToDB();

        const employer = req.nextUrl.searchParams.get('postedBy');

        let body = await req.json();
        let {
            title,
            description,
            jobAgreement,
            isRemote,
            payoutStructure,
            payoutCurrency,
            payout,
            company,
            companyWebsite,
            applyByDate,
            postedIn,
            images,
            files,
            requirements,
            preferredQualifications,
            skills,
            benefits,
            country,
            state,
            city,
        } = body;

        images = await uploadItemsToCloudinary(images, uploadAssetsToCloudinary, { type: "image", folder: "images/jobImages" });
        files = await uploadItemsToCloudinary(files, uploadAssetsToCloudinary, { type: "auto", folder: "files/jobFiles" });

        const jobObj = {
            title,
            description,
            jobAgreement,
            isRemote,
            payoutStructure,
            payoutCurrency,
            payout,
            company,
            companyWebsite,
            applyByDate,
            postedIn,
            requirements,
            preferredQualifications,
            skills,
            benefits,
            country,
            state,
            city,
            employer
        }

        if(images) jobObj.images = images
        if(files) jobObj.files = files

        console.log(jobObj);

        const job = await Job.create(jobObj);

        return NextResponse.json({
            message: "Job Created successfully",
            // job,
        }, { status: 201 });


    } catch (error) {

        console.log({ error: error.message })
        return NextResponse.json(error.message);

    }
}