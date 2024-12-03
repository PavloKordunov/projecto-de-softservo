import NavBar from '../NavBar/NavBar';
import NavPanel from '../NavPanel/NavPanel';
import { Outlet } from "react-router-dom";
import PopularTags from "../PopularTags/PopularTags";
import PinnedGroup from "../PinnedGroup/PinnedGroup";
import css from "./Layout.module.css";

const Layout = () => {
    return (
        <div >
        <div className={css.layoutContainer}>
            <div className={css.sidePanel}>
                <NavPanel />
                <PopularTags />
                <PinnedGroup />
            </div>
                <Outlet />
        </div>
        </div>
    );
};

export default Layout;
