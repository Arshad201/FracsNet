"use client";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import style from '../../SingleGroupPage.module.css'

const GroupProfileImage_Skeleton = () => {
    return (
        <>
            <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >
            <div className={style.groupImg}>
                <Skeleton height={'132px'} width={'132px'}/>
            </div>
            </SkeletonTheme>
        </>
    )
}

export default GroupProfileImage_Skeleton