import css from './AdminPostMenu.module.css'
import Icon from "../../img/sprite.svg";
import {useNavigate} from "react-router-dom";
import AutoFillPost from "./AutoFillPost";
import {useEffect, useState} from "react";


const AdminPostMenu = () => {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(true);
    const [filmData, setFilmData] = useState({});
    const[filmName, setFilmName] = useState('');
    const[filmIMBDRate, setFilmIMBDRate] = useState('');
    const[filmCountry, setFilmCountry] = useState('');
    const[filmGenre, setFilmGenre] = useState('');
    const[filmTime, setFilmTime] = useState('');

    const getFilmApiData = (data) =>{
        setFilmData(data);
        console.log(filmData);
    }

    useEffect(() => {
        if (filmData?.Title) {
            setFilmName(filmData.Title);
        }
        if(filmData?.imdbRating){
            setFilmIMBDRate(filmData.imdbRating);
        }
        if(filmData?.Country){
            setFilmCountry(filmData.Country);
        }
        if(filmData?.Runtime){
            setFilmTime(filmData.Runtime);
        }
        if(filmData?.Genre){
            setFilmGenre(filmData.Genre);
        }
    }, [filmData]);

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
                <svg className={css.adminPostMenuExitIcon} width='33' height='33'
                     onClick={() => navigate("/admin-page")}>
                    <use href={`${Icon}#closeBtnIcon`}/>
                </svg>
            </div>
            <div className={css.adminPostMenuMainContainer}>
                <div>
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Створити</h2>
                        <div className={css.adminPostMenuButtonList}>
                            <button className={css.adminPostMenuButton}>Фільм</button>
                            <button className={css.adminPostMenuButton}>Серіал</button>
                            <button className={css.adminPostMenuButton}>Книга</button>
                        </div>
                    </div>
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Назва:</h2>
                        <input className={css.adminPostMenuFieldInput} type='text'
                               placeholder='Введіть назву, вибраного вище поста...' value={filmName}/>
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
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Рейтинг IMBD:</h2>
                        <input className={css.adminPostMenuFieldInput} type='text'
                               placeholder='Введіть рейтинг IMBD для даного поста...' value={filmIMBDRate}/>
                    </div>
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Посилання на трейлер:</h2>
                        <input className={css.adminPostMenuFieldInput} type='text'
                               placeholder='Введіть посилання на трейлер для даного поста...'/>
                    </div>
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Хештеги:</h2>
                        <input className={css.adminPostMenuFieldInput} type='text'
                               placeholder='Введіть до 9 хештегів для даного поста...'/>
                    </div>
                </div>
                <div>
                    <div className={css.adminPostMenuDropFieldContainer}>
                        <h2 className={css.adminPostMenuRightSideFieldTitle}>Країна:</h2>
                        <input className={css.adminPostMenuFieldDropInput} list='country'
                               placeholder='Виберіть країну' value={filmCountry}/>
                        <datalist id='country'>
                            <option>USA</option>
                            <option>GBP</option>
                        </datalist>
                    </div>
                    <div className={css.adminPostMenuDropFieldContainer}>
                        <h2 className={css.adminPostMenuRightSideFieldTitle}>Жанр:</h2>
                        <input className={css.adminPostMenuFieldDropInput} list='genre' placeholder='Виберіть жанр' value={filmGenre}/>
                        <datalist id='genre'>
                            <option>comedy</option>
                            <option>horror</option>
                        </datalist>
                    </div>
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Фото:</h2>
                        <form>
                            <div id="drop-area" className={css.dropArea}>
                                <p>Перетягніть сюди фото</p>
                                <label htmlFor="fileInput" className={css.customButton}>Оберіть файл</label>
                                <input className={css.adminPostMenuFieldInputPhoto} type="file" id="fileInput"
                                       accept=".jpg, .jpeg, .png" multiple/>
                            </div>
                        </form>
                    </div>
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Посилання на групу:</h2>
                        <input className={css.adminPostMenuRightSideFieldInput} type='text'
                               placeholder='Введіть посилання на групу для даного поста...'/>
                    </div>
                    <div className={css.adminPostMenuFieldContainer}>
                        <h2 className={css.adminPostMenuFieldTitle}>Тривалість:</h2>
                        <input className={css.adminPostMenuRightSideFieldInput} type='text'
                               placeholder='Введіть тривалість' value={filmTime}/>
                    </div>
                </div>
            </div>
            <div className={css.adminPostMenuFieldContainer}>
                <h2 className={css.adminPostMenuFieldTitle}>Короткий опис:</h2>
                <textarea className={css.adminPostMenuTextArea} type='text'
                          placeholder='Введіть короткий опис для даного поста...'/>
            </div>
            <div className={css.adminPostMenuFieldContainer}>
                <h2 className={css.adminPostMenuFieldTitle}>Режисери:</h2>
                <div className={css.adminPostMenuCastFieldContainer}>
                    <div id="drop-area" className={css.dropAreaDown}>
                        <p>Перетягніть сюди фото</p>
                    </div>
                    <input className={css.adminPostMenuFieldInputDown} type='text'
                           placeholder='Введіть прізвище та ім’я...'/>
                    <button className={css.adminPostMenuButtonDown}>Добавити ще</button>
                </div>
            </div>
            <div className={css.adminPostMenuFieldContainer}>
                <h2 className={css.adminPostMenuFieldTitle}>Актори:</h2>
                <div className={css.adminPostMenuCastFieldContainer}>
                    <div id="drop-area" className={css.dropAreaDown}>
                        <p>Перетягніть сюди фото</p>
                    </div>
                    <input className={css.adminPostMenuFieldInputDown} type='text'
                           placeholder='Введіть прізвище та ім’я (у фільмі)...'/>
                    <input className={css.adminPostMenuFieldInputDown} type='text'
                           placeholder='Введіть прізвище та ім’я (в житті)...'/>
                    <button className={css.adminPostMenuButtonDown}>Добавити ще</button>
                </div>
            </div>
            <div className={css.adminPostMenuCreateButtonContainer}>
                <button className={css.adminPostMenuCreateButton}>Створити пост</button>
            </div>
        </div>
    )
}

export default AdminPostMenu;