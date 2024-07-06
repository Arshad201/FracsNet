import { Group } from "@/lib/models/groupModel";
import { Poll } from "@/lib/models/pollModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


//Creating Poll
export const POST = async (req, { params }) => {

    try {

        connectToDB();

        const postedBy = req.nextUrl.searchParams.get('userId');

        const body = await req.json();
        const { question, option_1, option_2, option_3, option_4, option_5 } = body;

        const pollObj = {
            question,
            option_1:{
                optionText: option_1,
                votes: [],
                percentage: 0
            },
            option_2:{
                optionText: option_2,
                votes: [],
                percentage: 0
            },
            option_3:{
                optionText: option_3,
                votes: [],
                percentage: 0
            },
            option_4:{
                optionText: option_4,
                votes: [],
                percentage: 0
            },
            option_5:{
                optionText: option_5,
                votes: [],
                percentage: 0
            },
            postedBy
        }

        const poll = await Poll.create(pollObj);

        return NextResponse.json({
            message: "Poll is created!",
            poll
        }, { status: 201 });

    } catch (error) {

        return NextResponse.json({error: error.message});

    }
}