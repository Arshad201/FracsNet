import { Group } from "../models/groupModel";
import { connectToDB } from "../utils";

export const get_Group_By_GroupID = async (groupID) => {

    try {

        connectToDB();

        const group = await Group.findOne({ _id: groupID }).populate("members");

        return group;

    } catch (error) {
        return { error: "Failed to fetch Group" }
    }

}