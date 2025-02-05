import { useState } from "react";
import Image from "../../img/nextBtn.png"
import css from "./CreateGroupModal.module.css";

const CreateGroupModal = ({ handleShow }) => {

    const [modalMode, setModalMode] = useState("general")

    return (
        <div className={css.createGroupContainerWrapper} onClick={handleShow}>
            <div className={css.createGroupContainer} onClick={(e) => e.stopPropagation()}>
                <div style={{textAlign: "center"}}>
                    <p className={css.createGroupTitle}>Створити групу</p>
                </div>
            {modalMode === "general" && (
                <>
                <div style={{ alignItems: "center"}} className={css.CreateGroupInputContainer}>
                    <p className={css.createGroupInputText}>Назва:</p>
                    <input type="text" className={css.CreateGroupInput}/>
                </div>
                <div className={css.CreateGroupInputContainer}>
                    <p className={css.createGroupInputText}>Правила:</p>
                    <textarea style={{height: 130}} className={css.CreateGroupTextArea}/>
                </div>
                <div className={css.CreateGroupInputContainer}>
                    <p className={css.createGroupInputText}>Опис:</p>
                    <textarea className={css.CreateGroupTextArea}/>
                </div>

                <div style={{display: "flex", justifyContent:'flex-end'}}>
                    <div className={css.CreateGroupBtnWrapper} onClick={() => setModalMode("privacy")}>
                        <img src={Image} alt="next" />
                    </div>
                </div>
                </>
                )}
                {modalMode === "privacy" && (
                 <>
                    <div className={css.privacyBtnContainer}>
                        <button className={css.privacyBtn}>Приватна</button>
                        <button className={css.privacyBtn}>Публічна</button>
                    </div>

                    <p className={css.privacyTitle}>Зауваження!</p>

                    <p className={css.privacyText}>Ви можете створити ТІЛЬКИ одну публічну групу. Якщо у вас вже є публічна група, проте бажаєте створити нову, тоді потрібно видалити попередну.  </p>

                    <div style={{display: "flex", justifyContent: 'space-between'}}>
                        <div className={css.CreateGroupBtnWrapper} onClick={() => setModalMode("general")}>
                            <img style={{transform: 'rotate(180deg)'}} src={Image} alt="next" />
                        </div>
                        <div className={css.CreateGroupBtnWrapper} onClick={() => setModalMode("tags")}>
                            <img src={Image} alt="next" />
                        </div>
                    </div>
                 </>
                )}
                {modalMode === "tags" && (
                 <>
                    <div style={{display: "flex", justifyContent: 'space-between', marginTop: 460}}>
                        <div className={css.CreateGroupBtnWrapper} onClick={() => setModalMode("privacy")}>
                            <img style={{transform: 'rotate(180deg)'}} src={Image} alt="next" />
                        </div>
                        <button className={css.privacyBtn}>Опублікувати</button>
                    </div>
                 </>
                )}
            </div>
        </div>
    );
};

export default CreateGroupModal;
