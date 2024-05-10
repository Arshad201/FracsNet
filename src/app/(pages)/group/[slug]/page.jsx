import ProfileCardSM from "@/Components/Miscellaneous/ProfileCardSM/ProfileCardSM";
import style from "./SingleGroupPage.module.css";
import { IoPeopleOutline } from "react-icons/io5";
import GroupBgImage from "./components/GroupBgImage/GroupBgImage";
import GroupProfileImage from "./components/GroupProfileImage/GroupProfileImage";
import GroupTitleDescription from "./components/GroupTitleDescription/GroupTitleDescription";

const SingleGroupPage = () => {

  return (
    <>

      <section className={style.homePrivate} >
        <div className="wrapper-width">
          <div className={style.contentGrid}>
            <div className={style.leftContent}>
              {/* Group Info */}
              <div className={style.groupInfoBox}>
                <>
                  <GroupBgImage />
                  <GroupProfileImage />
                  <div className={style.groupOptions}>
                    <button className={style.groupOption}>
                      <IoPeopleOutline className={style.icon} />
                      dummy option
                    </button>
                  </div>
                  <GroupTitleDescription />
                  <button className={style.btn}>Join</button>
                </>
                {/* <GroupInfo_Skeleton/> */}

                {/* Search form for searching users */}
                <div className={style.members}>
                  <form>
                    <h2 className={style.heading}>Group Members</h2>
                    <input type="search" placeholder="search a member" />
                  </form>
                  <ProfileCardSM />
                  <ProfileCardSM />
                  <ProfileCardSM />
                </div>
              </div>
            </div>
            <div className={style.rightContent}>

              {/* Group posts here */}


              {/* Sponsored Premium */}
              <div className={style.sponsered}>
                <h2 className="sectionHeading">Try premium FracsNet Today!</h2>
                <button className={style.btn}>Pricing</button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SingleGroupPage