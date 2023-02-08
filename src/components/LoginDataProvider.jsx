import React,{ useContext, createContext, useState } from "react";

const LoginDataContext = createContext();

export function getLoginData() {
  return useContext(LoginDataContext);
}

export default function LoginDataProvider({children}) {
  const [loginData, setLoginData] = useState(null);
  //Used temporarily until backend data
  setTimeout(() => {
    setLoginData({
      name: "Abhishek",
    });
  }, 1000);
  return <LoginDataContext.Provider value={loginData}>{children}</LoginDataContext.Provider>;
}
