"use client";

import style from "../../SingleBlogPage.module.css";
import { LuHeart } from "react-icons/lu";
import { BiComment } from "react-icons/bi";
import { IoShareSocialOutline } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";
import { formattingName, formattingTime } from "@/lib/utils/valueFormatting";


const Footer = ({ data }) => {

    const [commentVisible, setCommentVisible] = useState(false);

    return (
        <div className={style.footer}>

            <div className={style.meta}>
                <span>Author :</span>
                <div className={style.postHeader}>
                    <div className={style.leftPart}>
                        <Link href={`/profile/${data.author.userName}`} className={style.profileImgWrapper}>
                            <img src={data.author.profilePic.url} alt="" />
                        </Link>
                        <div className={style.metaData}>
                            <Link href={`/profile/${data.author.userName}`} className={style.userName}>{formattingName(data.author)}</Link>
                            <span className={style.postedOn}>{formattingTime(data.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.meta}>
                <span>Category :</span>
                <Link href={`/blog?category=${data.category}`} className={style.link}>
                    {data.category}
                </Link>
            </div>

            {data.tags.length>0 && <div className={style.meta}>
                <span>Tags :</span>
                <div className={style.tags}>
                    <Link href={`/blog?category=${data.category}`} className={style.link}>
                        {data.category}
                    </Link>
                    <Link href={`/blog?category=${data.category}`} className={style.link}>
                        {data.category}
                    </Link>
                    <Link href={`/blog?category=${data.category}`} className={style.link}>
                        {data.category}
                    </Link>
                    <Link href={`/blog?category=${data.category}`} className={style.link}>
                        {data.category}
                    </Link>
                </div>
            </div>}

            <div className={style.meta}>
                <span>Likes :</span>
                <div className={style.link}>
                    <LuHeart className={style.iconsInPost} />
                    {data.likes.length}
                </div>
            </div>

            <div className={style.meta}>
                <span>Comments :</span>
                <div className={style.link}>
                    <BiComment className={style.iconsInPost} />
                    {data.comments.length}
                </div>
            </div>

            <div className={style.meta}>
                <span>Shares :</span>
                <div className={style.link}>
                    <IoShareSocialOutline className={style.iconsInPost} />
                    {data.shares.length}
                </div>
            </div>
            {commentVisible && <Comment />}
        </div>
    )
}

export default Footer