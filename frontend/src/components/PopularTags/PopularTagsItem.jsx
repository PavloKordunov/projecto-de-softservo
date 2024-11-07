import css from "./PopularTagsItem.module.css";
import DevImg from "../../img/Dev.png";

const PopularTagsItem = () => {
    return (
        <div className={css.popularTegItemContainer}>
            <div className={css.popularTegItemImgContainer}>
                <img src={DevImg} alt="tag" width='26' height='26' />
            </div>
            <div>
                <p className={css.popularTegItemTheme}>#Жахи</p>
                <p className={css.popularTegItemSubtext}>82,645 Posted by this tag</p>
            </div>
        </div>
    )
}

export default PopularTagsItem