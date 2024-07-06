"use client"
import { useState } from 'react';
import style from './SearchPage.module.css';
import ProfileCard from '@/Components/Miscellaneous/ProfileCard/ProfileCard';
import PostCard from '@/Components/Miscellaneous/ThreadCard/ThreadCard';
import BlogPostCard from '@/Components/Miscellaneous/BlogPostCard/BlogPostCard';
import GroupCardSM from '@/Components/Miscellaneous/GroupCardSM/GroupCardSM';

const SearchPage = () => {

    const [searchType, setSearchType] = useState("users");

    return (
        <div className={style.SearchPage}>
            <div className="wrapper-width">

                <div className={style.pageGrid}>
                    {/* Big full width searchbar */}
                    <form className={style.form} onSubmit={(e) => e.preventDefault()}>
                        <h1 className={style.heading}>Search</h1>
                        <input type="search" name="" id="" placeholder='Search a keyword ex-javascript' />
                        <div className={style.btns}>
                            <button
                                className={`${style.btn} ${searchType === 'users' && style.activeBtn}`}
                                onClick={() => setSearchType("users")}
                            >
                                Users
                            </button>
                            <button
                                className={`${style.btn} ${searchType === 'threads' && style.activeBtn}`}
                                onClick={() => setSearchType("threads")}
                            >
                                threads
                            </button>
                            <button
                                className={`${style.btn} ${searchType === 'blogpost' && style.activeBtn}`}
                                onClick={() => setSearchType("blogpost")}
                            >
                                Blogpost
                            </button>
                            <button
                                className={`${style.btn} ${searchType === 'groups' && style.activeBtn}`}
                                onClick={() => setSearchType("groups")}
                            >
                                Groups
                            </button>
                        </div>
                    </form>
                    {/* Show search results */}
                    <div className={style.searchResults}>
                        <span className={style.heading2}>10 results found for "javascript"</span>
                        <div className={style.resultGrid}>
                            {
                                searchType === 'users' &&
                                <>
                                    <ProfileCard data={{}} />
                                    <ProfileCard data={{}} />
                                    <ProfileCard data={{}} />
                                    <ProfileCard data={{}} />
                                    <ProfileCard data={{}} />
                                    <ProfileCard data={{}} />
                                </>
                            }

                            {
                                searchType === 'threads' &&
                                <>
                                    <PostCard data={{}} />
                                </>
                            }

                            {
                                searchType === 'blogpost' &&
                                <>
                                    <BlogPostCard data={{}} />
                                </>
                            }

{
                                searchType === 'groups' &&
                                <>
                                    <GroupCardSM/>
                                    <GroupCardSM/>
                                    <GroupCardSM/>
                                    <GroupCardSM/>
                                    <GroupCardSM/>
                                    <GroupCardSM/>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage