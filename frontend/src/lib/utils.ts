import { IProblem } from "@/types/types";
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

// get total pages for problems page
export const getTotalPages = (problemLength: number, itemPerPage: number) => {
  return Math.ceil(problemLength / itemPerPage);
};

// filter problems based on search query
export const getProblemsBySearchQuery = (
  problems: IProblem[],
  searchQuery: string
) => {
  return problems.filter((problem) =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

// get list of current items in problem list
export const getCurrentProblems = (
  filteredProblems: IProblem[],
  currentPage: number,
  itemsPerPage: number
) => {
  return filteredProblems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
};
