"use server";

import PostCard from "@/Components/Miscellaneous/PostCard/PostCard";

export const fetchRecentThread = async(page)=>{

    const response = await fetch(`http://localhost:3000/api/thread?page=${page}&resultPerPage=2`);

    const data = await response.json();


    return data.threads.map((d,i)=><PostCard key={d} index={i} data={d}/>)

}
