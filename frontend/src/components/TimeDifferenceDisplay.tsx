import React from 'react';

interface TimeDifference {
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
}

const getTimeDifference = (startTime: string, endTime: string): TimeDifference => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const differenceInMs = end.getTime() - start.getTime();

    return {
        milliseconds: differenceInMs,
        seconds: Math.floor(differenceInMs / 1000),
        minutes: Math.floor(differenceInMs / 1000 / 60),
        hours: Math.floor(differenceInMs / 1000 / 60 / 60),
        days: Math.floor(differenceInMs / 1000 / 60 / 60 / 24)
    };
};
interface TimeDifferenceDisplayProps {
    startTime: string;
    endTime: string;
}

const formatTimeDifference = (timeDiff: TimeDifference): string => {
    const { seconds, milliseconds } = timeDiff;
    return `${seconds} seconds, ${milliseconds} milliseconds`;
};

export const TimeDifferenceDisplay: React.FC<TimeDifferenceDisplayProps> = ({ startTime, endTime }) => {
    const timeDiff = getTimeDifference(startTime, endTime);

    return (
        <div className='text-white'>
            Completed In: <span className='px-4 py-2 bg-brand-orange-s rounded-md'>
                {formatTimeDifference(timeDiff)}
            </span>
        </div>
    );
};
