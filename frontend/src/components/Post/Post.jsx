import css from "./Post.module.css";
import Image from "../../img/image.png";
import Icon from "../../img/sprite.svg";
import ImagePost from "../../img/person.png";
import {Link, useNavigate} from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";
import { useEffect } from "react";


const Post = ({topic}) => {

    const navigate = useNavigate()

    // useEffect(async() => {
    //     try {
    //         const res = await fetch(`http://localhost:8080/api/users/`)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })

    const handleLikeToggle = (isLiked) => {
        console.log("Лайк поставлено:", isLiked);
    };

    return (
        <a className={css.postNavigate} onClick={() => {
            navigate('/adminPost');
          }}>

        <div className={ css.postContainer}>
            <img src={Image} alt="film" width='206' height='206' />
            <div>
                <div className={css.postTitleContainer}>
                    <h3 className={css.pageTitle}>
                        {topic?.title}
                    </h3>
                    <LikeButton
                        initialLiked={false}
                        onToggle={handleLikeToggle}
                        className={css.likeButton}/>
                </div>
                <ul className={css.pageGenresList}>
                    <li className={css.pageGenresEl}>
                        <p className={css.pageGenresText}>хоррор</p>
                    </li>
                    <li className={css.pageGenresEl}>
                        <p className={css.pageGenresText}>страшний</p>
                    </li>
                    <li className={css.pageGenresEl}>
                        <p className={css.pageGenresText}>клоун</p>
                    </li>
                </ul>
                <div className={css.postInfo}>
                    <img
                        className={css.postInfoImg}
                        src={ImagePost}
                        alt=""
                        width='53' height='53'
                        />
                       <div className={css.postInfoList}>
                            <p className={css.postInfoAuthor} onClick={() => navigate('/:id')}>Павло Сірий</p>
                            <p className={css.postInfoAuthorTime}>2 години тому</p>
                       </div>
                    <ul className={css.postStatisticsList}>
                        <li className={css.postStatisticsItem}>651,324 Переглядів</li>
                        <li className={css.postStatisticsItem}>36,6545 Уподобань</li>
                        <li className={css.postStatisticsItem}>56 Коментарів</li>
                    </ul>
                </div>
            </div>
        </div>
        </a>
    )
}

export default Post