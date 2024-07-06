import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const signUpAction = createAsyncThunk('user', async (userData, thunkAPI)=>{

    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            },
            withCredentials : true,
        }

        console.log(userData);

        const { data } = await axios.post(`${API_URL}/api/auth/sign-up`, {...userData}, config);

        // console.log(data);

        return data;

    } catch (error) {
        // console.log(error.response.data)
        return thunkAPI.rejectWithValue(error.response.data);
    }

})

export const loadProfileAction = createAsyncThunk('profile', async (userName, thunkAPI)=>{

    try {

        const { data } = await axios.get(`${API_URL}/api/user?userName=${userName}`);

        // console.log(data);

        return data;

    } catch (error) {
        // console.log(error.response.data)
        return thunkAPI.rejectWithValue(error.response.data);
    }

})

export const loadEducationAction = createAsyncThunk('profile/education', async (username, thunkAPI)=>{

    try {

        const { data } = await axios.get(`${API_URL}/api/user/education/read?username=${username}`);

        // console.log(data);

        return data;

    } catch (error) {
        // console.log(error.response.data)
        return thunkAPI.rejectWithValue(error.response.data);
    }

})

export const loadExperienceAction = createAsyncThunk('profile/work-experience', async (username, thunkAPI)=>{

    try {


        const res = await fetch(`${API_URL}/api/user/workexperience/read?username=${username}`);

        const data = await res.json();

        console.log(data);

        return data.experience;

    } catch (error) {
        // console.log(error.response.data)
        return thunkAPI.rejectWithValue(error.response.data);
    }

})

export const loadContactAction = createAsyncThunk('profile/contact', async (username, thunkAPI)=>{

    try {


        const res = await fetch(`${API_URL}/api/user/contact/read?username=${username}`);

        const data = await res.json();

        console.log(data);

        return data.contact;

    } catch (error) {
        // console.log(error.response.data)
        return thunkAPI.rejectWithValue(error.response.data);
    }

})