import React from 'react'
import Button from './Button';
// fonts
import { Fugaz_One } from 'next/font/google';
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'], display: "swap" })

export default function Login() {
    return (
        <div className='flex flex-col flex-1 justify-center items-center gap-4'>
            <div className={`textGradient text-4xl sm:text-5xl md:text-6xl sm:leading-tight md:leading-tight ${fugaz.className}`}>
                Log In / Register
            </div>
            <p>Start Logging Your Mood!</p>
            <input
                className='text-majesticPurple w-full max-w-[300px] md:max-w-[500px] mx-auto px-4 py-2 sm:py-3 border border-solid border-[#e056fd] rounded-full bg-transparent placeholder-majesticPurple font-bold hover:placeholder-neonPink hover:border-neonPink focus:text-majesticPurple focus:bg-transparent focus:outline-none'
                placeholder='Email'
            />
            <input
                className='text-majesticPurple w-full max-w-[300px] md:max-w-[500px] mx-auto px-4 py-2 sm:py-3 border border-solid border-[#e056fd] rounded-full bg-transparent placeholder-majesticPurple font-bold hover:placeholder-neonPink hover:border-neonPink focus:text-majesticPurple focus:bg-transparent focus:outline-none'
                placeholder='Password'
            />
            <div className='max-w-[300px] md:max-w-[500px] w-full mx-auto'>
                <Button text='Submit' full />
            </div>
            <p>Don't have an account? <span className='text-majesticPurple font-bold'>Sign up!</span></p>
        </div>
    )
}
