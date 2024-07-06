import { createSlice } from '@reduxjs/toolkit'

const featureSlice = createSlice({
    name: 'feature',
    initialState: {
        alertType: "",
        alertMessage: "",
    },
    reducers: {
        showAlert: (state, action) => {
            state.alertType = action.payload.alertType;
            state.alertMessage = action.payload.alertMessage;
        }
    }
})

export const { showAlert } = featureSlice.actions

export default featureSlice.reducer;