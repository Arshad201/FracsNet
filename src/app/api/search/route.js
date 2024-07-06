import { BlogPost } from "@/lib/models/blogModel";
import { Comment } from "@/lib/models/commentModel";
import { Group } from "@/lib/models/groupModel";
import { Job } from "@/lib/models/jobModel";
import { Poll } from "@/lib/models/pollModel";
import { Reply } from "@/lib/models/replyModel";
import { Thread } from "@/lib/models/threadModel";
import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import { Types } from "mongoose";
import { NextResponse } from "next/server";


//Search
export const GET = async (req, { params }) => {

    try {

        connectToDB();

        const searchKey = req.nextUrl.searchParams.get('searchKey').toString();
        const searchType = req.nextUrl.searchParams.get('searchType').toString();
        const page = parseInt(req.nextUrl.searchParams.get('page'));
        const limit = 2


        const searchRegex = new RegExp(searchKey, 'i');
        let result;
        let totalPages;
        let totalItems;

        const isValid_id = Types.ObjectId.isValid(searchKey);

        if (searchType === "user") {

            const query = isValid_id ?
                {
                    $or: [
                        { _id: searchKey }
                    ]
                }
                :
                {
                    $or: [
                        { firstName: searchRegex },
                        { lasttName: searchRegex },
                        { email: searchRegex },
                        { bio: searchRegex },
                        { accountType: searchRegex },
                        { userName: searchRegex },
                    ]
                }

            const data = await User.find(query);
            totalItems = data.length;
            totalPages = Math.ceil(totalItems / limit);

            result = await User.find(query).limit(limit)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 });
        }

        if (searchType === "thread") {

            const query = isValid_id ?
                {
                    $or: [
                        { _id: searchKey },
                        { postedBy: searchKey },
                    ]
                }
                :
                {
                    $or: [
                        { threadText: searchRegex },
                    ]
                }

            const data = await Thread.find(query);
            totalItems = data.length;
            totalPages = Math.ceil(totalItems / limit);


            result = await Thread.find(query).limit(limit)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 }).populate("postedBy", "firstName lastName userName profilePic email");


        }

        if (searchType === "poll") {

            const query = isValid_id ?
                {
                    $or: [
                        { _id: searchKey },
                        { postedBy: searchKey },
                    ]
                }
                :
                {
                    $or: [
                        { question: searchRegex },
                    ]
                }

            const data = await Poll.find(query);
            totalItems = data.length;
            totalPages = Math.ceil(totalItems / limit);

            result = await Poll.find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 })
                .populate("postedBy", "firstName lastName userName profilePic email");

        }

        if (searchType === "job") {

            const query = isValid_id ?
                {
                    $or: [
                        { _id: searchKey },
                        { employer: searchKey },
                    ]
                }
                :
                {
                    $or: [
                        { title: searchRegex },
                        { description: searchRegex },
                    ]
                }

            const data = await Job.find(query);
            totalItems = data.length;
            totalPages = Math.ceil(totalItems / limit);


            result = await Job.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .populate("employer", "firstName lastName userName profilePic email");



        }

        if (searchType === "blogpost") {

            const query = isValid_id ?
            {
                $or: [
                    { _id: searchKey },
                    { author: searchKey },
                ]
            }
            :
            {
                $or: [
                    { title: searchRegex },
                    { metaDescription: searchRegex },
                    { slug: searchRegex },
                    { content: searchRegex },
                    { excerpt: searchRegex },
                ]
            }

            const data = await BlogPost.find(query);
            totalItems = data.length;
            totalPages = Math.ceil(totalItems / limit);

            result = await BlogPost.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .populate("author", "firstName lastName userName profilePic email");

        }

        if (searchType === "group") {

            const query =  isValid_id ?
            {
                $or: [
                    { _id: searchKey },
                    { groupAdmin: searchKey },
                ]
            }
            :
            {
                $or: [
                    { groupTitle: searchRegex },
                    { groupDescription: searchRegex },
                ]
            }

            const data = await Group.find(query);
            totalItems = data.length;
            totalPages = Math.ceil(totalItems / limit);


            result = await Group.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .populate("groupAdmin", "firstName lastName userName profilePic email");

        }

        if (searchType === "comment") {

            const query =  isValid_id ?
            {
                $or: [
                    { _id: searchKey },
                    { createdBy: searchKey },
                ]
            }
            :
            {
                $or: [
                    { commentText: searchRegex },
                ]
            }

            const data = await Comment.find(query);
            totalItems = data.length;
            totalPages = Math.ceil(totalItems / limit);


            result = await Comment.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .populate("createdBy", "firstName lastName userName profilePic email");

        }

        if (searchType === "reply") {

            const query =  isValid_id ?
            {
                $or: [
                    { _id: searchKey },
                    { createdBy: searchKey },
                ]
            }
            :
            {
                $or: [
                    { replyText: searchRegex },
                ]
            }

            const data = await Reply.find(query);
            totalItems = data.length;
            totalPages = Math.ceil(totalItems / limit);


            result = await Reply.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .populate("createdBy", "firstName lastName userName profilePic email");

        }

        return NextResponse.json({
            totalPages,
            totalItems,
            result
        }, { status: 200 });


    } catch (error) {

        return NextResponse.json(error);

    }
}