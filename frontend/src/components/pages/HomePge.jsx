import css from "./HomePage.module.css";

import NavPanel from "../NavPanel/NavPanel";
import PopularTags from "../PopularTags/PopularTags";
import PinnedGroup from "../PinnedGroup/PinnedGroup";
import CreatePostNav from "../CreatePostNav/CreatePostNav";
import Post from "../Post/Post";

const HomePage = () => {
    return (
        <div className={css.container}>
            <div>
                <NavPanel/>
                <PopularTags/>
                <PinnedGroup/>
            </div>
            <div>
                <CreatePostNav/>
                <Post/>
            </div>
        </div>
    )
}

export default HomePage