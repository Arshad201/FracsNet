import { home_private_infinite_feed } from "@/app/server-actions/infinite-scroll/scroll";
import style from "./UnlimitedScrollFeed.module.css";
// import LoadMore from "./LoadMore";
import { fetchRecentThread } from "@/app/server-actions/thread/thread";
import JobCard from "@/Components/Miscellaneous/JobCard/JobCard";
import PollCard from "@/Components/Miscellaneous/PollCard/PollCard";
import ThreadCard from "@/Components/Miscellaneous/ThreadCard/ThreadCard";
import MixCard from "@/Components/Miscellaneous/MixCard/MixCard";
import { GetSession } from "@/lib/utils/getSessionData";

const UnlimitedHomeScrollFeed = async () => {

  const loggedInUser = await GetSession();

  const data = await home_private_infinite_feed(1, loggedInUser._id);
  const posts = data.data;

  return (
    <section className={style.UnlimitedScrollFeed}>
      <div className={style.posts}>
        {
          posts && posts.map(i =><MixCard key={i._id} data={i}/>)
        }
      </div>
      {/* <LoadMore/> */}
    </section>
  )
}

export default UnlimitedHomeScrollFeed