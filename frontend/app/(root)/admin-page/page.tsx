"use client"

import Link from "next/link";
import { useTheme } from "next-themes";

const AdminPage = () => {
    const { theme } = useTheme();
    return ( 
        <div className={`p-6 mt-4 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#E4E3E3]'} rounded-[21px] flex gap-3 mb-6 w-[1030px]`}>
            <Link href='/create-topic' className={`px-4 py-2 w-[200px] ${theme === 'dark' ? 'bg-SecondaryColor text-white' : 'bg-[#B5B5B5] text-black'} flex hover:bg-AccnetColor rounded-[10px] items-center justify-center rounded-[10]  text-[20px] h-[70px] font-semibold`}>Створити пост</Link>
        </div>
     );
}
 
export default AdminPage;