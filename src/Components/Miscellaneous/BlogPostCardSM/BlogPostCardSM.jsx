import Link from 'next/link';
import style from './BlogPostCardSM.module.css';

const BlogPostCardSM = () => {
  return (
    <div className={style.BlogPostCardSM}>
        <div className={style.leftPart}>
                <Link href={`/blog/slug`} className={style.profileImgWrapper}>
                    <img src="/profile.jpg" alt="" /> 
                </Link>
                <div className={style.metaData}>
                    <Link href={`/blog/slug`} className={style.blogTitle}>"Elite Programming Unveiled: Techniques, Tools, and Mindset"</Link>
                </div>
        </div>
    </div>
  )
}

export default BlogPostCardSM