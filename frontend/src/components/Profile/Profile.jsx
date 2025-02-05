import css from "./Profile.module.css";
import Image from '../../img/person.png';
import Icon from '../../img/sprite.svg';
import Post from '../Post/Post';
import { useEffect, useState, useRef } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

const Profile = () => {
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 450;

    console.log(isMobile);

    const [showIcon, setShowIcon] = useState(null);
    const [topics, setTopics] = useState([]);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/topics");
                const data = await res.json();
                console.log(data.body);
                setTopics(data.body);
            } catch (error) {
                console.error("Error fetching topics:", error);
            }
        };

        fetchTopics();
    }, []);

    return (
        <div className={css.profileContainer}>
            <div className={css.profileWrapper}>
                <div className={css.profileInfoContainer}>
                    <div className={css.profileImgName}>
                        <img className={css.profileImage} src={Image} alt="profile image" width='110' height='110'/>
                        <div className={css.profileUserContainer}>
                            <p className={css.profileName}>Name</p>
                            {isMobile ? (
                                <svg className={css.profileIcon} width='37' height='32'>
                                    <use href={`${Icon}#changeProfileIcon`}></use>
                                </svg>
                            ) : (
                                <svg className={css.profileIcon} width='37' height='32'>
                                    <use className="changeProfile"
                                         href={`${Icon}#changeProfileIcon`}></use>
                                </svg>
                            )}
                        </div>
                        <p className={css.profileNickname}>@Nickname</p>
                    </div>
                    <ul className={css.profileStatsList}>
                        <li className={css.profileStatsEl}>
                            <p className={css.profileStatsText}>1200</p>
                            <p className={css.profileStatsText}>Підписники</p>
                        </li>
                        <li className={css.profileStatsEl}>
                            <p className={css.profileStatsText}>700</p>
                            <p className={css.profileStatsText}>Підписаний</p>
                        </li>
                        <li className={css.profileStatsEl}>
                            <p className={css.profileStatsText}>10</p>
                            <p className={css.profileStatsText}>Групи</p>
                        </li>
                    </ul>
                    {isMobile && (
                        <div className={css.profileButton}>
                            <button className={css.editProfileButton}>Редагувати профіль</button>
                            <button className={css.editProfileButton}>Поширити профіль</button>
                        </div>
                    )}
                </div>

                <ul className={css.profileActivityList}>
                    {isMobile ? (
                        <>
                            <li>
                                <button className={css.profileActivityIconButton}>
                                    <svg className={css.icon} width='37' height='32'>
                                        <use href={`${Icon}#posts`}></use>
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button className={css.profileActivityIconButton}>
                                    <svg className={css.icon} width='37' height='32'>
                                        <use href={`${Icon}#white-comments`}></use>
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button className={css.profileActivityIconButton}>
                                    <svg className={css.icon} width='37' height='32'>
                                        <use href={`${Icon}#white-heart`}></use>
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button className={css.profileActivityIconButton}>
                                    <svg className={css.icon} width='37' height='32'>
                                        <use href={`${Icon}#white-save`}></use>
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button className={css.profileActivityIconButton}>
                                    <svg className={css.icon} width='37' height='32'>
                                        <use href={`${Icon}#ratings`}></use>
                                    </svg>
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </ul>
            </div>
            {!isMobile ? (
                <ul className={css.profileFilterPostList}>
                    <li>
                        <button className={css.profileFilterPostButton}>За вподобаннями</button>
                    </li>
                    <li>
                        <button className={css.profileFilterPostButton}>За переглядами</button>
                    </li>
                    <li>
                        <button className={css.profileFilterPostButton}>За датою</button>
                    </li>
                </ul>
            ) : (
                <div className={css.profileFilterWrapper} ref={filterRef}>
                    <button className={css.profileFilter} onClick={() => setIsFilterOpen(!isFilterOpen)}>Фільтер</button>
                        {isFilterOpen && (
                            <ul className={css.profileFilterDropdown}>
                                <div className={css.profileFilterDropdownMenu}>
                                    <li>
                                        <button className={css.profileFilterOption}>
                                            За переглядами (від більших до менших)
                                        </button>
                                    </li>
                                    <li>
                                        <button className={css.profileFilterOption}>
                                            За переглядами (від менших до більших)
                                        </button>
                                    </li>
                                    <li>
                                        <button className={css.profileFilterOption}>
                                            За датою (від новіших до старіших)
                                        </button>
                                    </li>
                                    <li>
                                        <button className={css.profileFilterOption}>
                                            За датою (від старіших до новіших)
                                        </button>
                                    </li>
                                    <li>
                                        <button className={css.profileFilterOption}>
                                            За вподобаннями (від більших до менших)
                                        </button>
                                    </li>
                                    <li>
                                        <button className={css.profileFilterOption}>
                                            За вподобаннями (від менших до більших)
                                        </button>
                                    </li>
                                </div>
                            </ul>
                        )}
                </div>
            )}
            <div>
                {topics?.map(topic => (
                    <Post key={topic.id} topic={topic}/>
                ))}
            </div>
        </div>
    );
};

export default Profile;
