'use client'

import { useEffect, useState } from "react";

interface Group {
    id: string;
    title: string;
    description: string;
    isPublic: boolean;
    postCount: number;
    image: string
}

const useLastGroups = (newGroup?: Group, maxGroups: number = 3) => {
    const [lastGroups, setLastGroups] = useState<Group[]>([]); 

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const storedGroups = localStorage.getItem("lastGroups");
                setLastGroups(storedGroups ? JSON.parse(storedGroups) : []);
            } catch (error) {
                console.error("error in localStorage", error);
            }
        }
    }, []);

    useEffect(() => {
        if (!newGroup || !newGroup.id) return;
    
        setLastGroups((prevGroups) => {
            let updatedGroups = prevGroups.filter((group) => group.id !== newGroup.id);
            updatedGroups.unshift(newGroup);
    
            if (updatedGroups.length > maxGroups) {
                updatedGroups.pop();
            }
    
            localStorage.setItem("lastGroups", JSON.stringify(updatedGroups));
            return updatedGroups;
        });
    }, [newGroup, maxGroups]); 

    return lastGroups;
};

export default useLastGroups;
