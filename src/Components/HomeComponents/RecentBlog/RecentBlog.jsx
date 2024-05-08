import style from "./RecentBlog.module.css";
import LoadMore from "./LoadMore";
import { fetchLatestBlogPost } from "@/app/server-actions/blogpost/action";

const RecentBlog = async() => {

  const data = await fetchLatestBlogPost(1);

  return (
    <section className={style.RecentBlog}>
        <div className="wrapper-width">
        <h2 className="sectionHeading">Our Latest Blog posts</h2>
        <div className={style.blogs}>
             {data}
        </div>
        <LoadMore/>
        </div>
    </section>
  )
}

export default RecentBlog