import React from "react";

const useClickDetection = (
  inputRef: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        callback();
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, callback]);
};

export default useClickDetection;
