import { workExperience } from "@/lib/models/workExperienceModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";



//Create or Update Experience
export const PUT = async (req, { params }) => {

    try {

        connectToDB();

        const userId = req.nextUrl.searchParams.get('userId');

        const body = await req.json();
        const { experiences } = body;

        const experience = await workExperience.findOne({ userId });

        let message = null;
        let error = null;


        if (experience) {

            experience.workExperience = [...experiences]

            const updated = await experience.save({ validateBeforeSave: true });

            if (!updated) error = "someting wnet wrong, try again!"

            if (experiences.length != 0) {
                message = "Great! you Updated your Working Experience"
            } else {
                error = "Oops! you saved empty field!"
            }

            if (error) return NextResponse.json({ error }, { status: 400 });
            if (message) return NextResponse.json({ message }, { status: 200 });
        }

        const created = await workExperience.create({ userId, workExperience: experiences });


        if (!created) error = "someting wnet wrong, try again!"

            if (experiences.length != 0) {
                message = "Great! you Added your Working Experience"
            } else {
                error = "Oops! you saved empty field!"
            }


        if (error) return NextResponse.json({ error }, { status: 400 });
        if (message) return NextResponse.json({ message }, { status: 201 });


    } catch (error) {

        return NextResponse.json({ error: error.message });

    }
}