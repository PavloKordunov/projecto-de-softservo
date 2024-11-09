import css from "./CreatePostNav.module.css";
import Image from "../../img/person.png";
import {useState} from "react";

const CreatePostNav = ({setIsShow, handleSetTitle}) => {

    const [titleText, setTitleText] = useState("");

    const handleChange = (e) => {
        setTitleText(e.target.value);
        handleSetTitle(titleText)
    }

    const handleClick = (e) => {
        e.preventDefault();
        setIsShow(true);
    }

    return (
        <div className={css.createPostNav}>
            <img src={Image} alt="logo" width='53' height='53'/>
            <input onChange={handleChange} value={titleText} name='titleText' className={css.createPostNavInput} type="text" placeholder="Поширте те, що коїться у вас в голові"/>
            <button onClick={handleClick} className={css.createPostNavButton} type='button'>Створити пост</button>
        </div>
    )
}

export default CreatePostNav;
