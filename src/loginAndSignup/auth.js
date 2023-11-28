import {createContext} from "react";
import {useState} from "react";

const AuthContext = createContext(null);
export default AuthContext;
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const login = (user, token) => {
        setUser(user);
        setToken(token);
    }
    const logout = () => {
        setUser(null);
        setToken(null);
    }
    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}