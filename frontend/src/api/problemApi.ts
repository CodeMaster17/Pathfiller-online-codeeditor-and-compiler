import { PROBLEM_ROUTE } from "@/constants";

export const getAllProblems = async () => {
  const response = await fetch(`${PROBLEM_ROUTE}/all`);

  if (!response.ok) {
    throw new Error("Failed to fetch problems");
  }

  const data = await response.json();
  console.log(typeof data);
  return data;
};
