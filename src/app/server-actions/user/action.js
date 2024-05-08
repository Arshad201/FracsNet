"use server";

import ProfileCard from "@/Components/Miscellaneous/ProfileCard/ProfileCard";


export const fetchFeaturedProfile = async(page)=>{

    const response = await fetch(`http://localhost:3000/api/user?page=${page}&resultPerPage=3`);

    const data = await response.json();


    return data.users.map((d,i)=><ProfileCard key={d} index={i} data={d}/>)

}
