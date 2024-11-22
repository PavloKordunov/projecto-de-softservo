import css from "../NavBar/NavBar.module.css";
import FlipImage from "../../img/person.png";
import Icon from "../../img/sprite.svg";
import {Link} from "react-router-dom";

const NavBarDropMenu = ({isShowMenu, handleCloseMenu }) => {
    return (
        isShowMenu && (
            <div className={css.NavBarFlipWrapper}
             onClick={handleCloseMenu}>
                <div className={css.NavBarFlipContainer}>
                    <Link to='userProfile' className={css.NavBarFlipLink}>
                        <img src={FlipImage} alt='person' width='53' height='53'/>
                        <div className={css.NavBarFlipTextContainer}>
                            <p className={css.NavBarFlipText}>View Profile</p>
                            <p className={css.NavBarFlipNickName}>@Nickname</p>
                        </div>
                    </Link>
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
            </div>
        )
)
}

export default NavBarDropMenu;