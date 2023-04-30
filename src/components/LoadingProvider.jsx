import { createContext, useContext, useState } from 'react';
import React from 'react';
import LoadingScreen from './Utils/LoadingScreen';

const LoadingContext = createContext();

export function getLoadFunc() {
  return useContext(LoadingContext);
}

export default function LoadingProvider({ children }) {
  let [isLoading, setIsLoading] = useState(false);
  const setLoading = async (ob) => {
    await setIsLoading(ob);
  };
  return (
    <LoadingContext.Provider value={setLoading}>
      <LoadingScreen isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  );
}
