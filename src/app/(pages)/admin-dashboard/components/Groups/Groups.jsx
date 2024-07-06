"use client"
import { useEffect, useState } from 'react';
import style from './Groups.module.css';
import { search_Data } from '@/app/server-actions/search/search';
import BlogPostCard from '@/Components/Miscellaneous/BlogPostCard/BlogPostCard';
import GroupCardSM from '@/Components/Miscellaneous/GroupCardSM/GroupCardSM';

const Groups = () => {

  const [keyWord, setKeyWord] = useState("");
  const [currentPage, setCurrentPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const searchHandler = async (e) => {
    setLoading(true)
    if (e) {
      e.preventDefault();
    }

    const res = await search_Data(keyWord, "group", 1);
    setData([...res.result]);
    setTotalPages(res.totalPages)
    setTotalItems(res.totalItems)
    setLoading(false)

  }

  const handleLoadMore = async () => {

    setLoading(true);

    if (currentPage <= totalPages) {
      setCurrentPage(prev => prev + 1)
    }


    const res = await search_Data(keyWord, "group", currentPage);
    setData(prev => [...prev, ...res.result])

    if (currentPage > totalPages) {
      setCurrentPage(2)
      const res = await search_Data(keyWord, "group", 1);
      setData(res.result)
    }

    setLoading(false);
  }


  useEffect(() => {

    searchHandler()

  }, []);

  return (
    <div className={style.data} >
      {/* <Graph /> */}
      <span className={style.headingSM} >by default, you'll get all the groups</span>
      <form className={style.form} onSubmit={searchHandler}>
        <input type="search" id='searchUser' placeholder='Search groups By Id or any keyword' value={keyWord} onChange={(e) => setKeyWord(e.target.value)} />
        <button className={style.btn}>Search</button>
      </form>

      <div className={style.dataList} >

        <span className={style.headingSM} >
          {!loading && `Total group - ${totalItems}`}
        </span>

        <div>
          {data?.map((data, index) => <GroupCardSM data={data} key={index} />)}
        </div>

        {loading && <span className={style.headingSM} >Loading groups...</span>}

        {(!loading && totalPages > 1) && <button className={style.btn} onClick={handleLoadMore} >
          {currentPage > totalPages ? "Load less" : "Load more"}
        </button>}


      </div>
    </div>
  )
}

export default Groups