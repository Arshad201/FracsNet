"use server"
import { GetSession } from "@/lib/utils/getSessionData";

export const create_thread = async (threadData) => {

    try {
        
        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/thread/create?userId=${loggedInData._id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(threadData),
            }
        );

        const data = await response.json();

        return data;
        

    } catch (error) {
        console.log(error.message);
        console.log({ error: "API is failed to Create Thread" });
    }

}

export const update_thread = async (threadData) => {


    try {
        
        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/thread/update?userId=${loggedInData._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(threadData),
            }
        );

        const data = await response.json();

        return data;
        

    } catch (error) {
        console.log(error.message);
        console.log({ error: "API is failed to Update Thread" });
    }

}
