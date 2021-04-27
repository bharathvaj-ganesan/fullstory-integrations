/**
 * Checks if the exception has message
 * @param exception 
 * @returns 
 */
const isError = (exception: string | Error): exception is Error => {
  return (exception as Error).message !== undefined;
};

/**
 * Get the message and name properties from the original exception
 * @param {Object} error
 */
export const getOriginalExceptionProperties = (error: any) => {
  if (error && error.message && isError(error)) {
    const { name, message } = error;
    return { name, message };
  }

  return {};
};