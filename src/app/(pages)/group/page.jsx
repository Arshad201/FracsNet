import WelcomeToHome from "@/Components/HomeComponents/WelcomeToHome/WelcomeToHome";
import style from "./GroupPage.module.css";
import UnlimitedScrollFeed from "@/Components/HomeComponents/UnlimitedScrollFeed/UnlimitedScrollFeed";
import NetworkList from "@/Components/HomeComponents/NetworkList/NetworkList";
import GroupList from "@/Components/HomeComponents/GroupList/GroupList";
import ShortInfo from "@/Components/Miscellaneous/ShortInfo/ShortInfo";
import GroupCardSM from "@/Components/Miscellaneous/GroupCardSM/GroupCardSM";
import BlogPostCardSM from "@/Components/Miscellaneous/BlogPostCardSM/BlogPostCardSM";
import { Suspense } from "react";
import GroupCreatorForm from "@/Components/GroupPageComponents/GroupCreatorForm/GroupCreatorForm";

const GroupsPage = () => {
  return (
    <section className={style.homePrivate} >
      <div className="wrapper-width">
        <div className={style.contentGrid}>
          <div className={style.leftContent}>
            {/* Show Joined Groups */}
            <GroupList />
            {/* Show Joined groups */}
          </div>
          <div className={style.mainContent}>
            {/* Welcome Message with Promote Thread posting */}
            <GroupCreatorForm/>
            {/* Map all posts */}
          </div>
          <div className={style.rightContent}>



            {/* Reommonded groups */}
            <GroupList />

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

export default GroupsPage