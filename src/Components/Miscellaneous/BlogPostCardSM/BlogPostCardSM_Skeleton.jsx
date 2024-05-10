import style from './BlogPostCardSM.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const BlogPostCardSM_Skeleton = () => {
  return (
    <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >
      <div className={style.BlogPostCardSM}>
        <div className={style.leftPart}>
        <Skeleton height={77} width={77} />

          <div className={style.metaData}>
            <Skeleton height={13} width={150}/>
            <Skeleton height={13} width={200}/>
            <Skeleton height={13} width={130}/>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default BlogPostCardSM_Skeleton