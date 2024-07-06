"use server";

export const home_private_infinite_feed = async (currentPage, userID) => {

    try {

        const response = await fetch(`http://localhost:3000/api/infinite-scroll/home-private-feed?userId=${userID}&resultPerPage=11&page=${currentPage}`);

        const data = await response.json();

        return data;

    } catch (error) {
        console.log({ error: "failed to load feeds" });
    }

}
