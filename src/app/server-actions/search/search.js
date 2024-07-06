"use server";

export const search_Data = async (searchKey, searchType, currentPage) => {

    console.log({searchKey, searchType});

    try {

        const response = await fetch(`http://localhost:3000/api/search?searchKey=${searchKey}&searchType=${searchType}&page=${currentPage}`);

        const data = await response.json();

        return data;

    } catch (error) {
        console.log({ error: "failed to load feeds" });
    }

}
