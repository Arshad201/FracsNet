import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import style from './BlogOfTheDay.module.css'
import 'react-loading-skeleton/dist/skeleton.css'


const BlogOfTheDaySkeleton = () => {

  return (
    <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >
    <setion className={`${style.BlogOfTheDay} ${style.BlogOfTheDaySkeleton}`}>
        <div className="wrapper-width">
            <h2 className="sectionHeading">Blog of the Day</h2>
            <div className={style.blog}>
                <Skeleton height={30} width={150}/>
                <Skeleton height={40} width={0}/>
                <div className={style.blogContent}>
                    <Skeleton height={25} width={300} count={2} style={{marginBottom: '0.5rem'}}/>
                    <Skeleton height={30} width={0}/>
                    <Skeleton height={15} count={4} style={{marginBottom: '0.5rem'}}/>
                </div>
                <div className={style.metaData}>
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
        </div>
    </setion>
    </SkeletonTheme>
  )
}

export default BlogOfTheDaySkeleton