// apis for fetching problems for code arena

import { PROBLEM_ROUTE } from "@/constants";

// api to get all the problems
export const getAllProblems = async () => {
  const response = await fetch(`${PROBLEM_ROUTE}/all`);

  if (!response.ok) {
    throw new Error("Failed to fetch problems");
  }

  const data = await response.json();
  return data;
};

// api to get the single problem by id
export const getProblemById = async (id: string) => {
  const response = await fetch(`${PROBLEM_ROUTE}/get/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch problem");
  }

  const result = await response.json();
  return result;
};
