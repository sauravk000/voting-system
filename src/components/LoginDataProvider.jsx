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
  //Used temporarily until backend data

  async function getData() {
    try {
      let authstr = localStorage.getItem('auth');
      let authOb = JSON.parse(authstr);
      if (loginData == null || authOb.username != loginData.username)
        setLoginData({
          username: authOb.username,
          token: authOb.token,
          isCandidate: authOb.isCandidate,
        });
    } catch (err) {
      console.log(err);
    }
  }
  getData();
  return (
    <LoginDataContext.Provider value={loginData}>
      <UpdateLoginDataContext.Provider value={getData}>
        {children}
      </UpdateLoginDataContext.Provider>
    </LoginDataContext.Provider>
  );
}
