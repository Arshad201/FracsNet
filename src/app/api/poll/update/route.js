import { Group } from "@/lib/models/groupModel";
import { Poll } from "@/lib/models/pollModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

//Updating poll
export const PUT = async (req, { params }) => {

    try {

        connectToDB();

        const pollId = req.nextUrl.searchParams.get('pollId');
        const postedBy = req.nextUrl.searchParams.get('userId');

        const body = await req.json();
        const { question, option_1, option_2, option_3, option_4, option_5 } = body;

        let poll = await Poll.findOne({ _id: pollId });

        if (poll.postedBy != postedBy) {
            return NextResponse.json({
                error: "You can't change other's poll"
            }, { status: 400 });
        }

        poll.question = question
        poll.option_1.optionText = option_1
        poll.option_2.optionText = option_2
        poll.option_3.optionText = option_3
        poll.option_4.optionText = option_4
        poll.option_5.optionText = option_5

        poll = await poll.save({validateBeforeSave: true})

        return NextResponse.json({
            message: "Poll Updated!",
        }, { status: 201 });


    } catch (error) {

        return NextResponse.json({ error: error.message });

    }
}