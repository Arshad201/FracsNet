import style from "./RecentDiscussion.module.css";
import LoadMore from "./LoadMore";
import { fetchRecentThread } from "@/app/server-actions/thread/action";


const RecentDiscussion = async() => {

  const data = await fetchRecentThread(1);

  return (
    <section className={style.recentDiscussion}>
        <div className="wrapper-width">
          <h2 className="sectionHeading">Recent Thread</h2>
          <div className={style.posts}>
              {data}
          </div>
          <LoadMore/>
        </div>
    </section>
  )
}

export default RecentDiscussion