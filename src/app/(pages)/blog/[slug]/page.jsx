import { headers } from "next/headers";
import style from "./SingleBlogPage.module.css";
import { get_blogpost_bySlug } from "@/lib/data/blogPost";
import LatestBlogPosts from "@/Components/HomeComponents/LatestBlogPosts/LatestBlogPosts";
import Footer from "./components/Footer/Footer";
import Link from "next/link";


const SingleBlogPage = async ({ params }) => {

  const headerList = headers();
  const id = headerList.get("loggedInUser");
  const { slug } = params;


  let blogPost = await get_blogpost_bySlug(slug);
  blogPost = JSON.parse(JSON.stringify(blogPost));

  console.log(blogPost);

  return (
    <>
      <section className={style.homePrivate} >
        <div className="wrapper-width">
          <div className={style.contentGrid}>
            <div className={style.leftContent}>
              {/* Group Info */}
              <div className={style.groupInfoBox}>
                <h1 className="sectionHeading">{blogPost.title}</h1>
                <img src={blogPost.featuredImage.url} alt="" className={style.blogImage} />
                <div dangerouslySetInnerHTML={{ __html: blogPost.content }} ></div>



              </div>
            

              <Footer data={blogPost} />
            </div>
            <div className={style.rightContent}>
              <LatestBlogPosts loggedInUser={id} />
              {/* Sponsored Premium */}
              <div className={style.sponsered}>
                <h2 className="sectionHeading">Try premium FracsNet Today!</h2>
                <button className={style.btn}>Pricing</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SingleBlogPage