import { createSlice } from '@reduxjs/toolkit'
import { loadContactAction, loadEducationAction, loadExperienceAction, loadProfileAction, signUpAction } from './userAction'


const initialState = {
  loading: false,
  loadingEd: false,
  loadingEx: false,
  loadingC: false,
  loggedInUser: null,
  profile: null,
  education: null,
  workExperience: null,
  contact: null,
  signUpErrors: null,
  alert: {
    type: "",
    message: ""
  }
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSignedInUser: (state, action) => {
      state.loggedInUser = action.payload
    },
    showAlert: (state, action) => {
      state.alert.type = action.payload.type;
      state.alert.message = action.payload.message;
  }
  },
  extraReducers: (builder) => {

    //For Sign-UP
    builder.addCase(signUpAction.pending, (state, action) => {
      state.loading = true;
      state.signUpErrors = null;
    });
    builder.addCase(signUpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
      state.alert.type = "success";
      state.alert.message = action.payload.message
    });
    builder.addCase(signUpAction.rejected, (state, action) => {
      state.loading = false;
      if (action.payload.errorType === "obj") {
        state.signUpErrors = action.payload.errors
      }

    });

    //For Loading User
    builder.addCase(loadProfileAction.pending, (state, action) => {
      state.loading = true;
      state.alert.type = null;
      state.alert.message = null;
    });
    builder.addCase(loadProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload.user;
    });
    builder.addCase(loadProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.alert.type = "error",
      state.alert.message = action.payload.message
      
    });

    //For Loading Education
    builder.addCase(loadEducationAction.pending, (state, action) => {
      state.loadingEd = true;
      state.alert.type = null;
      state.alert.message = null;
    });
    builder.addCase(loadEducationAction.fulfilled, (state, action) => {
      state.loadingEd = false;
      state.education = action.payload.education;
    });
    builder.addCase(loadEducationAction.rejected, (state, action) => {
      state.loadingEd = false;
      state.alert.type = "error",
      state.alert.message = action.payload.message
      
    });

    //For Loading Work Experience
    builder.addCase(loadExperienceAction.pending, (state, action) => {
      state.loadingEx = true;
      state.alert.type = null;
      state.alert.message = null;
    });
    builder.addCase(loadExperienceAction.fulfilled, (state, action) => {
      state.loadingEx = false;
      state.workExperience = action.payload;
    });
    builder.addCase(loadExperienceAction.rejected, (state, action) => {
      state.loadingEx = false;
      state.alert.type = "error",
      state.alert.message = action.payload.message
    });

     //For Loading Contact
     builder.addCase(loadContactAction.pending, (state, action) => {
      state.loadingC = true;
      state.alert.type = null;
      state.alert.message = null;
    });
    builder.addCase(loadContactAction.fulfilled, (state, action) => {
      state.loadingC = false;
      state.contact = action.payload;
    });
    builder.addCase(loadContactAction.rejected, (state, action) => {
      state.loadingC = false;
      state.alert.type = "error",
      state.alert.message = action.payload.message
    });

    // More handlers can be added using builder.addCase
  }
})

export const { setSignedInUser, showAlert } = userSlice.actions

export default userSlice.reducer;