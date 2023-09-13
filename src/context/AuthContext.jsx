import { createContext, useEffect, useReducer } from "react"
import { LOGIN_PROCESS, LOGOUT_PROCESS } from "../types/types"

const INITIAL_STATE = {
    loading: false,
    error: null,
    user: localStorage.getItem("labUser") == 'undefined' ? null : JSON.parse(localStorage.getItem("labUser")),
}

export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_PROCESS.START:
            return {
                loading: true,
                error: null,
                user: null,
            }
        case LOGIN_PROCESS.SUCCESS:
            return {
                loading: false,
                error: null,
                user: action.payload,
            }
        case LOGIN_PROCESS.FAILED:
            return {
                loading: false,
                error: action.payload,
                user: null,
            }
        case LOGOUT_PROCESS.SUCCESS:
            
            return {
                loading: false,
                error: null,
                user: null,
            }
        default:
            return INITIAL_STATE
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(()=> {
        localStorage.setItem("labUser", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider
        value={{
            user:state.user,
            loading:state.loading,
            error:state.error,
            dispatch
        }}
        >
            {children}
        </AuthContext.Provider>
    )
     
}

