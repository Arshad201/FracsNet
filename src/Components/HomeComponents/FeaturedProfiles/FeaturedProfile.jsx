import style from './FeaturedProfile.module.css';
import { fetchFeaturedProfile } from '@/app/server-actions/user/action';
import LoadMore from './LoadMore';

const FeaturedProfile = async () => {

  const data = await fetchFeaturedProfile(1);

  return (
    <section className={style.featuredProfiles}>
        <div className="wrapper-width">
            <h2 className="sectionHeading">Featured Profile</h2>
            <div className={style.profiles}>
                {data} 
            </div>
            <LoadMore/>
        </div>
    </section>
  )
}

export default FeaturedProfile