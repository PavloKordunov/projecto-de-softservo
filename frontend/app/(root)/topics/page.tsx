import Image from "next/image";

const TopicPage = () => {
    return ( 
        <div className="mt-4 px-5 py-4 flex-wrap flex items-center justify-between h-fit w-[1030px]">
            <div className="bg-MainColor rounded-b-[21px] w-[250px]">
                <Image src="/postImage.png" alt="" width={64} height={96}/>
            </div>
        </div>
     );
}
 
export default TopicPage;