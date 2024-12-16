import React from 'react';
// TODO figure out why Google font is not importing correctly

export default function Button(props) {
    const { text, darkStyle } = props;

    return (
        <button
            className={`rounded-full overflow-hidden duration-200 hover:opacity-80 border-2 border-solid ${darkStyle
                    ? 'text-white bg-[#e056fd] border-[#e056fd] hover:bg-[#e056fd]'
                    : 'text-[#fd79a8] border-[#e056fd] hover:text-[#e056fd]'
                }`}
        >
            <p style={{ fontFamily: "'Fugaz One', cursive" }} className='px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3'>
                {text}
            </p>
        </button>
    );
}
