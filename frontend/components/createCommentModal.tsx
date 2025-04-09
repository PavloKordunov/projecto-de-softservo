import { useUser } from "@/hooks/useUser";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const CreateCommentModal = ({comment, handleCloseModal, postId}: {comment: any, postId: any, handleCloseModal: () => void}) => {
    const {theme} = useTheme();
    const {user} = useUser()
    const [base64, setBase64] = useState<string | null>(null);
    const [commentData, setCommentData] = useState<any | null>({
        content: "",
        userId: user?.id,
        objectId: postId,
        parentComment: comment.id,
        image: ""
    })
    const createComment = async () => {
        try {
            const res = await fetch(`https://localhost:8080/api/comments/create`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.accessToken}`
                },
                body: JSON.stringify(commentData),
            });

            if (!res.ok) {
                throw new Error(`Failed to create comment: ${res.status}`);
            }

            const data = await res.json();
            console.log("Comment created:", data);
        } catch (error) {
            console.error("Create error:", error);
        }
    }

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
        setCommentData((prev: any) => ({
            ...prev,
            image: base64,
        }));
    }, [base64])

    useEffect(() => {
        console.log(commentData)
    }, [commentData])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
        <div className={`${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} px-10 py-6 rounded-[31px] w-fit`}>
            <div>
                <div className="flex items-center mb-6 justify-between">
                    <div className="flex items-center">
                        <Image src="/person.png" alt="" width={40} height={40} className="mr-2"/>
                        <div>
                            <p className={`text-[20px] ${theme === 'dark' ? 'text-white' : 'text-black'} mr-4 font-bold`}>{comment.userName}</p>
                            <p className={`text-[16px] ${theme === 'dark' ? 'text-white' : 'text-black'} mr-4`}>{comment.content}</p>
                        </div>
                    </div>
                    <svg className="w-8 h-8 ml-auto cursor-pointer" fill="#fff" onClick={handleCloseModal}>
                        <use href={`/sprite.svg#closeBtnIcon`} />
                    </svg>
                </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
                <div>
                    <label
                        className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                        htmlFor="img"
                    >
                        <Image src='/addPhoto.png' alt="" width={40} height={40} />
                    </label>
                    <input type="file" id="img" onChange={encodeImageFileAsURL} className="hidden"/>
                </div>
                <div className="flex gap-16 justify-between items-center">
                    <input
                         onChange={(e) => setCommentData((prev: any) => {return {...prev, content: e.target.value}})}
                        value={commentData.content}
                        name="title"
                        type="text"
                        className={`w-[450px] h-12 px-4 py-2  ${theme === 'dark' ? 'bg-SecondaryColor text-white' : 'bg-[#B5B5B5] text-black placeholder:text-gray-800'} border-none rounded-[10px] focus:outline-none`}
                        placeholder="Дайте відповідь на коментар..."
                    />
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button
                    onClick={() => {
                        createComment();
                        handleCloseModal();
                    }}
                    className={`px-4 py-2 bg-AccnetColor rounded-[10px] items-center justify-center ${theme === 'dark' ? 'text-white' : 'text-black'} text-[16px] h-[50px] font-medium`}
                >
                    Коментувати
                </button>
            </div>
        </div>
    </div>
    )
}
export default CreateCommentModal;