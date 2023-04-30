import { createContext, useContext, useState } from 'react';
import Alert from './Utils/Alert';
import React from 'react';
const AlertContext = createContext();

export function setAlert() {
  return useContext(AlertContext);
}

export default function AlertProvider({ children }) {
  let [alertInfo, setAlertInfo] = useState({
    title: '',
    description: '',
    type: 'info',
    enabled: false,
  });
  const setAlertFunc = async (ob) => {
    await setAlertInfo(ob);
  };
  return (
    <AlertContext.Provider value={setAlertFunc}>
      <Alert {...alertInfo} />
      {children}
    </AlertContext.Provider>
  );
}
