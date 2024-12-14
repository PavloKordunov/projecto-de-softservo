import Icon from '../../img/sprite.svg'
import Image from '../../img/NavPerson.png'
import css from './NavBar.module.css'
import {useState} from "react";
import NavBarDropMenu from "../NavBarDropMenu/NavBarDropMenu";
import {Link} from "react-router-dom";
import Messenger from "../Messenger/Messenger";

const NavBar = () => {

    const [isShowMenu, setIsShowMenu] = useState(false);
    const [isShowMessenger, setIsShowMessenger] = useState(false);

    const handleShowMenu = () => {
        setIsShowMenu(!isShowMenu);
    }

    const handleCloseMenu = () => {
        setIsShowMenu(false);
    }

    const handleShowMessenger = () => {
        setIsShowMessenger(!isShowMessenger);
    }

    const handleCloseMessenger = () => {
        setIsShowMessenger(false);
    }

    return (
        <div className={css.NavBarContainer}>
            <a href="/" className={css.NavBarLogo}>Logo</a>

            <ul className={css.NavBarIconsList}>
                <li className={css.NavBarIconEl}>
                    <svg width="26" height="26">
                        <use href={`${Icon}#CalendarIcon`}></use>
                    </svg>
                </li>
                <li className={css.NavBarIconEl}>
                    <svg width="26" height="26">
                        <use href={`${Icon}#iconHome`}></use>
                    </svg>
                </li>
                <li className={css.NavBarIconEl}>
                    <svg width="26" height="26">
                        <use href={`${Icon}#iconCommunity`}></use>
                    </svg>
                </li>
            </ul>

            <div className={css.NavBarInputContainer}>
                <input className={css.NavBarInput} type='text' placeholder='Введіть для пошуку...'/>
                <svg className={css.NavBarInputIcon} width="26" height="26">
                    <use href={`${Icon}#iconSearch`}></use>
                </svg>
            </div>

            <div className={css.NavBarIconsList}>
                <div className={css.NavBarIconEl} onClick={handleShowMessenger}>
                    <svg width="26" height="26">
                        <use href={`${Icon}#iconMessage`}></use>
                    </svg>
                </div>
                <li className={css.NavBarIconEl}>
                    <svg width="26" height="26">
                        <use href={`${Icon}#iconNotification`}></use>
                    </svg>
                </li>
            </div>

            <Link to='auth-page'>login</Link>

            <a onClick={handleShowMenu} className={css.NavBarUserProfileContainer}>
                <div className={css.NavBarUserImageContainer}>
                    <img src={Image} alt="" width='40' height='43'/>
                </div>
                <p className={css.NavBarName}>User</p>
                <svg width="16" height="11">
                    <use href={`${Icon}#iconArrowDown`} />
                </svg>
            </a>
            <NavBarDropMenu isShowMenu={isShowMenu} handleCloseMenu={handleCloseMenu}/>
            <Messenger setIsShowMessenger={setIsShowMessenger} isShowMessenger={isShowMessenger} handleCloseMessenger={handleCloseMessenger} />
        </div>
    )
}

export default NavBar;