'use client';
import Post from "@/components/Post";
import { useUser } from "@/hooks/useUser";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TagPage = () => {
    const { theme } = useTheme();
    const params = useParams();
    const tagId = params.id;
    const { user } = useUser();
    const [posts, setPosts] = useState<any[]>([])
    const [tag, setTag] = useState<any>({})

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
        getTagById()
        getPostByTag()
    }, [])

    return (
        <div>
            <div className={`p-4 mt-4 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#E4E3E3]'} rounded-[21px] mb-6 w-[1030px] flex gap-3 items-center`}>
                <Image src="/tagIcon.png" alt="" width={60} height={60}/>
                <div className="flex flex-col">
                    <p className={`text-${theme === 'dark' ? '#97989D' : 'black'} text-[22px] font-semibold`}>#{tag.name}</p>
                    <p className="text-[#97989D] hover:text-black text-[15px]">82,645 Posted by this tag</p>
                </div>
            </div>
            {posts ? (
                posts.map((post) => <Post key={post.id} post={post} />)
            ) : (
                <p>Поки що немає постів...</p>
            )}
        </div>
    );
}

export default TagPage;