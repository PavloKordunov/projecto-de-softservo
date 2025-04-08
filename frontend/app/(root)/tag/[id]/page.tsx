'use client';
import Post from "@/components/Post";
import { useUser } from "@/hooks/useUser";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TagPage = () => {
    const { theme } = useTheme();
    const params = useParams();
    const tagId = params.id;
    const { user } = useUser();
    const [posts, setPosts] = useState<any[]>([])
    const [tag, setTag] = useState<any>({})
    const [count, setCount] = useState<number>(0)
    const [category, setCategory] = useState<any>('post')

    useEffect(() => {
        const getPostByTag = async () => {
            try {
                const res = await fetch(`https://localhost:8080/api/posts/tag/${tagId}`, {
                    mode: "cors",
                    headers: {
                        'Authorization': `${user?.accessToken ? `Bearer ${user?.accessToken}` : null}`
                    }
                })
                const data = await res.json()
                setCount(data.count)
                setPosts(data.body)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        const getTopicByTag = async () => {
            try {
                const res = await fetch(`https://localhost:8080/api/topics/tag/${tagId}`, {
                    mode: "cors",
                    headers: {
                        'Authorization': `${user?.accessToken ? `Bearer ${user?.accessToken}` : null}`
                    }
                })
                const data = await res.json()
                setCount(data.count)
                setPosts(data.body)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        
        const getGroupByTag = async () => {
            try {
                const res = await fetch(`https://localhost:8080/api/groups/tag/${tagId}`, {
                    mode: "cors",
                    headers: {
                        'Authorization': `${user?.accessToken ? `Bearer ${user?.accessToken}` : null}`
                    }
                })
                const data = await res.json()
                setCount(data.count)
                setPosts(data.body)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        const getTagById = async () => {
            try {
                const res = await fetch(`https://localhost:8080/api/tags/${tagId}`, {
                    mode: "cors",
                    headers: {
                        'Authorization': `${user?.accessToken ? `Bearer ${user?.accessToken}` : null}`
                    }
                })
                const data = await res.json()
                setTag(data.body)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        if(category === 'topic') {
            setTag({})
            getTopicByTag()
        } else if(category === 'group') {
            setTag({})
            getGroupByTag()
        } else if(category === 'post') {
            setTag({})
            getPostByTag()
        }

        getTagById()
    }, [category])

    return (
        <div>
            <div className={`p-4 mt-4 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#E4E3E3]'} rounded-[21px] mb-6 w-[1030px] flex gap-3 items-center`}>
                <Image src="/tagIcon.png" alt="" width={60} height={60}/>
                <div className="flex flex-col">
                    <p className={`text-${theme === 'dark' ? '#97989D' : 'black'} text-[22px] font-semibold`}>#{tag.name}</p>
                    <p className="text-[#97989D] hover:text-black text-[15px]">{category === 'post' ? `${count} posts` : category === 'topic'  ? `${count} topics` : `${count} groups`}  by this tag</p>
                </div>
            </div>
            <div className={`flex gap-5 mb-4 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#E4E3E3]'} rounded-[21px] px-5 py-4 w-fit`}>
                <button onClick={() => setCategory('post')} className={`px-5 py-3 ${category === "post" ? "bg-AccnetColor" : "bg-[#434C55]"} rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center`}>Пости</button>
                <button onClick={() => setCategory('topic')} className={`px-5 py-3 ${category === "topic" ? "bg-AccnetColor" : "bg-[#434C55]"} rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center`}>Теми</button>
                <button onClick={() => setCategory('group')} className={`px-5 py-3 ${category === "group" ? "bg-AccnetColor" : "bg-[#434C55]"} rounded-[8px] text-white text-[16px] font-bold gap-1 flex items-center`}>Групи</button>
            </div>
            {posts && category==='post' && (
                posts.map((post) => <Post key={post.id} post={post} />)
            )}
            <div className="flex flex-wrap gap-10">
                {posts && category==='topic' && (
                    posts.map((topic) => (
                        <Link href={`/topics/${topic.id}`} key={topic.id} className={`${theme === 'dark' ? 'bg-MainColor' : 'bg-[#E4E3E3]'} w-fit h-fit rounded-br-[14px] rounded-t-[14px] rounded-bl-[14px]`}>
                            {topic.image && <Image 
                                src={topic?.image} 
                                alt="Movie Poster" 
                                width={295}
                                height={460}
                                className="mb-2 h-[425px] object-cover rounded-t-[14px]"
                            />}
                            <p className={`ml-3 ${theme === 'dark' ? 'text-white' : 'text-black'} text-center mb-4 text-[16px] font-bold`}>{topic.title}</p>
                        </Link>
                    ))
                )} 
            </div>
            <div className="flex flex-wrap gap-10">
                {posts && category==='group' && (
                    posts.map(group => (
                        <Link key={group.id} href={`/group/${group.id}`} className={`mt-4 p-4 pr-24 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} rounded-[21px] flex items-center h-fit w-fit gap-4`}>
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
                                    <p className="text-[16px] text-white font-semibold">/{group.title}</p>
                                    <p className="text-[#97989D] text-[14px]">{group.postCount} Постів у цій групі</p>
                                </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default TagPage;