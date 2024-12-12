import css from "./PopularTags.module.css";

import PopularTagsItem from "./PopularTagsItem";

const PopularTags = () => {
    return (
        <div className={css.popularTagContainer}>
            <h2 className={css.popularTagTitle}>Популярні Теги</h2>
            <ul>
                <PopularTagsItem/>
            </ul>
        </div>
    )
}

export default PopularTags