import css from "./HomePage.module.css";
import CreatePostNav from "../CreatePostNav/CreatePostNav";
import Post from "../Post/Post";
import { useState } from "react";
import CreatePostModal from "../CreatePostModal/CreatePostModal";

const HomePage = () => {
    const [isShow, setIsShow] = useState(false);
    const [titleText, setTitleText] = useState("");

    const handleSetTitle = (titleText) => {
        setTitleText(titleText);
    }

    const handleCloseModal = () => {
        setIsShow(false);
    };

    return (
        <div className={`${css.homePageContainer} ${isShow ? css.dimmed : ""}`}>
            <div>
                <CreatePostNav handleSetTitle={handleSetTitle} setIsShow={setIsShow} />
                <Post />
            </div>

            <CreatePostModal titleText = {titleText} isShow={isShow} handleCloseModal={handleCloseModal} />
        </div>
    );
};

export default HomePage;
