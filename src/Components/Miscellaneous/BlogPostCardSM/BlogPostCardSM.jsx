import Link from 'next/link';
import style from './BlogPostCardSM.module.css';

const BlogPostCardSM = ({data}) => {
  return (
    <div className={style.BlogPostCardSM}>
        <div className={style.leftPart}>
                <Link href={`/blog/${data.slug}`} className={style.profileImgWrapper}>
                    <img src={data.featuredImage.url} alt="" /> 
                </Link>
                <div className={style.metaData}>
                    <Link href={`/blog/${data.slug}`} className={style.blogTitle}>"{data?.title}"</Link>
                </div>
        </div>
    </div>
  )
}

export default BlogPostCardSM