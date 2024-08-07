import { useNavigate } from "react-router"
import InputWithLabel from "../components/InputWithLabel"
import Nav from "../layouts/Header"
import { useState } from "react"
import config from "../config";
import axios from "axios"

const SignUp : React.FunctionComponent = () =>{

    const navigate = useNavigate()

    const [signupForm, setSignupForm] = useState({
        email : "",
        username : "",
        password : ""
    })

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

        axios.post(`${config.SERVER_API_URL}/auth/signup`,{
            username : signupForm.username,
            email : signupForm.email,
            password : signupForm.password
        }).then((res)=>{
            
            localStorage.setItem("Authorization", `Bearer ${res.data.token}`)
            if(localStorage.getItem("recoil-persist")){
                navigate("/wheel")
                
            }else{
                navigate("/allWheels")
            }
        }).catch((err)=>{
            alert(err.response.data.message)

        })

    }
    

    return (
        <>
        <Nav/>
        <div className="flex justify-center items-start mt-14 w-full">
            <div className="bg-darker_almond w-[90%] flex flex-col justify-center items-center p-5 rounded-lg py-16">
                <h3 className="text-left w-full text-3xl text-rasin_black">Create an account</h3>
                <div className="mt-10 w-full">
                    <InputWithLabel type="email" id="email" label="email" placeholder="umplumpa@wheel.com" value={signupForm.email} changeHandler={handleChange} />
                </div>
                <div className="mt-5 w-full">
                    <InputWithLabel type="text" id="username" label="username" placeholder="username" value={signupForm.username} changeHandler={handleChange}/>
                </div>
                <div className="mt-5 w-full">
                    <InputWithLabel type="password" id="password" label="Password" placeholder="••••••••" value={signupForm.password} changeHandler={handleChange}/>
                </div>

                <div className="flex items-center justify-between w-full mt-5">
                    <div className="w-full flex justify-end mt-5 ">
                        <button className="bg-darkest_almond p-2 rounded-lg px-4 text-lg" onClick={submitForm}>Sign Up</button>
                    </div>
                </div>
                    <div className="mt-10 text-gray-50">
                        <p>Already have an account? <a onClick={()=>{navigate("/login")}}>Log In</a></p>
                    </div>
            </div>
        </div>
        </>
    )
} 

export default SignUp