import PinnedGroupItem from "./PinnedGroupItem";
import css from "./PinnedGroup.module.css";
import Icon from "../../img/sprite.svg";

const PinnedGroup = () => {
    return (
        <div className={css.pinnedGroupContainer}>
            <div className={css.pinnedGroupTitleContainer}>
            <p className={css.pinnedGroupTitle}>Закріплені Групи</p>
            <a href=''>
                <svg width='16' height='13'>
                    <use href={`${Icon}#icon4`}></use>
                </svg>
            </a>
            </div>

            <ul>
                <PinnedGroupItem/>
            </ul>
        </div>
    )
}

export default PinnedGroup