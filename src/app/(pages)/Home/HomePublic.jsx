import Categories from "@/Components/HomeComponents/Categories/Categories"
import FeaturedProfile from "@/Components/HomeComponents/FeaturedProfiles/FeaturedProfile"
import FeaturedProfileSkeleton from "@/Components/HomeComponents/FeaturedProfiles/FeaturedProfileSkeleton"
import HeroSection from "@/Components/HomeComponents/HeroSection/HeroSection"
import Newsletter from "@/Components/HomeComponents/Newsletter/Newsletter"
import OurMission from "@/Components/HomeComponents/OurMission/OurMission"
import RecentBlog from "@/Components/HomeComponents/RecentBlog/RecentBlog"
import RecentBlogSkeleton from "@/Components/HomeComponents/RecentBlog/RecentBlogSkeleton"
import RecentDiscussion from "@/Components/HomeComponents/RecentDiscussion/RecentDiscussion"
import RecentDiscussionSkeleton from "@/Components/HomeComponents/RecentDiscussion/RecentDiscussionSkeleton"
import React, { Suspense } from 'react'

const HomePublic = () => {
  return (
    <>
    <HeroSection/>
    <OurMission/>
    <Suspense fallback={<RecentDiscussionSkeleton/>}>
      <RecentDiscussion/>
    </Suspense>
    <Categories/>
    <Suspense fallback={<FeaturedProfileSkeleton/>}>
      <FeaturedProfile/>
    </Suspense>
    <Suspense fallback={<RecentBlogSkeleton/>}>
      <RecentBlog/>
    </Suspense>
    <Newsletter/>
  </>
  )
}

export default HomePublic