import css from "./NavPanel.module.css";
import Icon from "../../img/sprite.svg";

const NavPanel = () => {
    return (
        <ul className={css.panelList}>
            <li className={css.panelEl}>
                <a href="" className={css.panelElLink}>
                    <div className={css.svgContainer}>
                        <svg width="26" height="26">
                            <use href={`${Icon}#icon1`}></use>
                        </svg>
                    </div>
                    <div>
                        <p className={css.panelElText}>Нещодавні пости</p>
                        <p className={css.panelElSubtext}>Find the latest update</p>
                    </div>
                </a>
            </li>
            <li className={css.panelEl}>
                <a href="" className={css.panelElLink}>
                    <div className={css.svgContainer}>
                    <svg width='26' height='26'>
                        <use href={`${Icon}#icon2`}></use>
                    </svg>
                    </div>
                    <div>
                        <p className={css.panelElText}>Популярне сьогодні</p>
                        <p className={css.panelElSubtext}>Shots featured today by curators</p>
                    </div>
                </a>
            </li>
            <li className={css.panelEl}>
                <a href="" className={css.panelElLink}>
                    <div className={css.svgContainer}>
                        <svg width='26' height='26'>
                            <use href={`${Icon}#icon3`}></use>
                        </svg>
                    </div>
                    <div>
                        <div className={css.panelElSubs}>
                            <p className={css.panelElText}>Підписники</p>
                            <div className={css.subNumberContainer}>
                                <p className={css.subNumber}>24</p>
                            </div>
                        </div>
                        <p className={css.panelElSubtext}>Explore from your favorite person</p>
                    </div>
                </a>
            </li>
        </ul>
    )
}

export default NavPanel