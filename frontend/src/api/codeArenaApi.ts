// apis for code arena

import { BACKEND_ROUTE_CODE } from "@/constants";
import { payloadTypeArena } from "@/types/types";

// getting job id, by passign payload to backend
export const getJobIdByPayloadForArena = async (payload: payloadTypeArena) => {
  const response = await fetch(`${BACKEND_ROUTE_CODE}/code/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch job id");
  }
  return response.json();
};

// getting job status by passing id
export const getJobStatusById = async (jobId: string) => {
  const response = await fetch(`${BACKEND_ROUTE_CODE}/code/status?id=${jobId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch job status");
  }
  return response;
};
