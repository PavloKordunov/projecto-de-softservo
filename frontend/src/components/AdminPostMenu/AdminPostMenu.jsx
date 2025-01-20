import css from './AdminPostMenu.module.css';
import Icon from "../../img/sprite.svg";
import { useNavigate } from "react-router-dom";
import AutoFillPost from "./AutoFillPost";
import { useEffect, useState } from "react";

const AdminPostMenu = () => {
    const navigate = useNavigate();
    const [postMode, setPostMode] = useState("film");
    const [showModal, setShowModal] = useState(true);
    const [filmData, setFilmData] = useState({});
    const [formData, setFormData] = useState({
        title: '',
        IMDB: '',
        country: '',
        genre: '',
        duration: '',
        description: ""
    });

    const handlCreateTopic = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/topics/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }

        navigate("/")
    }

    const getFilmApiData = (data) => {
        setFilmData(data);
    };

    useEffect(() => {
        if (filmData) {
            setFormData((prev) => ({
                ...prev,
                title: filmData?.Title || '',
                IMDB: filmData?.ImdbRating || '',
                country: filmData?.Country || '',
                genre: filmData?.Genre || '',
                duration: filmData?.Runtime || '',
            }));
        }
    }, [filmData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className={css.adminPostMenuContainer}>
            <div>
                {showModal && (
                    <AutoFillPost
                        onClose={() => setShowModal(false)}
                        getFilmApiData={getFilmApiData}
                    />
                )}
            </div>
            <div className={css.adminPostMenuTitleContainer}>
                <h1 className={css.adminPostMenuTitle}>Добавити фільм, серіал або книгу</h1>
                <svg
                    className={css.adminPostMenuExitIcon}
                    width='33'
                    height='33'
                    onClick={() => navigate("/admin-page")}
                >
                    <use href={`${Icon}#closeBtnIcon`} />
                </svg>
            </div>
            <div className={css.adminPostMenuMainContainer}>
                <div>
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Створити</h2>
                        <div className={css.adminPostMenuButtonList}>
                            <button
                                className={
                                    `${css.adminPostMenuButton} ${postMode === "film" ? css.activeButton : ""}`
                                }
                                onClick={() => setPostMode("film")}
                            >
                                Фільм
                            </button>
                            <button
                                className={
                                    `${css.adminPostMenuButton} ${postMode === "serial" ? css.activeButton : ""}`
                                }
                                onClick={() => setPostMode("serial")}
                            >
                                Серіал
                            </button>
                            <button
                                className={
                                    `${css.adminPostMenuButton} ${postMode === "book" ? css.activeButton : ""}`
                                }
                                onClick={() => setPostMode("book")}
                            >
                                Книга
                            </button>
                        </div>
                    </div>
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Назва:</h2>
                        <input
                            className={css.adminPostMenuFieldInput}
                            type='text'
                            name='title'
                            placeholder='Введіть назву, вибраного вище поста...'
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Вікові обмеження:</h2>
                        <div className={css.adminPostMenuButtonList}>
                            <button className={css.adminPostMenuButton}>0+</button>
                            <button className={css.adminPostMenuButton}>6+</button>
                            <button className={css.adminPostMenuButton}>12+</button>
                            <button className={css.adminPostMenuButton}>16+</button>
                            <button className={css.adminPostMenuButton}>18+</button>
                        </div>
                    </div>
                    { (postMode === 'film' || postMode === 'serial') &&(
                        <>
                        <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Рейтинг IMBD:</h2>
                        <input
                            className={css.adminPostMenuFieldInput}
                            type='text'
                            name='IMDB'
                            placeholder='Введіть рейтинг IMBD для даного поста...'
                            value={formData.IMDB}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Посилання на трейлер:</h2>
                        <input
                            className={css.adminPostMenuFieldInput}
                            type='text'
                            name='trailerLink'
                            placeholder='Введіть посилання на трейлер для даного поста...'
                            onChange={handleInputChange}
                        />
                    </div>
                    </>)
                    }

                    {postMode === 'book' && (
                        <>
                        <div className={css.adminPostBookMenuDropFieldContainer}>
                            <h2 className={css.adminPostBookMenuTitle}>Мова оригіналу:</h2>
                            <input
                                className={css.adminPostBookMenuFieldDropInput}
                                list='country'
                                name='country'
                                placeholder='Виберіть мову'
                                value={formData.country}
                                onChange={handleInputChange}
                            />
                            <datalist id='country'>
                                <option>США</option>
                                <option>Англія</option>
                            </datalist>
                        </div>
                        <div className={css.adminPostBookMenuDropFieldContainer}>
                            <h2 className={css.adminPostBookMenuTitle}>Рівень складності тексту:</h2>
                            <input
                                className={css.adminPostBookMenuFieldDropInput}
                                list='country'
                                name='country'
                                placeholder='Виберіть складність тексту'
                                value={formData.country}
                                onChange={handleInputChange}
                            />
                            <datalist id='country'>
                                <option>Тяжкий</option>
                                <option>Легкий</option>
                            </datalist>
                        </div>
                        <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Кількість сторінок:</h2>
                        <input
                            className={css.adminPostMenuFieldInput}
                            type='text'
                            name='duration'
                            placeholder='Введіть кількість сторінок'
                            value={formData.duration}
                            onChange={handleInputChange}
                        />
                    </div>
                        </>
                    )}

                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Хештеги:</h2>
                        <input
                            className={css.adminPostMenuFieldInput}
                            type='text'
                            name='hashtags'
                            placeholder='Введіть до 9 хештегів для даного поста...'
                            onChange={handleInputChange}
                        />
                    </div>
                    {postMode === 'serial' && (
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Кількість сезонів:</h2>
                        <input
                            className={css.adminPostMenuFieldInput}
                            type='text'
                            name='seasoneAmount'
                            placeholder='Введіть кількість сезонів'
                            value={formData.seasoneAmount}
                            onChange={handleInputChange}
                        />
                    </div>
                    )}
                </div>
                <div>
                    <div className={css.adminPostMenuDropFieldContainer}>
                        <h2 className={css.adminPostMenuRightSideFieldTitle}>Країна:</h2>
                        <input
                            className={css.adminPostMenuFieldDropInput}
                            list='country'
                            name='country'
                            placeholder='Виберіть країну'
                            value={formData.country}
                            onChange={handleInputChange}
                        />
                        <datalist id='country'>
                            <option>USA</option>
                            <option>GBP</option>
                        </datalist>
                    </div>
                    <div className={css.adminPostMenuDropFieldContainer}>
                        <h2 className={css.adminPostMenuRightSideFieldTitle}>Жанр:</h2>
                        <input
                            className={css.adminPostMenuFieldDropInput}
                            list='genre'
                            name='genre'
                            placeholder='Виберіть жанр'
                            value={formData.genre}
                            onChange={handleInputChange}
                        />
                        <datalist id='genre'>
                            <option>comedy</option>
                            <option>horror</option>
                        </datalist>
                    </div>
                    {postMode === 'book' && (
                        <>
                        <div className={css.adminPostBookMenuDropFieldContainer}>
                            <h2 className={css.adminPostBookMenuTitle}>Чи є адаптація:</h2>
                            <input
                                className={css.adminPostBookMenuFieldDropInput}
                                list='country'
                                name='country'
                                placeholder='Виберіть чи є адаптація'
                                value={formData.country}
                                onChange={handleInputChange}
                            />
                            <datalist id='country'>
                                <option>так</option>
                                <option>ні</option>
                            </datalist>
                        </div>
                        <div className={css.adminPostBookMenuDropFieldContainer}>
                            <h2 className={css.adminPostBookMenuTitle}>На реальних подіях:</h2>
                            <input
                                className={css.adminPostBookMenuFieldDropInput}
                                list='country'
                                name='country'
                                placeholder='Виберіть є на реальних подіях'
                                value={formData.country}
                                onChange={handleInputChange}
                            />
                            <datalist id='country'>
                                <option>так</option>
                                <option>ні</option>
                            </datalist>
                        </div>
                        </>
                    )}
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Фото:</h2>
                        <form>
                            <div id="drop-area" className={css.dropArea}>
                                <p>Перетягніть сюди фото</p>
                                <label htmlFor="fileInput" className={css.customButton}>Оберіть файл</label>
                                <input
                                    className={css.adminPostMenuFieldInputPhoto}
                                    type="file"
                                    id="fileInput"
                                    accept=".jpg, .jpeg, .png"
                                    multiple
                                />
                            </div>
                        </form>
                    </div>
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Посилання на групу:</h2>
                        <input
                            className={css.adminPostMenuRightSideFieldInput}
                            type='text'
                            name='groupLink'
                            placeholder='Введіть посилання на групу для даного поста...'
                            onChange={handleInputChange}
                        />
                    </div>
                    { (postMode === 'film' || postMode === 'serial') &&(
                        <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Тривалість:</h2>
                        <input
                            className={css.adminPostMenuRightSideFieldInput}
                            type='text'
                            name='duration'
                            placeholder='Введіть тривалість'
                            value={formData.duration}
                            onChange={handleInputChange}
                        />
                    </div>)
                    }
                    {postMode === 'serial' && (
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Загальна кількість серій:</h2>
                        <input
                            className={css.adminPostMenuRightSideFieldInput}
                            type='text'
                            name='runtime'
                            placeholder='Введіть кількість серій'
                            value={formData.runtime}
                            onChange={handleInputChange}
                        />
                    </div>
                    )}
                </div>
            </div>
            <div className={css.adminPostMenuFieldContainer}>
                <h2 className={css.adminPostMenuFieldTitle}>Короткий опис:</h2>
                <textarea
                    className={css.adminPostMenuTextArea}
                    type='text'
                    name='description'
                    placeholder='Введіть короткий опис для даного поста...'
                    onChange={handleInputChange}
                    value={formData.description}
                />
            </div>
            { (postMode === 'film' || postMode === 'serial') &&(
                <>
                <div className={css.adminPostMenuFieldContainer}>
                <h2 className={css.adminPostMenuFieldTitle}>Режисери:</h2>
                <div className={css.adminPostMenuCastFieldContainer}>
                    <div id="drop-area" className={css.dropAreaDown}>
                        <p>Перетягніть сюди фото</p>
                    </div>
                    <input
                        className={css.adminPostMenuFieldInputDown}
                        type='text'
                        name='directorName'
                        placeholder='Введіть прізвище та ім’я...'
                        onChange={handleInputChange}
                    />
                    <button className={css.adminPostMenuButtonDown}>Добавити ще</button>
                </div>
            </div>
            <div className={css.adminPostMenuFieldContainer}>
                <h2 className={css.adminPostMenuFieldTitle}>Актори:</h2>
                <div className={css.adminPostMenuCastFieldContainer}>
                    <div id="drop-area" className={css.dropAreaDown}>
                        <p>Перетягніть сюди фото</p>
                    </div>
                    <input
                        className={css.adminPostMenuFieldInputDown}
                        type='text'
                        name='actorFilmName'
                        placeholder='Введіть прізвище та ім’я (у фільмі)...'
                        onChange={handleInputChange}
                    />
                    <input
                        className={css.adminPostMenuFieldInputDown}
                        type='text'
                        name='actorRealName'
                        placeholder='Введіть прізвище та ім’я (в житті)...'
                        onChange={handleInputChange}
                    />
                    <button className={css.adminPostMenuButtonDown}>Добавити ще</button>
                </div>
            </div>
            </>
            )}
            <div className={css.adminPostMenuCreateButtonContainer}>
                <button className={css.adminPostMenuCreateButton} onClick={handlCreateTopic}>Створити пост</button>
            </div>
        </div>
    );
};

export default AdminPostMenu;
