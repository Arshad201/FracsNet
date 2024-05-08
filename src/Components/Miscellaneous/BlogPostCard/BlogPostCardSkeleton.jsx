import Link from "next/link"
import style from "./BlogPostCard.module.css"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const BlogPostCardSkeleton = () => {

    const blogDes = "In the ever-evolving landscape of web development, innovation is the key to staying ahead. One of the most promising frontiers in this field is the integration of Artificial Intelligence (AI). From streamlining workflows to enhancing user experiences, AI is reshaping how websites and web applications are built and operated."
  return (
    <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >

    <div className={`${style.BlogPostCard} ${style.BlogPostCardSkeleton}`} >
        <div className={style.imgBox}>
            <Skeleton height={260}/>
            <div className={style.userProfile}>
                <Skeleton height={60} width={60} circle/>
            </div>
        </div>
        <div className={style.body}>
            <Skeleton height={20} count={3} style={{marginBottom: '1rem'}}/>
            <Skeleton height={6} width={0} />
            <Skeleton height={13} count={5} style={{marginBottom: '0.5rem'}}/>
            <Skeleton height={6} width={0} />
            <Skeleton height={24} width={100} style={{marginTop: '0.5rem'}}/>
        </div>
        <div className={style.footer}>
            <Skeleton height={15} width={130} />
            <Skeleton height={10} width={10} circle/>
            <Skeleton height={15} width={70} />
            <Skeleton height={10} width={10} circle/>
            <Skeleton height={15} width={80} />
            <Skeleton height={10} width={10} circle/>
            <Skeleton height={15} width={50} />
            <Skeleton height={10} width={10} circle/>
            <Skeleton height={15} width={60} />
        </div>
    </div>
    </SkeletonTheme>
  )
}

export default BlogPostCardSkeleton