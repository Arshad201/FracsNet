"use server"
import { GetSession } from "@/lib/utils/getSessionData";

export const get_currency = async () => {

    try {

        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/settings/currency/read?settingOwner=${loggedInData._id}`
        );

        const data = await response.json();

        return data.currency;


    } catch (error) {
        return {error: error.message+ "REE"} 
    }

}

export const set_currency = async (currencyObj) => {

    try {


        const loggedInData = await GetSession()

        const response = await fetch(
            `http://localhost:3000/api/settings/currency/create?settingOwner=${loggedInData._id}`
            ,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currencyObj),
            }
        );

        const data = await response.json();

        return data.currency;


    } catch (error) {
        return {error: error.message} 
    }

}

export const report_to_fracsNet = async () =>{

}

