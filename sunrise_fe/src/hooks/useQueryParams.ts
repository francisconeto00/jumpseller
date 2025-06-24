import { useLocation, useNavigate } from "react-router-dom";

/**
 * A custom hook to get and set query parameters in the URL.
 */
export function useQueryParams() {
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Returns the value of a specific query parameter from the URL.
   * @param key The query parameter key to retrieve.
   * @returns The value of the parameter or null.
   */
  const getQueryParam = (key: string): string | null => {
    const params = new URLSearchParams(location.search);
    return params.get(key);
  };

  /**
   * Sets one or more query parameters in the URL.
   * @param keyOrObject Either a key-value pair or an object with multiple parameters.
   * @param value Optional value if a single key is passed.
   */
  const setQueryParam = (
    keyOrObject: string | Record<string, string | number | null | undefined>,
    value?: string | number | null | undefined
  ): void => {
    const params = new URLSearchParams(location.search);

    if (typeof keyOrObject === "string") {
      // Single key-value update
      if (value === undefined || value === null || value === "") {
        params.delete(keyOrObject);
      } else {
        params.set(keyOrObject, value.toString());
      }
    } else {
      // Multiple key-value updates
      Object.entries(keyOrObject).forEach(([key, val]) => {
        if (val === undefined || val === null || val === "") {
          params.delete(key);
        } else {
          params.set(key, val.toString());
        }
      });
    }

    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true }
    );
  };

  return { getQueryParam, setQueryParam };
}
