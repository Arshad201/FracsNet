"use client";

import style from './Reply.module.css';
import { BiLike, BiSolidLike } from "react-icons/bi";
import CommentForm from '../CommentForm/CommentForm';
import { useContext, useState } from 'react';
import { formattingName, formattingTime } from '@/lib/utils/valueFormatting';
import Link from 'next/link';
import Settings from '../Settings/Settings';
import { StateContext } from '@/app/context/State';
import { useSession } from 'next-auth/react';
import { do_undo_like } from '@/app/server-actions/like/like';
import { deleteResourceData } from '@/app/server-actions/resource/resource';
import { report_to_fracsNet } from '@/app/server-actions/setting/setting';

const ReplyCard = ({ data }) => {

    const { data: loggedInUser } = useSession();
    const { openComment, openReply, setOpenReply, updateReply, setUpdateReply, setReplyArr, setAllReplyIds, setCommentArr} = useContext(StateContext);
    const [like, setLike] = useState(data.likes);

    const handleFormVisibility = () => {

        if (openReply === data._id) {
            setOpenReply("");
            return;
        }
        setOpenReply(data._id)
        setUpdateReply(null)
    }

    const likeHandler = async () => {
        try {

            like.includes(loggedInUser._id) ? setLike(prev => prev.filter(i => i !== loggedInUser._id)) : setLike(prev => [...prev, loggedInUser._id]);

            const res = await do_undo_like("reply", data._id);
            return res
        } catch (error) {
            return { error: "failed to hit like button" }
        }
    }


    const settingItemsForcommentAdmin = [

        {
            type: "action",
            text: "Delete",
            action: (data)=>{

                const res = deleteResourceData(data)

                setReplyArr(prev=>prev.filter(reply=>reply._id!=data._id))

                setAllReplyIds(prev=>prev.filter(id=>id!=data._id))

                setCommentArr(prev=>prev.map(comment=>{
                    if(comment._id == openComment){
                        comment.replies.filter(reply=>reply != data._id)
                    }
                    return comment
                }))

                return res
            }
        },
        {
            type: "action",
            text: "Edit",
            action: () => {
                setOpenReply(data._id)
                setUpdateReply(data)
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

    return (
        <>
            <div className={style.comment}>
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
                    <Settings data={data} settingOptions={settingsItems} />
                </div>
                <div className={style.commentBody}>
                    {/* <Link href={`/`} className={style.repliedTo} >Replied to @username</Link> */}
                    {data.replyImage &&
                        <div className={style.commentImg}>
                            <img src={data.replyImage.url} alt="" />
                        </div>}
                    <p className={style.text}>{data.replyText}</p>
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
                    <button className={style.btn} onClick={handleFormVisibility}>Reply</button>
                </div>
                {openReply === data._id && <CommentForm formType={"reply"} />}
            </div>
        </>
    )
}

export default ReplyCard