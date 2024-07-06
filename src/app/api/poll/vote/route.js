import { Group } from "@/lib/models/groupModel";
import { Poll } from "@/lib/models/pollModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//Updating Thread
export const POST = async (req, { params }) => {

    try {

        console.log("in the votin route")

        connectToDB();

        const pollId = req.nextUrl.searchParams.get('pollId');
        const userId = req.nextUrl.searchParams.get('userId');
        const voteOption = req.nextUrl.searchParams.get('voteOption');

        // console.log({pollId, userId, voteOption})
        const poll = await Poll.findById(pollId)
        // console.log(poll);

        let totalVote = [...poll.option_1.votes, ...poll.option_2.votes, ...poll.option_3.votes, ...poll.option_4.votes, ...poll.option_5.votes];

        // console.log({totalVote});


        const isExist = totalVote.filter(i => i == userId);

        // console.log({isExist});


        if (isExist.length !== 0) {


            const option1Votes = poll.option_1.votes.filter(i => i != userId);
            const option2Votes = poll.option_2.votes.filter(i => i != userId);
            const option3Votes = poll.option_3.votes.filter(i => i != userId);
            const option4Votes = poll.option_4.votes.filter(i => i != userId);
            const option5Votes = poll.option_5.votes.filter(i => i != userId);

            poll.option_1.votes = option1Votes
            poll.option_2.votes = option2Votes
            poll.option_3.votes = option3Votes
            poll.option_4.votes = option4Votes
            poll.option_5.votes = option5Votes

        }


        console.log({voteOption});
        console.log(poll[voteOption])

        poll[voteOption].votes.unshift(userId);



        totalVote = [...poll.option_1.votes, ...poll.option_2.votes, ...poll.option_3.votes, ...poll.option_4.votes, ...poll.option_5.votes];

        //Percentage of voting in an option
        const option_1P = poll.option_1.votes.length / totalVote.length * 100;
        const option_2P = poll.option_2.votes.length / totalVote.length * 100;
        const option_3P = poll.option_3.votes.length / totalVote.length * 100;
        const option_4P = poll.option_4.votes.length / totalVote.length * 100;
        const option_5P = poll.option_5.votes.length / totalVote.length * 100;


        poll.option_1.percentage = option_1P
        poll.option_2.percentage = option_2P
        poll.option_3.percentage = option_3P
        poll.option_4.percentage = option_4P
        poll.option_5.percentage = option_5P

        await poll.save({ validateBeforeSave: true })


        return NextResponse.json({
            poll
        }, { status: 201 });


    } catch (error) {

        return NextResponse.json(error);

    }
}