import { useNavigate } from "react-router"
import InputWithLabel from "../components/InputWithLabel"
import Nav from "../layouts/Header"
import { useState } from "react"
import config from "../config";
import axios from "axios"
import Lottie from "lottie-react";
import signup from "../data/lottie/auth.json"
import { Loader } from "../components/Loader";
import Alert from "../components/Alert";
import { validator } from "../utils/signupValidator";

const SignUp : React.FunctionComponent = () =>{

    const navigate = useNavigate()

    const [signupForm, setSignupForm] = useState({
        email : "",
        username : "",
        password : ""
    })

    const [error, setError] = useState<string | null>(null); // State for managing errors
    const setErrorWrapper = () => {
        setError(null);
        return {};
        };

    const [loading,setLoading] = useState(false);

    if(loading){
        return <Loader/>
    }

    const handleChange = (event : any) => {
        const {id,value} = event.target;

        setSignupForm((prevState)=>{
            return {
                ...prevState,
                [id] : value
            }
        })
    }

    const submitForm = (event : any)=>{
        event.preventDefault();
        setLoading(true)
        const isValid = validator(signupForm);
        
        if(!isValid.isValid){
            if(isValid.message){
                setError(isValid.message)
            }
            setLoading(false)
            return
        }

        axios.post(`${config.SERVER_API_URL}/auth/signup`,{
            username : signupForm.username,
            email : signupForm.email,
            password : signupForm.password
        }).then((res)=>{
            localStorage.setItem("Authorization", `Bearer ${res.data.token}`)
            setLoading(false);
            if(localStorage.getItem("recoil-persist")){
                navigate("/wheel")
                
            }else{
                navigate("/allWheels")
            }
        }).catch((err)=>{
            alert(err.response.data.message)
            setLoading(false)

        })

    }
    

    return (
        <>
         {error && (
                <div className="fixed top-0 left-0 w-full flex justify-center z-[100]">
                    <Alert type="error" text={error} setError={setErrorWrapper}/>
                </div>
            )}
        <div className="ml-1"><Nav/></div>
        <div className="lg:flex lg:justify-center">
            <div className="lg:grid lg:grid-cols-2 max-w-[1200px lg:mt-12">
                <div className=" w-11/12 hidden lg:block">
                    <Lottie animationData={signup}/>
                </div>
            <div className="flex justify-center items-start mt-14 w-full">
                <div className="bg-darker_almond w-[90%] flex flex-col justify-center items-center rounded-lg max-w-lg">
                    <h3 className="text-left w-full text-[2.25rem] text-title_orange font-title_font">Create an account</h3>
                    <div className="mt-10 w-full">
                        <InputWithLabel type="email" id="email" label="email" placeholder="umplumpa@wheel.com" value={signupForm.email} changeHandler={handleChange} />
                    </div>
                    <div className="mt-5 w-full">
                        <InputWithLabel type="text" id="username" label="username" placeholder="username" value={signupForm.username} changeHandler={handleChange}/>
                    </div>
                    <div className="mt-5 w-full">
                        <InputWithLabel type="password" id="password" label="password" placeholder="" value={signupForm.password} changeHandler={handleChange}/>
                    </div>
                    <div className="flex items-center justify-between w-full mt-5">
                        <div className="w-full flex justify-end mt-5 ">
                            <button className="bg-button_orange p-2 rounded-lg px-4 text-lg" onClick={submitForm}>Sign Up</button>
                        </div>
                    </div>
                        <div className="mt-10 text-gray-500 dark:text-white">
                            <p>Already have an account? <a onClick={()=>{navigate("/login")}} className="underline">Log In</a></p>
                        </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
} 

export default SignUp