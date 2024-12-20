import React from 'react';
// utils
import { gradients, baseRating, demoData, months, dayList } from '@/utils/calendar';

const now = new Date();

export default function Calendar(props) {
    const { demo } = props;

    // temporary data
    const year = 2024;
    const month = 'July';

    const monthNow = new Date(year, Object.keys(months).indexOf(month), 1);
    const firstDayOfMonth = monthNow.getDay();
    const daysInMonth = new Date(year, Object.keys(months).indexOf(month) + 1, 0).getDate();

    const daysToDisplay = firstDayOfMonth + daysInMonth;
    const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

    return (
        <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
            {[...Array(numRows)].map((_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-7 gap-1">
                    {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                        const dayIndex = rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
                        const dayDisplay =
                            dayIndex > daysInMonth || (rowIndex === 0 && dayOfWeekIndex < firstDayOfMonth)
                                ? false
                                : true;
                        const isToday = dayIndex === now.getDate();

                        if (!dayDisplay) {
                            return <div className="transparent" key={dayOfWeekIndex} />;
                        }

                        const color = demo
                            ? gradients.pink[baseRating[dayIndex]]
                            : dayIndex in demoData
                                ? gradients.pink[demoData[dayIndex]]
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
    );
}
