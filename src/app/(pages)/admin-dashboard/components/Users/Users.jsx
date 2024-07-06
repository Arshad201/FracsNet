"use client"
import { useEffect, useState } from 'react';
import Graph from './Graph/Graph';
import style from './Users.module.css';
import ProfileCard from '@/Components/Miscellaneous/ProfileCard/ProfileCard';
import { search_Data } from '@/app/server-actions/search/search';

const Users = () => {

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

    const res = await search_Data(keyWord, "user", 1);
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


    const res = await search_Data(keyWord, "user", currentPage);
    setData(prev => [...prev, ...res.result])

    if (currentPage > totalPages) {
      setCurrentPage(2)
      const res = await search_Data(keyWord, "user", 1);
      setData(res.result)
    }

    setLoading(false);
  }


  useEffect(() => {

    searchHandler()

  }, []);

  return (
    <div className={style.users} >
      {/* <Graph /> */}
      <span className={style.headingSM} >by default, you'll get all the users</span>
      <form className={style.form} onSubmit={searchHandler}>
        <input type="search" id='searchUser' placeholder='Search User By Id, Name, UserName and Designations' value={keyWord} onChange={(e) => setKeyWord(e.target.value)} />
        <button className={style.btn}>Search</button>
      </form>

      <div className={style.userList} >

        <span className={style.headingSM} >
          {!loading && `Total Users - ${totalItems}`}
        </span>

        <div>
          {data?.map((data, index) => <ProfileCard data={data} key={index} />)}
        </div>

        {loading && <span className={style.headingSM} >Loading users...</span>}

        {(!loading && totalPages > 1) && <button className={style.btn} onClick={handleLoadMore} >
          {currentPage > totalPages ? "Load less" : "Load more"}
        </button>}


      </div>
    </div>
  )
}

export default Users