import { Group } from "@/lib/models/groupModel";
import { connectToDB } from "@/lib/utils"
import { NextResponse } from "next/server";


export const POST = async (req, { params }) => {

    try {

        connectToDB();
        const groupId = req.nextUrl.searchParams.get('groupId');
        const userId = req.nextUrl.searchParams.get('userId');

        const group = await Group.findById(groupId);
        group.members = group.members.filter(i => i != userId);

        await group.save({ validateBeforeSave: false });

        return NextResponse.json({
            success: true,
            message: "User removed successfully!",
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(error);
    }
}