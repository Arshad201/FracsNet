import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ProfileBgImage_Skeleton = () => {

    return (
        <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >
                <Skeleton height={'250px'} width={'100%'} count={4} style={{display: "block", border: "2px solid red"}}/>
        </SkeletonTheme>
    )
}

export default ProfileBgImage_Skeleton
