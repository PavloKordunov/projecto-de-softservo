import Image from "next/image";

const CreatePostNav = () => {
    return ( 
        <div className="flex items-center w-fit mx-auto mt-4 justify-center bg-MainColor p-6 rounded-[21px] gap-6 mb-6">
            <Image src="/person.png" alt="" width={53} height={53} />
            <input type="text" className=" md:w-[300px] lg:w-[480px] 2xl:w-[700px] h-[60px] px-4 py-2 text-white bg-SecondaryColor border-none rounded-[10px] focus:outline-none" placeholder="Поширте те, що коїться у вас в голові"/>
            <button className="border-none bg-AccnetColor w-[180px] h-[60px] rounded-[8px] text-[18px] text-white font-semibold ">Створити пост</button>
        </div>
     );
}
 
export default CreatePostNav;