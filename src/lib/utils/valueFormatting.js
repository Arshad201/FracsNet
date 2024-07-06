import moment from "moment";

export const formattingV = (key, user, loggedInUserID) => {

    let value = "";

    if (key === "username") {
        value = user.userName;
    }

    if (key === "name") {

        if (user.firstName || user.lastName) {

            if (user.firstName) {
                value = user.firstName;
            }

            if (user.lastName) {
                value = user.lastName;
            }
        }

        if (user.firstName && user.lastName) {
            value = `${user.firstName} ${user.lastName}`;
        } else {

            if (loggedInUserID === user._id) {
                value = "Add Name"
            } else {
                value = "No Name"
            }
        }

    }

    if (key === "designation") {
        if(user.designation) {
            value = user.designation
        } else {
            if (loggedInUserID === user._id) {
                value = "Add designation"
            } else {
                value = ""
            }
        }
    }

    if (key === "bio") {
        if (user.bio) {
            value = user.bio
        } else {
            if (loggedInUserID === user._id) {
                value = "Add Bio"
            } else {
                value = ""
            }
        }
    }

    return value;

}

export const formattingName = (user) => {


    let value = "";

    if (user?.firstName || user?.lastName) {

        if (user.firstName) {
            value = user.firstName;
        }

        if (user.lastName) {
            value = user.lastName;
        }
    }

    if (user?.firstName && user?.lastName) {
        value = `${user.firstName} ${user.lastName}`;
    } else {

        value = user?.email;
    }

    return value;

}

export const formattingTime = (date)=>{
   return moment(date).from()
}

