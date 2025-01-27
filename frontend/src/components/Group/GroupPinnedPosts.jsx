import React, { useState } from 'react';
import css from './GroupPinnedPosts.module.css';
import ImgPost1 from '../../img/ImgPost1.png';
import ImgPost2 from '../../img/ImgPost2.png';
import ImgPost3 from '../../img/imgPost3.png';

const posts = [
    { image: ImgPost1, title: 'Найкращий фільм 2024 року, чи черговий хайп?' },
    { image: ImgPost2, title: 'А взагалі є сенс це дивитися? Це ж вже було...' },
    { image: ImgPost3, title: 'Захар Беркут чи Беркут Захар? Ось в чому питання...' },
];

const GroupPinnedPosts = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const scroll = (direction) => {
        setCurrentIndex((prevIndex) => {
            if (direction === 'left') {
                return prevIndex === 0 ? posts.length - 1 : prevIndex - 1;
            } else {
                return prevIndex === posts.length - 1 ? 0 : prevIndex + 1;
            }
        });
    };

    return (
        <div className={css.groupPinnedPostsWrapper}>
            <button className={css.scrollButtonLeft} onClick={() => scroll('left')}>
                &#8592;
            </button>
            <div className={css.groupPinnedPostsMain}>
                <div className={css.groupPinnedPost}>
                    <img  className={css.groupPinnedPostImg}
                          src={posts[currentIndex].image}
                          alt="Post" />
                    <p className={css.groupPinnedPostTitle}>
                        {posts[currentIndex].title}
                    </p>
                </div>
            </div>
            <button className={css.scrollButtonRight} onClick={() => scroll('right')}>
                &#8594;
            </button>
        </div>
    );
};

export default GroupPinnedPosts;
