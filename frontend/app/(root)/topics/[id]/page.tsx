"use client"
import { useUser } from '@/hooks/useUser';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import TrailerModal from '@/components/TraillerModal';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  limitAge: string;
  IMDB: number;
  duration: string;
  country: string;
  genre: string;
  userRateCount: number;
  userRate: number;
  myRate: number;
  director: string;
  actor: string;
  trailerURL: string;
  groupId: string;
  tagDtos: any[];
}

const AdminPost = () => {

  const router = useRouter();
  const params = useParams();
  const { user } = useUser();
  const [comments, setComments] = useState<any[]>([])
  const topicId = params.id;
  const [commentData, setCommentData] = useState({
    content: "",
    objectId: topicId,
    userId: user?.id
  })

  const [topic, setTopics] = useState<Post | null>(null);
  const [topicRate, setTopicRate] = useState<number | null>(null);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  const { theme, setTheme } = useTheme();

  useEffect(() => {
      const getAllTopics = async () => {
        const res = await fetch(`https://localhost:8080/api/topics/${topicId}`, {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.accessToken}`,
          }
        });

        const data = await res.json();
        setTopics(data.body);
        console.log(data);
      };
      const getComments = async() =>{
        try {
            const res = await fetch(`https://localhost:8080/api/comments/objectId/${topicId}`, {
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
      getAllTopics();
  }, []);

  const createComment = async() =>{
    try {
        const res = await fetch(`https://localhost:8080/api/comments/create`, {
          mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user?.accessToken}`
            },
            body: JSON.stringify(commentData)
        })
        const data = await res.json()
        commentData.content = ""
        console.log(data)
    } catch (error) {
        console.log(error)
    }
  }

 useEffect(() => {
  if(topicRate !== 0 && topicRate !== null){
    const rateTopic = async () => {
        if (!user) return;
    
        try {
          const res = await fetch(`https://localhost:8080/api/user-statistic/rate`, {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify({
              objectId: topicId,
              userId: user.id,
              rate: topicRate,
            }),
          });
    
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
    
          const data = await res.json();
          console.log(data);
  
        } catch (error) {
          console.error("Failed to update like status:", error);
        }
      };
    
      rateTopic();
    }
  }, [topicRate]);


  useEffect(() => {
    if(topicRate !== null){
      setTopics((prev) => {
        if (prev) {
          return { ...prev, userRate: topicRate };
        }
        return prev;
      })
    }
  }, [topicRate])

  return (
    <div className={`ml-6 mt-4 w-[1030px]  ${theme === 'dark' ? 'bg-[#1E1F20]' : 'bg-[#E4E3E3]'} rounded-[31px] p-8`}>
      <div className="flex w-full gap-8 mb-32">
        <div>
          <img
            className="mb-6"
            src={topic?.image}
            alt="postTitle"
            height={346}
            width={237}
          />
          <a 
            className="flex justify-center items-center w-[237px] h-[39px] bg-[#FF4155] rounded-[31px] mb-4 cursor-pointer"
            onClick={() => {
              if (topic?.trailerURL) { 
                setTrailerUrl(topic.trailerURL);
                setShowTrailerModal(true);
              }
            }}
          >
            <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-lg font-semibold`}>
              Переглянути трейлер
            </p>
          </a>
            {showTrailerModal && <TrailerModal setShowTrailerModal={setShowTrailerModal} trailerUrl={trailerUrl} />}
            <div className="flex gap-3 items-center mb-5">
              {topic?.tagDtos && topic.tagDtos.map((tag) => (
                  <Link href={`/tag/${tag.id}`} key={tag.id} className={`py-2 w-fit px-3 ${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#EAEAEA]'} rounded-[24px]`}>
                      <p className={`text-[13px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} font-semibold`}>{tag.name}</p>
                  </Link>
              ))}
            </div>
          <ul className="flex items-center gap-2 mb-4">
            <li className="flex">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-6 h-6 ${index < (topic?.userRate ?? 0) ? 'fill-[#FFD700]' : 'fill-white'}`}
                >
                  <use href={`/sprite.svg#starIcon`} />
                </svg>
              ))}
            </li>
            <li>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-sm`}>{topic?.userRateCount}</p>
            </li>
          </ul>
          <Link href={`/group/${topic?.groupId}`} className={`flex justify-center items-center w-[237px] h-[39px] ${theme === 'dark' ? 'bg-[#2C353D]' : 'bg-[#B5B5B5]'} rounded-[31px]`}>
            <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-[16px] font-semibold`}>Група по цьому фільму тут</p>
          </Link>
        </div>

        <div className='w-full'>
          <div className="flex w-full justify-between items-center mb-8">
            <div className='flex items-center '>
                <h1 className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-4xl font-extrabold mr-4`}>{topic?.title}</h1>
                {topic?.limitAge === '18' && <div className="flex justify-center items-center w-[42px] h-[42px] bg-[#FF4155] rounded-[9px]">
                    <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'}text-2xl font-semibold`}>18+</p>
                </div>}
            </div>
            <a onClick={() => router.push('/home')} className="cursor-pointer">
                <svg className="w-8 h-8 fill-white">
                    <use href={`/sprite.svg#closeBtnIcon`} />
                </svg>
            </a>
          </div>
          <ul className="flex gap-4 h-fit bg-[#2C353D] p-4 w-fit rounded-xl mb-6">
            <li>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg font-bold`}>Рейтинг:</p>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg font-bold`}>Рік:</p>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg font-bold`}>Країна:</p>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg font-bold`}>Тривалість:</p>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg font-bold`}>Жанр:</p>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg font-bold`}>Рекомендований вік:</p>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg font-bold`}>Режисер:</p>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg font-bold`}>Актори:</p>
            </li>
            <li>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg`}>IMBD: <strong>{topic?.IMDB}/10</strong></p>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg`}>2024</p>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg`}>{topic?.country}</p>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg`}>{topic?.duration}</p>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg`}>{topic?.genre}</p>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg`}>{topic?.limitAge}+ {topic?.limitAge === '18' && ("тільки для дорослих")}</p>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg`}>{topic?.director}</p>
              <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg`}>{topic?.actor}</p>
            </li>
          </ul>
          <div className={`${theme === 'dark' ? 'bg-[#2C353D]' : 'bg-[#B5B5B5]'} p-4 w-[660px] rounded-xl`}>
            <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg font-medium`}>
              {topic?.description}
            </p>
          </div>
        </div>
      </div>
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-3xl font-semibold mr-4`}>Залиш свої враження тут:</p>
        {[...Array(5)].map((_, index) => (
          <svg key={index} className={`w-10 h-10 ${(topicRate ?? topic?.myRate ?? 0) > index ? "fill-[#FFD700]" : 'fill-white'}`} onClick={() => setTopicRate(index+1)}>
            <use href={`/sprite.svg#starIcon`} />
          </svg>
        ))}
      </div>
      <div className="flex gap-6">
        <input
          className="w-[680px] h-[54px] bg-white rounded-[14px] px-6 text-black"
          type="text"
          placeholder="Введіть ваш коментар..."
          value={commentData.content}
          onChange={(e) => setCommentData((prev) => {return{...prev, content: e.target.value}})}
        />
        <button className={`w-[193px] h-[58px] bg-[#FF4155] rounded-[13px] ${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-lg font-semibold`} onClick={createComment}>
          Створити коментар
        </button>
      </div>
    </div>
    {comments.length > 0 ? (<div className={`${theme === 'dark' ? 'bg-[#2C353D]' : 'bg-[#B5B5B5]'} p-5 w-[930px] rounded-xl`}>
      <ul>
        { comments.map(comment => (
          <li key={comment.id} className={`${theme === 'dark' ? 'bg-[#1E1F20]' : 'bg-[#E4E3E3]'}p-5 w-[900px] rounded-xl mb-5`}>
            <div className="flex items-center gap-2 mb-3">
              <img src="/person.png" alt="avatar" className="w-12 h-12" />
              <div>
                <p className={`${theme === 'dark' ? 'text-[#C5D0E6]' : 'text-black'} text-xl font-semibold`}>{comment.userName}</p>
                <p className="text-[#B5A8A8] text-sm font-semibold">{comment.nickname}</p>
              </div>
            </div>
            <div className={`${theme === 'dark' ? 'bg-[#2C353D]' : 'bg-[#B5B5B5]'} p-5 w-[870px] rounded-xl mb-3`}>
              <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}text-lg font-semibold`}>{comment.content}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#B5A8A8] text-sm font-semibold">
                <i>2 години тому</i>
              </p>
              <div className="flex items-center gap-2">
                <p className="text-[#B5A8A8] text-sm font-semibold">Відповісти</p>
                <svg className="w-5 h-5 fill-[#B5A8A8]">
                  <use href={`/sprite.svg#commentIcon`} />
                </svg>
                <p className="text-[#B5A8A8] text-sm font-semibold">0</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>) : (
        <p>Поки що немає коментарів...</p>
    )}
    </div>
  );
};

export default AdminPost;