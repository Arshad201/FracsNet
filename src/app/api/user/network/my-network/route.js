import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET  = async (req, {params}) =>{
    
    connectToDB();

    try {

        const userId = req.nextUrl.searchParams.get('userId');
        const pageNumber = req.nextUrl.searchParams.get('pageNumber')*1;
        const itemsPerPage = req.nextUrl.searchParams.get('itemsPerPage')*1;

        const user = await User.findById(userId);

        let userNetwork = user.network;

        userNetwork = await User.find({ _id: {$in: userNetwork}});

        const totalPages = Math.ceil(userNetwork.length/itemsPerPage);

        if(pageNumber > totalPages){
            throw new Error("Pages Done!")
        }


        const start = (pageNumber - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        userNetwork = userNetwork.slice(start, end)

        return NextResponse.json({
            totalPages,
            userNetwork
        }, {status: 200});

        
    } catch (error) {

        // console.log(error)
        return NextResponse.json(error.message);
        
    }
}