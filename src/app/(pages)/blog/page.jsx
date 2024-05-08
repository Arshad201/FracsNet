import BlogOfTheDay from "@/Components/BlogComponents/BlogOfTheDay/BlogOfTheDay"
import BlogOfTheDaySkeleton from "@/Components/BlogComponents/BlogOfTheDay/BlogOfTheDaySkeleton"
import Hero from "@/Components/BlogComponents/Hero/Hero"
import NavigationForBlog from "@/Components/BlogComponents/NavigationForBlog/NavigationForBlog"
import RecentBlog from "@/Components/HomeComponents/RecentBlog/RecentBlog"

const BlogPage = () => {
  return (
    <div>
      <Hero/>
      <NavigationForBlog/>
      <BlogOfTheDay/>
      <RecentBlog/>
    </div>
  )
}

export default BlogPage