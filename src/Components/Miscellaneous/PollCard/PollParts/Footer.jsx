"use client";
import style from "../PollCard.module.css";
import { useContext, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlinePoll } from "react-icons/md";
import Comment from "../../Comment/Comments";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { StateContext } from "@/app/context/State";
import { do_undo_like } from "@/app/server-actions/like/like";


const Footer = ({ data }) => {


    const { data: loggedInUser } = useSession();
    const [like, setLike] = useState(data.likes);
    const router = useRouter();
    const { setPostType, openPost, setOpenPost, allCommentIds, setAllCommentIds, setCommentArr, setUpdateComment, setUpdateReply } = useContext(StateContext);

    const totalVotes = [
        ...data.option_1.votes,
        ...data.option_2.votes,
        ...data.option_3.votes,
        ...data.option_4.votes,
        ...data.option_5.votes,
    ]

    const setCommentsHandler = () => {

        if (openPost === data._id) {
            setAllCommentIds([])
            setCommentArr([])
            setOpenPost("");
            setPostType("");
            setUpdateComment(null);
            setUpdateReply(null);
            router.refresh();
            return;
        }
        setAllCommentIds(data.comments)
        setOpenPost(data._id)
        setPostType("poll");

    }

    const likeHandler = async () => {
        try {

            like.includes(loggedInUser._id) ? setLike(prev => prev.filter(i => i !== loggedInUser._id)) : setLike(prev => [...prev, loggedInUser._id]);

            const res = await do_undo_like("poll", data._id);
            return res
        } catch (error) {
            return { error: "failed to hit like button" }
        }
    }

    return (
        <>
            <div className={style.footer}>
                <button className={style.item} onClick={likeHandler}>
                    {like.length} Likes
                    {
                        like.includes(loggedInUser?._id)
                            ?
                            <BiSolidLike className={style.iconsInPost} />
                            :
                            <BiLike className={style.iconsInPost} />
                    }
                </button>
                <button className={style.item} onClick={setCommentsHandler}>
                    {openPost === data._id ? allCommentIds.length : data.comments.length} Comments
                    <BiComment className={style.iconsInPost} />
                </button>
                <button className={style.item}>
                    {totalVotes.length} votes
                    <MdOutlinePoll className={style.iconsInPost} />
                </button>
                <button className={style.item}>
                    {data.shares.length} Shares
                    <IoShareSocialOutline className={style.iconsInPost} />
                </button>
            </div>
            {openPost === data._id && <Comment />}
        </>
    )
}

export default Footer