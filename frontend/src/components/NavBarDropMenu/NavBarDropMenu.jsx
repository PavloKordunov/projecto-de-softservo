import css from "../NavBar/NavBar.module.css";
import FlipImage from "../../img/person.png";
import Icon from "../../img/sprite.svg";

const NavBarDropMenu = ({isShow, handleCloseModal}) => {
    return (
        isShow && (
            <div className={css.NavBarFlipWrapper}
                 onClick={handleCloseModal}>
                <div className={css.NavBarFlipContainer}>
                    <a className={css.NavBarFlipLink}>
                        <img src={FlipImage} alt='person' width='53' height='53'/>
                        <div className={css.NavBarFlipTextContainer}>
                            <p className={css.NavBarFlipText}>View Profile</p>
                            <p className={css.NavBarFlipNickName}>@Nickname</p>
                        </div>
                    </a>
                    <div className={css.NavBarFlipIconContainer}>
                        <svg className={css.NavBarFlipIcon} width='34' height='34'>
                            <use href={`${Icon}#NavThemeIcon`}></use>
                        </svg>
                        <p className={css.NavBarFlipIconText}>Dark Mode</p>
                        <div className={css.NavChangeThemeSwitcher}>
                            <div className={css.NavChangeThemeCircle}></div>
                        </div>
                    </div>
                    <div className={css.NavBarFlipIconContainer}>
                        <svg className={css.NavBarFlipIcon} width='34' height='34'>
                            <use href={`${Icon}#NavSettingsIcon`}></use>
                        </svg>
                        <p className={css.NavBarFlipIconText}>Settings</p>
                    </div>
                    <div className={css.NavBarFlipIconContainer}>
                        <svg className={css.NavBarFlipIcon} width='34' height='34'>
                            <use href={`${Icon}#NavExitIcon`}></use>
                        </svg>
                        <p className={css.NavBarFlipIconText}>Log Out</p>
                    </div>
                </div>
            </div>)
)
}

export default NavBarDropMenu;