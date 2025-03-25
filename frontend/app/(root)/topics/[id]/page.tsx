"use client"
import { useUser } from '@/hooks/useUser';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  limitAge: number;
  IMDB: number;
  duration: string;
  country: string;
  genre: string;
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

  useEffect(() => {
      const getAllTopics = async () => {
        const res = await fetch(`https://localhost:8080/api/topics/${topicId}`, {
          mode: "cors",
        });
        const data = await res.json();
        setTopics(data.body);
        console.log(data);
      };
      const getComments = async() =>{
        try {
            const res = await fetch(`https://localhost:8080/api/comments/id/${topicId}`, {
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

  return (
    <div className="ml-6 mt-4 w-[1030px] bg-[#1E1F20] rounded-[31px] p-8">
      <div className="flex w-full gap-8 mb-32">
        {/* Left Section */}
        <div>
          <img
            className="mb-6"
            src={topic?.image}
            alt="postTitle"
            height={346}
            width={237}
          />
          <a className="flex justify-center items-center w-[237px] h-[39px] bg-[#FF4155] rounded-[31px] mb-4">
            <p className="text-white text-lg font-semibold">Переглянути трейлер</p>
          </a>
          <ul className="flex gap-3 mb-4">
            {['живучі', 'хоррор', 'слешер'].map((tag, index) => (
              <li
                key={index}
                className="flex justify-center items-center w-[70px] h-[32px] bg-[#2C353D] rounded-[26px]"
              >
                <p className="text-[#C5D0E6] text-sm font-semibold">{tag}</p>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-2 mb-4">
            <li className="flex">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-6 h-6 ${index < 4 ? 'fill-[#FFD700]' : 'fill-white'}`}
                >
                  <use href={`/sprite.svg#starIcon`} />
                </svg>
              ))}
            </li>
            <li>
              <p className="text-[#C5D0E6] text-sm">100,145 Відгуки</p>
            </li>
          </ul>
          <a className="flex justify-center items-center w-[237px] h-[39px] bg-[#2C353D] rounded-[31px]">
            <p className="text-white text-[16px] font-semibold">Група по цьому фільму тут</p>
          </a>
        </div>

        {/* Right Section */}
        <div className='w-full'>
          <div className="flex w-full justify-between items-center mb-8">
            <div className='flex items-center '>
                <h1 className="text-white text-4xl font-extrabold mr-4">{topic?.title}</h1>
                {topic?.limitAge === 18 && <div className="flex justify-center items-center w-[42px] h-[42px] bg-[#FF4155] rounded-[9px]">
                    <p className="text-white text-2xl font-semibold">18+</p>
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
              <p className="text-white text-lg font-bold">Рейтинг:</p>
              <p className="text-white text-lg font-bold">Рік:</p>
              <p className="text-white text-lg font-bold">Країна:</p>
              <p className="text-white text-lg font-bold">Тривалість:</p>
              <p className="text-white text-lg font-bold">Жанр:</p>
              <p className="text-white text-lg font-bold">Рекомендований вік:</p>
            </li>
            <li>
              <p className="text-white text-lg">IMBD: <strong>{topic?.IMDB}/10</strong> (29К)</p>
              <p className="text-white text-lg">2024</p>
              <p className="text-white text-lg">{topic?.country}</p>
              <p className="text-white text-lg">{topic?.duration}</p>
              <p className="text-white text-lg">{topic?.country}</p>
              <p className="text-white text-lg">{topic?.limitAge}+ {topic?.limitAge === 18 && ("тільки для дорослих")}</p>
            </li>
          </ul>
          <div className="bg-[#2C353D] p-4 w-[660px] rounded-xl">
            <p className="text-white text-lg font-medium">
              {topic?.description}
            </p>
          </div>
        </div>
      </div>
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <p className="text-white text-3xl font-semibold mr-4">Залиш свої враження тут:</p>
        {[...Array(5)].map((_, index) => (
          <svg key={index} className="w-10 h-10 fill-white">
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
        <button className="w-[193px] h-[58px] bg-[#FF4155] rounded-[13px] text-white text-lg font-semibold" onClick={createComment}>
          Створити коментар
        </button>
      </div>
    </div>
    {comments.length > 0 ? (<div className="bg-[#2C353D] p-5 w-[930px] rounded-xl">
      <ul>
        { comments.map(comment => (
          <li key={comment.id} className="bg-[#1E1F20] p-5 w-[900px] rounded-xl mb-5">
            <div className="flex items-center gap-2 mb-3">
              <img src="/person.png" alt="avatar" className="w-12 h-12" />
              <div>
                <p className="text-white text-xl font-semibold">{comment.userName}</p>
                <p className="text-[#B5A8A8] text-sm font-semibold">{comment.nickname}</p>
              </div>
            </div>
            <div className="bg-[#2C353D] p-5 w-[870px] rounded-xl mb-3">
              <p className="text-white text-lg font-semibold">{comment.content}</p>
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