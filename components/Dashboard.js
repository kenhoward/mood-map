import React from 'react'
// fonts
import { Fugaz_One } from 'next/font/google';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'], display: "swap" })

export default function Dashboard() {
    // temporary for UI sake
    const statuses = {
        num_days: 14,
        time_remaining: '13:14:26',
        date: (new Date()).toDateString()
    }

    const moods = {
        '&*@#$': '🤬',
        'Sad': '😢',
        'Okay...': '😐',
        'Good': '🙂',
        'Excellent!': '😁',
    }

    return (
        <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
            <div className='grid grid-cols-1 text-center sm:grid-cols-3 bg-lightPurple text-majesticPurple rounded-lg'>
                {Object.keys(statuses).map((status, index) => {
                    return (
                        <div key={`status - ${index}`} className='p-4 flex flex-col gap-1 sm:gap-2'>
                            <p className='font-medium uppercase text-xs sm:text-sm truncate'>{status.replaceAll('_', ' ')}</p>
                            <p className={`text-base sm:text-lg truncate ${fugaz.className}`}>{statuses[status]}</p>
                        </div>
                    )
                })}
            </div>
            <p className={`text-5xl sm:text-6xl md:text-7xl ${fugaz.className} text-lightPurple text-center`}>
                How do you <span className='textGradient'>feel</span> today?
            </p>
            <div className='grid grid-cols-2 sm:grid-cols-5 gap-4'>
                {Object.keys(moods).map((mood, index) => {
                    return (
                        <button className={`p-4 rounded-lg purpleShadow duration-200 bg-lightPurple hover:bg-darkPurple ${index === 4 ? 'col-span-2 sm:col-span-1' : ''}`}>
                            <p className={`py-2 text-majesticPurple font-bold ${fugaz.className}`}>{mood}</p>
                            <p className={`text-4xl sm:text-5xl md:text-6xl`}>{moods[mood]}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
