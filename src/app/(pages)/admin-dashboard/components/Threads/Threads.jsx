"use client"
import { useEffect, useState } from 'react';
import style from './Threads.module.css';
import { search_Data } from '@/app/server-actions/search/search';
import ThreadCard from '@/Components/Miscellaneous/ThreadCard/ThreadCard';

const Threads = () => {

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

    const res = await search_Data(keyWord, "thread", 1);
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


    const res = await search_Data(keyWord, "thread", currentPage);
    setData(prev => [...prev, ...res.result])

    if (currentPage > totalPages) {
      setCurrentPage(2)
      const res = await search_Data(keyWord, "thread", 1);
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
      <span className={style.headingSM} >by default, you'll get all the Threads</span>
      <form className={style.form} onSubmit={searchHandler}>
        <input type="search" id='searchUser' placeholder='Search Thread By Id and thread text' value={keyWord} onChange={(e) => setKeyWord(e.target.value)} />
        <button className={style.btn}>Search</button>
      </form>

      <div className={style.dataList} >

        <span className={style.headingSM} >
          {!loading && `Total Thread - ${totalItems}`}
        </span>

        <div>
          {data?.map((data, index) => <ThreadCard data={data} key={index} />)}
        </div>

        {loading && <span className={style.headingSM} >Loading Threads...</span>}

        {(!loading && totalPages > 1) && <button className={style.btn} onClick={handleLoadMore} >
          {currentPage > totalPages ? "Load less" : "Load more"}
        </button>}


      </div>
    </div>
  )
}

export default Threads