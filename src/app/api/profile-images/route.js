import { Group } from "@/lib/models/groupModel";
import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import { deleteAssetsFromCloudinary, uploadAssetsToCloudinary } from "@/lib/utils/CloudinaryUpload";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {

    try { 

        connectToDB();

        console.log({check: "in the route bro"})

        const imgType = req.nextUrl.searchParams.get('imgType');
        const resource_id = req.nextUrl.searchParams.get('resource_id');
        const userId = req.nextUrl.searchParams.get('userId');

        const body = await req.json()

        const { imageObj } = body;

        let model;

        if(["user-cover-img", "user-profile-img"].includes(imgType)){
            model = User
        }

        if(["group-cover-img", "group-profile-img"].includes(imgType)){
            model = Group
        }

        const resource = await model.findById(resource_id);

        if(!resource) return NextResponse.json({error: "resource not found!"}, { status: 400 });


        if(["user-cover-img", "user-profile-img"].includes(imgType)){
            if(resource_id != userId) return NextResponse.json({error: "You can't change other's image!"}, { status: 400 });
        }

        if(["group-cover-img", "group-profile-img"].includes(imgType)){
            if(resource.groupAdmin != userId) return NextResponse.json({error: "Only Admin can change these images!"}, { status: 400 });
        }

        let profilePic = resource.profilePic
        let bgPic = resource.bgPic
        

        if(imgType.includes("profile") && profilePic.public_id){
            await deleteAssetsFromCloudinary(profilePic.public_id)
        }

        if(imgType.includes("cover") && bgPic.public_id){
            await deleteAssetsFromCloudinary(bgPic.public_id)
        }

        let uploadedItem;

        if(imgType.includes("profile")){
            profilePic = await uploadAssetsToCloudinary(imageObj.url, imageObj.name,  { type: "image", folder: "images/profileImages" })
            uploadedItem = profilePic
        }

        if(imgType.includes("cover")){
            bgPic = await uploadAssetsToCloudinary(imageObj.url, imageObj.name,  { type: "image", folder: "images/bgImages" })
            uploadedItem = bgPic
        }

        resource.profilePic = profilePic;
        resource.bgPic = bgPic

        await resource.save({validateBeforeSave: true});



        return NextResponse.json({message: "Image Updated!", uploadedItem}, { status: 201 });

    } catch (error) {

        return NextResponse.json({error: error.message});

    }
}