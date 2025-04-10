import Link from "next/link";
import { useTheme } from "next-themes";

interface NavItemProps {
    href?: string;
    icon: string;
    onClick?: () => void;
}

const NavItem = ({ href, icon, onClick }: NavItemProps) => {
    const { theme } = useTheme();
    const content = (
        <div
            className={`${theme === 'dark' ? 'bg-SecondaryColor' : 'bg-[#B5B5B5]'} hover:bg-AccnetColor w-14 h-14 rounded-[9px] flex items-center justify-center cursor-pointer`}
            onClick={onClick}
        >
            <svg className="w-6 h-6">
                <use href={`/sprite.svg#${icon}`} />
            </svg>
        </div>
    );

    return href ? <Link href={href}>{content}</Link> : content;
};

export default NavItem;
