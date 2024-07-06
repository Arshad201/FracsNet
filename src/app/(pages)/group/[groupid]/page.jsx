import style from "./SingleGroupPage.module.css";
import { IoPeopleOutline } from "react-icons/io5";
import GroupBgImage from "./components/GroupBgImage/GroupBgImage";
import GroupProfileImage from "./components/GroupProfileImage/GroupProfileImage";
import GroupTitleDescription from "./components/GroupTitleDescription/GroupTitleDescription";
import { get_Group_By_GroupID } from "@/lib/data/group";
import GroupJoinButton from "./components/GroupJoinButton/GroupJoinButton";
import { headers } from "next/headers";
import GroupMembers from "./components/GroupMembers/GroupMembers";

const SingleGroupPage = async ({ params }) => {

  const headerList = headers();
  const id = headerList.get("loggedInUser");
  const { groupid } = params;


  let group = await get_Group_By_GroupID(groupid);
  group = JSON.parse(JSON.stringify(group));


  return (
    <>
      <section className={style.homePrivate} >
        <div className="wrapper-width">
          <div className={style.contentGrid}>
            <div className={style.leftContent}>
              {/* Group Info */}
              <div className={style.groupInfoBox}>
                <>
                  <GroupBgImage group={group} />
                  <GroupProfileImage group={group} />
                  <div className={style.groupOptions}>
                    <button className={style.groupOption}>
                      <IoPeopleOutline className={style.icon} />
                      dummy option
                    </button>
                  </div>
                  <GroupTitleDescription group={group} />
                  <GroupJoinButton loggedInUser={id} group={group} />
                </>

                <GroupMembers loggedInUser={id} group={group} />
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