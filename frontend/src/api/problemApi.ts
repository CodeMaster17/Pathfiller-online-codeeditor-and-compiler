// apis for fetching problems for code arena

const fetchWithErrorHandling = async (url: string, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({}));
      throw new Error(
        errorDetails.message ||
          `Error ${response.status}: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    // @ts-expect-error : 'type of error message'
    console.error(`API Error: ${error.message}`);
    throw error;
  }
};

// api to get all problems
export const getAllProblems = async () => {
  const url = `${import.meta.env.VITE_PROBLEM_API_URL}/all`;
  return await fetchWithErrorHandling(url);
};

// api to get problem by id
export const getProblemById = async (id: string) => {
  const url = `${import.meta.env.VITE_PROBLEM_API_URL}/get/${id}`;
  return await fetchWithErrorHandling(url);
};
