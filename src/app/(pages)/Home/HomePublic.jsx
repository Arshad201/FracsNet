import Categories from "@/Components/HomeComponents/Categories/Categories"
import FeaturedProfile from "@/Components/HomeComponents/FeaturedProfiles/FeaturedProfile"
import HeroSection from "@/Components/HomeComponents/HeroSection/HeroSection"
import Newsletter from "@/Components/HomeComponents/Newsletter/Newsletter"
import OurMission from "@/Components/HomeComponents/OurMission/OurMission"
import RecentBlog from "@/Components/HomeComponents/RecentBlog/RecentBlog"
import RecentDiscussion from "@/Components/HomeComponents/RecentDiscussion/RecentDiscussion"
import React, { Suspense } from 'react'

const HomePublic = () => {
  return (
    <>
    <HeroSection/>
    <OurMission/>
    {/* <Suspense fallback={<>loading...</>}>
      <RecentDiscussion/>
    </Suspense> */}
    <Categories/>
    {/* <Suspense fallback={<>loading...</>}>
      <FeaturedProfile/>
    </Suspense> */}
    {/* <Suspense fallback={<>loading...</>}>
      <RecentBlog/>
    </Suspense> */}
    <Newsletter/>
  </>
  )
}

export default HomePublic