import { formattingName, formattingTime } from "@/lib/utils/valueFormatting";
import style from "../ThreadCard.module.css";
import Link from "next/link";
import Settings from "../../Settings/Settings";
import { GetSession } from "@/lib/utils/getSessionData";
import { deleteResourceData } from "@/app/server-actions/resource/resource";

const Head = async ({ data }) => {

    const user = data.postedBy;
    const postedAt = data.createdAt

    const loggedInUser = await GetSession()

    const settingItemsForPostAdmin = [

        {
            type: "action",
            text: "Delete",
            action: deleteResourceData
        },
        {
            type: "link",
            link: `/create?update=thread&resource_id=${data._id}`,
            text: "Edit",
        },

    ]

    let settingsItemsForEveryone = [
        
        {
            type: "action",
            text: "Share",
            action: async (data) => {
                "use server";
                console.log('Post Shared --> ' + data._id)
            }
        },
        {
            type: "action",
            text: "Copy Link",
            action: async (data) => {
                "use server";
                const postLink = `${process.env.BASE_URL}/thread/${data._id}`
                return {postLink}
            }
        },
        
    ];

    let settingItemsForNotPostAdmin = [
        {
            type: "action",
            text: "Report to FracsNet",
            action: async (data) => {
                "use server";
                console.log('Post Shared --> ' + data._id)
            }
        },
    ]


    let settingsItems = [];
    if(data.postedBy._id == loggedInUser._id) {
        settingsItems = [...settingsItemsForEveryone, ...settingItemsForPostAdmin] 
    }

    if(data.postedBy._id != loggedInUser._id) {
        settingsItems = [...settingsItemsForEveryone, ...settingItemsForNotPostAdmin] 
    }


    return (
        <div className={style.postHeader}>
            <div className={style.leftPart}>
                {/* Profile Photo  */}
                <Link href={`/profile/${user.userName}`} className={style.profileImgWrapper}>
                    <img src={user.profilePic.url} alt="" />
                </Link>
                <div className={style.metaData}>
                    <Link href={`/profile/${user.userName}`} className={style.userName}>{formattingName(user)}</Link>
                    <span className={style.postedOn}>{formattingTime(postedAt)}</span>
                </div>
            </div>
            <Settings data={data} settingOptions={settingsItems} />

        </div>
    )
}

export default Head