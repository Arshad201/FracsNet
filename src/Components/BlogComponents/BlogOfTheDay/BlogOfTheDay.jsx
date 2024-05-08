import style from './BlogOfTheDay.module.css'

const BlogOfTheDay = () => {

    const blogDes = "In the ever-evolving landscape of web development, innovation is the key to staying ahead. One of the most promising frontiers in this field is the integration of Artificial Intelligence (AI). From streamlining workflows to enhancing user experiences, AI is reshaping how websites and web applications are built and operated."

  return (
    <setion className={style.BlogOfTheDay}>
        <div className="wrapper-width">
            <h2 className="sectionHeading">Blog of the Day</h2>
            <div className={style.blog}>
                <span className={style.badge}>Web Development</span>
                <div className={style.blogContent}>
                    <h2>AI-Powered Enhancements: Revolutionizing Web Development</h2>
                    <p>{blogDes}</p>
                </div>
                <div className={style.metaData}>
                    <span>By Muhammad Arshad</span>
                    <span className={style.dot}></span>
                    <span>22 April 2024</span>
                    <span className={style.dot}></span>
                    <span>12 Comments</span>
                    <span className={style.dot}></span>
                    <span>15 Likes</span>
                    <span className={style.dot}></span>
                    <span>5 min read</span>
                </div>
            </div>
        </div>
    </setion>
  )
}

export default BlogOfTheDay