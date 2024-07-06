"use client"
import style from './UnlimitedScrollFeed.module.css'
import { useEffect, useState } from 'react';
import PostCardSkeleton from '@/Components/Miscellaneous/ThreadCard/PostCardSkeleton';
import { fetchRecentThread } from '@/app/server-actions/thread/thread';
import { useInView } from 'react-intersection-observer';

let page = 2;
const LoadMore = () => {

  const [data, setData] = useState([]);
  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (inView) {
      if (page <= 5) {
        setLoading(true);
        fetchRecentThread(page).then((res) => {
          setData([...data, ...res]);
          page++;
          setLoading(false);
        });
      }
    }
  }, [inView]);

  return (
    <>
      <div className={`${style.posts} ${style.loadMore}`}>
        {data}
        {loading &&
          <>
            <PostCardSkeleton />
          </>}
        <div ref={ref}>

        </div>
      </div>
    </>
  )
}

export default LoadMore