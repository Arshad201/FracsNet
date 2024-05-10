import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import style from "./Comment.module.css";

const Comment_Skeleton = () => {
    return (
        <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >
            <div className={style.comment}>
                <div className={style.userDetails}>
                    <div className={style.profilePic}>
                        <Skeleton height={50} width={50} circle />
                    </div>
                    <Skeleton height={13} width={70} />
                </div>
                <div className={style.commentBody}>
                    <div className={style.commentImg}>
                        <Skeleton height={200} style={{ width: '80%' }} />
                    </div>
                    <Skeleton height={13} count={6} style={{ width: '100%' }} />
                    <Skeleton height={20} width={70} />
                </div>
                <div className={style.commentFooter}>
                    <div className={style.like}>
                        <Skeleton height={20} width={20} />
                    </div>
                    <Skeleton height={40} width={70} />
                    <div className={style.like}>
                        <Skeleton height={20} width={70} />
                    </div>
                </div>
            </div>
        </SkeletonTheme>

    )
}

export default Comment_Skeleton