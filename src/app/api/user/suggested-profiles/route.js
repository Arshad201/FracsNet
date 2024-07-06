import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET  = async (req, {params}) =>{

    connectToDB()
    
    try {

        const userId = req.nextUrl.searchParams.get('userId');
        const pageNumber = req.nextUrl.searchParams.get('pageNumber')*1;
        const itemsPerPage = req.nextUrl.searchParams.get('itemsPerPage')*1;
       
        const user = await User.findById(userId)

        if(!user){
            throw new Error("User not found!");
        }

        const userNetwork = user.network;

        let suggestedProfiles = await User.find({_id: {$nin: [userId, ...userNetwork]}});

        const totalPages = Math.ceil(suggestedProfiles.length/itemsPerPage);

        const start = (pageNumber - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        if(pageNumber > totalPages){
            throw new Error("Pages Done!")
        }


        suggestedProfiles = suggestedProfiles.slice(start, end)


        return NextResponse.json({
             message: "Working route",
             suggestedProfiles,
        }, {status: 200});

        
    } catch (error) {

        // console.log(error)
        return NextResponse.json(error.message);
        
    }
}