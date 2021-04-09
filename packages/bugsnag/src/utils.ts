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
 * @param {Object} event
 */
export const getOriginalExceptionProperties = (event) => {
  if (event && event.originalError && isError(event.originalError)) {
    const originalError = event.originalError || {};
    const { name, message } = originalError;
    return { name, message };
  }

  return {};
};