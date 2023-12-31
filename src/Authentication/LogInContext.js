import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

const LOCAL_STORAGE_ID = "id";
const LOCAL_STORAGE_TOKEN = "token";
const LOCAL_STORAGE_ROLE = "role";

export const LoginContextProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(isUserIdFound());

    function getUserId() {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID))
    }

    function getUserToken() {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN))
    }

    function getUserRole() {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_ROLE))
    }

    function setUserLocalStorageData(id, token, role){
        localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(id))
        localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(token))
        localStorage.setItem(LOCAL_STORAGE_ROLE, JSON.stringify(role))
        setIsUserLoggedIn(true);
    }

    function removeUserLocalStorageData() {
        localStorage.removeItem(LOCAL_STORAGE_ID);
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_ROLE);
        setIsUserLoggedIn(false);
    }

    function isTheUserAnOrganizer(){
        return (getUserRole() === "ROLE_ORGANIZER");
    }

    function isTheUserAnAdmin(){
        return (getUserRole() === "ROLE_ADMIN");
    }

    function isUserIdFound(){
        return (typeof getUserId() === "number")
    }

    return (
        <MyContext.Provider value={
            { isUserLoggedIn,
                getUserId, getUserToken, getUserRole,
                setUserLocalStorageData, removeUserLocalStorageData,
                isTheUserAnOrganizer, isTheUserAnAdmin, isUserIdFound
            }}>
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => useContext(MyContext);
