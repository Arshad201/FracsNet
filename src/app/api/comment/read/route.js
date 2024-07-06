import { Comment } from "@/lib/models/commentModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


//Getting Comment through holder Id
export const GET = async (req, { params }) => {

    try {

        connectToDB();

        //Holder can be - thread, blogPost
        const page = req.nextUrl.searchParams.get('page');
        let idsOfComments = req.nextUrl.searchParams.get('ids-of-comments');
        const limit = 1


        idsOfComments = idsOfComments.split(",");


        let comments = await Comment.find({ _id: { $in: idsOfComments } })
        const totalItems = comments.length;
        const totalPages = Math.ceil(totalItems / limit);

        comments = await Comment.find({ _id: { $in: idsOfComments } })
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .populate("createdBy", "firstName lastName userName profilePic email");

        return NextResponse.json({
            totalPages,
            comments
        }, { status: 200 });


    } catch (error) {

        return NextResponse.json(error);

    }
}