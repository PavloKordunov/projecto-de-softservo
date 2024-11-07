import css from "./CreatePostNav.module.css";
import Image from "../../img/person.png";

const CreatePostNav = () => {
    return (
        <div className={css.createPostNav}>
            <img src={Image} alt="logo" width='53' height='53'/>
            <input className={css.createPostNavInput} type="text" placeholder="Поширте те, що коїться у вас в голові"/>
            <button className={css.createPostNavButton} type='button'>Створити пост</button>
        </div>
    )
}

export default CreatePostNav