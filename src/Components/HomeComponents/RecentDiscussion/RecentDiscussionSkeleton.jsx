import style from "./RecentDiscussion.module.css";
import PostCardSkeleton from "@/Components/Miscellaneous/ThreadCard/PostCardSkeleton";

const RecentDiscussionSkeleton = () => {

  
  return (
    <section className={style.recentDiscussion}>
        <div className="wrapper-width">
        <h2 className="sectionHeading">Recent Thread</h2>
        <div className={style.posts}>
             <PostCardSkeleton/>
             <PostCardSkeleton/>
        </div>
        </div>
    </section>
  )
}

export default RecentDiscussionSkeleton