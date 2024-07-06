import Link from "next/link"
import style from "./BlogPostCard.module.css"
import { MotionDiv } from "../MotionDiv"
import { formattingNameInHome, formattingTime } from "@/lib/utils/valueFormatting"
import Settings from "../Settings/Settings"

const BlogPostCard = ({ index, data }) => {

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
            className={style.BlogPostCard} >
            <span className={style.badge}>{data.category}</span>
            <div className={style.imgBox}>
                <img src={data.blogImage.url} alt="" />
                <Link href={`/profile/${data.author.userName}`} className={style.userProfile}>
                    <img src={data.author.profilePic.url} alt="" />
                </Link>
            </div>
            <div className={style.body}>
                <h2 className={style.blogTitle}>{data.title}</h2>
                <p className={style.blogDesc}>{data.excerpt}.</p>
                <Link href={`/blog/${data.slug}`} className={style.readmore}>Read more</Link>
            </div>
            <div className={style.footer}>
                <Settings settingOptions={[]} />
                <span>By {formattingNameInHome(data.author)}</span>
                <span className={style.dot}></span>
                <span>{formattingTime(data.createdAt)}</span>
                <span className={style.dot}></span>
                <span>{data.comments.length} Comments</span>
                <span className={style.dot}></span>
                <span>{data.likes.length} Likes</span>
            </div>
        </MotionDiv>
    )
}

export default BlogPostCard