"use client"

import Image from "next/image";
import Link from "next/link";

interface PostProps {
  post: {
    id: string;
    title: string;
    description: string;
    name: string;
    nickname: string;
    image?: any;
    isPinned: boolean;
    groupTitle: string;
    viewCount: string;
    userId: string;
    groupId: string;
  };
  className?: string;
}

const Post: React.FC<PostProps> = ({ className, post }) => {
    return ( 
        <Link href={`/post/${post.id}`} className={`p-6 bg-MainColor rounded-[21px] flex gap-3 mb-6 items-center w-[1030px] ${className}`}>
            <Image src={post?.image} alt="" width="208" height="237" />
            <div className="ml-2 w-full">
                <div className="flex items-center w-full justify-between">
                    <div className="flex gap-2 mb-4">
                        <Image src='/groupImage.png' alt="" width={25} height={25} />
                        <p className="text-[16px] text-white font-semibold">/{post.groupTitle}</p>
                    </div>
                    <div className="flex items-center p-2 gap-3 bg-[#2C353D] rounded-[20px]">
                        <svg className="w-6 h-6" fill="#C5D0E6" >
                            <use href={`/sprite.svg#iconLike`} />
                        </svg>
                        <p className="text-[18px] text-[#C5D0E6]">120</p>
                        <Image src='/brokeHeart.png' alt="" width={29} height={29} />
                    </div>                                                
                </div>
                <p className="text-[24px] mb-3 text-white font-semibold w-[650px]">{post.title}</p>
                <div className="flex gap-3 items-center mb-5">
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
                <div className="flex items-center gap-9">
                    <div className="flex items-center gap-3">
                        <Image src="/person.png" alt="" width={54} height={54}/>
                        <div>
                            <p className="text-[18px] text-white font-semibold">{post.nickname}</p>
                            <span className="text-[13px] text-[#C5D0E6] font-regular">2 години тому</span>
                        </div>
                    </div>
                    <p className="text-[18px] text-[#C5D0E6] font-regular">{post.viewCount} Переглядів</p>
                    <p className="text-[18px] text-[#C5D0E6] font-regular">36,6545 Уподобань</p>
                    <p className="text-[18px] text-[#C5D0E6] font-regular">56 Коментарів</p>
                </div>
            </div>
        </Link>
     );
}
 
export default Post;