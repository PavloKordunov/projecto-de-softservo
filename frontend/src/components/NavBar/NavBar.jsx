import Icon from '../../img/sprite.svg';
import Image from '../../img/NavPerson.png';
import css from './NavBar.module.css';
import { useState, useEffect  } from 'react';
import NavBarDropMenu from "../NavBarDropMenu/NavBarDropMenu";
import useWindowWidth from '../hooks/useWindowWidth';
import { useOktaAuth } from '@okta/okta-react';
import ProfileImage from '../../img/log-icon.png';
import Messenger from "../Messenger/Messenger";

const NavBar = () => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 440;
    const [searchQuery, setSearchQuery] = useState('');
    const { authState } = useOktaAuth();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isShowMessenger, setIsShowMessenger] = useState(false);

    const handleShowMenu = () => {
        setIsShowMenu(!isShowMenu);
    };

    const handleShowMessenger = () => {
        setIsShowMessenger(!isShowMessenger);
    };

    const handleCloseMessenger = () => {
        setIsShowMessenger(false);
    };

    useEffect(() => {
        if (authState?.isAuthenticated) {
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
    }, [authState]);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            console.log(`Пошук: ${searchQuery}`);
        } else {
            console.log('Пошуковий запит порожній');
        }
    };

    return (
        <div>
            <div className={css.NavBarContainer}>
                <a href="/" className={css.NavBarLogo}>Logo</a>
                {!isMobile && (
                    <>
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
                            <input
                                className={css.NavBarInput}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Введіть для пошуку..."
                            />
                            <button onClick={handleSearch} className={css.NavBarSearchButton}>
                                <svg width="26" height="26">
                                    <use href={`${Icon}#iconSearch`}></use>
                                </svg>
                            </button>
                        </div>
                    </>
                )}
                {isMobile ? (
                    <div className={css.NavBarMobile}>
                        <div className={css.NavBarInputContainer}>
                            <input
                                className={css.NavBarInput}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Введіть для пошуку..."
                            />
                            <button onClick={handleSearch} className={css.NavBarSearchButton}>
                                <svg width="24" height="24">
                                    <use href={`${Icon}#iconSearch`}></use>
                                </svg>
                            </button>
                        </div>
                        <ul className={css.NavBarIconsListTwo}>
                            <li className={css.NavBarIconEl} onClick={handleShowMessenger}>
                                <svg width="26" height="26" >
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
                ) : (
                    <>
                        <ul className={css.NavBarIconsListTwo}>
                            <div className={css.NavBarIconsList}>
                                <div className={css.NavBarIconEl} onClick={handleShowMessenger}>
                                    <svg width="26" height="26">
                                        <use href={`${Icon}#iconMessage`}></use>
                                    </svg>
                                </div>
                            </div>
                                    {/*<li className={css.NavBarIconEl}>*/}
                                    {/*    <svg width="26" height="26">*/}
                                    {/*        <use href={`${Icon}#iconMessage`}></use>*/}
                                    {/*    </svg>*/}
                                    {/*</li>*/}
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
                        <NavBarDropMenu isShowMenu={isShowMenu}
                                        handleCloseMenu={handleShowMenu}
                                        isFooterMenu={false}
                                        className={css.navBarDropMenu}/>
                    </>
                )}
            </div>
            <Messenger
                setIsShowMessenger={setIsShowMessenger}
                isShowMessenger={isShowMessenger}
                handleCloseMessenger={handleCloseMessenger} />
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
                    {isUserLoggedIn ? (
                        <img
                            src={ProfileImage}
                            alt="User Profile"
                            width="25"
                            height="25"
                            className={css.ProfileImage}
                        />
                    ) : (
                        <svg width="24" height="24">
                            <use href={`${Icon}#iconProfile`}></use>
                        </svg>
                    )}
                </a>
            </div>
        </div>
    );
};

export default NavBar;


