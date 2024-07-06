"use client"
import style from "./PostCard.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const PostCardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >
    <div className={`${style.postCard} ${style.postCardSkeleton}`}>
        <div className={style.postHeader}>
            <div className={style.leftPart}>
                {/* Profile Photo  */}
                    <Skeleton height={60} width={60} circle/>
                <div className={style.metaData}>
                    <Skeleton height={15} width={140} style={{ marginBottom: '0.8rem' }}/>
                    <Skeleton height={12} width={60}/>
                </div>
            </div>
            <div className={style.rightPart}>
                <Skeleton height={20} width={10}/>
            </div>
        </div>
        <div className={style.postBody}>
            <p className={style.postText}>
                <Skeleton height={12}  count={4} style={{ marginBottom: '0.8rem' }}/>
            </p>
            <Skeleton height={17} width={75}/>
        </div>
        <div className={style.footer}>
            <Skeleton height={45} width={140} style={{ borderRadius: '10rem' }}/>
            <Skeleton height={45} width={140} style={{ borderRadius: '10rem' }}/>
        </div>
    </div>
    </SkeletonTheme>
  )
}

export default PostCardSkeleton