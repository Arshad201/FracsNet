"use client"
import { useState } from "react";
import style from "./PostCard.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuHeart } from "react-icons/lu";
import { BiComment } from "react-icons/bi";
import { IoShareSocialOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { MotionDiv } from "../MotionDiv";
import Comment from "../Comment/Comment";

const PostCard = ({ index, data }) => {

    const [readmore, setReadMore] = useState(false);
    const [commentVisible, setCommentVisible] = useState(false);

    const postOptionList = [
        "Delete Post",
        "Delete Post",
        "Copylink",
        "Report to Admin",
        "share with your network"
    ]


    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }


    return (
        <MotionDiv
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
                delay: index * 0.25,
                ease: "easeInOut",
                duration: 0.5
            }}
            className={style.postCard}>
            <div className={style.postHeader}>
                <div className={style.leftPart}>
                    {/* Profile Photo  */}
                    <div className={style.profileImgWrapper}>
                        <img src="/profile.jpg" alt="" />
                    </div>
                    <div className={style.metaData}>
                        <span className={style.userName}>John Doe</span>
                        <span className={style.postedOn}>just now</span>
                    </div>
                </div>
                <div className={style.rightPart}>
                    <BsThreeDotsVertical className={style.iconsInPost} />
                    <ul className={style.postOptions}>
                        {postOptionList.map((option) => <li className={style.postOption} key={option}>{option}</li>)}
                    </ul>
                </div>
            </div>
            <div className={style.postBody}>
                <p className={style.postText}>
                    {
                        readmore ?
                            data.content
                            :
                            data.content.slice(0, 150)
                    }
                </p>
                <span className={style.readMoreBtn} onClick={() => setReadMore(!readmore)}>
                    {
                        readmore ? "Read Less" : "Readmore"
                    }
                </span>
                {/* <img src="/profile.jpg" alt="" /> */}
                {/* <video src="/video.mp4" autoPlay></video> */}
            </div>
            <div className={style.footer}>
                <div className={style.item}>
                    {data.likes.length} Likes
                    <LuHeart className={style.iconsInPost} />
                </div>
                <div className={style.item} onClick={() => setCommentVisible(!commentVisible)}>
                    {data.comments.length} Comments
                    <BiComment className={style.iconsInPost} />
                </div>
                <div className={style.item}>
                    {data.likes.length} Shares
                    <IoShareSocialOutline className={style.iconsInPost} />
                </div>
            </div>
            {commentVisible && <Comment />}
        </MotionDiv>
    )
}

export default PostCard