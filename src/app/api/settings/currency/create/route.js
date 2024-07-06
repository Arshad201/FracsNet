import { Settings } from "@/lib/models/settings";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {

    try {
        connectToDB();

        const settingOwner = req.nextUrl.searchParams.get('settingOwner');

        const body = await req.json();
        const {name, isoCode, flag} = body;

        let setting = await Settings.findOne({settingOwner})
        let message;


        if(!setting){
            // Create new setting
            setting = await Settings.create({currency: body, settingOwner});
            message = "currency created!"

        }else{
            // Update existing setting
            setting.currency.name = name
            setting.currency.isoCode = isoCode
            setting.currency.flag = flag
            setting = await setting.save({validateBeforeSave: true})
            message = "currency updated!"
        }


        return NextResponse.json({
            currency: setting.currency,
            message
        }, { status: 201 });


    } catch (error) {

        console.log({error: error.message});

        return NextResponse.json({ error: error.message });

    }
}