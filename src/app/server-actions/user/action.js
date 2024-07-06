"use server"
import { GetSession } from "@/lib/utils/getSessionData";
import { revalidatePath } from "next/cache";

export const update_userDetails = async (userDetails) => {

    try {
        
        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/user/user-info/update-info?userId=${loggedInData._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            }
        );

        const data = await response.json();

        revalidatePath(`/profile`)

        return data;
        

    } catch (error) {

        return {error: error.message}
    }

}

export const upload_promotionalVideo = async (videoObj) => {

    try {


        const loggedInUser = await GetSession()

        const response = await fetch(`http://localhost:3000/api/user/user-info/update-promotional-video?userId=${loggedInUser._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({videoObj})
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

export const update_education = async (educationData) => {

    try {
        
        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/user/education?userId=${loggedInData._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(educationData),
            }
        );

        const data = await response.json();

        revalidatePath(`/profile`)

        return data;
        

    } catch (error) {

        return {error: error.message}
    }

}

export const update_workingExperience = async (experiences) => {

    try {
        
        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/user/experience?userId=${loggedInData._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({experiences}),
            }
        );

        const data = await response.json();

        revalidatePath(`/profile`)

        return data;
        

    } catch (error) {

        return {error: error.message}
    }

}

export const update_contactDetails = async (contactInfo) => {

    try {

        console.log({contactInfo})
        
        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/user/contact-details?userId=${loggedInData._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({contactInfo}),
            }
        );

        const data = await response.json();

        revalidatePath(`/profile`)

        return data;
        

    } catch (error) {

        return {error: error.message}
    }

}

export const create_project = async (projectData) => {

    try {

        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/user/project?postedBy=${loggedInData._id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            }
        );

        const data = await response.json();

        revalidatePath(`/profile`)

        return data;
        

    } catch (error) {

        return {error: error.message}
    }

}

export const update_project = async (projectId, projectData) => {

    try {

        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/user/project?postedBy=${loggedInData._id}&projectId=${projectId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            }
        );

        const data = await response.json();

        revalidatePath(`/profile`)

        return data;
        

    } catch (error) {

        return {error: error.message}
    }

}



