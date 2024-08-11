import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TimeDifference {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
}
export function getTimeDifference(
  startTime: string,
  endTime: string
): TimeDifference {
  // Parse the timestamps
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Calculate the difference in milliseconds
  const differenceInMs = end.getTime() - start.getTime();

  // Convert the difference to various units
  const milliseconds = differenceInMs;
  const seconds = Math.floor(differenceInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
  };
}

// Example usage:
const startTime = "2024-08-11T04:33:27.652Z";
const endTime = "2024-08-11T05:45:30.123Z";
const timeDiff = getTimeDifference(startTime, endTime);

console.log(timeDiff);
