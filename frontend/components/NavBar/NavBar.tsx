"use client";

import { useState } from "react";
import NavItem from "./NavItem";
import Notifications from "./Notifications";
import SearchBar from "./SearchBar";
import CalendarWidget from "./CalendarWidget";
import UserMenu from "./UserMenu";
import { MovieDetails } from "@/api/omdbApi/omdbApi";
import { FiMenu, FiX } from "react-icons/fi";
import Messanger from "./Messanger";
import { useTheme } from "next-themes";
import Image from "next/image";

interface NavBarProps {
    movies: MovieDetails[];
}

const NavBar = ({ movies }: NavBarProps) => {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [isOpenMessanger, setIsOpenMessanger] = useState(false);
    const { theme } = useTheme();

    const toggleCalendar = () => {
        setIsCalendarVisible((prev) => !prev);
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleShowMessanger = () => {
        setIsOpenMessanger(!isOpenMessanger);
    };

    return (
        <nav className={`w-full py-4 px-6 ${theme === 'dark' ? 'bg-MainColor' : 'bg-[#EAEAEA]'} rounded-[10px] flex items-center justify-between relative`}>

            <Image src='/logo.png' alt="" width={70} height={50} />


            <div className="hidden md:flex flex-row md:gap-[15px] xl:gap-[25px] items-center">
                <NavItem href="/home" icon="iconHome"/>
                <NavItem icon="CalendarIcon" onClick={toggleCalendar} />
                <NavItem href="/group" icon="iconCommunity" />
                <SearchBar />
            </div>


            <button
                className="md:hidden text-AccnetColor focus:outline-none"
                onClick={toggleMenu}
            >
                {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
            </button>

            <div
                className={`absolute translate-y-[-20px] top-full left-0 w-full bg-MainColor flex flex-col items-center gap-4 p-4 transition-all duration-300 md:hidden ${
                    isMenuOpen ? "block" : "hidden"
                }`}
            >
                <div className="flex flex-row items-center gap-6">
                    <Notifications />
                    <NavItem href="/home" icon="iconHome" />
                    <NavItem icon="CalendarIcon" onClick={toggleCalendar} />
                    <NavItem href="/group" icon="iconCommunity" />
                    <UserMenu />
                </div>
                <div className="w-fit flex gap-[10px] flex-row">
                    <NavItem icon="iconMessage" />
                    <SearchBar/>
                </div>

            </div>

            <div className="hidden md:flex flex-row md:gap-[15px] xl:gap-[25px] items-center">
                <NavItem icon="iconMessage" onClick={handleShowMessanger} />
                <Notifications />
                <UserMenu />
            </div>

            {isOpenMessanger && (<Messanger handleShow={handleShowMessanger} />)}
            {isCalendarVisible && <CalendarWidget onClose={toggleCalendar} movies={movies} />}
        </nav>
    );
};

export default NavBar;
