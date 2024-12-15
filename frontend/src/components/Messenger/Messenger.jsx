import css from "./Messenger.module.css"
import Icon from "../../img/sprite.svg";
import userImage from "../../img/person.png";
import {useState} from "react";
import MessengerChat from "./MessengerChat";

const Messenger = ({isShowMessenger, handleCloseMessenger, setIsShowMessenger}) => {

    const [showChat, setShowChat] = useState(false);
    const [userList, setUserList] = useState(true);

    const handleShowChat = () => {
        setShowChat(!showChat);
        setUserList(false);
    }

    const handleCloseChat = () => {
        setShowChat(false);
        setUserList(true);
    }

    return (
        isShowMessenger &&
        (
            <div className={css.messengerWrapper} >
            <div className={css.messengerContainer}>
                {userList &&(
                    <>
                    <div className={css.messengerTitleContainer}>
                    <p className={css.messengerTitle}>Повідомлення</p>
                    <svg className={css.messengerCloseIcon} onClick={handleCloseMessenger} width="22" height="22">
                        <use href={`${Icon}#closeBtnIcon`}/>
                    </svg>
                </div>
                <div className={css.chatListContainer}>
                    <div>
                        <div onClick={handleShowChat} className={css.messengerUserContainer}>
                            <img src={userImage} alt='' height='50' width='50'/>
                            <div className={css.messengerUserDataContainer}>
                                <div className={css.messengerUserData}>
                                    <p className={css.messengerUserName}>Вініпух 228</p>
                                    <p className={css.messengerUserTime}>15:26</p>
                                </div>
                                <p className={css.messengerUserText}>бачив новий пост з Жахаючий 3??????</p>
                            </div>
                        </div>
                        <div className={css.messengerUserContainer}>

                        </div>
                        <div className={css.messengerUserContainer}>

                        </div>
                        <div className={css.messengerUserContainer}>

                        </div>
                        <div className={css.messengerUserContainer}>

                        </div>
                    </div>
                    <div>
                        <div className={css.messengerScroll}>
                            <div className={css.messengerScrollPointer}></div>
                        </div>
                    </div>
                </div>
             </>
            )}

                <MessengerChat handleCloseChat={handleCloseChat} showChat={showChat}/>
            </div>
        </div>)
    )
}

export default Messenger