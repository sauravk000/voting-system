import axios from 'axios';
import React, { useContext, createContext, useState, useEffect } from 'react';

const LoginDataContext = createContext();

export function getLoginData() {
    return useContext(LoginDataContext);
}

async function getIfAuthorized() {
    try {
        let authstr = localStorage.getItem('auth');
        let authOb = JSON.parse(authstr);
        return { username: authOb.username };
    } catch (err) {
        console.log(err);
    }
}

export default function LoginDataProvider({ children }) {
    const [loginData, setLoginData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    //Used temporarily until backend data

    async function getData() {
        setLoginData(await getIfAuthorized());
        setLoading(false);
    }
    useEffect(() => {
        getData();
    }, [isLoading]);
    return (
        <LoginDataContext.Provider value={loginData}>
            {children}
        </LoginDataContext.Provider>
    );
}
