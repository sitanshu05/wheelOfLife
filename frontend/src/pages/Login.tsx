import { useNavigate } from "react-router"
import InputWithLabel from "../components/InputWithLabel"
import Nav from "../layouts/Header"
import { useState } from "react";
import axios from "axios";
import config from "../config"
const Login : React.FunctionComponent = () =>{

    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        handle : "",
        password : ""
    })

    const handleChange = (event : any) => {
        const {id,value} = event.target;

        setLoginForm(prevState => {
            return {
                ...prevState,
                [id] : value
            }
        })
    }

    const submitLogin = (event : any) => {
        event.preventDefault()
        axios.post(`${config.SERVER_API_URL}/auth/login`,{
            handle : loginForm.handle,
            password : loginForm.password
        }).then((res)=>{
            localStorage.setItem("Authorization", `Bearer ${res.data.token}`)
            navigate("/allWheels")

        }).catch((err)=>{
            alert(err.response.data.message)
        })

    }

    return (
        <>
        <Nav/>
        <div className="flex justify-center items-start mt-16 w-full ">
            <div className="bg-darker_almond w-[90%] flex flex-col justify-center items-center p-5 rounded-lg py-20">
                <h3 className="text-left w-full text-3xl text-rasin_black">Log In to your account</h3>
                <form className="w-full">
                    <div className="mt-10 w-full">
                        <InputWithLabel type="text" id="handle" label="email or username" placeholder="" value={loginForm.handle} changeHandler={handleChange}/>
                    </div>
                    <div className="mt-5 w-full">
                        <InputWithLabel type="password" id="password" label="Password" placeholder="••••••••" value={loginForm.password} changeHandler={handleChange}/>
                    </div>
                    <div className="flex items-center justify-between w-full mt-5">
                        <div className="w-full">
                            <a href="">Forgot password?</a>
                        </div>
                        <div className="w-full flex justify-end mt-5 ">
                            <button className="bg-darkest_almond p-2 rounded-lg px-4 text-lg " onClick={submitLogin}>Log in</button>
                        </div>
                    </div>
                        <div className="mt-10 text-gray-50">
                            <p>Need an account? <a onClick={()=>{navigate("/signup")}}>Sign Up</a></p>
                        </div>
                </form>
            </div>
        </div>
        </>
    )
} 

export default Login