import { PLAYGROUND_ROUTE } from "@/constants";
import { payloadTypePlayground } from "@/types/types";

export const getJobStatusByIdForPlayground = async (jobId: string) => {
  const response = await fetch(`${PLAYGROUND_ROUTE}/status?id=${jobId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch job status");
  }
  return response;
};

export const getJobIdByPayloadForPlayground = async (
  payload: payloadTypePlayground
) => {
  const response = await fetch(`${PLAYGROUND_ROUTE}/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch job id");
  }
  const data = await response.json();
  return data;
};
