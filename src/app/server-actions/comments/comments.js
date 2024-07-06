"use server";

import { GetSession } from "@/lib/utils/getSessionData";


export const load_comments = async (idsOfComments, currentPage) => {

    try {


        const response = await fetch(`http://localhost:3000/api/comment/read?ids-of-comments=${idsOfComments}&page=${currentPage}`);

        const data = await response.json();

        return data;

    } catch (error) {
        console.log({ error: "failed to load comments" });
    }

}

export const load_replies = async (idsOfReplies, currentPage) => {

    try {


        const response = await fetch(`http://localhost:3000/api/reply/read?ids-of-replies=${idsOfReplies}&page=${currentPage}`);

        const data = await response.json();

        return data;

    } catch (error) {
        console.log({ error: "failed to load replies" });
    }

}

export const do_comment = async (comment, holderId, holderType) => {

    try {

        
        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/comment/create?holderId=${holderId}&holderType=${holderType}&createdBy=${loggedInData._id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            }
        );

        const data = await response.json();
        // revalidatePath("/", "layout");
        return data;

    } catch (error) {
        console.log({ error: "failed to post comment" });
    }

}

export const update_comment = async (formData, updateComment) => {

    try {

        
        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/comment/update?commentId=${updateComment._id}&createdBy=${loggedInData._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }
        );

        const data = await response.json();
        return data;

    } catch (error) {
        console.log({ error: "failed to post comment" });
    }

}

export const do_reply = async (reply, commentId) => {

    try {

        
        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/reply/create?commentId=${commentId}&createdBy=${loggedInData._id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reply),
            }
        );

        const data = await response.json();
        // revalidatePath("/");
        return data;
        

    } catch (error) {
        console.log({ error: "failed to post reply" });
    }

}

export const update_reply = async (formData, updateReply) => {

    try {

        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/reply/update?replyId=${updateReply._id}&createdBy=${loggedInData._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }
        );

        const data = await response.json();
        return data;

    } catch (error) {
        console.log({ error: "failed to Update Reply" });
    }

}
