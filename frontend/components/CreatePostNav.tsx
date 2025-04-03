"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import CreatePostModal from "./CreatePostModal";
import { useUser } from "@/hooks/useUser";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useOktaAuth } from "@okta/okta-react";

const CreatePostNav = () => {

    const [isShow, setIsShow] = useState(false)
    const { theme, setTheme } = useTheme();
    const { user } = useUser();

    const { authState } = useOktaAuth();
    const router = useRouter();


    const handleShow = () => {
        if (!authState?.isAuthenticated) {
            router.push("/login");
            return;
        }
        setIsShow(!isShow)
    }

    return (
        <div className={`flex w-fit ax-w-[800px] mx-auto mt-[5px] md:mt-4 justify-center ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} md:p-6 p-[10px] rounded-[21px] gap-[10px] md:gap-6 mb-[10px] md:mb-6`}>
            {user?.img ? (
                <Image src={user.img} alt="person" width={53} height={53} className="rounded-full"/>
            ) : (
                <Image src="/person.png" alt="default person" width={53} height={53} className="rounded-full w-[53px] h-[53px]"/>
            )}
            <input type="text" className={`md:w-[300px] lg:w-[480px] 2xl:w-[700px] h-[60px] px-4 py-2 text-white ${theme === 'dark' ? 'bg-SecondaryColor placeholder:text-gray-300' : 'bg-[#B5B5B5] placeholder:text-gray-800'} border-none rounded-[10px] focus:outline-none`} placeholder="Поширте те, що коїться у вас в голові"/>
            <button className="border-none bg-AccnetColor w-[180px] h-[60px] rounded-[8px] text-[18px] text-white font-semibold " onClick={handleShow}>Створити пост</button>
            {isShow && <CreatePostModal handleShow={handleShow}/>}
        </div>
     );
}

export default CreatePostNav;