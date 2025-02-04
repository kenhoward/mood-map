'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
// components
import Calendar from './Calendar';
// fonts
import { Fugaz_One } from 'next/font/google';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'], display: "swap" })

export default function Dashboard() {
    const { currentUser, userDataObj, setUserDataObj } = useAuth();
    const [data, setData] = useState({});
    const now = new Date();

    const calculateTimeRemaining = () => {
        const hoursLeft = 23 - now.getHours();
        const minutesLeft = 60 - now.getMinutes();
        return `${hoursLeft}h ${minutesLeft}m`;
    };

    const computedStatuses = useMemo(() => {
        let totalDays = 0;
        let totalMoods = 0;

        Object.values(data).forEach(year =>
            Object.values(year).forEach(month =>
                Object.values(month).forEach(daysMood => {
                    totalDays++;
                    totalMoods += daysMood;
                })
            )
        );

        const averageMood = totalDays ? totalMoods / totalDays : 0;

        return {
            days_logged: totalDays,
            average_mood: Number(averageMood.toFixed(2)),
            time_remaining: calculateTimeRemaining(),
        };
    }, [data]);

    const renderStatuses = () =>
        Object.entries(computedStatuses).map(([key, value], index) => (
            <div key={`status-${index}`} className="p-4 flex flex-col gap-1 sm:gap-2">
                <p className="font-medium capitalize text-xs sm:text-sm truncate">
                    {key.replaceAll('_', ' ')}
                </p>
                <p className={`text-base sm:text-lg truncate ${fugaz.className}`}>
                    {value}
                </p>
            </div>
        ));

    const handleMood = async (mood) => {
        const day = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();
        try {
            const newData = { ...userDataObj }
            newData[year] ??= {};
            newData[year][month] ??= {};
            newData[year][month][day] ??= {};

            newData[year][month][day] = mood;

            // updates current state
            setData(newData);
            // updates global state
            setUserDataObj(newData);
            //updates firebase
            const docRef = doc(db, 'users', currentUser.uid);
            const res = await setDoc(docRef, {
                [year]: {
                    [month]: {
                        [day]: mood
                    }
                }
                // This third argument will merge what's currently in firebase
            }, { merge: true});
        } catch (err) {
            console.error(`Failed to set mood: ${err}`);
        }
    }

    const handleMoodClick = (index) => () => handleMood(index + 1);

    const moods = {
        '&*@#$': '🫠',
        'Sad': '😢',
        'Okay...': '😐',
        'Good': '🙂',
        'Excellent!': '😁',
    }

    useEffect(() => {
        if (!currentUser || !userDataObj) return;

        // checks for user data and then will update state accordingly
        // reads the data from firebase
        setData(userDataObj);
    }, [currentUser, userDataObj])

    const renderMoods = () =>
        Object.keys(moods).map((mood, index) => (
            <button
                onClick={handleMoodClick(index)}
                key={`mood-${index}`}
                className={`p-4 rounded-lg purpleShadow duration-200 bg-lightPurple hover:bg-darkPurple ${index === 4 ? 'col-span-2 sm:col-span-1' : ''
                    }`}
            >
                <p className={`py-2 text-majesticPurple font-bold ${fugaz.className}`}>{mood}</p>
                <p className={`text-4xl sm:text-5xl md:text-6xl`}>{moods[mood]}</p>
            </button>
        ));

    return (
        <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
            <div className='grid grid-cols-1 text-center sm:grid-cols-3 bg-lightPurple text-majesticPurple rounded-lg'>
                {renderStatuses()}
            </div>
            <p className={`text-5xl sm:text-6xl md:text-7xl ${fugaz.className} text-lightPurple text-center`}>
                How do you <span className='textGradient'>feel</span> today?
            </p>
            <div className='grid grid-cols-2 sm:grid-cols-5 gap-4'>
                {renderMoods()}
            </div>
            <Calendar data={data} handleMood={handleMood} />
        </div>
    )
}
