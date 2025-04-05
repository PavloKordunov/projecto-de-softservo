"use client";

import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";

const GroupList = ({ setShowGroupList, selectGroup }: { setShowGroupList: React.Dispatch<React.SetStateAction<boolean>>, selectGroup: (group: any) => void }) => {
    const [groups, setGroups] = useState<any[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { user } = useUser();

    useEffect(() => {
        const getAllGroups = async () => {
            const res = await fetch(`https://localhost:8080/api/groups/followed/${user?.id}`,{
                mode: "cors",
            });
            const data = await res.json();
            setGroups(data.body);
            setFilteredGroups(data.body);
        };

        getAllGroups();
    }, []);

    useEffect(() => {
        const filtered = groups.filter(group =>
            group.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredGroups(filtered);
    }, [searchTerm, groups]);

    return (
        <div className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className="bg-MainColor px-10 py-6 rounded-[31px] w-fit">
                <div className="flex items-center justify-between mb-5">
                    <p className="text-[28px] text-white font-semibold mr-12">Виберіть групу</p>
                    <svg className="w-6 h-6 cursor-pointer" fill="#fff" onClick={() => setShowGroupList(false)}>
                        <use href={`/sprite.svg#closeBtnIcon`} />
                    </svg>
                </div>
                <input
                    type="text"
                    className="w-full h-12 px-4 py-2 text-white bg-SecondaryColor border-none rounded-[10px] mb-3 focus:outline-none"
                    placeholder="Введіть назву групи"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="max-h-60 overflow-y-auto">
                    {filteredGroups.length > 0 ? (
                        filteredGroups.map((group) => (
                            <div key={group.id} className="text-white py-2 px-4 rounded-md bg-SecondaryColor mb-2"
                                onClick={() => {
                                    selectGroup(group)
                                    setShowGroupList(false)
                                }}
                            >
                                {group.title}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">Групи не знайдено</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupList;
