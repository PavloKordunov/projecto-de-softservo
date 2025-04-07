"use client"

import CreatePostModal from "@/components/CreatePostModal";
import Post from "@/components/Post";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useOktaAuth } from "@okta/okta-react";
import { useRouter } from "next/navigation";
import useLastGroups from "@/hooks/useLastGroups";


interface Group {
    id: string;
    title: string;
    description: string;
    isPublic: boolean;
    postCount: number;
    image: string;
    memberCount: number;
    tagDtos: any[];
}

const Group = () => {

    const [posts, setPosts] = useState<any[]>([]);
    const params = useParams();
    const groupId = params.id;
    const {user} = useUser()
    const [userSubscribed, setUserSubscribed] = useState<boolean | null>(null);
    const [group, setGroup] = useState<Group | null>(null)
    const [show, setShow] = useState(false);
    const [isPinned, setIsPinned] = useState<any[] >([]);
    const { theme, setTheme } = useTheme();

    const { authState } = useOktaAuth();
    const router = useRouter();

    const lastGroups = useLastGroups(group?.id ? group : undefined);

    useEffect(() => {
        const getAllPost = async () => {
          const res = await fetch(`https://localhost:8080/api/posts/group/${groupId}`, {
            mode: "cors",
          });
          const data = await res.json();
          setPosts(data.body);
          console.log(data);
        };
        const getPostById = async() =>{
            try {
                const res = await fetch(`https://localhost:8080/api/groups/${groupId}`, {
                    mode: "cors",
                })
                const data = await res.json()
                setGroup(data.body)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        const getFollowedGroups = async () => {
            try {
                const res = await fetch(`https://localhost:8080/api/groups/followed/${user?.id}`, {
                    mode: "cors",
                })
                const data = await res.json()
                setUserSubscribed(data.body.some((group: any) => group.id === groupId))
            } catch (error) {
                console.log(error)
            }
        } 

        getFollowedGroups()
        getPostById()
        getAllPost();
      }, []);

      useEffect(() => { 
        console.log(userSubscribed)
      }, [userSubscribed])

      const getSubscribeUser = async () => {
        if (!authState?.isAuthenticated) {
            router.push("/login");
            return;
        }
        const res = await fetch(`https://localhost:8080/api/groups/${group?.title}/follow/${user?.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user?.accessToken}`
            }
        }
        );
        const data = await res.json();
        setUserSubscribed(!userSubscribed);
        console.log(data);
      };

    const handleShow = () => {
        if (!authState?.isAuthenticated) {
            router.push("/login");
            return;
        }
        setShow(!show);
    }

    if (!group) {
        return <p className="text-white">Group not found</p>;
    }

    return (
        <div> 
            <div className={`mt-4 px-5 py-4 ${theme === 'dark' ? 'bg-MainColor ' : 'bg-[#EAEAEA] '} rounded-[21px] flex items-center justify-between h-fit w-[1030px]`}>
                <div className="flex items-center gap-3">
                    <div className="w-[60px] h-[60px] overflow-hidden rounded-full"> 
                    {group.image ? (
                        <Image 
                        src={group.image} 
                        alt={group.title} 
                        width={42} 
                        height={42}
                        className="w-full h-full object-cover" 
                        />
                    ) : (
                        <Image 
                        src="/groupImage.png"
                        alt="Default group image" 
                        width={42} 
                        height={42}
                        className="w-full h-full object-cover"
                        />
                    )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            {!group.isPublic && <svg  className="w-6 h-7" fill="#fff">
                                <use href={`/sprite.svg?v=1#icon-lock`}></use>
                            </svg>}
                            <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-[28px] font-semibold`}>{group?.title}</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-7">
                    <button className="px-4 py-2 bg-AccnetColor rounded-[10px] text-white text-[16px] h-[50px] font-medium" onClick={handleShow}>Створити пост</button>
                    <button className="px-4 py-2 bg-[#3A7F4F] rounded-[10px] text-white text-[16px] h-[50px] font-medium" onClick={getSubscribeUser}>{userSubscribed ? "Відписатися" :"Приєднатися" }</button>
                </div>
            </div>
            <div className="flex gap-4 mb-4">
                <div className={`mt-4 h-[135px] px-5 py-4 ${theme === 'dark' ? 'bg-MainColor ' : 'bg-[#EAEAEA] '} flex flex-col justify-between rounded-[21px] h-fit w-[690px]`}>
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-[15px] font-semibold mb-3 line-clamp-2`}><strong>Опис:</strong> {group?.description} </p>
                    <div className="flex gap-3 items-center">
                        {group.tagDtos && group.tagDtos.map((tag) => (
                            <div key={tag.id} className={`py-2 w-fit px-3 ${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#EAEAEA]'} rounded-[24px]`}>
                                <p className={`text-[13px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} font-semibold`}>{tag.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`mt-4  px-4 py-4 ${theme === 'dark' ? 'bg-MainColor ' : 'bg-[#EAEAEA] '} rounded-[21px] h-fit w-[320px]`}>
                    <div className="flex items-center gap-2 mb-2">
                        <Image src="/sabs.png" alt="" width={24} height={18} />
                        <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-[15px] font-semibold`}>{group.memberCount} підписники</p>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <svg className="w-6 h-6" fill='#EAEAEA'>
                          <use href={`/sprite.svg#icon-post`}/>
                        </svg>
                        <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-[15px] font-semibold`}>{group.postCount} Постів у цій групі</p>
                    </div>
                    <div className="flex items-center">
                        <div className={`py-2 w-fit px-3 ${theme === 'dark' ? 'bg-SecondaryColor ' : 'bg-[#B5B5B5]'} rounded-[24px] mr-2`}>
                            <p className={`text-[13px] ${theme === 'dark' ? 'text-text-[#C5D0E6]' : 'text-white'} font-semibold`}>{group.isPublic ? 'Публічна' : 'Приватна'} група</p>
                        </div>
                        <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-[15px] font-semibold`}>Створена: 31.12.2024</p>
                    </div>
                </div>
            </div>
            {group.isPublic || userSubscribed ? (
  <>
    {posts && posts.some(post => post.isPinned) && (
      <div className="p-5 bg-MainColor rounded-[21px] h-fit w-[1030px] mb-8">
        <div className="flex items-center gap-1 mb-6">
          <svg width={30} height={32}>
            <use href={`/sprite.svg#pinIcon`} />
          </svg>
          <p className="text-white text-[28px] font-bold">Закріплені пости</p>
        </div>
        <div className="flex gap-6">
          {posts
            .filter(post => post.isPinned)
            .map(post => (
              <Link
                href={`/post/${post.id}`}
                key={post.id}
                className="bg-SecondaryColor w-[311px] pb-2 h-fit rounded-br-[14px] rounded-bl-[14px]"
              >
                <div className="h-311 w-204 overflow-hidden">
                {post.image ? <Image
                  src={post.image}
                  alt=""
                  width={311}
                  height={204}
                  className="mb-2 "
                />: <Image
                src='/ImgPost1.png'
                alt=""
                width={311}
                height={204}
                className="mb-2 "
              /> } 
                </div>
                <p className="ml-3 text-white text-[16px] font-bold">
                  {post.title}
                </p>
              </Link>
            ))}
        </div>
      </div>
    )}
  </>
) : null}

            {posts ? (
                posts.map((post) => <Post key={post.id} post={post} isPinned={isPinned} />)
            ) : (
                <p>Поки що немає постів...</p>
            )}
            {show && <CreatePostModal handleShow={handleShow} group={group} />}
            </div>
     );
}
 
export default Group;