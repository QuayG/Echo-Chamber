import {useContext, useState} from "react";
import jwt from "jsonwebtoken";
import {getToken} from "../service/api-service";
import AuthContext from "./AuthContext";

export default function AuthProvider({children}) {

    const [token, setToken] = useState();

    const claims = jwt.decode(token)

    const user = claims && {
        userName: claims.sub,
        firstName: claims.firstName,
        lastName: claims.lastName,
        avatarUrl: claims.avatarUrl,
        role: claims.role,
    }

    const login = credentials => getToken(credentials).then(setToken)

    return(
        <AuthContext.Provider value={{token, user, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)