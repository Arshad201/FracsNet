import { BlogPost } from "../models/blogModel";
import { connectToDB } from "../utils";

export const get_latest_blogposts = async ( ) => {

    try {

        connectToDB();

        const blogposts = await BlogPost.find({}).limit(5);

        return  blogposts;

    } catch (error) {
        return { error: "Failed to load latest blogposts" }
    }

}


export const get_blogpost_bySlug = async (slug) => {

    try {

        connectToDB();

        const blogpost = await BlogPost.findOne({slug}).populate("author", "firstName lastName userName email profilePic");

        return  blogpost;

    } catch (error) {
        return { error: "Failed to load blogpost" }
    }

}