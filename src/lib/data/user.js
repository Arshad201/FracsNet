import { redirect } from "next/navigation";
import { User } from "../models/userModel";
import { connectToDB } from "../utils"
import { Education } from "../models/educationModel";
import { workExperience } from "../models/workExperienceModel";
import { Contact } from "../models/contactModel";
import { Project } from "../models/projectModel";
import { GetSession } from "../utils/getSessionData";


export const get_loggedIn_user = async () => {
    
    try {
        
        connectToDB();
        const loggedInUser = await GetSession();
        var user = await User.findOne({ _id: loggedInUser._id });

        return user;

    } catch (error) {
        return { error: "Failed to load profile" }
    }

}

export const get_User_By_UserName = async (userName) => {


    try {

        connectToDB();

        var user = await User.findOne({ userName });

        return user

    } catch (error) {
        return { error: "Failed to load profile" }
    }

}

export const get_User_Education = async (userId) => {

    try {

        connectToDB();

        const education = await Education.findOne({ userId });

        return education

    } catch (error) {
        return { error: "Failed to load User's educational background, please refresh the page!" }
    }
}

export const get_User_Work_Experience = async (userId) => {

    try {

        connectToDB();

        const experience = await workExperience.findOne({ userId });

        return experience;

    } catch (error) {
        return { error: "Failed to load User's working background, please refresh the page!" }
    }
}

export const get_User_Contact_Details = async (userId) => {

    try {

        connectToDB();

        const contact = await Contact.findOne({ userId });

        return contact;

    } catch (error) {
        return { error: "Failed to load User's contacts, please refresh the page!" }
    }
}
export const get_User_projects = async (postedBy) => {

    try {

        connectToDB();

        const projects = await Project.find({ postedBy });

        return projects;

    } catch (error) {
        return { error: "Failed to load User's projects, please refresh the page!" }
    }
}