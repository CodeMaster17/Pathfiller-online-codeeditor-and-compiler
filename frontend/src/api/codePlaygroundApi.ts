import { PLAYGROUND_ROUTE } from "@/constants";

export const getJobStatusByIdForPlayground = async (jobId: string) => {
  const response = await fetch(`${PLAYGROUND_ROUTE}/status?id=${jobId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch job status");
  }
  return response;
};

interface payloadInterface {
  language: string;
  code: string;
  inputs: string;
}

export const getJobIdByPayload = async (payload: payloadInterface) => {
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
  return response.json();
};
