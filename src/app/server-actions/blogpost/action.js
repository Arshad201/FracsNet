"use server";

import BlogPostCard from "@/Components/Miscellaneous/BlogPostCard/BlogPostCard";

export const fetchLatestBlogPost = async(page)=>{

    const response = await fetch(`http://localhost:3000/api/blogpost?page=${page}&resultPerPage=3`);

    const data = await response.json();

    return data.posts.map((d,i)=><BlogPostCard key={d} index={i} data={d}/>)

}