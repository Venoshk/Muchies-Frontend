import React from 'react';


const LoadingSkeleton = () => {
    return (
        <div className="relative animate-pulse gap-2 p-4 mb-10 w-full flex items-center ">
            <div className="w-28 h-28 rounded bg-slate-400"></div>
            <div className="flex-1">
                <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
            </div>
            <div className="absolute bottom-5 right-5 h-4 w-4 rounded-md bg-slate-400 "></div>
        </div>
    );
};

export default LoadingSkeleton;
