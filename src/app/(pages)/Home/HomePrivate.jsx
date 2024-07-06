import WelcomeToHome from "@/Components/HomeComponents/WelcomeToHome/WelcomeToHome";
import style from "./HomePrivate.module.css";
import NetworkList from "@/Components/HomeComponents/NetworkList/NetworkList";
import GroupList from "@/Components/HomeComponents/GroupList/GroupList";
import { Suspense } from "react";
import LatestBlogPosts from "@/Components/HomeComponents/LatestBlogPosts/LatestBlogPosts";
import UnlimitedHomeScrollFeed from "@/Components/HomeComponents/UnlimitedScrollFeed/UnlimitedScrollFeed";

const HomePrivate = async () => {

  return (
    <section className={style.homePrivate} >
      <div className="wrapper-width">
        <div className={style.contentGrid}>
          <div className={style.leftContent}>
            <NetworkList />
            <GroupList listType={"joinedGroup"} />

          </div>
          <div className={style.mainContent}>
            <Suspense fallback={<>Loading profile...</>}>
              <WelcomeToHome />
            </Suspense>
            <UnlimitedHomeScrollFeed />
          </div>
          <div className={style.rightContent}>

            <Suspense fallback={<>loading...</>}>
              <LatestBlogPosts />
            </Suspense>

            {/* Sponsored Premium */}
            <div className={style.sponsered}>
              <h2 className="sectionHeading">Try premium FracsNet Today!</h2>
              <button className={style.btn}>Pricing</button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePrivate