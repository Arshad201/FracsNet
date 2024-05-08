import ProfileCard from '@/Components/Miscellaneous/ProfileCard/ProfileCard';
import style from './FeaturedProfile.module.css';
import ProfileCardSkeleton from '@/Components/Miscellaneous/ProfileCard/ProfileCardSkeleton';

const FeaturedProfileSkeleton = () => {
  return (
    <section className={style.featuredProfiles}>
        <div className="wrapper-width">
            <h2 className="sectionHeading">Featured Profile</h2>
            <div className={style.profiles}>
              <ProfileCardSkeleton/>
              <ProfileCardSkeleton/>
              <ProfileCardSkeleton/>
            </div>
        </div>
    </section>
  )
}

export default FeaturedProfileSkeleton