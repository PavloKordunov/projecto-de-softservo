import Icon from '../../img/sprite.svg';
import Image from '../../img/NavPerson.png';
import css from './NavBar.module.css';
import { useState, useEffect } from 'react';
import NavBarDropMenu from "../NavBarDropMenu/NavBarDropMenu";
import useWindowWidth from '../hooks/useWindowWidth';

const NavBar = () => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const windowWidth = useWindowWidth();

    const handleShowMenu = () => {
        setIsShowMenu(!isShowMenu);
    };

    const handleCloseMenu = () => {
        setIsShowMenu(false);
    }; //??

    const isMobile = useWindowWidth <= 768;;

    return (
        <div className={css.NavBarContainer}>
            <a href="/" className={css.NavBarLogo}>Logo</a>

            <ul className={css.NavBarIconsListOne}>
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

            <ul className={css.NavBarIconsListTwo} id={'NavBarIconMessage'}>
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
            <a
                onClick={handleShowMenu}
                className={`${css.NavBarUserProfileContainer} ${isShowMenu ? 'open' : ''}`}>
                <div className={css.NavBarUserImageContainer}>
                    <img src={Image} alt="" width="40" height="43"/>
                </div>
                <p className={css.NavBarName}>User</p>
                <svg
                    width="16"
                    height="11"
                    className={`${css.rotateArrow} ${isShowMenu ? css.rotateArrowOpen : ''}`}>
                    <use href={`${Icon}#iconArrowDown`}/>
                </svg>
            </a>
            <NavBarDropMenu
            isShowMenu={isShowMenu}
            handleCloseMenu={handleShowMenu}
            isFooterMenu={false} />
            <div className={css.NavBarFooter}>
                <a href="/" className={css.NavBarFooterIcon}>
                    <svg width="24" height="24">
                        <use href={`${Icon}#iconHome`}></use>
                    </svg>
                </a>
                <a href="/calendar" className={css.NavBarFooterIcon}>
                    <svg width="24" height="24">
                        <use href={`${Icon}#CalendarIcon`}></use>
                    </svg>
                </a>
                <a href="/community" className={css.NavBarFooterIcon}>
                    <svg width="24" height="24">
                        <use href={`${Icon}#iconCommunity`}></use>
                    </svg>
                </a>
                <a
                    onClick={handleShowMenu}
                    className={`${css.NavBarFooterIcon} ${isShowMenu ? 'open' : ''}`}>
                    <div className={css.NavBarUserImageContainerFooter}>
                        <svg width="24" height="24">
                            <use href={`${Icon}#iconProfile`}></use>
                        </svg>
                    </div>
                    <svg
                        width="16"
                        height="11"
                        className={`${css.rotateArrow} ${isShowMenu ? css.rotateArrowOpen : ''}`}>
                        <use href={`${Icon}#iconArrowDown`}/>
                    </svg>
                </a>
            </div>
        </div>
    );
}

export default NavBar;
