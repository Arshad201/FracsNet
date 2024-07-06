"use client";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const GroupBgImage_Skeleton = () => {

    return (
        <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >
                <Skeleton height={'200px'} width={'100%'} />
        </SkeletonTheme>
    )
}

export default GroupBgImage_Skeleton