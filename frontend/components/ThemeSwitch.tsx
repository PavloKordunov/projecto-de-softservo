'use client'

import { FiSun } from "react-icons/fi"
import { FaRegMoon } from "react-icons/fa";
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() =>  setMounted(true), [])

    if (!mounted) return (
        <Image
            src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
            width={32}
            height={32}
            sizes="36x36"
            alt="Loading Light/Dark Toggle"
            priority={false}
            title="Loading Light/Dark Toggle"
        />
    )

    if (resolvedTheme === 'dark') {
        return <>
            <div className="flex flex-row items-center gap-7 font-medium">
                <FiSun size={28} onClick={() => setTheme('light')} className="cursor-pointer translate-x-[10px]"/>
                <p>Theme dark</p>
            </div>
        </>

    }

    if (resolvedTheme === 'light') {
        return <>
            <div className="flex flex-row items-center gap-7 font-medium">
                <FaRegMoon size={28} onClick={() => setTheme('dark')} className="text-white cursor-pointer translate-x-[10px]"/>
                <p className="text-white">Theme light</p>
            </div>
        </>
    }

}