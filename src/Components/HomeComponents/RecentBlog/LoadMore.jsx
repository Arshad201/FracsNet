"use client"
import style from './RecentBlog.module.css'
import { useState } from 'react';
import { fetchLatestBlogPost } from '@/app/server-actions/blogpost/action';

let page = 2;
const LoadMore = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const loadingMorePost = () =>{

    if(data.length === 3){
     setData([]);
     page = 2 
     return;

    }

    setLoading(true);
    fetchLatestBlogPost(page).then((res)=>{
            setData([...data, ...res]);
            page++;
            setLoading(false);
    });

    
  }

  return (
    <>
      <div className={style.blogs}>
              {data}
              {loading && 
              <>Loading...</>
              }
      </div>
      <button onClick={loadingMorePost} className={style.btn}> {data.length === 3 ? "Load Less" : "Load More"}</button>
    </>
  )
}

export default LoadMore