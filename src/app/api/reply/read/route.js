import { Comment } from "@/lib/models/commentModel";
import { Reply } from "@/lib/models/replyModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


//Getting Comment through holder Id
export const GET = async (req, { params }) => {

    try {

        connectToDB();

        let idsOfReplies = req.nextUrl.searchParams.get('ids-of-replies');
        let page = req.nextUrl.searchParams.get('page');
        const limit = 1

        idsOfReplies = idsOfReplies.split(",");

        console.log({idsOfReplies});

        let replies = await Reply.find({ _id: { $in: idsOfReplies } })

        const totalItems = replies.length;
        const totalPages = Math.ceil(totalItems / limit);

        replies = await Reply.find({ _id: { $in: idsOfReplies } })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .populate("createdBy", "firstName lastName userName profilePic email");

        return NextResponse.json({
            totalPages,
            replies
        }, { status: 200 });


    } catch (error) {

        return NextResponse.json(error);

    }
}