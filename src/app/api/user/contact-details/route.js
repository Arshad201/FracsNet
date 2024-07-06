import { Contact } from "@/lib/models/contactModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";



//Create or Update Experience
export const PUT = async (req, { params }) => {

    try {

        connectToDB();

        const userId = req.nextUrl.searchParams.get('userId');

        const body = await req.json();
        const { contactInfo } = body;


        const contact = await Contact.findOne({ userId });

        console.log({contact})

        let message = null;
        let error = null;

        if (contact) {
            contact.socialLinks = contactInfo.socialLinks
            contact.phoneNumber = contactInfo.phoneNumber
            contact.email = contactInfo.email
            contact.city = contactInfo.city
            contact.state = contactInfo.state
            contact.country = contactInfo.country

            const updated = await contact.save({ validateBeforeSave: true })

            if (updated) {
                message = "Contact details updated!"
            } else {
                error = "Oops! something went wrong, try again!"
            }

            if (error) return NextResponse.json({ error }, { status: 400 });
            if (message) return NextResponse.json({ message }, { status: 201 });

        }

        const created = await Contact.create({...contactInfo, userId})

        if (created) {
            message = "Contact Created!"
        } else {
            error = "Oops! something went wrong, try again!"
        }

        if (error) return NextResponse.json({ error }, { status: 400 });
        if (message) return NextResponse.json({ message }, { status: 201 });

    } catch (error) {

        return NextResponse.json({ error: error.message });

    }
}