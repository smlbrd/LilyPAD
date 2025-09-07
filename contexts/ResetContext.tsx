import { createContext, useContext, useState, ReactNode } from 'react';

type ResetContextType = {
  reset: () => void;
  resetCount: number;
};

export const ResetContext = createContext<ResetContextType>({
  reset: () => {},
  resetCount: 0,
});

export const useReset = () => useContext(ResetContext);

export const ResetProvider = ({ children }: { children: ReactNode }) => {
  const [resetCount, setResetCount] = useState(0);

  const reset = () => setResetCount((c) => c + 1);

  return <ResetContext.Provider value={{ reset, resetCount }}>{children}</ResetContext.Provider>;
};
