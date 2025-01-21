import css from "./Profile.module.css";
import Image from '../../img/person.png'
import Icon from '../../img/sprite.svg'
import Post from '../Post/Post'
import { useEffect, useState } from "react";

const Profile = () => {

    const [showIcon, setShowIcon] = useState(null)
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics= async() => {
            try {
                const res = await fetch("http://localhost:8080/api/topics");
                const data = await res.json();
                console.log(data.body)
                setTopics(data.body);
            } catch (error) {
                console.error("Error fetching topics:", error);
            }
        }
    
        fetchTopics();
    }, [])

    return (
        <div className={css.profileContainer}>
            <div className={css.profileWrapper}>
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
                <li>
                    <button className={css.profileActivityButton}>Мої оцінки</button>
                </li>
            </ul>
            </div>
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
            <div style={{backgroundColor:""}}>
                {topics?.map(topic => (
                    <Post key={topic.id} topic={topic} />
                ))}
            </div>
        </div>
    )
}

export default Profile;