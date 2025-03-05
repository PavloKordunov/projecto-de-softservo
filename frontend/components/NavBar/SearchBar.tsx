import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);
    const controls = useAnimation();

    const handleFocus = () => {
        setIsFocused(true);
        controls.start({ x: -10, opacity: 1, scale: 1.2 });
    };

    const handleBlur = () => {
        setIsFocused(false);
        controls.start({ x: 0, opacity: 0.7, scale: 1 });
    };

    return (
        <div className="w-[340px] md:w-[300px] lg:w-[480px] 2xl:w-[580px]">
            <motion.input
                type="text"
                className="w-full h-14 px-4 cursor-pointer py-2 text-white bg-SecondaryColor border-b-[3px] border-SecondaryColor rounded-[10px] focus:outline-none transition-all duration-300"
                placeholder="Введіть для пошуку..."
                onFocus={handleFocus}
                onBlur={handleBlur}
                animate={{
                    width: isFocused ? "100%" : "80%",
                    backgroundColor: isFocused ? "#2C353D" : "#1E1F20",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {/*<motion.svg*/}
            {/*    className={`w-6 h-6 absolute cursor-text top-[30px] right-[455px] z-10 transform -translate-y-1/2 text-white ${isFocused ? 'opacity-100' : 'hidden'}`}*/}
            {/*    initial={{ x: 0, opacity: 0.7, scale: 1 }}*/}
            {/*    animate={controls}*/}
            {/*    transition={{ type: "spring", stiffness: 150 }}*/}
            {/*>*/}
            {/*    <use href="/sprite.svg#iconSearch" />*/}
            {/*</motion.svg>*/}
        </div>
    );
};

export default SearchBar;
