import React from "react";


const HeadLine = ({ title }) => {
    
const today = new Date();
const formattedDate = today.toLocaleDateString();

    return (
        <div>
            <div className="flex items-center py-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30">
                    <path fill="#00AF5D" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                </svg>
                <h1 className=" text-white ml-[2vh] text-3xl font-semibold">
                    {title}
                </h1>
                <div className="hidden md:flex absolute inset-x-0 top-4 justify-center">
                    <h1 className="text-[#00AF5D] text-2xl">{formattedDate}</h1>
                </div>
            </div>
        </div>
    );

};

export default HeadLine;