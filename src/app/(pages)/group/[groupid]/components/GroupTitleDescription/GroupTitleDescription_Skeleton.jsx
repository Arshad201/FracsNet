"use client";
import style from '../../SingleGroupPage.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const GroupTitleDescription_Skeleton = () => {

    return (

        <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >
            <div className={style.groupTitleAndDesc}>
                <Skeleton height={30} width={'80%'} style={{ margin: "2rem auto 0rem auto", display: 'block' }} />
                <Skeleton height={15} width={'100%'} count={6}/>
            </div>
        </SkeletonTheme>
    )
}

export default GroupTitleDescription_Skeleton