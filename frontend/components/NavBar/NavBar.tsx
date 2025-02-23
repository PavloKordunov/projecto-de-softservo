"use client";

import { useState } from "react";
import NavItem from "./NavItem";
import Notifications from "./Notifications";
import SearchBar from "./SearchBar";
import CalendarWidget from "./CalendarWidget";
import UserMenu from "./UserMenu";
import { MovieDetails } from "@/api/omdbApi/omdbApi";

interface NavBarProps {
    movies: MovieDetails[];
}

const NavBar = ({ movies }: NavBarProps) => {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const toggleCalendar = () => {
        setIsCalendarVisible((prev) => !prev);
    };

    return (
        <div className="w-full py-4 px-10 bg-MainColor flex items-center justify-between">
            <p className="text-AccnetColor font-bold text-[30px]">Logo</p>

            <div className="flex gap-6 items-center relative">
                <NavItem href="/home" icon="iconHome" />
                <NavItem icon="CalendarIcon" onClick={toggleCalendar} />
                <NavItem href="/group" icon="iconCommunity" />
                <SearchBar />
            </div>

            <div className="flex relative gap-6 items-center">
                <NavItem icon="iconMessage" />
                <Notifications />
                <UserMenu />
            </div>

            {isCalendarVisible && <CalendarWidget onClose={toggleCalendar} movies={movies} />}
        </div>
    );
};

export default NavBar;
