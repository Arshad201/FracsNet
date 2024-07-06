"use server"

import { GetSession } from "@/lib/utils/getSessionData";
import { revalidatePath } from "next/cache";

export const fetchResourceData = async (updateType, resource_id) => {


    try {

        const response = await fetch(`http://localhost:3000/api/resource?resourceType=${updateType}&resource_id=${resource_id}`);

        const data = await response.json();


        return data.data;


    } catch (error) {
        console.log({ error: "Unable to fetch resource" });
    }

}

export const deleteResourceData = async (resource) => {

    let resourceType = "";  

    if(resource?.threadImage){
        resourceType = "thread"
    }

    if(resource?.question){
        resourceType = "poll"
    }

    if(resource?.isRemote){
        resourceType = "job"
    }

    if(resource?.slug){
        resourceType = "blogpost"
    }

    if(resource?.commentImage || resource?.commentText){
        resourceType = "comment"
    }

    if(resource?.replyImage || resource?.replyText){
        resourceType = "reply"
    }

    try {

        const response = await fetch(`http://localhost:3000/api/resource?resourceType=${resourceType}&resource_id=${resource._id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = await response.json();

        revalidatePath("/")

        return data;


    } catch (error) {
        console.log({ error: error.message });
    }

}

// Upload Profile and Cover of Group and User Profile
export const upload_image = async (actionObj) => {

    try {

        const loggedInUser = await GetSession()

        const {type, imageObj, resource_id} = actionObj

        const response = await fetch(`http://localhost:3000/api/profile-images?imgType=${type}&resource_id=${resource_id}&userId=${loggedInUser._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({imageObj})
            }
        );

        const data = await response.json();

        revalidatePath("/profile");

        return data;


    } catch (error) {

        console.log({ error: error.message })
         return { error: error.message }
    }

}

