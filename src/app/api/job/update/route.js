import { Job } from "@/lib/models/jobModel";
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


//Updating Job
export const PUT = async (req, { params }) => {

    try {

        connectToDB();

        const employer = req.nextUrl.searchParams.get('postedBy');

        const body = await req.json();

        let {
            jobId,
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


        let job = await Job.findOne({ _id: jobId });
        if (job.employer != employer) return { error: "You can't Update other's Job" }

        images = await update_Media_NFiles(images, job.images, { type: "image", folder: "images/jobImages" })

        files = await update_Media_NFiles(files, job.files, { type: "auto", folder: "files/jobFiles" })


        job.title = title;
        job.description = description;
        job.jobAgreement = jobAgreement;
        job.isRemote = isRemote;
        job.payoutStructure = payoutStructure;
        job.payoutCurrency = payoutCurrency;
        job.payout = payout;
        job.company = company;
        job.companyWebsite = companyWebsite;
        job.applyByDate = applyByDate;
        job.postedIn = postedIn;
        job.images = images;
        job.files = files;
        job.requirements = requirements;
        job.preferredQualifications = preferredQualifications;
        job.skills = skills;
        job.benefits = benefits;
        job.country = country;
        job.state = state;
        job.city = city;

        job = await job.save({ validateBeforeSave: true });

        return NextResponse.json({
            message: "Job Updated successfully!"
        }, { status: 201 });


    } catch (error) {

        console.log({error: error.message});

        return NextResponse.json(error);

    }
}