import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface Tag {
    id: string;
    name: string;
}

const CreateGroup = ({ handleShow }: { handleShow: () => void }) => {
    const { user } = useUser();
    const [isPublic, setIsPublic] = useState<boolean | null>(false);
    const { theme } = useTheme();
    const [base64, setBase64] = useState<string | null>(null);
    const [tags, setTags] = useState<Tag[]>([]);
    const [tagQuery, setTagQuery] = useState("");
    const [suggestedTags, setSuggestedTags] = useState<Tag[]>([]);

    const [group, setGroup] = useState({
        title: "",
        description: "",
        userId: user?.id,
        isPublic: isPublic,
        tagsId: [] as string[],
    });

    useEffect(() => {
        setGroup((prev) => ({ ...prev, isPublic }));
    }, [isPublic]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setGroup((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
            if (tagQuery.trim() !== "") {
                fetch(`https://localhost:8080/api/tags/search?query=${tagQuery}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            setSuggestedTags(data.body);
                        }
                    })
                    .catch(err => console.log(err));
            } else {
                setSuggestedTags([]);
            }
        }, [tagQuery]);

    const handleCreateGroup = async () => {
        try {
            const res = await fetch("https://localhost:8080/api/groups/create", {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.accessToken}`,
                },
                body: JSON.stringify(group),
            });
            const data = await res.json();
            console.log(data);
            console.log(group)
        } catch (error) {
            console.log(error);
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
            setGroup((prev) => ({
            ...prev,
            image: base64String,
        }));
            console.log('RESULT:', base64String);
        };
        reader.readAsDataURL(file);
    }


    const addTag = (tag: Tag) => {
        if (!group.tagsId.includes(tag.id)) {
            setGroup((prev) => ({
                ...prev,
                tagsId: [...prev.tagsId, tag.id]
            }));
            setTags((prev) => [...prev, tag]);
        }
        setTagQuery("");
        setSuggestedTags([]);
    };


    return (
        <div className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className={`${theme === 'dark' ? 'bg-MainColor' : 'bg-[#B5B5B5]'} px-10 py-6 rounded-[31px] w-fit`}>
                <div className="flex justify-between items-center mb-8">
                    <p className={`text-[36px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>Створити групу</p>
                    <svg className="w-8 h-8" fill="#fff" onClick={handleShow}>
                        <use href={`/sprite.svg#closeBtnIcon`} />
                    </svg>
                </div>
                <div className="flex gap-16 items-center mb-6">
                    <p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>Назва: </p>
                    <input
                        onChange={handleInputChange}
                        name="title"
                        value={group.title}
                        type="text"
                        className={`w-[450px] h-12 px-4 py-2 ${theme === 'dark' ? 'bg-SecondaryColor text-white' : 'bg-[#EAEAEA] text-black'} border-none rounded-[10px] focus:outline-none`}
                        placeholder="Введіть назву..."
                    />
                </div>
                <div className="flex gap-7 items-center mb-6">
                    <p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>Тип групи:</p>
                    <div>
                        <button
                            onClick={() => setIsPublic(true)}
                            className={`px-4 py-2 rounded-[10px] ${theme === 'dark' ? 'text-white' : 'text-black'} text-[14px] h-[38px] w-40 font-medium mr-6 ${
                                isPublic === true
                                    ? "bg-AccnetColor"
                                    : theme === "dark"
                                        ? "bg-SecondaryColor"
                                        : "bg-[#E4E3E3]"
                            }`}
                        >
                            Публічна
                        </button>
                        <button
                            onClick={() => setIsPublic(false)}
                            className={`px-4 py-2 rounded-[10px] ${theme === 'dark' ? 'text-white' : 'text-black'} text-[14px] h-[38px] w-40 font-medium mr-6 ${
                                isPublic === false
                                    ? "bg-AccnetColor"
                                    : theme === "dark"
                                        ? "bg-SecondaryColor"
                                        : "bg-[#E4E3E3] "
                            }`}
                        >
                            Приватна
                        </button>
                    </div>
                </div>
                <div className="flex justify-between mb-6">
                    <p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>Опис: </p>
                    <textarea
                        onChange={handleInputChange}
                        name="description"
                        value={group.description}
                        className={`w-[450px] h-28 px-4 py-2 resize-none ${theme === 'dark' ? 'bg-SecondaryColor text-white' : 'bg-[#EAEAEA] text-black'} border-none rounded-[10px] mb-3 focus:outline-none`}
                        placeholder="Введіть опис..."
                    ></textarea>
                </div>
                <div className="flex gap-16 items-center mb-6">
                    <p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>Назва: </p>
                    <div className="relative flex items-center gap-4">
                    {tags.length > 0 &&<div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                        <div key={tag.id} className={`${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} px-4 py-2 rounded-[31px] w-fit`}>
                            <p className="text-[14px] text-[#858EAD] font-semibold">{tag.name}</p>
                        </div>
                        ))}
                    </div>}
                    <div className="relative">
                        <div className={`${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} px-2 rounded-[31px] items-center justify-center w-fit`}>
                            <input type="text" value={tagQuery} onChange={(e) => setTagQuery(e.target.value)} className={`px-1 mt-3 text-[14px] font-semibold w-[88px] h-4 ${theme === 'dark' ? 'bg-SecondaryColor text-white' : 'bg-[#B5B5B5] text-black'} border-none rounded-[10px] mb-3 focus:outline-none`} placeholder="додати тег" />
                        </div>
                        {suggestedTags.length > 0 && (
                            <ul className="absolute w-[200px] p-4 bg-SecondaryColor rounded-[31px] shadow-md">
                                {suggestedTags.map(tag => (
                                    <li key={tag.id} className="px-2 py-1 cursor-pointer hover:bg-[#3A464F] transition-colors" onClick={() => addTag(tag)}>{tag.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                </div>
                <div className="flex gap-9 items-center mb-6">
                    <p className={`text-[18px] ${theme === 'dark' ? 'text-white' : 'text-black'} font-semibold`}>Світлина:</p>
                    <div className={`w-[260px] h-12 px-4 py-2 ${theme === 'dark' ? 'text-white bg-SecondaryColor' : 'text-black bg-[#B5B5B5] '} border-none rounded-[10px] focus:outline-none`}>
                        <label
                            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                            htmlFor="img"
                        >
                            <span>Завантажте світлину</span>
                        </label>
                        <input type="file" id="img" onChange={encodeImageFileAsURL} className="hidden"/>
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <button
                        onClick={handleCreateGroup}
                        className={`px-4 py-2 bg-AccnetColor rounded-[10px] ${theme === 'dark' ? 'text-white' : 'text-black'} text-[16px] h-[50px] font-medium`}
                    >
                        Створити групу
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroup;