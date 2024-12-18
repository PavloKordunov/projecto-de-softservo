import css from './AdminPage.module.css'
import {useNavigate} from "react-router-dom";

const AdminPage = () => {

    const navigate = useNavigate()

    return (
        <div className={css.adminPageContainer}>
            <h1 className={css.adminPageTitle}>Admin Page</h1>
            <button className={css.adminPageButton} onClick={() => navigate('/admin-post-menu')}>Створити топік</button>
        </div>
    )
}

export default AdminPage