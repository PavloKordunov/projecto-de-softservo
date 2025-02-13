import Image from "next/image";

const UserPage = () => {
    return ( 
        <div className="px-3 py-12 mt-4 bg-MainColor rounded-[21px] mb-6 w-[1030px]">
            <div className="flex items-center ml-9">
                <div className="flex gap-3">
                    <Image src="/person.png" alt="" width={110} height={110} />
                    <div>
                        <p className="text-white text-[48px] font-semibold">Name</p>
                        <p className="text-[#97989D] text-[24px] font-semibold">@Nickname</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default UserPage;