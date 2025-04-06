"use client"

import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useOktaAuth } from "@okta/okta-react";

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
    isLiked: boolean | null;
    countLikes: number;
    userImage: string;
    tagDtos: any[];
  };
  className?: string;
  isPinned?: any[];
}

const Post: React.FC<PostProps> = ({ className, post, isPinned }) => {
    const { user } = useUser();
    
    const [likeStatus, setLikeStatus] = useState<boolean | null>(post.isLiked);
    const [countLikes, setCountLikes] = useState<number>(post.countLikes);
    const [isPinnedPost, setIsPinnedPost] = useState(post.isPinned);

    const { theme, setTheme } = useTheme();

    const { authState } = useOktaAuth();
    const router = useRouter();

    const likeDislike = async (liked: boolean | null) => {
      if (!user) return;

      try {
        const res = await fetch(`https://localhost:8080/api/user-statistic/like`, {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.accessToken}`,
          },
          body: JSON.stringify({
            objectId: post.id,
            userId: user.id,
            liked,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        setLikeStatus(liked);
        setCountLikes((prev) => {
          if (likeStatus === true && liked === null) return prev - 1;
          if (likeStatus === false && liked === null) return prev + 1;
          if (liked === true) return prev + (likeStatus === false ? 2 : 1);
          if (liked === false) return prev - (likeStatus === true ? 2 : 1);
          return prev;
        });

      } catch (error) {
        console.error("Failed to update like status:", error);
      }
    };

    const pinPost = async () => {
      if (!authState?.isAuthenticated) {
          router.push("/login");
          return;
      }
      if (!user) return;

      try {
        const res = await fetch(`https://localhost:8080/api/posts/pin/${post.id}`, {
          mode: "cors",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.accessToken}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

      } catch (error) {
        console.error("Failed to pin post:", error);
      }
    }

    const toggleLike = () => {
      if (!authState?.isAuthenticated) {
          router.push("/login");
          return;
      }
      const newStatus = likeStatus === true ? null : true;
      likeDislike(newStatus);
    };

    const toggleDislike = () => {
      if (!authState?.isAuthenticated) {
          router.push("/login");
          return;
      }
      const newStatus = likeStatus === false ? null : false;
      likeDislike(newStatus);
    };

    return ( 
        <Link href={`/post/${post.id}`} className={`p-6 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#E4E3E3]'} rounded-[21px] flex gap-3 mb-6 items-center w-[1030px] ${className}`}>
            {post.image && <div className="w-[237px] h-[237px] overflow-hidden rounded-[21px]"> 
                    <Image 
                    src={post.image} 
                    alt={post.title} 
                    width={237} 
                    height={237}
                    className="w-full h-full object-cover" 
                    />
            </div>}
            <div className="ml-2 w-full">
                <div className="flex items-center w-full justify-between">
                    <div className="flex gap-2">
                        <Image src='/groupImage.png' alt="" width={25} height={25} />
                        <p className={`text-[16px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>/{post.groupTitle}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {isPinned !== undefined && (
                          <button className={`p-2 ${theme === 'dark' ? 'bg-[#2C353D]' : 'bg-[#B5B5B5]'} rounded-[20px]`} onClick={(e) => {
                             e.preventDefault();
                             setIsPinnedPost(!isPinnedPost);
                              pinPost();
                          }}>
                            <svg className="w-6 h-6" fill="#C5D0E6">
                              <use href={`/sprite.svg?v=1#pinIcon`}/>
                            </svg>
                          </button>
                        )}
                      <div className={`flex items-center p-2 gap-3 ] ${theme === 'dark' ? 'bg-[#2C353D]' : 'bg-[#B5B5B5]'} rounded-[20px]`}>
                          <button onClick={(e) => { e.preventDefault(); toggleLike(); }}>
                            <svg className="w-6 h-6" fill={likeStatus === true ? "#FF0000" : "#C5D0E6"}>
                              <use href={`/sprite.svg#iconLike`} />
                            </svg>
                          </button>
                          <button onClick={(e) => { e.preventDefault(); toggleDislike(); }}>
                            <svg className="w-6 h-6" fill={likeStatus === false ? "#FF0000" : "#C5D0E6"}>
                              <use href={`/sprite.svg?v=1#icon-heartbreak`}/>
                            </svg>
                          </button>
                      </div>
                    </div>                                                
                </div>
                <p className={`text-[24px] mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold w-[650px]`}>{post.title}</p>
                <div className="flex gap-3 items-center mb-5">
                {post.tagDtos && post.tagDtos.map((tag) => (
                    <div key={tag.id} className={`py-2 w-fit px-3 ${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#EAEAEA]'} rounded-[24px]`}>
                        <p className={`text-[13px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} font-semibold`}>{tag.name}</p>
                    </div>
                ))}
                </div>
                <div className="flex items-center gap-9">
                    <div className="flex items-center gap-3">
                        <div className="h-[54px] w-[54px] rounded-[50%] overflow-hidden">
                            {post?.userImage ? <Image src={post?.userImage} alt="" width={54} height={54} /> : <Image src="/person.png" alt="" width={54} height={54} />}
                        </div>
                        <div>
                            <p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>{post.nickname}</p>
                            <span className={`text-[13px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} font-regular`}>2 години тому</span>
                        </div>
                    </div>
                    <p className={`text-[18px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} font-regular`}>{post.viewCount} Переглядів</p>
                    <p className={`text-[18px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} font-regular`}>{countLikes} Уподобань</p>
                    <p className={`text-[18px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} font-regular`}>56 Коментарів</p>
                </div>
            </div>
        </Link>
    );
}

export default Post;
