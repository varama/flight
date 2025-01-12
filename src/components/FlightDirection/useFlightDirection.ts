import { useAsync } from "hooks/useAsync";
import React from "react";

interface FlightDirectionProps {
  fetchOptions: (query: string) => Promise<any>;
  inputValue: string;
  debounceDelay: number;
}

export const useFlightDirection = ({
  fetchOptions,
  inputValue,
  debounceDelay = 200,
}: FlightDirectionProps) => {
  const { data: options, isLoading, isError, error, run, reset } = useAsync();
  const [result, setResult] = React.useState([]);
  const timeoutRef = React.useRef<
    number | ReturnType<typeof setTimeout> | null
  >(null);

  React.useEffect(() => {
    setResult(options?.data || []);
  }, [options]);

  React.useEffect(() => {
    if (inputValue.length > 2) {
      timeoutRef.current = setTimeout(
        () => run(fetchOptions(inputValue)),
        debounceDelay
      );
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      reset();
    };
  }, [debounceDelay, fetchOptions, inputValue, reset, run]);

  return {
    result,
    isError,
    isLoading,
    error,
  };
};
