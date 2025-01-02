import { useNavigate } from "react-router-dom";
import Icon from "../../img/sprite.svg";
import css from "./PinnedGroupItem.module.css";

const PinnedGroupItem = () => {
    const navigate = useNavigate()
    return (
        <div className={css.pinnedGroupItemContainer} onClick={() => navigate("group")}>
            <div className={css.pinnedGroupItemImgContainer}>
                <svg width='26' height='26'>
                    <use href={`${Icon}#icon5`}></use>
                </svg>
            </div>
            <div>
                <p className={css.pinnedGroupItemText}>#ФільмиУкраїнською</p>
                <p className={css.pinnedGroupItemSubtext}>82,645 Posted by this tag</p>
            </div>
        </div>
    )
}

export default PinnedGroupItem