"use client";

import {useParams} from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import {use, useEffect, useState} from 'react';
import {useUser} from '@/hooks/useUser';
import {set} from 'date-fns';
import EditPost from '@/components/EditPost';
import { useTheme } from "next-themes";
import { parseDate } from '@/lib/dataParser';
import CreateCommentModal from '@/components/createCommentModal';

interface Post {
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
    isSaved: boolean | null;
    countLikes: number;
    countSaved: number;
    userImage: string;
    tagDtos: any[];
    createdAt: string;
    countComments: number;
}

const PostPage = () => {

    const params = useParams();
    const postId = params.id;
    const {user} = useUser()
    const [base64, setBase64] = useState<string | null>(null);
    const [commentData, setCommentData] = useState<any | null>({
        content: "",
        userId: user?.id,
        objectId: postId
    })
    const [comments, setComments] = useState<any[]>([])
    const [showUpdatePost, setShowUpdatePost] = useState(false)
    const [post, setPost] = useState<Post | null>(null)
    const [likeStatus, setLikeStatus] = useState<boolean | null>(null);
    const [saved, setSaved] = useState<boolean | null>(null);
    const [countLikes, setCountLikes] = useState<number>(0);
    const [countSaved, setCountSaved] = useState<number>(0);
    const { theme, setTheme } = useTheme();
    const [createCommentModal , setCreateCommentModal] = useState(false);
  
    const likeDislike = async (liked: boolean | null) => {
        if (!user) return;
  
        try {
          const res = await fetch(`https://localhost:8080/api/user-statistic/like`, {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify({
              objectId: post?.id,
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

    const savePost = async (saved: boolean | null) => {
        if (!user) return;
    
        try {
          const res = await fetch(`https://localhost:8080/api/user-statistic/save`, {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify({
              objectId: post?.id,
              userId: user.id,
              saved,
            }),
          });
    
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
    
          const data = await res.json();
          console.log(data);
    
          setSaved(saved);
            setCountSaved((prev) => {
                if (saved === true) return prev + 1
                if (saved === false) return prev - 1
                return prev;
            });
          
        } catch (error) {
          console.error("Failed to update like status:", error);
        }
    };
  
    const toggleLike = () => {
      const newStatus = likeStatus === true ? null : true;
      likeDislike(newStatus);
    };
  
    const toggleDislike = () => {
      const newStatus = likeStatus === false ? null : false;
      likeDislike(newStatus);
    };

    useEffect(() => {
        if (post) {
            setLikeStatus(post.isLiked);
            setSaved(post.isSaved);
            setCountLikes(post.countLikes);
            setCountSaved(post.countSaved);
        }
    }, [post]);

    useEffect(() => {
        console.log('likeStatus:', likeStatus);
        console.log('saved:', saved);
    }, [likeStatus, saved]);

    function encodeImageFileAsURL(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = function () {
            const base64String = reader.result as string;
            setBase64(base64String);
            setCommentData((prev: any) => ({
                ...prev,
                image: base64String,
            }));
            console.log('RESULT:', base64String);
        };
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        const getPostById = async () => {
            try {
                const res = await fetch(`https://localhost:8080/api/posts/${postId}`, {
                    mode: "cors",
                    headers: {
                        'Authorization': `${user?.accessToken ? `Bearer ${user?.accessToken}` : null}`
                    }
                })
                const data = await res.json()
                setPost(data.body)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        const getComments = async () => {
            try {
                const res = await fetch(`https://localhost:8080/api/comments/objectId/${postId}`, {
                    mode: "cors",
                })
                const data = await res.json()
                console.log(data)
                setComments(data.body)
            } catch (error) {
                console.log(error)
            }
        }

        getComments()
        getPostById()
    }, [])

    const createComment = async () => {
        try {
            const res = await fetch(`https://localhost:8080/api/comments/create`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${user?.accessToken ? `Bearer ${user?.accessToken}` : null}`
                },
                body: JSON.stringify(commentData)
            })
            const data = await res.json()
            setCommentData((prev: any) => ({
                ...prev,
                content: "",
              }));
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleShow = () => {
        setShowUpdatePost(!showUpdatePost)
    }

    const handleCloseModal = () => {
        setCreateCommentModal(false);
    }

    if (!post) {
        return <p className="text-white">Завантаження...</p>;
    }

    return (
        <div>
            <div className={`p-7 mt-4 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#E4E3E3]'} rounded-[21px] mb-6 w-[1030px]`}>
                <div className="flex items-center justify-between mb-4">
                    <Link href={`/group/${post.groupId}`} className="flex item-center gap-2">                   
                        <Image src='/groupImage.png' alt="" width={38} height={38} />
                        <p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>/{post?.groupTitle}</p>
                    </Link>
                    <div className='flex items-center gap-3'>
                        {post?.userId === user?.id && <svg onClick={handleShow} className="w-6 h-6" fill="#C5D0E6" >
                            <use href={`/sprite.svg?v=1#icon-edit`} />
                        </svg>}
                        <div className={`${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} p-2 rounded-[20px] flex gap-2 items-center`}>
                            <svg className="ml-1 w-6 h-6" fill="#C5D0E6" >
                                <use href={`/sprite.svg?v=1#icon-eye`} />
                            </svg>
                            <p className={`text-[18px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'}`}>{post.viewCount}</p>
                        </div>
                    </div>
                </div>
                <p className={`text-[24px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-bold mb-4`}>{post.title}</p>
                <p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} mb-3`}>{post.description}</p>
                <div className="flex gap-3 items-center mb-5">
                {post.tagDtos && post.tagDtos.map((tag) => (
                    <Link href={`/tag/${tag.id}`} key={tag.id} className={`py-2 w-fit px-3 ${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#EAEAEA]'} rounded-[24px]`}>
                        <p className={`text-[13px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} font-semibold`}>{tag.name}</p>
                    </Link>
                ))}
                </div>
                {post?.image && <Image src={post?.image} alt="" width={980} height={760} className="mb-3" />}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Link href={`/user/${post.userId}`}>
                            <div className="h-[54px] w-[54px] rounded-[50%] overflow-hidden">
                                {post?.userImage ? <Image src={post?.userImage} alt="" width={54} height={54} /> : <Image src="/person.png" alt="" width={54} height={54} />}
                            </div>
                        </Link>
                        <div>
                            <Link href={`/user/${post.userId}`}><p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>{post.nickname}</p></Link>
                            <span className={`text-[13px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} font-regular`}>{parseDate(post.createdAt)}</span>
                        </div>
                        <div className="flex gap-3 ml-5">
                            <div className={`flex items-center px-3 py-2 gap-3 ${theme === 'dark' ? 'bg-[#2C353D]' : 'bg-[#B5B5B5]'} rounded-[20px]`}>
                                <button onClick={ (e) => {
                                    e.preventDefault();
                                    toggleLike();
                                    }}>
                                    <svg className="w-6 h-6" fill={likeStatus === true ? "#FF0000" : likeStatus === null ? "#C5D0E6" : "#C5D0E6"}>
                                        <use href={`/sprite.svg#iconLike`} />
                                    </svg>
                                </button>
                                    <p className={`text-[18px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'}`}>{countLikes}</p>
                                <button onClick={ (e) => {
                                    e.preventDefault();
                                    toggleDislike();
                                    }}>
                                    <svg className="w-6 h-6" fill={likeStatus === false ? "#FF0000" : likeStatus === null ? "#C5D0E6" : "#C5D0E6"}>
                                        <use href={`/sprite.svg?v=1#icon-heartbreak`}/>
                                    </svg>
                                </button>
                            </div>
                            <div className={`flex items-center px-3 py-2 gap-3 ${theme === 'dark' ? 'bg-[#2C353D]' : 'bg-[#B5B5B5]'} rounded-[20px]`}>
                                <svg className="w-6 h-6" fill="#C5D0E6" >
                                    <use href={`/sprite.svg#icon-comment`} />
                                </svg>
                                <p className={`text-[18px] 'text-[#C5D0E6]' : 'text-black'}`}>{post.countComments}</p>
                            </div>
                            <div className={`flex items-center px-3 py-2 gap-3 ${theme === 'dark' ? 'bg-[#2C353D]' : 'bg-[#B5B5B5]'} rounded-[20px]`}>
                                <button onClick={ (e) => {
                                    e.preventDefault();
                                    setSaved(!saved);
                                    savePost(!saved);
                                    }
                                }>
                                    <svg className={`w-5 h-6 ${saved === true ? "fill-[#FFD700]" : "fill-white"}`}  >
                                        <use href={`/sprite.svg#icon-save`} />
                                    </svg>
                                </button>
                                <p className={`text-[18px] 'text-[#C5D0E6]' : 'text-black'}`}>{countSaved}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`p-4 mt-7 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'}  rounded-[21px] mb-6 w-[1030px]`}>
                <input type="text" className={` w-[580px] h-14 py-2  ${theme === 'dark' ? 'bg-MainColor text-white' : 'bg-[#EAEAEA] text-black'} border-none rounded-[10px] focus:outline-none`}
                       placeholder="Поширте те, що коїться у вас в голові..."
                       value={commentData.content}
                       onChange={(e) => setCommentData((prev: any) => {return {...prev, content: e.target.value}})}/>
                <div className="flex items-center justify-between ">
                    <div>
                        <label
                            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                            htmlFor="img"
                        >
                            <Image src='/addPhoto.png' alt="" width={40} height={40} />
                        </label>
                        <input type="file" id="img" onChange={encodeImageFileAsURL} className="hidden"/>
                    </div>
                    <div className="flex gap-4">
                        <button className={`px-3 py-2 bg-AccnetColor rounded-[17px] ${theme === 'dark' ? 'text-white' : 'text-black'} text-[16px] font-bold`} onClick={createComment}>Коментувати</button>
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
                {comments.length > 0 ? (comments.map((comment) =>
                <div key={comment.id}>
                    <Link href={`/replies/${comment.id}`}>
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
                                <div onClick={(e) =>{ 
                                    e.preventDefault()
                                    setCreateCommentModal(true)
                                    }} 
                                    className={`flex items-center p-2 gap-3 ${theme === 'dark' ? 'bg-[#2C353D]' : 'bg-[#E4E3E3]'} rounded-[20px]`}>
                                    <svg className="w-6 h-6" fill="#C5D0E6">
                                        <use href={`/sprite.svg#icon-comment`}/>
                                    </svg>
                                    <p className={`text-[18px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'}`}>{comment.countReplies}</p>
                                </div>
                            </div>
                        </div> 
                    </Link>
                    {createCommentModal && <CreateCommentModal comment={comment} handleCloseModal={handleCloseModal} postId={postId} />}
                </div>
                )) : (
                    <p>Поки що немає коментарів...</p>
                )}
                
            {showUpdatePost && <EditPost handleShow={handleShow} post={post}/>}
        </div>
    );
}

export default PostPage;