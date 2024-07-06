import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

//Get User's Info using username
// export const GET  = async (req, {params}) =>{
    
//     try {

//         const userName = req.nextUrl.searchParams.get('userName').toString();


//         const user = await User.findOne({userName});

//         if(!user){
//             return NextResponse.json({
//                 success: false,
//                 message: "User not found!"
// ,            }, {status: 404})
//         }

//         return NextResponse.json({
//             user,
//         }, {status: 200})
        
//     } catch (error) {

//         console.log(error)
//         return NextResponse.json(error);
        
//     }
// }

export const PUT = async (req, { params }) => {

    try {

        connectToDB();

        const userId = req.nextUrl.searchParams.get('userId');

        const body = await req.json();

        const { userName, firstName, lastName, designation, bio} = body;


        // Validate Field!
        if(!userName) return NextResponse.json( {error: "username is required!"}, { status: 400 });
        if(!firstName) return NextResponse.json( {error: "First name is required!"}, { status: 400 });
        if(!lastName) return NextResponse.json( {error: "Last name is required!"}, { status: 400 });
        if(!designation) return NextResponse.json( {error: "Designation is required!"}, { status: 400 });
        if(!bio) return NextResponse.json( {error: "Bio is required!"}, { status: 400 });

        if(userName.split(" ").length > 1) return NextResponse.json( {error: "remove spaces between the username!"}, { status: 400 });
        if(firstName.split(" ").length > 1) return NextResponse.json( {error: "remove spaces between the first name!"}, { status: 400 });
        if(lastName.split(" ").length > 1) return NextResponse.json( {error: "remove spaces between the last name!"}, { status: 400 });

        if(userName.length < 3) return NextResponse.json( {error: "username must have 3 characters"}, { status: 400 });
        if(firstName.length < 3) return NextResponse.json( {error: "First name must have 3 characters"}, { status: 400 });
        if(lastName.length < 3) return NextResponse.json( {error: "Last name must have 3 characters"}, { status: 400 });
        if(designation.length < 2) return NextResponse.json( {error: "Designation must have 2 characters"}, { status: 400 });
        if(bio.length < 5) return NextResponse.json( {error: "Bio must have 5 characters"}, { status: 400 });

        const user = await User.findById(userId)

        const userNameExist = await User.findOne({userName});

        if(userNameExist && user.userName != userName) return NextResponse.json({ error: `This Username is already existed!`}, { status: 400 });

        user.userName = userName;
        user.firstName = firstName;
        user.lastName = lastName;
        user.designation = designation;
        user.bio = bio;

        await user.save();

        return NextResponse.json({
            message: "User Details Updated!"
        }, { status: 200 });

    } catch (error) {

        return NextResponse.json({error: error.message});

    }
}