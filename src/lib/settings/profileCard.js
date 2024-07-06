export const settingOptions_profileCard = (data, loggedInUserId)=>{
    return[
    {
      settingTitle: "Delete Account",
      settingMethod: function (v) {
        console.log(data);
      }
    },
    {
      settingTitle: `${data.featured ? "Make it UnFeatured" : "Make it Featured"}`,
      settingMethod: function (v) {
        console.log(data);
      }
    },
    {
      settingTitle: "Send Notification",
      settingMethod: function (v) {
        console.log(data);
      }
    },
    {
      settingTitle: "Send Message",
      settingMethod: function (v) {
        console.log(data);
      }
    }
  ]
}
