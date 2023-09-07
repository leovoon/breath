import { useState, useEffect, useRef } from "react";

export const Countdown = ({ number }: { number: number }) => {
  const { count, isRunning, handleStart, handlePause } = useCountdown(number);

  function handleStartCount() {
    if (isRunning) {
      handlePause();
    } else {
      handleStart();
    }
  }

  return (
    <span role="button" onClick={handleStartCount}>
      {count}
    </span>
  );
};

function useCountdown(initialState: number = 0) {
  const [count, setCount] = useState(initialState);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<null | number>(null);
  useEffect(() => {
    const timer = () => {
      setCount((prevCount) => {
        if (prevCount === 0) {
          setIsRunning(false);
          return initialState;
        } else {
          return prevCount - 1;
        }
      });
      if (isRunning) {
        intervalRef.current = setTimeout(timer, 1000);
      }
    };
    if (isRunning) {
      intervalRef.current = setTimeout(timer, 1000);
    } else {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  function handleStart() {
    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  return { count, isRunning, handleStart, handlePause };
}
