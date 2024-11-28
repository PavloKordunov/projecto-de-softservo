import css from "./Profile.module.css";
import Image from '../../img/person.png'
import Icon from '../../img/sprite.svg'
import Post from '../Post/Post'
import { useState } from "react";

const Profile = () => {

    const [showIcon, setShowIcon] = useState(null)
    
    return (
        <div className={css.profileContainer}>
            <div className={css.profileInfoContainer}>
                <img className={css.profileImage} src={Image} alt="profile image" width='110' height='110'/>
                <div>
                 <div className={css.profileUserContainer}>
                    <p className={css.profileName}>Name</p>
                    <svg className={css.profileIcon} width='37' height='32'>
                        <use href={`${Icon}#changeProfileIcon`}></use>
                    </svg>
                 </div>
                    <p className={css.profileNickname}>@Nickname</p>
                </div>
                    <ul className={css.profileStatsList}>
                        <li className={css.profileStatsEl}>
                            <p className={css.profileStatsText}>
                                1200
                            </p>
                            <p className={css.profileStatsText}>
                                Підписники
                            </p>
                        </li>
                        <li className={css.profileStatsEl}>
                            <p className={css.profileStatsText}>
                                700
                            </p>
                            <p className={css.profileStatsText}>
                                Підписаний
                            </p>
                        </li>
                        <li className={css.profileStatsEl}>
                            <p className={css.profileStatsText}>
                                10
                            </p>
                            <p className={css.profileStatsText}>
                                Групи
                            </p>
                        </li>
                    </ul>
            </div>

            <ul className={css.profileActivityList}>
                <li>
                    <button className={css.profileActivityButton}>Пости</button>
                </li>
                <li>
                    <button className={css.profileActivityButton}>Коментарі</button>
                </li>
                <li>
                    <button className={css.profileActivityButton}>Вподобання</button>
                </li>
                <li>
                    <button className={css.profileActivityButton}>Збережені</button>
                </li>
            </ul>

            <div className={css.profileLine}></div>

            <ul className={css.profileFilterPostList}>
                <li>
                    <button className={css.profileFilterPostButton}>
                    За вподобаннями
                    {showIcon&&
                        (<svg>
                            <use></use>
                        </svg>)}
                    </button>
                </li>
                <li>
                    <button className={css.profileFilterPostButton}>
                    За перглядами
                    {showIcon&&
                        (<svg>
                            <use></use>
                        </svg>)}
                    </button>
                </li>
                <li>
                    <button className={css.profileFilterPostButton}>
                    За датою
                    {showIcon&&
                        (<svg>
                            <use></use>
                        </svg>)}
                    </button>
                </li>
            </ul>

            <Post/>
        </div>
    )
}

export default Profile;