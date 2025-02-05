import PinnedGroupItem from "./PinnedGroupItem";
import css from "./PinnedGroup.module.css";
import Icon from "../../img/sprite.svg";
import { useState } from "react";
import CreatePostModal from "../CreatePostModal/CreatePostModal";
import CreateGroupModal from "../CreateGroupModal/CreateGroupModal";

const PinnedGroup = () => {

    const [isShow, setIsShow] = useState(false)

    const handleShow = () => {
        setIsShow(!isShow)
    }

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
                <button onClick={handleShow} className={css.addGroupBtn}>
                    <span style={{fontSize: 32}}>+</span>
                    Добавити групу
                </button>
                <PinnedGroupItem />
            </ul>

            {isShow && <CreateGroupModal handleShow={handleShow}/>}
        </div>
    )
}

export default PinnedGroup