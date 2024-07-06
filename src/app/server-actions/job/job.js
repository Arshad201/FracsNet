"use server"
import { GetSession } from "@/lib/utils/getSessionData";

export const create_job = async (jobObj) => {

    try {
        
        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/job/create?postedBy=${loggedInData._id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobObj),
            }
        );

        const data = await response.json();

        return data;
        

    } catch (error) {
       return { error: "API is failed to create job, try again!" };
    }

}

export const update_job = async (jobObj) => {

    try {

        console.log({jobObj})
        
        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/job/update?postedBy=${loggedInData._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobObj),
            }
        );

        const data = await response.json();

        return data;
        

    } catch (error) {
       return { error: "API is failed to Update job, try again!" };
    }

}
