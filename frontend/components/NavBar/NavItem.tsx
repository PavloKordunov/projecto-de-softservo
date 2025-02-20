import Link from "next/link";

interface NavItemProps {
    href?: string;
    icon: string;
    onClick?: () => void;
}

const NavItem = ({ href, icon, onClick }: NavItemProps) => {
    const content = (
        <div
            className="bg-SecondaryColor w-14 h-14 rounded-[9px] flex items-center justify-center cursor-pointer"
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
