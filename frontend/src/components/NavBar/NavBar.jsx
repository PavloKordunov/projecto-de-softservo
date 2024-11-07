import Icon from '../../img/sprite.svg'
import Image from '../../img/NavPerson.png'
import css from './NavBar.module.css'

const NavBar = () => {
    return (
        <div className={css.NavBarContainer}>
            <a href="/" className={css.NavBarLogo}>Logo</a>

            <ul className={css.NavBarIconsList}>
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

            <ul className={css.NavBarIconsList}>
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

            <a href="/about" className={css.NavBarUserProfileContainer}>
                <div className={css.NavBarUserImageContainer}>
                    <img src={Image} alt="about" width='40' height='43'/>
                </div>
                <p className={css.NavBarName}>User</p>
                <svg width="16" height="11">
                <use href={`${Icon}#iconArrowDown`} />
                </svg>
            </a>
        </div>
    )
}

export default NavBar;