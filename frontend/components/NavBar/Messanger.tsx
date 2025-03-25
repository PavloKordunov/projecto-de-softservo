import Image from "next/image";
import { useState } from "react";
import Chat from "./Chat";

const Messanger = ({handleShow}: {handleShow: () => void}) => {
    const [isOpenChat, setIsOpenChat] = useState(false);
    const handleShowChat = () => {
        setIsOpenChat(!isOpenChat);
    }
    return (
        <div className="absolute w-[370px] z-10 bg-MainColor p-3 top-[100px] right-[30px] flex flex-col rounded-[11px]">
            {isOpenChat === false && (
            <>
            <div className="flex items-center justify-between mb-5">
                <p className="text-[24px] text-white font-semibold">Повідомлення</p>
                <svg className="w-5 h-5" fill="#fff" onClick={handleShow}>
                    <use href={`/sprite.svg#closeBtnIcon`} />
                </svg>                
            </div>
            <div className="bg-SecondaryColor p-2 rounded-[14px] flex w-[310px] items-center mb-6" onClick={handleShowChat}>
                <div className="flex justify-between w-full">
                    <div className="flex items-center gap-3">
                        <Image src="/person.png" alt="" width={45} height={45} className="rounded-full"/>
                        <div>
                            <p className="text-[18px] text-white font-semibold">Вініпух228</p>
                            <p className="text-[13px] text-[#C5D0E6] font-semibold">:(</p>
                        </div>
                    </div> 
                    <p className="text-[16px] text-white font-semibold">15:26</p>   
                </div>    
            </div>
            </>
            )}
            {isOpenChat && <Chat handleShowChat={handleShowChat} handleShow={handleShow}/>} 
        </div>
    );
}

export default Messanger;