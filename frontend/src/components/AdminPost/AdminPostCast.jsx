import css from "./AdminPostCast.module.css"
import Image from '../../img/director.png'

const AdminPostCast = () => {
    return (
        <div className={css.adminPostCastContainer}>
            <p className={css.adminPostCastDirectorText}>
                Режесери:
            </p>
            <div className={css.adminPostCastDirectorContainer}>
                <img src={Image} alt='cast'/>
                <div>
                    <p className={css.adminPostCastDirectorName}>Деміан Леоне</p>
                    <p className={css.adminPostCastDirectorSubName}>Demian Leone</p>
                </div>
            </div>

            <p className={css.adminPostCastActorText}>
                Актори:
            </p>

            <ul className={css.adminPostCastActorContainer}>
                <li className={css.adminPostCastActorEl}>
                    <img src={Image} alt='cast'/>
                    <div>
                        <p className={css.adminPostCastActorName}>Деміан Леоне</p>
                        <p className={css.adminPostCastActorSubName}>Demian Leone</p>
                    </div>
                </li>
                <li className={css.adminPostCastActorEl}>
                    <img src={Image} alt='cast'/>
                    <div>
                        <p className={css.adminPostCastActorName}>Деміан Леоне</p>
                        <p className={css.adminPostCastActorSubName}>Demian Leone</p>
                    </div>
                </li>
                <li className={css.adminPostCastActorEl}>
                    <img src={Image} alt='cast'/>
                    <div>
                        <p className={css.adminPostCastActorName}>Деміан Леоне</p>
                        <p className={css.adminPostCastActorSubName}>Demian Leone</p>
                    </div>
                </li>
            </ul>

            <button className={css.adminPostCastButton} type='button'>Показати ще</button>
        </div>
    )
}

export default AdminPostCast