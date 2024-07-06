import HomePrivate from "./(pages)/Home/HomePrivate"
// import HomePublic from "./(pages)/Home/HomePublic"
import { GetSession } from "@/lib/utils/getSessionData";

const HomePage = async () => {

  const loggedInUser = await GetSession();

  return (
    <>
      {
        loggedInUser?._id ? <HomePrivate/> : <>Home Public</>
      }
    </>
  )
}

export default HomePage