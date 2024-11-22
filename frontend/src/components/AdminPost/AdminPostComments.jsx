import css from './adminpostComments.module.css'
import Image from '../../img/person.png'
import Icon from '../../img/sprite.svg'

const AdminPostComments = () => {
    return (
        <div className={css.adminPostCommentsContainer}>
            <ul>
                <li className={css.adminPostCommentContainer}>
                    <div className={css.adminPostCommentAvatarContainer}>
                        <img src={Image} alt='avatar' height='50' width='50'/>
                        <div>
                            <p className={css.adminPostCommentName}>User</p>
                            <p className={css.adminPostCommentNickName}>@NickName</p>
                        </div>
                    </div>І
                    <div className={css.adminPostCommentInfoContainer}>
                        <p className={css.adminPostCommentInfoText}>Скажу так Усі жертви маньяка у цій франшизі якісь
                            ДУЖЕ ЖИВУЧІ</p>
                    </div>
                    <div className={css.adminPostCommentDetailsContainer}>
                        <p className={css.adminPostCommentDetailsText}><i>2 години тому</i></p>
                        <div className={css.adminPostUnderCommentContainer}>
                            <p className={css.adminPostCommentDetailsReplyText}>Відповісти</p>
                            <svg width='21' height='20'>
                                <use className={css.adminPostCommentDetailsIcon} href={`${Icon}#commentIcon`}></use>
                            </svg>
                            <p className={css.adminPostCommentDetailsText}>0</p>
                        </div>
                    </div>
                </li>

                <li className={css.adminPostCommentContainer}>
                    <div className={css.adminPostCommentAvatarContainer}>
                        <img src={Image} alt='avatar' height='50' width='50'/>
                        <div>
                            <p className={css.adminPostCommentName}>User123</p>
                            <p className={css.adminPostCommentNickName}>@NickName123</p>
                        </div>
                    </div>
                    <div className={css.adminPostCommentInfoContainer}>
                        <p className={css.adminPostCommentInfoText}>Арт путін та Вікторія-дємон захарова</p>
                    </div>
                    <div className={css.adminPostCommentDetailsContainer}>
                        <p className={css.adminPostCommentDetailsText}><i>8 години тому</i></p>
                        <div className={css.adminPostUnderCommentContainer}>
                            <p className={css.adminPostCommentDetailsReplyText}>Відповісти</p>
                            <svg width='21' height='20'>
                                <use className={css.adminPostCommentDetailsIcon} href={`${Icon}#commentIcon`}></use>
                            </svg>
                            <p className={css.adminPostCommentDetailsText}>0</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default AdminPostComments;