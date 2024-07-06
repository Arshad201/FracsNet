"use client"
import style from './Comment.module.css';
import { BiLike, BiSolidLike } from "react-icons/bi";
import CommentForm from '../CommentForm/CommentForm';
import Reply from '../Reply/Reply';
import { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { formattingName, formattingTime } from '@/lib/utils/valueFormatting';
import Settings from '../Settings/Settings';
import { StateContext } from '@/app/context/State';
import { do_undo_like } from '@/app/server-actions/like/like';
import { useSession } from 'next-auth/react';
import { deleteResourceData } from '@/app/server-actions/resource/resource';
import { report_to_fracsNet } from '@/app/server-actions/setting/setting';

const CommentCard = ({ data }) => {


    const { data: loggedInUser } = useSession();
    const { openComment, setOpenComment, setAllReplyIds, updateComment,
        setUpdateComment, scrollToCommentForm, setScrollToCommentForm, scrollToComment, setCommentArr, setAllCommentIds } = useContext(StateContext);

    const [like, setLike] = useState(data.likes);
    const [showForm, setShowForm] = useState(false);
    const commentRef = useRef(null);

    const setRepliesHandler = () => {

        if (openComment === data._id) {
            setOpenComment("");
            return;
        }
        setAllReplyIds(data.replies)
        setOpenComment(data._id)

    }

    const likeHandler = async () => {
        try {

            like.includes(loggedInUser._id) ? setLike(prev => prev.filter(i => i !== loggedInUser._id)) : setLike(prev => [...prev, loggedInUser._id]);

            const res = await do_undo_like("comment", data._id);
            return res
        } catch (error) {
            return { error: "failed to hit like button" }
        }
    }


    const settingItemsForcommentAdmin = [

        {
            type: "action",
            text: "Delete",
            action: (data) => {

                const res = deleteResourceData(data)
                
                setCommentArr(prev => prev.filter(comment => comment._id != data._id));
                setAllCommentIds(prev => prev.filter(id => id != data._id))

                return res

            }
        },
        {
            type: "action",
            text: "Edit",
            action: () => {
                setUpdateComment(data)
                setScrollToCommentForm(true)
                setTimeout(() => {
                    setScrollToCommentForm(false)
                }, 100);
            },
        },

    ]


    const settingItemsForNotcommentAdmin = [
        {
            type: "action",
            text: "Report to FracsNet",
            action: report_to_fracsNet
        },
    ]


    let settingsItems = [];
    if (data.createdBy._id == loggedInUser._id) {
        settingsItems = settingItemsForcommentAdmin
    }

    if (data.createdBy._id != loggedInUser._id) {
        settingsItems = settingItemsForNotcommentAdmin
    }

    useEffect(() => {

        if (scrollToComment === data._id) {
            commentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [scrollToComment])

    return (
        <div className={style.comment} ref={commentRef}>
            <div className={style.userDetails}>
                <div className={style.leftWrapper} >
                    <Link href={`/profile/${data.createdBy.userName}`} className={style.profilePic}>
                        <img src={data.createdBy.profilePic.url} alt="" />
                    </Link>
                    <div className={style.profileInfo} >
                        <span className={style.name}>{formattingName(data.createdBy)}</span>
                        <span className={style.postedOn}>{formattingTime(data.createdAt)}</span>
                    </div>
                </div>
                {/* <Settings settingOptions={[]} /> */}
                <Settings data={data} settingOptions={settingsItems} />

            </div>
            <div className={style.commentBody}>
                {data.commentImage && <div className={style.commentImg}>
                    <img src={data.commentImage.url} alt="" />
                </div>}
                <p className={style.text}>{data.commentText}</p>
            </div>
            <div className={style.commentFooter}>
                <div className={style.like} onClick={likeHandler}>
                    {like.length}
                    {
                        like.includes(loggedInUser._id)
                            ?
                            <BiSolidLike className={style.icon} />
                            :
                            <BiLike className={style.icon} />
                    }
                </div>
                <button className={style.btn} onClick={() => setShowForm(!showForm)}>Reply</button>
                <div className={style.like} onClick={setRepliesHandler}>{data.replies.length} Replies</div>
            </div>
            {showForm &&
                <CommentForm
                    formType={"reply"}
                    commentId={data._id}
                />}
            {openComment === data._id &&
                <Reply data={data.replies} />}
        </div>
    )
}

export default CommentCard