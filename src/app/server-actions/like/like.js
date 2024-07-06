"use server"
import { GetSession } from "@/lib/utils/getSessionData";

export const do_undo_like = async (holderType, holderId) => {

    try {
        
        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/like?holderType=${holderType}&holderId=${holderId}&userId=${loggedInData._id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({sd:12}),
            }
        );

        const data = await response.json();

        return data;
        

    } catch (error) {
        console.log(error.message);
        console.log({ error: "API is failed to like" });
    }

}
