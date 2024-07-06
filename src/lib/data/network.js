import { unstable_noStore } from "next/cache";
import { User } from "../models/userModel";
import { connectToDB } from "../utils";

export const get_Network_By_userID = async (userID, pageNumber, itemsPerPage) => {

    
    try {

        connectToDB();

        await new Promise((resolve) => setTimeout(resolve, 3000));


        const user = await User.findById(userID);

        let userNetwork = user.network;

        userNetwork = await User.find({ _id: { $in: userNetwork } });

        const totalPages = Math.ceil(userNetwork.length / itemsPerPage);

        if (pageNumber > totalPages) {
            return { error: "Pages are done!" }
        }


        const start = (pageNumber - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        userNetwork = userNetwork.slice(0, end)

        return {
            totalPages,
            userNetwork
        };

    } catch (error) {
        return { error: "Failed to load Networks" }
    }

}