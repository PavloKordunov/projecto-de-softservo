import Image from '../../img/person.png'
import Icon from '../../img/sprite.svg'
import css from './GroupPost.module.css'

const GroupPost = ({img, title}) => {
    return(
        <div className={css.groupPostContainer}>
            <div className={css.groupPostTitleContainer}>
                <img src={Image} width={45} height={45}/>
                <p style={{marginLeft: "12px"}} className={css.groupPostTitleText}>Домінік Торрето</p>
                <p style={{marginLeft: "18px"}} className={css.groupPostTitleText}>55хв. тому</p>
            </div>
            <div className={css.groupPostTextContainer}>
                <p>{title}</p>
                { img && <img style={{marginTop: "10px"}} src={img}/>}
                </div>
            <div className={css.groupPostActionsContainer}>
                <div className={css.groupPostActions}>
                    <svg width={22} height={22}>
                        <use href={`${Icon}#iconLow`}></use>
                    </svg>
                    <p className={css.groupPostActionsText}>82</p>
                    <svg width={22} height={22}>
                        <use href={`${Icon}#iconHigh`}></use>
                    </svg>
                </div>
                <div className={css.groupPostActions}>
                <svg width={22} height={22}>
                        <use href={`${Icon}#icon-comment`}></use>
                    </svg>
                    <p className={css.groupPostActionsText}>75</p>
                </div>
                <div className={css.groupPostActions}>
                    <svg width={22} height={22}>
                        <use href={`${Icon}#icon-share`}></use>
                    </svg>
                    <p className={css.groupPostActionsText}>Поділитись</p>
                </div>
                <div className={css.groupPostActions}>
                    <svg width={22} height={22}>
                        <use href={`${Icon}#icon-save`}></use>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default GroupPost