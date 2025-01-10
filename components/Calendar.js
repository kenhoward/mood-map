'use client'
import React, { useState } from 'react';
// fonts
import { Fugaz_One } from 'next/font/google';
// utils
import { gradients, baseRating, demoData, months, monthsArr, dayList } from '@/utils/calendar';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] })

export default function Calendar(props) {
    const { demo, data, handleMood } = props;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[currentMonth]);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const numericMonth = Object.keys(months).indexOf(selectedMonth);
    const currentMonthsData = data?.[selectedYear]?.[numericMonth] || {};

    const handleIncrementMonth = (val) => {
        if (numericMonth + val < 0) {
            setSelectedYear(curr => curr - 1);
            setSelectedMonth(monthsArr[monthsArr.length - 1]);
        } else if (numericMonth + val > 11) {
            setSelectedYear(curr => curr + 1);
            setSelectedMonth(monthsArr[0]);
        } else {
            setSelectedMonth(monthsArr[numericMonth + val])
        }
    }

    const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1);
    const firstDayOfMonth = monthNow.getDay();
    const daysInMonth = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth) + 1, 0).getDate();

    const daysToDisplay = firstDayOfMonth + daysInMonth;
    const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

    return (
        <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-3 gap-4 text-neonPink'>
                <button onClick={() => handleIncrementMonth(-1)} className='mr-auto text-lg sm:text-xl duration-200 hover:text-majesticPurple'><i className='fa-solid fa-circle-chevron-left'></i></button>
                <p className={`capitalize text-center text-gradient ${fugaz.className}`}>
                    {selectedMonth}, {selectedYear}
                </p>
                <button onClick={() => handleIncrementMonth(+1)} className='ml-auto text-lg sm:text-xl duration-200 hover:text-majesticPurple'><i className='fa-solid fa-circle-chevron-right'></i></button>
            </div>
            <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
                {[...Array(numRows)].map((_, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-7 gap-1">
                        {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                            const dayIndex = rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
                            const dayDisplay =
                                dayIndex > daysInMonth || (rowIndex === 0 && dayOfWeekIndex < firstDayOfMonth)
                                    ? false
                                    : true;
                            const isToday =
                                selectedYear === currentYear &&
                                numericMonth === currentMonth &&
                                dayIndex === now.getDate();

                            if (!dayDisplay) {
                                return <div className="transparent" key={dayOfWeekIndex} />;
                            }

                            const color = demo
                                ? gradients.pink[baseRating[dayIndex]]
                                : dayIndex in currentMonthsData
                                    ? gradients.pink[currentMonthsData[dayIndex]]
                                    : 'transparent';

                            return (
                                <div
                                    style={{ background: color }}
                                    className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${isToday
                                        ? 'border-red-600 font-extrabold'
                                        : 'border-lightPurple font-semibold'
                                        } ${color === 'transparent'
                                            ? 'text-lightPurple font-semibold'
                                            : 'text-white font-semibold'
                                        }`}
                                    key={dayOfWeekIndex}
                                >
                                    <p>{dayIndex}</p>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
