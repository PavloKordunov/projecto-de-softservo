import css from "./AdminPost.module.css"
import Image from '../../img/postTitle.png'
import Icon from '../../img/sprite.svg'
import AdminPostCast from "./AdminPostCast";
import AdminPostRating from "./AdminPostRating";
import AdminPostComments from "./AdminPostComments";
import {Link} from "react-router-dom";

const AdminPost = () => {
    return (
        <div className={css.adminPostContainer}>
        <div className={css.adminPostHeadContainer}>
            <div>
                <img className={css.adminPostImg} src={Image} alt='postTitle' height='346' width='237'/>

                <a className={css.adminPostTrailer}>
                    <p className={css.adminPostTrailerText}>Переглянути трейлер</p>
                </a>

                <ul className={css.adminPostTagList}>
                    <li className={css.adminPostTagEl}>
                        <a className={css.adminPostTagElText}>живучі</a>
                    </li>
                    <li className={css.adminPostTagEl}>
                        <a className={css.adminPostTagElText}>хоррор</a>
                    </li>
                    <li className={css.adminPostTagEl}>
                        <a className={css.adminPostTagElText}>слешер</a>
                    </li>
                </ul>

                <ul className={css.adminPostUserRatingList}>
                    <li className={css.adminPostUserRatingEl}>
                        <svg className={css.adminPostUserRatingIcon} width='25' height='25'>
                            <use href={`${Icon}#starIcon`}></use>
                        </svg>
                        <svg className={css.adminPostUserRatingIcon} width='25' height='25'>
                            <use href={`${Icon}#starIcon`}></use>
                        </svg>
                        <svg className={css.adminPostUserRatingIcon} width='25' height='25'>
                            <use href={`${Icon}#starIcon`}></use>
                        </svg>
                        <svg className={css.adminPostUserRatingIcon} width='25' height='25'>
                            <use href={`${Icon}#starIcon`}></use>
                        </svg>
                        <svg className={css.adminPostUserRatingIcon} width='25' height='25'>
                            <use href={`${Icon}#starIcon`}></use>
                        </svg>
                    </li>
                    <li>
                        <p className={css.adminPostUserRatingText}>100,145 Відгуки</p>
                    </li>
                </ul>

                <a className={css.adminPostGroup}>
                    <p className={css.adminPostGroupText}>Група по цьому фільму тут</p>
                </a>
            </div>
            <div>
                <div className={css.adminPostTitleContainer}>
                    <h1 className={css.adminPostTitleText}>Жахаючий 3</h1>
                    <div className={css.adminPostAgeLimitContainer}>
                        <p className={css.adminPostAgeLimitText}>18+</p>
                    </div>
                    <Link to={'/'}>
                    <svg className={css.adminPostTitleCloseIcon} width="32" height="32">
                        <use href={`${Icon}#closeBtnIcon`}/>
                    </svg>
                    </Link>
                </div>

                <ul className={css.adminPostInfoContainer}>
                    <li>
                        <p className={css.adminPostInfoType}>Рейтинг:</p>
                        <p className={css.adminPostInfoType}>Рік: </p>
                        <p className={css.adminPostInfoType}>Країна:</p>
                        <p className={css.adminPostInfoType}>Тривалість:</p>
                        <p className={css.adminPostInfoType}>Жанр:</p>
                        <p className={css.adminPostInfoType}>Рекомендований вік:</p>
                    </li>
                    <li>
                        <p className={css.adminPostInfoResult}>IMBD: <strong>6.5/10</strong> (29К)</p>
                        <p className={css.adminPostInfoResult}>2024</p>
                        <p className={css.adminPostInfoResult}>США</p>
                        <p className={css.adminPostInfoResult}>2:05 </p>
                        <p className={css.adminPostInfoResult}>Жахи</p>
                        <p className={css.adminPostInfoResult}>18+ (тільки для дорослих)</p>
                    </li>
                </ul>

                <div className={css.adminPostDescriptionContainer}>
                    <p className={css.adminPostDescriptionText}>
                        "Жахаючий 3" (англ. Terrifier 3) — американський різдвяний надприродний слешер 2024 року від Демієна Леоне. У головних ролях — Лорен Лавера, Девід Говард Торнтон та інші актори з попередніх частин. У сюжеті Сієнна Шоу намагається налагодити своє життя, але знову зіштовхується з Артом і його новою спільницею, одержимою Вікторією Хейз. Після успіху "Жахаючого 2" Леоне вирішив глибше розкрити образ Вікторії.
                    </p>
                </div>
            </div>
        </div>
            <AdminPostCast/>
            <AdminPostRating/>
            <AdminPostComments/>
        </div>
    )
}

export default AdminPost