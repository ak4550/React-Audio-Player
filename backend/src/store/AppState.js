import React, { useState } from 'react';

// const UserContext = 

const AppState = React.createContext({
    token: null,
    isLoading: false,
    setIsLoading: (val) => { },
    setToken: (token) => { }
})

export const AppStateProvider = ({ children }) => {

    let initialToken = localStorage.getItem("token");
    try {
        initialToken = JSON.parse(localStorage.getItem("token"));
    } catch (error) {
        // console.error(error);
        initialToken = null;
    }
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(initialToken);

    const handleLoading = (val) => {
        setIsLoading(val);
    }

    const handleToken = (val) => {
        setToken(val);
    }

    return (
        <AppState.Provider
            value={{
                token: token,
                isLoading: isLoading,
                setIsLoading: handleLoading,
                setToken: handleToken
            }}
        >
            {children}
        </AppState.Provider>
    );
}

export default AppState;
