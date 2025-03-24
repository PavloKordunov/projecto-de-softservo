import Image from "next/image";

const Chat = ({handleShowChat, handleShow}: {handleShowChat: ()=> void, handleShow: ()=> void}) => {
    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <svg onClick={handleShowChat} className="w-7 h-6 rotate-180 mr-3" fill="#fff">
                        <use href={`/sprite.svg#exit-arrow`}/>
                    </svg>
                    <Image src="/person.png" alt="" width={45} height={45} className="rounded-full mr-3"/>
                    <div>
                        <p className="text-[20px] text-base/5 text-white font-semibold">Вініпух228</p>
                        <p className="text-[13px] text-[#C5D0E6] font-semibold">Активність 15хв тому</p>
                    </div>
                </div>
                <svg onClick={handleShow} className="w-5 h-5 ml-3" fill="#fff">
                    <use href={`/sprite.svg#closeBtnIcon`}/>
                </svg>
            </div>
            <div className="bg-SecondaryColor p-2 rounded-[14px] flex h-[375px] w-[310px] items-center mb-4" onClick={handleShowChat}>

            </div>
            <div className="bg-SecondaryColor p-2 rounded-[14px] flex h-fit w-[310px] items-center" onClick={handleShowChat}>
                <svg onClick={handleShow} className="w-5 h-6 mr-3" fill="#fff">
                    <use href={`/sprite.svg#paperClipIcon`}/>
                </svg>
                <input name="title" type="text" className="w-[220px] h-9 px-4 py-2 text-white bg-MainColor border-none rounded-[16px] focus:outline-none mr-[6px]" placeholder="Повідомлення.."/>
                <div className="bg-[#FF4155] p-2 rounded-[16px] flex h-9 w-9 items-center" onClick={handleShowChat}>
                    <svg onClick={handleShow} className="w-5 h-5" fill="#fff">
                        <use href={`/sprite.svg#sendIcon`}/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Chat;