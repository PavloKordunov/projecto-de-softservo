import css from './MessengerChat.module.css'
import Icon from "../../img/sprite.svg";
import userImage from "../../img/person.png";

const MessengerChat = ({handleCloseChat, showChat}) => {
    return (
        showChat && (
            <div>
                <div className={css.messengerChatHeader}>
                    <svg onClick={handleCloseChat} className={css.messengerChatExitIcon} width="27" height="23">
                        <use href={`${Icon}#exit-arrow`}/>
                    </svg>
                    <img src={userImage} alt='' height='45' width='45'/>
                    <div>
                        <p className={css.messengerChatUserName}>Вініпух 228</p>
                        <p className={css.messengerChatUserActivity}>Активність 15хв тому</p>
                    </div>
                </div>
                <div className={css.messengerChatWrapper}>
                    <div className={css.messengerChatContainer}>
                        <div className={css.messengerChatMessageLeftContainer}>
                            <img src={userImage} alt='' height='30' width='30'/>
                            <div className={css.messengerChatMessageContainer}></div>
                            <p className={css.messengerChatMessageTime}>15:25</p>
                        </div>
                        <div className={css.messengerChatMessageRightContainer}>
                            <p className={css.messengerChatMessageTime}>15:25</p>
                            <div className={css.messengerChatMessageContainer}></div>
                            <img src={userImage} alt='' height='30' width='30'/>
                        </div>
                    </div>
                    <div>
                        <div className={css.messengerChatScroll}>
                            <div className={css.messengerChatScrollPointer}></div>
                        </div>
                    </div>
                </div>
                <div className={css.messengerChatFooter}>
                    <svg width="22" height="25">
                        <use href={`${Icon}#paperClipIcon`}/>
                    </svg>
                    <input className={css.messengerChatInput} type='text' placeholder='Повідомлення'/>
                    <div className={css.messengerChatSendIcon}>
                        <svg width="20" height="19">
                            <use href={`${Icon}#sendIcon`}/>
                        </svg>
                    </div>
                </div>
            </div>
        )
    )
}


export default MessengerChat;