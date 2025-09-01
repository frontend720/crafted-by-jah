import {createContext, useEffect, useState} from "react"
import axios from "axios"

const AuthContext = createContext()

function AuthContextProvider({children}){
    const [username, setUsername] = useState("")
     const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")

        const [user, setUser] = useState(() => {
            try {
                const savedId = localStorage.getItem("userId")
                return savedId ? JSON.parse(savedId) : null
            } catch (error) {
                console.log("Unable to retrieve saved user ID", error)
                return null
            }
        })
    
        function onEmailChange(e){
            setEmail(e.target.value)
        }
    
        function onPasswordChange(e){
            setPassword(e.target.value)
        }

        function onUsernameChange(e){
            e.preventDefault()
            setUsername(e.target.value)
        }

    function signUp(e){
        e.preventDefault()
        axios({
            method: "POST",
            url: import.meta.env.VITE_ENDPOINT + "/auth",
            data: {
                name: username,
                email: email,
                password: password
            } 
        }).then((data) => {
            setUser(data.data._id)
        }).catch((error) => {
            console.log(error)
        })
    }

    function login(e){
        e.preventDefault()
        axios({
            method: "POST",
            url: import.meta.env.VITE_ENDPOINT + "/auth/login",
            data: {
                email: email,
                password: password
            }
        }).then((user) => {
            setUser(user.data.login._id)
        }).catch((error) => {
            console.log(error)
        })
    }

    function logout(){
        localStorage.removeItem("userId")
        setUser(null)
    }

    console.log(user)

    useEffect(() => {
        localStorage.setItem("userId", JSON.stringify(user))
        console.log("Successfully added user ID to local storage")
    }, [user])

    console.log(user)
    return(
        <AuthContext.Provider value={{login, signUp, logout, email, password, username, user, onEmailChange, onPasswordChange, onUsernameChange}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider, AuthContext}