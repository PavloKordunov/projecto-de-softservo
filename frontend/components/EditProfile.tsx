import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";

const EditProfile = ({ handleShow }: { handleShow: () => void }) => {
    const { user, setUser } = useUser();

    const [base64, setBase64] = useState<string | null>(null);
    const [updateUser, setUpdateUser] = useState({
        firstName: user?.firstName || "",
        nickName: user?.nickName || "",
        image: user?.img || "",
    });

    useEffect(() => {
        if (user) {
            setUpdateUser({
                firstName: user.firstName || "",
                nickName: user.nickName || "",
                image: user.img || ""
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdateUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateUser = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/users/update/${user?.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.accessToken}`,
                },
                body: JSON.stringify(updateUser),
            });

            if (!res.ok) {
                throw new Error(`Failed to update user: ${res.status}`);
            }

            const data = await res.json();
            setUser({
                ...user,
                firstName: updateUser.firstName,
                nickName: updateUser.nickName,
                img: updateUser.image || user?.img,
                id: user?.id ?? "",
                sub: user?.sub ?? "", 
                name: user?.name ?? "",
                email: user?.email ?? "",
                accessToken: user?.accessToken ?? "",
            });
            console.log("User updated:", data);
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
            setUpdateUser((prev) => ({
            ...prev,
            image: base64String,
        }));
            console.log('RESULT:', base64String);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className="bg-MainColor px-10 py-6 rounded-[31px] w-fit">
                <div className="flex justify-between items-center mb-8">
                    <p className="text-[36px] text-white font-semibold">Редагувати профіль</p>
                    <svg className="w-8 h-8" fill="#fff" onClick={handleShow}>
                        <use href={`/sprite.svg#closeBtnIcon`} />
                    </svg>
                </div>
                <div className="flex gap-16 justify-between items-center mb-6">
                    <p className="text-[18px] text-white font-semibold">Ім'я:</p>
                    <input
                        onChange={handleInputChange}
                        name="firstName"
                        value={updateUser.firstName}
                        type="text"
                        className="w-[450px] h-12 px-4 py-2 text-white bg-SecondaryColor border-none rounded-[10px] focus:outline-none"
                        placeholder="Введіть ім'я..."
                    />
                </div>
                <div className="flex justify-between items-center mb-6">
                    <p className="text-[18px] text-white font-semibold">Нікнейм:</p>
                    <input
                        onChange={handleInputChange}
                        name="nickName"
                        value={updateUser.nickName}
                        type="text"
                        className="w-[450px] h-12 px-4 py-2 text-white bg-SecondaryColor border-none rounded-[10px] focus:outline-none"
                        placeholder="Введіть опис..."
                    />
                </div>
                <div className="flex gap-7 items-center mb-6">
                    <p className="text-[18px] text-white font-semibold">Тип користувача:</p>
                    <div> 
                        <button className="px-4 py-2 bg-SecondaryColor rounded-[10px] text-white text-[14px] h-[38px] w-40 font-medium mr-6">Приватний</button>
                        <button className="px-4 py-2 bg-AccnetColor rounded-[10px] text-white text-[14px] h-[38px] w-40 font-medium">Публічний</button>
                    </div>
                </div> 
                <div className="flex gap-9 items-center mb-6">
                    <p className="text-[18px] text-white font-semibold">Аватар:</p>
                    <div className="w-[260px] h-12 px-4 py-2 text-white bg-SecondaryColor border-none rounded-[10px] focus:outline-none">
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
                    <button onClick={handleUpdateUser} className="px-4 py-2 bg-AccnetColor rounded-[10px] items-center justify-center text-white text-[16px] h-[50px] font-medium">
                        Оновити профіль
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
