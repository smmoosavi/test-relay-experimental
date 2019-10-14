import { createContext } from 'react';

interface ErrorContextType {
  reset: () => void;
  error: Error | null;
}
export const ErrorContext = createContext<ErrorContextType>({
  error: null,
  reset: () => {},
});
