"use client"

import Link from "next/link";

const AdminPage = () => {
    return ( 
        <div className='p-6 mt-4 bg-MainColor rounded-[21px] flex gap-3 mb-6 w-[1030px]'>
            <Link href='/create-topic' className=" px-4 py-2 w-[200px] bg-SecondaryColor flex items-center justify-center rounded-[10] text-white text-[20px] h-[70px] font-semibold">Створити пост</Link>
        </div>
     );
}
 
export default AdminPage;