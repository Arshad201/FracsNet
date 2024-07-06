"use server";

export const get_My_Network = async (currentPage, userID) => {

    try {
        
        const response = await fetch(`http://localhost:3000/api/user/network/my-network?pageNumber=${currentPage}&itemsPerPage=2&userId=${userID}`);
    
        const data = await response.json();
    
        return data;

    } catch (error) {
        console.log({error: "failed to load networks"});
    }

}
