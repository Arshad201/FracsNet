import { Education } from "@/lib/models/educationModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";



//Create or Update Education
export const PUT = async (req, { params }) => {

    try {

        connectToDB();

        const userId = req.nextUrl.searchParams.get('userId');

        const body = await req.json();
        const { schools, CollegeOrUniversity } = body;

        const education = await Education.findOne({ userId });

        let message = null;
        let error = null;


        if (education) {

            education.schools = [...schools]
            education.CollegeOrUniversity = [...CollegeOrUniversity]

            const updated = await education.save({ validateBeforeSave: true });

            if (!updated) error = "someting wnet wrong, try again!"

            if (schools.length != 0) {
                message = "Great! you Updated school"
            }

            if (CollegeOrUniversity.length != 0) {
                message = "Great! you Updated your college"
            }

            if (schools.length != 0 && CollegeOrUniversity.length != 0) {
                message = "Great! you Updated your educational backround"
            } else {
                error = "Oops! you saved empty field!"
            }

            if (error) return NextResponse.json({ error }, { status: 400 });
            if (message) return NextResponse.json({ message }, { status: 200 });
        }

        const created = await Education.create({ userId, schools, CollegeOrUniversity });


        if (created) {

            if (schools.length != 0) {
                message = "Great! you added school"
            }

            if (CollegeOrUniversity.length != 0) {
                message = "Great! you added your college"
            }

            if (schools.length != 0 && CollegeOrUniversity.length != 0) {
                message = "Great! you added your educational backround"
            } else {
                error = "Oops! you saved empty field!"
            }

        } else {
            error = "something went wrong, try again!"
        }


        if (error) return NextResponse.json({ error }, { status: 400 });
        if (message) return NextResponse.json({ message }, { status: 201 });


    } catch (error) {

        return NextResponse.json({ error: error.message });

    }
}