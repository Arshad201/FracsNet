import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import style from './WelcomeToHome.module.css';

const ProfileImageSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >
            <div>
                <Skeleton height={100} width={100} circle />
            </div>
        </SkeletonTheme>
    )
}

export default ProfileImageSkeleton