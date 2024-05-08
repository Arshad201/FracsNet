import style from "./RecentBlog.module.css";
import BlogPostCard from "../../Miscellaneous/BlogPostCard/BlogPostCard.jsx";
import BlogPostCardSkeleton from "@/Components/Miscellaneous/BlogPostCard/BlogPostCardSkeleton";

const RecentBlogSkeleton = () => {
  return (
    <section className={style.RecentBlog}>
        <div className="wrapper-width">
        <h2 className="sectionHeading">Our Latest Blog posts</h2>
        <div className={style.blogs}>
             <BlogPostCardSkeleton/>
             <BlogPostCardSkeleton/>
             <BlogPostCardSkeleton/>
        </div>
        </div>
    </section>
  )
}

export default RecentBlogSkeleton