import React from 'react'
// fonts
import { Fugaz_One } from 'next/font/google';
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'], display: "swap" })

export default function Login() {
    return (
        <div className='flex flex-col flex-1 justify-center items-center gap-4'>
            <h3 className={`textGradient ${fugaz.className}`}>Log In / Register</h3>
        </div>
    )
}
