import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import style from '../SingleGroupPage.module.css'
import GroupBgImage_Skeleton from './GroupBgImage/GroupBgImage_Skeleton'
import GroupProfileImage_Skeleton from './GroupProfileImage/GroupProfileImage_Skeleton'
import GroupTitleDescription_Skeleton from './GroupTitleDescription/GroupTitleDescription_Skeleton'

const GroupInfo_Skeleton = () => {
    return (
        <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >
            <div>
                <GroupBgImage_Skeleton />
                <GroupProfileImage_Skeleton />
                <div className={style.groupOptions}>
                    <Skeleton height={25} width={60} />
                    <Skeleton height={25} width={60} />
                    <Skeleton height={25} width={60} />
                    <Skeleton height={25} width={60} />
                </div>
                <GroupTitleDescription_Skeleton />
                <Skeleton height={45} width={'100%'} style={{ marginTop: "2rem" }} />
            </div>
        </SkeletonTheme>
    )
}

export default GroupInfo_Skeleton