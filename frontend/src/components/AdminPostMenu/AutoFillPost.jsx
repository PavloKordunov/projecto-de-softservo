import css from './AutuFillPost.module.css';
import { useState} from "react";
import {getAutoFillData} from "../../api/omdbApi";

const AutoFillPost = ({ onClose, getFilmApiData }) => {
    const [choseType, setChoseType] = useState(false);
    const [filmName, setFilmName] = useState("");
    const [filmReleaseDay, setFilmReleaseDay] = useState("");

    const handleChange = () => {
        setChoseType(!choseType);
    };

    const handleChangeFilmName = (e) => {
        setFilmName(e.target.value);
    };

    const handleChangeFilmReleaseDay = (e) => {
        setFilmReleaseDay(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = await getAutoFillData(filmName, filmReleaseDay);
            getFilmApiData(data)
            onClose()
        }
        catch(err){
            console.log("Failed to fetch movie data.");
            console.error(err);
        }
    }



    return (
        <div className={css.AutuFillPostOverlay}>
            <div className={css.AutuFillPostContent}>
                {!choseType ? (
                    <>
                        <h2 className={css.AutuFillPostTitle}>Виберіть метод заповнення</h2>
                        <div className={css.AutuFillPostButtons}>
                            <button className={css.AutuFillPostButton} onClick={onClose}>Заповнити вручну</button>
                            <button className={css.AutuFillPostButton} onClick={handleChange}>Заповнити автоматично</button>
                        </div>
                    </>
                ) : (
                    <div className={css.AutuFillPostTitle}>
                        <h2>Введіть назву та рік фільму</h2>
                        <div className={css.AutuFillPostButtons}>
                            <input className={css.AutuFillPostInput} onChange={handleChangeFilmName} type="text" placeholder="Введіть назву фільму" />
                            <input className={css.AutuFillPostInput} onChange={handleChangeFilmReleaseDay} type="text" placeholder="Введіть рік виходу фільму" />
                            <button className={css.AutuFillPostButton} onClick={handleSubmit}>Відправити</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AutoFillPost;
