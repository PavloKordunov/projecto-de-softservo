import css from "./Post.module.css";
import Image from "../../img/image.png";
import Icon from "../../img/sprite.svg";
import ImagePost from "../../img/person.png";

const Post = () => {
    return (
        <div className={ css.postContainer}>
            <img src={Image} alt="film" width='206' height='206' />
            <div>
                <div className={css.postTitleContainer}>
                    <h3 className={css.pageTitle}>Новий хоррор-фільм “Жахаючий 3” скоро буде доступний у кінотеатрах України!</h3>
                    <div className={css.pageIconContainer}>
                        <svg className={css.pageIcon} width='26' height='26'>
                            <use href={`${Icon}#iconLike`}></use>
                        </svg>
                    </div>
                </div>

                <ul className={css.pageGenresList}>
                    <li className={css.pageGenresEl}>
                        <p className={css.pageGenresText}>хоррор</p>
                    </li>
                    <li className={css.pageGenresEl}>
                        <p className={css.pageGenresText}>страшний</p>
                    </li>
                </ul>

                <div className={css.postInfo}>
                <img className={css.postInfoImg} src={ImagePost} alt="" width='53' height='53'/>
                   <div className={css.postInfoList}>
                    <p className={css.postInfoAuthor}>Павло Сірий</p>
                    <p className={css.postInfoAuthorTime}>2 години тому</p>
                </div>
                <ul className={css.postStatysticsList}>
                    <li className={css.postStatysticsItem}>651,324 Переглядів</li>
                    <li className={css.postStatysticsItem}>36,6545 Уподобань</li>
                    <li className={css.postStatysticsItem}>56 Коментарів</li>
                </ul>
                </div>
            </div>
        </div>
    )
}

export default Post