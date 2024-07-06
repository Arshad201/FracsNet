"use server"
import { GetSession } from "@/lib/utils/getSessionData";

export const create_blogpost = async (blogpostObj) => {

    try {
        
        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/blogpost/create?postedBy=${loggedInData._id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogpostObj),
            }
        );

        const data = await response.json();

        return data;
        

    } catch (error) {
        console.log({ error: "API is failed to create blogpost" });
    }

}

export const update_blogpost = async (blogpostObj) => {

    try {
        
        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/blogpost/update?postedBy=${loggedInData._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogpostObj),
            }
        );

        const data = await response.json();

        return data;
        

    } catch (error) {
        console.log({ error: "API is failed to Update the blogpost" });
    }

}

