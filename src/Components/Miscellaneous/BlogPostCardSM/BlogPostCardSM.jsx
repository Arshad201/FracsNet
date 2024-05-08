import style from './BlogPostCardSM.module.css';

const BlogPostCardSM = () => {
  return (
    <div className={style.BlogPostCardSM}>
        <div className={style.leftPart}>
                {/* Profile Photo  */}
                <div className={style.profileImgWrapper}>
                    <img src="/profile.jpg" alt="" /> 
                </div>
                <div className={style.metaData}>
                    <span className={style.postedOn}>"Elite Programming Unveiled: Techniques, Tools, and Mindset"</span>
                </div>
        </div>
    </div>
  )
}

export default BlogPostCardSM