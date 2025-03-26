import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";

const CreateGroup = ({ handleShow }: { handleShow: () => void }) => {
    const { user } = useUser();
    const [isPublic, setIsPublic] = useState<boolean | null>(null);

    const [group, setGroup] = useState({
        title: "",
        description: "",
        userId: user?.id,
        isPublic: isPublic,
    });

    useEffect(() => {
        setGroup((prev) => ({ ...prev, isPublic }));
    }, [isPublic]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setGroup((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateGroup = async () => {
        try {
            const res = await fetch("https://localhost:8080/api/groups/create", {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.accessToken}`,
                },
                body: JSON.stringify(group),
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        handleShow();
    };

    return (
        <div className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className="bg-MainColor px-10 py-6 rounded-[31px] w-fit">
                <div className="flex justify-between items-center mb-8">
                    <p className="text-[36px] text-white font-semibold">Створити групу</p>
                    <svg className="w-8 h-8" fill="#fff" onClick={handleShow}>
                        <use href={`/sprite.svg#closeBtnIcon`} />
                    </svg>
                </div>
                <div className="flex gap-16 items-center mb-6">
                    <p className="text-[18px] text-white font-semibold">Назва: </p>
                    <input
                        onChange={handleInputChange}
                        name="title"
                        value={group.title}
                        type="text"
                        className="w-[450px] h-12 px-4 py-2 text-white bg-SecondaryColor border-none rounded-[10px] focus:outline-none"
                        placeholder="Введіть назву..."
                    />
                </div>
                <div className="flex gap-7 items-center mb-6">
                    <p className="text-[18px] text-white font-semibold">Тип групи:</p>
                    <div>
                        <button
                            onClick={() => setIsPublic(true)}
                            className={`px-4 py-2 ${
                                isPublic === true ? "bg-AccnetColor" : "bg-SecondaryColor"
                            } rounded-[10px] text-white text-[14px] h-[38px] w-40 font-medium mr-6`}
                        >
                            Публічна
                        </button>
                        <button
                            onClick={() => setIsPublic(false)}
                            className={`px-4 py-2 ${
                                isPublic === false ? "bg-AccnetColor" : "bg-SecondaryColor"
                            } rounded-[10px] text-white text-[14px] h-[38px] w-40 font-medium mr-6`}
                        >
                            Приватна
                        </button>
                    </div>
                </div>
                <div className="flex justify-between mb-6">
                    <p className="text-[18px] text-white font-semibold">Опис: </p>
                    <textarea
                        onChange={handleInputChange}
                        name="description"
                        value={group.description}
                        className="w-[450px] h-28 px-4 py-2 resize-none text-white bg-SecondaryColor border-none rounded-[10px] mb-3 focus:outline-none"
                        placeholder="Введіть опис..."
                    ></textarea>
                </div>
                <div className="w-full flex justify-end">
                    <button
                        onClick={handleCreateGroup}
                        className="px-4 py-2 bg-AccnetColor rounded-[10px] text-white text-[16px] h-[50px] font-medium"
                    >
                        Створити групу
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroup;