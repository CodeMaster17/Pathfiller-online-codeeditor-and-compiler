import { BACKEND_ROUTE_CODE } from "@/constants";

export const getJobStatusById = async (jobId: string) => {
  const response = await fetch(`${BACKEND_ROUTE_CODE}/code/status?id=${jobId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch job status");
  }
  return response;
};
