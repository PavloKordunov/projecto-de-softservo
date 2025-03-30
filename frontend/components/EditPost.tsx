import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const EditPost = ({ handleShow, post }: { handleShow: () => void; post: any }) => {
    const {user} = useUser()
    const [base64, setBase64] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();
    const [updatePost, setUpdatePost] = useState({
        title: post?.title || "",
        description: post?.description || "",
        image: post?.image || "",
        userId: user?.id,
        groupId: post.groupId,
    });

    useEffect(() => {
        if (post) {
            setUpdatePost({
                title: post.title || "",
                userId: user?.id,
                description: post.description || "",
                image: post.image || "",
                groupId: post.groupId,
            });
        }
    }, [post]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatePost((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdatePost = async () => {
        console.log(updatePost)
        try {
            const res = await fetch(`https://localhost:8080/api/posts/update/${post?.id}`, {
                mode: "cors",
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.accessToken}`
                },
                body: JSON.stringify(updatePost),
            });

            if (!res.ok) {
                throw new Error(`Failed to update post: ${res.status}`);
            }

            const data = await res.json();
            console.log("Post updated:", data);
        } catch (error) {
            console.error("Update error:", error);
        }
        handleShow();
    };

    function encodeImageFileAsURL(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = function () {
            const base64String = reader.result as string;
            setBase64(base64String);
            setUpdatePost((prev) => ({
                ...prev,
                image: base64String,
            }));
            console.log("RESULT:", base64String);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className={`${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} px-10 py-6 rounded-[31px] w-fit`}>
                <div className="flex justify-between items-center mb-8">
                    <p className={`text-[36px]  ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>Редагувати пост</p>
                    <svg className="w-8 h-8" fill="#fff" onClick={handleShow}>
                        <use href={`/sprite.svg#closeBtnIcon`} />
                    </svg>
                </div>
                <div className="flex gap-16 justify-between items-center mb-6">
                    <p className={`text-[18px]  ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>Заголовок:</p>
                    <input
                        onChange={handleInputChange}
                        name="title"
                        value={updatePost.title}
                        type="text"
                        className={`w-[450px] h-12 px-4 py-2  ${theme === 'dark' ? 'bg-SecondaryColor text-white' : 'bg-[#B5B5B5] text-black placeholder:text-gray-800'} border-none rounded-[10px] focus:outline-none`}
                        placeholder="Введіть заголовок..."
                    />
                </div>
                <div className="flex justify-between items-center mb-6">
                    <p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>Опис:</p>
                    <textarea
                        onChange={handleInputChange}
                        name="description"
                        value={updatePost.description}
                        className={`w-[450px] h-28 px-4 py-2 resize-none ${theme === 'dark' ? 'bg-SecondaryColor text-white' : 'bg-[#B5B5B5] text-black placeholder:text-gray-800'} border-none rounded-[10px] focus:outline-none`}
                        placeholder="Введіть опис..."
                    ></textarea>
                </div>
                <div className="flex gap-12 items-center mb-6">
                    <p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>Зображення:</p>
                    <div className="w-[260px] h-12 px-4 py-2 ${theme === 'dark' ? 'bg-SecondaryColor text-white' : 'bg-[#B5B5B5] text-black placeholder:text-gray-800'} border-none rounded-[10px] focus:outline-none">
                        <label
                            className={`text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-600'} flex items-center gap-2 cursor-pointer`}
                            htmlFor="img"
                        >
                            <span>Завантажте зображення</span>
                        </label>
                        <input type="file" id="img" onChange={encodeImageFileAsURL} className="hidden" />
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <button
                        onClick={handleUpdatePost}
                        className={`px-4 py-2 bg-AccnetColor rounded-[10px] items-center justify-center ${theme === 'dark' ? 'text-white' : 'text-black'} text-[16px] h-[50px] font-medium`}
                    >
                        Оновити пост
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPost;