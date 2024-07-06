import { BlogPost } from "../models/blogModel";
import { Job } from "../models/jobModel";
import { Poll } from "../models/pollModel";
import { Thread } from "../models/threadModel";
import { connectToDB } from "../utils";

function isValidObjectId(id) {
    const objectIdPattern = /^[a-fA-F0-9]{24}$/;
    return objectIdPattern.test(id);
}

export const get_resource_byID= async (resourceType, resource_id) => {

    try {

        connectToDB();

        const resourceTypes = ["thread", "poll", "job", "blogpost"]
        if(!resourceTypes.includes(resourceType)){
            return { error: "Invalid resource" }
        }

        if (!isValidObjectId(resource_id)) return { error: "Invalid Object ID" }

        let data;

        if (resourceType === "thread") {

            data = await Thread.findOne({ _id: resource_id });

            if (!data) return { error: "Resource not found" }

            return data

        }

        if (resourceType === "poll") {

            data = await Poll.findOne({ _id: resource_id });

            if (!data) return { error: "Resource not found" }

            return data

        }

        if (resourceType === "job") {

            data = await Job.findOne({ _id: resource_id });

            if (!data) return { error: "Resource not found" }

            return data

        }

        if (resourceType === "blogpost") {

            data = await BlogPost.findOne({ _id: resource_id });

            if (!data) return { error: "Resource not found" }

            return data

        }


    } catch (error) {

        return { error: "Failed to load resource ffff" }
         
    }

}