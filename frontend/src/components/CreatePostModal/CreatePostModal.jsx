import css from './CreatePostModal.module.css';
import Icon from '../../img/sprite.svg';
import {useState} from "react";

const CreatePostModal = ({ isShow, handleCloseModal, titleText }) => {

    const [showText, setShowText] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    const handleShowText = () => {
            setShowVideo(false);
            setShowText(true)
    }

    const handleShowVideo = () => {
            setShowText(false)
            setShowVideo(true);
    }

    return (
        <div>
            {isShow && (
                <div
                    className={css.createPostContainerWrapper}
                    onClick={handleCloseModal}
                >
                    <div
                        className={css.createPostContainer}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={css.createPostTitleContainer}>
                            <h2 className={css.createPostTitle}>Create a post</h2>
                            <a className={css.closeButton} onClick={handleCloseModal}>
                                <svg width="32" height="32" className={css.createPostCloseButtonContainer}>
                                    <use href={`${Icon}#postModalCloseBtnIcon`} />
                                </svg>
                            </a>
                        </div>

                        <div className={css.createPostGroupContainer}>
                            <svg width="23" height="23">
                                <use href={`${Icon}#icon5`} />
                            </svg>
                            <p className={css.createPostGroupText}>Select a group</p>
                        </div>

                        <ul className={css.createPostTypeContainer}>
                            <a onClick={handleShowText} className={css.createPostType}>
                                <p className={css.createPostTypeText}>Text</p>
                            </a>
                            <a onClick={handleShowVideo} className={css.createPostType}>
                                <p className={css.createPostTypeText}>Image or Video</p>
                            </a>
                        </ul>

                        <input value={titleText} className={css.createPostInputTitle} type="text" placeholder="Title" />

                        <ul className={css.createPostTagContainer}>
                            <a  className={css.createPostTag}>
                                <p className={css.createPostTagText}>add tag</p>
                            </a>
                        </ul>

                        {showText && (<div>

                        <textarea className={css.createPostInput} placeholder="Enter text..."></textarea>

                        <div className={css.createPostBtnContainer}>
                            <button className={css.createPostBlackBtn} type='button' onClick={handleCloseModal}>Скасувати</button>
                            <button className={css.createPostRedBtn} type='button'>Створити пост</button>
                        </div>
                        </div>)}

                        {showVideo && (
                            <div>
                                <div className={css.dragDropArea}>
                                    <p className={css.dragDropText}>Drag or Drop Photo or Video</p>
                                    <button className={css.uploadButton} type="button">
                                        Select File
                                    </button>
                                </div>

                                <div className={css.createPostBtnContainer}>
                                    <button className={css.createPostBlackBtn} type='button'
                                            onClick={handleCloseModal}>Скасувати
                                    </button>
                                    <button className={css.createPostRedBtn} type='button'>Створити пост</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatePostModal;
