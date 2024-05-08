import Link from "next/link"
import style from "./BlogPostCard.module.css"
import { MotionDiv } from "../MotionDiv"

const BlogPostCard = ({index, data}) => {

    const variants = {
        hidden: { opacity: 0 },
        visible: {opacity: 1}
    }
  
    return (
      <MotionDiv
      variants={variants}
      initial = "hidden"
      animate = "visible"
      transition={{
          delay: index*0.25,
          ease: "easeInOut",
          duration: 0.5
      }}
      className={style.BlogPostCard} >
        <span className={style.badge}>{data.category}</span>
        <div className={style.imgBox}>
            <img src="/blogPost.jpg" alt="" />
            <div className={style.userProfile}>
                <img src="/profile.jpg" alt="" />
            </div>
        </div>
        <div className={style.body}>
            <h2 className={style.blogTitle}>{data.title}</h2>
            <p className={style.blogDesc}>{data.content.slice(0, 150)}...</p>
            <Link href={"/"} className={style.readmore}>Read more</Link>
        </div>
        <div className={style.footer}>
            <span>By Muhammad Arshad</span>
            <span className={style.dot}></span>
            <span>22 April 2024</span>
            <span className={style.dot}></span>
            <span>{data.comments.length} Comments</span>
            <span className={style.dot}></span>
            <span>{data.likes.length} Likes</span>
        </div>
    </MotionDiv>
  )
}

export default BlogPostCard