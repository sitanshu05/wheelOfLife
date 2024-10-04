import { useNavigate } from "react-router"
import InputWithLabel from "../components/InputWithLabel"
import Nav from "../layouts/Header"
import { useState } from "react";
import axios from "axios";
import config from "../config"
import Lottie from "lottie-react";
import login from "../data/lottie/auth.json"
import { Loader } from "../components/Loader";
import Alert from "../components/Alert";
import { validator } from "../utils/loginValidator";
const Login : React.FunctionComponent = () =>{

    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        handle : "",
        password : ""
    })
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // State for managing errors
    const setErrorWrapper = () => {
        setError(null);
        return {};
        };

    if(loading){
        return <Loader/>
    }

    const handleChange = (event : any) => {
        const {id,value} = event.target;

        setLoginForm(prevState => {
            return {
                ...prevState,
                [id] : value
            }
        })
    }

    const submitLogin =  (event : any) => {
        setLoading(true);
        event.preventDefault()

        const isValid = validator(loginForm);
        
        if(!isValid.isValid){
            if(isValid.message){
                setError(isValid.message)
            }
            setLoading(false)
            return
        }
        
        axios.post(`${config.SERVER_API_URL}/auth/login`,{
            handle : loginForm.handle,
            password : loginForm.password
        }).then((res)=>{
            localStorage.setItem("Authorization", `Bearer ${res.data.token}`)
            setLoading(false);
            if(localStorage.getItem("recoil-persist")){
                navigate("/wheel")
                
            }else{
                navigate("/allWheels")
            }

        }).catch((err)=>{
            setLoading(false)
            setError(err.response?.data?.message || "An unexpected error occurred.");
        })

    }
    
    

    return (
        <>
        <div className="ml-1 mb-16 ">
            <Nav/>
        </div>
        {error && (
                <div className="fixed top-0 left-0 w-full flex justify-center z-[100]">
                    <Alert type="error" text={error} setError={setErrorWrapper}/>
                </div>
            )}
        <div className="lg:flex lg:justify-center">
            <div className="lg:grid lg:grid-cols-2 max-w-[1200px]">
                <div className=" w-11/12 hidden lg:block">
                    <Lottie animationData={login}/>
                </div>
                <div className="flex justify-center w-full ">
                    <div className="bg-darker_almond w-[90%] flex flex-col justify-center items-center rounded-lg max-w-lg">
                        <h3 className="text-left w-full text-[2.25rem] text-title_orange font-title_font mb-5">Log In to your account</h3>
                        <form className="w-full">
                            <div className="mt-10 w-full">
                                <InputWithLabel type="text" id="handle" label="email or username" placeholder="" value={loginForm.handle} changeHandler={handleChange}/>
                            </div>
                            <div className="mt-6 w-full">
                                <InputWithLabel type="password" id="password" label="password" placeholder="" value={loginForm.password} changeHandler={handleChange}/>
                            </div>
                            <div className="flex items-center justify-between w-full mt-10">
                                <div className="w-full text-gray-500 flex items-center dark:text-white hover:underline cursor-pointer">
                                    <a onClick={()=>{navigate("/forgotpassword")}}>Forgot password?</a>
                                </div>
                                <div className="w-full flex justify-end">
                                    <button className="bg-button_orange p-2 rounded-lg px-4 text-lg " onClick={submitLogin}>Log in</button>
                                </div>
                            </div>
                                <div className="mt-10 text-gray-500 text-center dark:text-white">
                                    <p>Need an account? <a onClick={()=>{navigate("/signup")}} className="hover:underline cursor-pointer">Sign Up</a></p>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
} 

export default Login