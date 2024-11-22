import css from "./AdminPostRating.module.css"
import Icon from "../../img/sprite.svg";

const AdminPostRating = () => {
    return (
        <div>
            <div className={css.adminPostRatingTitleContainer}>
                <p className={css.adminPostRatingTitle}>
                    Залиш свої враження тут:
                </p>
                    <svg className={css.adminPostRatingIcon} width='40' height='40'>
                        <use href={`${Icon}#starIcon`}></use>
                    </svg>
                    <svg className={css.adminPostRatingIcon} width='40' height='40'>
                        <use href={`${Icon}#starIcon`}></use>
                    </svg>
                    <svg className={css.adminPostRatingIcon} width='40' height='40'>
                        <use href={`${Icon}#starIcon`}></use>
                    </svg>
                    <svg className={css.adminPostRatingIcon} width='40' height='40'>
                        <use href={`${Icon}#starIcon`}></use>
                    </svg>
                    <svg className={css.adminPostRatingIcon} width='40' height='40'>
                        <use href={`${Icon}#starIcon`}></use>
                    </svg>
            </div>

            <div className={css.adminPostRatingInputContainer}>
                <input className={css.adminPostRatingInput} type='text'/>
                <button className={css.adminPostRatingButton} type='button'>Створити коментар</button>
            </div>
        </div>
    )
}

export default AdminPostRating;