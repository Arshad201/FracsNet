"use server";

export const get_My_JoinedGroups = async (currentPage, userID) => {

    try {

        
        const response = await fetch(`http://localhost:3000/api/group/read/joined-groups?page=${currentPage}&resultPerPage=2&userID=${userID}`);
    
        const data = await response.json();

        return data;

    } catch (error) {
        console.log({error: "failed to load networks"});
    }

}

export const get_suggestedGroups = async (currentPage, userID) => {

    try {

        
        const response = await fetch(`http://localhost:3000/api/group/read/suggested-groups?page=${currentPage}&resultPerPage=2&userID=${userID}`);
    
        const data = await response.json();

        return data;

    } catch (error) {
        console.log({error: "failed to load networks"});
    }

}
