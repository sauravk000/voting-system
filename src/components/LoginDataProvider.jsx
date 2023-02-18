import React, { useContext, createContext, useState, useEffect } from 'react';

const LoginDataContext = createContext();

const UpdateLoginDataContext = createContext();

export function getLoginData() {
  return useContext(LoginDataContext);
}

export function updateLoginData() {
  return useContext(UpdateLoginDataContext);
}

export default function LoginDataProvider({ children }) {
  const [loginData, setLoginData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  //Used temporarily until backend data

  async function getData() {
    try {
      console.log('InsideAuthorized');
      let authstr = localStorage.getItem('auth');
      let authOb = JSON.parse(authstr);
      setLoginData({ username: authOb.username });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, [isLoading]);
  return (
    <LoginDataContext.Provider value={loginData}>
      <UpdateLoginDataContext.Provider value={getData}>
        {children}
      </UpdateLoginDataContext.Provider>
    </LoginDataContext.Provider>
  );
}
