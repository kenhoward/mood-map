import React from 'react'
// components
import Calendar from './Calendar';
import CallToAction from './CallToAction';
// fonts
import { Fugaz_One } from 'next/font/google';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] })

export default function Hero() {
    return (
        <div className='py-4 md:py-10 flex flex-col gap-8 sm:gap-10'>
            <h1 className={`text-5xl sm:text-6xl text-center ${fugaz.className}`}><span className='textGradient'>Mood Map</span> helps you see your <span className='textGradient'>daily</span> mood!</h1>
            <p className='text-lg sm:text-xl md:text-2xl text-center mx-auto max-w-[700px]'>Track your daily mood and gain insights into how you feel <span className='font-bold textGradient'>throughout the entire year.</span></p>
            <CallToAction />
            <Calendar demo />
        </div>
    )
}
