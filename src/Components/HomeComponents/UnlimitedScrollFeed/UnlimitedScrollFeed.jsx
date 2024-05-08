import style from "./UnlimitedScrollFeed.module.css";
import LoadMore from "./LoadMore";
import { fetchRecentThread } from "@/app/server-actions/thread/action";


const UnlimitedScrollFeed = async() => {

  const data = await fetchRecentThread(1);

  return (
    <section className={style.UnlimitedScrollFeed}>
          <div className={style.posts}>
              {data}
          </div>
          <LoadMore/>
    </section>
  )
}

export default UnlimitedScrollFeed