import Image from "next/image";
import Link from "next/link";

const GroupPage = () => {
    return ( 
        <Link href='/group/:id' className="mt-4 p-4 bg-MainColor rounded-[21px] flex items-center h-fit w-[1030px] gap-4">
            <Image src="/postImage.png" alt="" width="208" height="237" />
            <div className="w-full">
               <div className="flex items-center justify-between mb-4">
                    <p className="text-[24px] text-white font-semibold">/Ржака_Українською</p>
                    <div className="flex items-end gap-4">

                        <button className="px-4 py-2 bg-AccnetColor rounded-[10] text-white text-[22px] font-semibold">Підписатися</button>
                    </div>
               </div>
               <p className="text-[14px] text-white mb-6 line-clamp-3">
                    <strong>Опис:</strong> Ласкаво просимо до Ржака_Українською! Це місце для всіх, хто хоче обговорювати [основна тема групи], ділитися досвідом, задавати питання та знаходити однодумців. Ми прагнемо створити дружню та підтримуючу спільноту, де кожен може відчувати себе комфортно та вільно.
               </p>
               <div className="flex justify-between">
               <div className="flex gap-3 items-center mb-3">
                    <div className="py-2 w-fit px-3 bg-SecondaryColor rounded-[24px]">
                        <p className="text-[13px] text-[#C5D0E6] font-semibold">фільм</p>
                    </div>
                    <div className="py-2 w-fit px-3 bg-SecondaryColor rounded-[24px]">
                        <p className="text-[13px] text-[#C5D0E6] font-semibold">хоррор</p>
                    </div>
                    <div className="py-2 w-fit px-3 bg-SecondaryColor rounded-[24px]">
                        <p className="text-[13px] text-[#C5D0E6] font-semibold">страшний</p>
                    </div>
                </div>
                <p className="text-[14px] text-white font-semibold mr-4 mt-1">317,731  Підписників</p>
                </div>
            </div>
        </Link>
     );
}
 
export default GroupPage;