const SearchBar = () => {
    return (
        <div className="relative">
            <input
                type="text"
                className="md:w-[300px] lg:w-[480px] 2xl:w-[580px] h-14 px-4 py-2 text-white bg-SecondaryColor border-none rounded-[10px] focus:outline-none"
                placeholder="Введіть для пошуку..."
            />
            <svg className="w-6 h-6 absolute top-1/2 right-3 transform -translate-y-1/2">
                <use href={`/sprite.svg#iconSearch`} />
            </svg>
        </div>
    );
};

export default SearchBar;
