import WelcomeToHome from "@/Components/HomeComponents/WelcomeToHome/WelcomeToHome";
import style from "./NetworkPage.module.css";
import UnlimitedScrollFeed from "@/Components/HomeComponents/UnlimitedScrollFeed/UnlimitedScrollFeed";
import NetworkList from "@/Components/HomeComponents/NetworkList/NetworkList";
import GroupList from "@/Components/HomeComponents/GroupList/GroupList";
import ShortInfo from "@/Components/Miscellaneous/ShortInfo/ShortInfo";
import GroupCardSM from "@/Components/Miscellaneous/GroupCardSM/GroupCardSM";
import BlogPostCardSM from "@/Components/Miscellaneous/BlogPostCardSM/BlogPostCardSM";
import ProfileCardSM from "@/Components/Miscellaneous/ProfileCardSM/ProfileCardSM";
import ShortInfo_Skeleton from "@/Components/Miscellaneous/ShortInfo/ShortInfo_Skeleton";

const NetworkPage = () => {
  return (
    <section className={style.homePrivate} >
      <div className="wrapper-width">
        <div className={style.contentGrid}>
          <div className={style.leftContent}>
            {/* Network request */}
            <div className={style.latestBlogPostWrapper}>
              <h2 className={style.heading}>Network requests</h2>
              <div className={style.latestBlogPost}>
                <ShortInfo_Skeleton/>
                 <ShortInfo btn={"request"}/>
                 <ShortInfo btn={"request"}/>
                 <ShortInfo btn={"request"}/>
              </div>
            </div>
          </div>
          <div className={style.mainContent}>
            {/* Networks (User card grid) */}
            <div className={style.networksWrapper}>
              <h2 className={style.heading}>My Network</h2>
              <div className={style.networks}>
                <ShortInfo btn={"View"}/>
                <ShortInfo btn={"View"}/>
                <ShortInfo btn={"View"}/>
              </div>
            </div>
          </div>
          <div className={style.rightContent}>

            {/* Suggested profiles */}
            <div className={style.suggestedProfileWrapper}>
              <h2 className={style.heading}>Suggested Profiles</h2>
              <div className={style.suggestedProfile}>
                <ShortInfo btn={"send"}/>
                <ShortInfo btn={"send"}/>
                <ShortInfo btn={"send"}/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default NetworkPage