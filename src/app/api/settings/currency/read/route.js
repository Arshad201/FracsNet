import { Settings } from "@/lib/models/settings";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {

    try {
        connectToDB();

        const settingOwner = req.nextUrl.searchParams.get('settingOwner');

        let setting = await Settings.findOne({settingOwner})
        
        return NextResponse.json({
            currency: setting.currency
        }, { status: 200 });


    } catch (error) {
        console.log({error: error.message})
        return NextResponse.json({ error: error.message });

    }
}