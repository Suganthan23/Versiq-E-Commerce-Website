import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const HomePageSkeleton = () => {
    return (
        <div className="w-full min-h-screen flex flex-col pt-16 mb-40">
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <Skeleton className="h-20 w-3/4 md:w-1/2 mb-6" />
                <Skeleton className="h-5 w-full max-w-xl mb-4" />
                <Skeleton className="h-5 w-2/3 max-w-lg" />
            </div>
            <div className="w-full h-[50vh] flex items-center justify-center">
                <Skeleton className="w-[clamp(200px,30%,350px)] h-[90%] rounded-xl" />
            </div>
        </div>
    );
};

export default HomePageSkeleton;