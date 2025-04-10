"use client"

import { parseDate } from "@/lib/dataParser"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const RepliesPage = () => {

    const params = useParams()
    const id = params.id

    const [replies, setReplies] = useState<any[]>([])
    const [comments, setComments] = useState<any>({})
    const { theme } = useTheme()

    useEffect(() => {
        const getCommentById = async () => {
            try {
                const res = await fetch(`https://localhost:8080/api/comments/id/${id}`, {
                    mode: "cors"
                })
                const data = await res.json()
                setComments(data.body)
                console.log("comment", data.body)
            } catch (error) {
                console.log(error)
            }
        }

        const getCommentReplies = async() => {
            try {
                const res = await fetch(`https://localhost:8080/api/comments/replies/${id}`, {
                    mode: "cors"
                })
                const data = await res.json()
                setReplies(data.body)
                console.log("replies", data.body)
            } catch (error) {
                console.log(error)
            }
        }

        getCommentReplies()
        getCommentById()
    }, [])

    return (
        <div>
            <div className={`p-6 mt-7 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} rounded-[21px] mb-6 w-[1030px]`}>
                <div className="flex items-center mb-6">
                    <Image src="/person.png" alt="" width={40} height={40} className="mr-2"/>
                    <p className={`text-[20px] ${theme === 'dark' ? 'text-white' : 'text-black'} mr-4 font-bold`}>{comments.userName}</p>
                    <p className={`text-[16px] ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{parseDate(comments.createdAt)}</p>
                </div>
                <p className={`text-[28px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-bold mb-4`}>{comments.content}</p>
                {comments.image && <Image src={comments.image} alt="" width={980} height={760} className="mb-3"/>}
                <div className="flex gap-3">
                    <div className={`flex items-center p-2 gap-3 ${theme === 'dark' ? 'bg-[#2C353D]' : 'bg-[#E4E3E3]'} rounded-[20px]`}>
                        <svg className="w-6 h-6" fill="#C5D0E6">
                            <use href={`/sprite.svg#iconLike`}/>
                        </svg>
                        <p className="text-[18px] text-[#C5D0E6]">{comments.countLikes}</p>
                        <Image src='/brokeHeart.png' alt="" width={29} height={29}/>
                    </div>
                    <div className={`flex items-center p-2 gap-3 ${theme === 'dark' ? 'bg-[#2C353D]' : 'bg-[#E4E3E3]'} rounded-[20px]`}>
                        <svg className="w-6 h-6" fill="#C5D0E6">
                            <use href={`/sprite.svg#icon-comment`}/>
                        </svg>
                        <p className={`text-[18px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'}`}>{comments.countReplies}</p>
                    </div>
                </div>
            </div>
            <div
                className={`px-4 py-5 mt-4 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} rounded-[21px] mb-6 w-[1030px] flex items-center justify-between`}>
                <p className={`text-[34px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-bold`}>Коментарі</p>
                <div className="flex items-center gap-4">
                    <p className={`text-[24px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>Сортувати:</p>
                    <button className={`px-3 py-2  ${theme === 'dark' ? 'bg-[#434C55]' : 'bg-[#FFFFFF]'} rounded-[17px] flex gap-2 items-center`}>
                        <p className={`text-[16px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-bold`}>За вподобаннями</p>
                        <svg className="w-4 h-4">
                            <use href={`/sprite.svg#iconArrowDown`}/>
                        </svg>
                    </button>
                </div>
            </div>
            {replies.length > 0 ? (replies.map((comment: any) =>
            <div key={comment.id}>
                    <div className={`p-6 mt-7 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} rounded-[21px] mb-6 w-[1030px]`}>
                        <div className="flex items-center mb-6">
                            <Image src="/person.png" alt="" width={40} height={40} className="mr-2"/>
                            <p className={`text-[20px] ${theme === 'dark' ? 'text-white' : 'text-black'} mr-4 font-bold`}>{comment.userName}</p>
                            <p className={`text-[16px] ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{parseDate(comment.createdAt)}</p>
                        </div>
                        <p className={`text-[28px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-bold mb-4`}>{comment.content}</p>
                        {comment.image && <Image src={comment.image} alt="" width={980} height={760} className="mb-3"/>}
                        <div className="flex gap-3">
                            <div className={`flex items-center p-2 gap-3 ${theme === 'dark' ? 'bg-[#2C353D]' : 'bg-[#E4E3E3]'} rounded-[20px]`}>
                                <svg className="w-6 h-6" fill="#C5D0E6">
                                    <use href={`/sprite.svg#iconLike`}/>
                                </svg>
                                <p className="text-[18px] text-[#C5D0E6]">{comment.countLikes}</p>
                                <Image src='/brokeHeart.png' alt="" width={29} height={29}/>
                            </div>
                            <div className={`flex items-center p-2 gap-3 ${theme === 'dark' ? 'bg-[#2C353D]' : 'bg-[#E4E3E3]'} rounded-[20px]`}>
                                <svg className="w-6 h-6" fill="#C5D0E6">
                                    <use href={`/sprite.svg#icon-comment`}/>
                                </svg>
                                <p className={`text-[18px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'}`}>{comment.countReplies}</p>
                            </div>
                        </div>
                    </div> 
            </div>
            )) : (
                <p>Поки що немає коментарів...</p>
            )}
        </div>
    )
}

export default RepliesPage