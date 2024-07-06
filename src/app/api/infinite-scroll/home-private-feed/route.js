import { Job } from "@/lib/models/jobModel";
import { Poll } from "@/lib/models/pollModel";
import { Thread } from "@/lib/models/threadModel";
import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import getSessionData from "@/lib/utils/getSessionData";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req, { params }) => {

    try {

        
        connectToDB();
        
        const page = parseInt(req.nextUrl.searchParams.get('page'));
        const limit = parseInt(req.nextUrl.searchParams.get('resultPerPage'));
        const userId = req.nextUrl.searchParams.get('userId').toString();
        

        const user = await User.findById(userId);
        const network = user.network;
        const joinedGroup = user.joinedGroups;

        //Result should be Posts from networks, Joined Groups and self
        const threads = await Thread.find({
            $or: [
                { postedBy: userId },
                { postedBy: { $in: network } },
                { postedIn: { $in: joinedGroup } },
            ]
        })
        .populate("postedBy", "firstName lastName userName profilePic email")

        const polls = await Poll.find({
            $or: [
                { postedBy: userId },
                { postedBy: { $in: network } },
                { postedIn: { $in: joinedGroup } },
            ]
        }).populate("postedBy", "firstName lastName userName profilePic email");

        const jobs = await Job.find({
            $or: [
                { employer: userId },
                { employer: { $in: network } },
                { postedIn: { $in: joinedGroup } },
            ]
        }).populate("employer", "firstName lastName userName profilePic email");

        let data = [...threads, ...polls, ...jobs];

        // Sort Data Randomly
        // data = data.sort(function () { return 0.5 - Math.random() });

        const totalPages = Math.ceil(data.length / limit);

        //Sort New to Old Post
        data = data.sort((a, b) => b.createdAt - a.createdAt);

        //Apply Pagination
        const start = (page - 1) * limit;
        const end = start + limit;
        data = data.slice(start, end)

        return NextResponse.json({
            totalPages,
            data,
        }, { status: 200 });


    } catch (error) {

        return NextResponse.json(error.message);

    }
}