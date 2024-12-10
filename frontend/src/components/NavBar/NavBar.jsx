import Icon from '../../img/sprite.svg';
import Image from '../../img/NavPerson.png';
import css from './NavBar.module.css';
import { useState, useEffect } from 'react';
import NavBarDropMenu from "../NavBarDropMenu/NavBarDropMenu";
import useWindowWidth from '../hooks/useWindowWidth';

const NavBar = () => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const handleShowMenu = () => {
        setIsShowMenu(!isShowMenu);
    };

    const handleHamburgerClick = () => {
        setIsHamburgerOpen(!isHamburgerOpen);
    };

    const handleCloseMenu = () => {
        setIsShowMenu(false);
    }; //??

    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (windowWidth <= 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
            setIsHamburgerOpen(false); // Закрити гамбургер при великих екранах
        }
    }, [windowWidth]);

    return (
        <div className={`${css.NavBarContainer} ${isHamburgerOpen && isMobile ? css.openMenu : ''}`}>
            {/* Логотип, пошукова стрічка, кнопка гамбургер */}
            <a href="/" className={css.NavBarLogo}>Logo</a>

            <div className={css.NavBarInputContainer}>
                <input className={css.NavBarInput} type='text' placeholder='Введіть для пошуку...' />
                <svg className={css.NavBarInputIcon} width="26" height="26">
                    <use href={`${Icon}#iconSearch`}></use>
                </svg>
            </div>

            {/* Кнопка гамбургера для мобільних */}
            {isMobile && (
                <button className={css.NavBarHamburgerButton} onClick={handleHamburgerClick}>
                    <svg width="20" height="20">
                        <use href={`${Icon}#iconHamburger`}></use>
                    </svg>
                </button>
            )}

            {/* Основне меню для великих екранів */}
            {!isMobile && (
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
            )}

            {/* Мобільне меню — відкривається при натисканні на гамбургер */}
            {isHamburgerOpen && isMobile && (
                <div className={css.NavBarHamburgerMenuContainer}>
                    <ul className={css.NavBarHamburgerMenu}>
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
                        <li className={css.NavBarIconEl}>
                            <svg width="26" height="26">
                                <use href={`${Icon}#iconMessage`}></use>
                            </svg>
                        </li>
                        <li className={css.NavBarIconEl}>
                            <svg width="26" height="26">
                                <use href={`${Icon}#iconNotification`}></use>
                            </svg>
                        </li>
                    </ul>
                </div>
            )}

            {/* Профіль користувача */}
            <a
                onClick={handleShowMenu}
                className={`${css.NavBarUserProfileContainer} ${isShowMenu ? 'open' : ''}`}
            >
                <div className={css.NavBarUserImageContainer}>
                    <img src={Image} alt="" width="40" height="43" />
                </div>
                <p className={css.NavBarName}>User</p>
                <svg
                    width="16"
                    height="11"
                    className={`${css.rotateArrow} ${isShowMenu ? css.rotateArrowOpen : ''}`}
                >
                    <use href={`${Icon}#iconArrowDown`} />
                </svg>
            </a>
            <NavBarDropMenu isShowMenu={isShowMenu} handleCloseMenu={handleShowMenu} />
        </div>
    );
}

export default NavBar;
