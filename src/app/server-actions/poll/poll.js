"use server"
import { GetSession } from "@/lib/utils/getSessionData";

export const do_vote = async (pollId, votingOption) => {


    try {


        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/poll/vote?pollId=${pollId}&userId=${loggedInData._id}&voteOption=${votingOption}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            }
        );

        const data = await response.json();

        return data.poll;


    } catch (error) {
        console.log(error.message);
        console.log({ error: "API is failed to Vote the option!" });
    }

}

export const create_poll = async (pollData) => {

    try {

        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/poll/create?userId=${loggedInData._id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pollData),
            }
        );

        const data = await response.json();

        return data;


    } catch (error) {
        return { error: error.message }
    }

}

export const update_poll = async (pollData, pollId) => {

    try {

        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/poll/update?userId=${loggedInData._id}&pollId=${pollId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pollData),
            }
        );

        const data = await response.json();

        return data;


    } catch (error) {
        return { error: error.message }
    }

}


