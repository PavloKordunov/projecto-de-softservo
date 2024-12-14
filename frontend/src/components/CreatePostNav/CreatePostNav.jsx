import css from "./CreatePostNav.module.css";
import Image from "../../img/person.png";
import {useState} from "react";
import FlipImage from "../../img/person.png";
import Icon from "../../img/sprite.svg";
import {Link} from "react-router-dom";

const CreatePostNav = ({setIsShow, handleSetTitle}) => {

    const [titleText, setTitleText] = useState("");

    const handleChange = (e) => {
        const nextValue = e.target.value;
        setTitleText(nextValue);
        handleSetTitle(nextValue);
    }

    const handleClick = (e) => {
        e.preventDefault();
        setIsShow(true);
    }

    return (
        <div className={css.createPostNav}>
            <Link to='userProfile' className={css.NavBarFlipLink}>
                <img src={FlipImage} alt='person' width='60' height='60'/>
            </Link>
            {/*<img src={Image} alt="logo" width='60' height='60'/>*/}
            <input
                onChange={handleChange}
                value={titleText}
                name='titleText'
                className={css.createPostNavInput}
                type="text"
                placeholder="Поширте те, що коїться у вас в голові"/>
            <input
                onChange={handleChange}
                value={titleText}
                name='titleText'
                className={css.createPostNavInputMobile}
                type="text"
                placeholder="Поширте те, що коїться"/>
            <button
                onClick={handleClick}
                className={css.createPostNavButton}
                type='button'>
                <span className={css.createPostNavButtonText}>Створити пост</span>
                <span className={css.createPostNavButtonMobileText}>Створити</span>
            </button>
        </div>
    )
}

export default CreatePostNav;
