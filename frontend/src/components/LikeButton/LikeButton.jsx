import { useState } from "react";
import css from "./LikeButton.module.css";
import Icon from "../../img/sprite.svg";

const LikeButton = ({ initialLiked = false, onToggle, className }) => {
    const [isLiked, setIsLiked] = useState(initialLiked);

    const handleLikeClick = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
        if (onToggle) {
            onToggle(!isLiked);
        }
    };

    return (
        <div
            className={`${css.likeButton} ${isLiked ? css.liked : ""} ${className}`}
            onClick={handleLikeClick}
            role="button"
            tabIndex={0}
            aria-pressed={isLiked}
        >
            <svg className={css.likeIcon} width="26" height="26">
                <use href={`${Icon}#iconLike`}></use>
            </svg>
        </div>
    );
};

export default LikeButton;
