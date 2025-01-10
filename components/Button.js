import React from 'react';
// fonts
import { Fugaz_One } from 'next/font/google';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'], display: "swap" })

export default function Button(props) {
    const { text, darkStyle, full, clickHandler } = props;
    const hasDarkStylesOrNot = darkStyle ? 'text-white bg-majesticPurple border-majesticPurple hover:border-majesticPurple' : 'text-neonPink border-majesticPurple hover:text-majesticPurple'; 

    return (
        <button
            onClick={clickHandler}
            className={`rounded-full overflow-hidden duration-200 hover:opacity-80 border-2 border-solid ${hasDarkStylesOrNot} ${full ? 'grid place-items-center w-full' : ''}`}
        >
            <p className={`px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ${fugaz.className}`}>
                {text}
            </p>
        </button>
    );
}
