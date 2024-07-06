"use client";
import style from "../ThreadCard.module.css";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import { IoShareSocialOutline } from "react-icons/io5";
import Comment from "../../Comment/Comments";
import { useContext, useState } from "react";
import { StateContext } from "@/app/context/State";
import { useRouter } from "next/navigation";
import { do_undo_like } from "@/app/server-actions/like/like";
import { useSession } from "next-auth/react";

const Footer = ({ data }) => {

    const { data:loggedInUser } = useSession();
    const [like, setLike] = useState(data.likes);
    const router = useRouter();
    const { setPostType, openPost, setOpenPost, allCommentIds, setAllCommentIds, setCommentArr, setUpdateComment, setUpdateReply } = useContext(StateContext);

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
        setPostType("thread");

    }

    const likeHandler = async () => {
        try {

            like.includes(loggedInUser._id) ? setLike(prev => prev.filter(i => i !== loggedInUser._id)) : setLike(prev => [...prev, loggedInUser._id]);

            const res = await do_undo_like("thread", data._id);
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
                    {data.shares.length} Shares
                    <IoShareSocialOutline className={style.iconsInPost} />
                </button>
            </div>
            {openPost === data._id && <Comment />}
        </>
    )
}

export default Footer