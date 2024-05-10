import WelcomeToHome from "@/Components/HomeComponents/WelcomeToHome/WelcomeToHome";
import style from "./HomePrivate.module.css";
import UnlimitedScrollFeed from "@/Components/HomeComponents/UnlimitedScrollFeed/UnlimitedScrollFeed";
import NetworkList from "@/Components/HomeComponents/NetworkList/NetworkList";
import GroupList from "@/Components/HomeComponents/GroupList/GroupList";
import ShortInfo from "@/Components/Miscellaneous/ShortInfo/ShortInfo";
import GroupCardSM from "@/Components/Miscellaneous/GroupCardSM/GroupCardSM";
import BlogPostCardSM from "@/Components/Miscellaneous/BlogPostCardSM/BlogPostCardSM";
import { Suspense } from "react";
import BlogPostCardSM_Skeleton from "@/Components/Miscellaneous/BlogPostCardSM/BlogPostCardSM_Skeleton";

const HomePrivate = () => {
  return (
    <section className={style.homePrivate} >
      <div className="wrapper-width">
        <div className={style.contentGrid}>
          <div className={style.leftContent}>
            {/* Show Connections */}
            <Suspense fallback={<h1>Loading...</h1>}>
              <NetworkList />
            </Suspense>
            <GroupList />
            {/* Show Joined groups */}
          </div>
          <div className={style.mainContent}>
            {/* Welcome Message with Promote Thread posting */}
            <WelcomeToHome />
            {/* Map all posts */}
            <UnlimitedScrollFeed />
          </div>
          <div className={style.rightContent}>
            {/* Latest Blogpost */}
            <div className={style.latestBlogPostWrapper}>
              <h2 className={style.heading}>Latest Blogpost</h2>
              <div className={style.latestBlogPost}>
                <BlogPostCardSM_Skeleton />
                <BlogPostCardSM />
                <BlogPostCardSM />
                <BlogPostCardSM />
              </div>
            </div>

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