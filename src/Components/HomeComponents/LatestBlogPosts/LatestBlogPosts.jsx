import BlogPostCardSM from '@/Components/Miscellaneous/BlogPostCardSM/BlogPostCardSM';
import style from './LatestBlogPosts.module.css';
import { get_latest_blogposts } from '@/lib/data/blogPost';

const LatestBlogPosts = async ({ loggedInUser }) => {

  const blogposts = await get_latest_blogposts();

  return (
    <div className={style.NetworkList}>
      <h2 className={style.heading}>Latest Blogposts</h2>
      <div className={style.networks}>
        {
          blogposts?.map(i=><BlogPostCardSM key={i} data={i} />)
        }
      </div>
    </div>
  )
}

export default LatestBlogPosts