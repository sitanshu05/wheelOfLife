import { useNavigate } from "react-router"
import InputWithLabel from "../components/InputWithLabel"
import Nav from "../layouts/Header"
import { useState } from "react"
import config from "../config";
import axios from "axios"
import { useSearchParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import Alert from "../components/Alert";

const ResetPassword : React.FunctionComponent = () =>{

    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const [resetpasswordForm, setResetpasswordForm] = useState({
        new_password : "",
        confirm_password : ""
    })
    const [loading,setLoading] = useState(false);

    if(loading){
        return <Loader/>
    }

    const [error, setError] = useState<string | null>(null); // State for managing errors
    const setErrorWrapper = () => {
        setError(null);
        return {};
        };
    const handleChange = (event : any) => {
        const {id,value} = event.target;

        setResetpasswordForm((prevState)=>{
            return {
                ...prevState,
                [id] : value
            }
        })
    }



    const submitForm = (event : any)=>{
        event.preventDefault();
        setLoading(true)
        if(resetpasswordForm.new_password !== resetpasswordForm.confirm_password){
            setError("Password does not match")
            return
        }

        const token = searchParams.get("token")

        axios.put(`${config.SERVER_API_URL}/auth/resetpassword/${token}`,{
            password : resetpasswordForm.new_password

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
          {error && (
                <div className="fixed top-0 left-0 w-full flex justify-center z-[100]">
                    <Alert type="error" text={error} setError={setErrorWrapper}/>
                </div>
            )}
        <div className="ml-5"><Nav/></div>
        <div className="flex justify-center">
            <div className="flex justify-center items-start mt-14 w-full max-w-2xl">
                <div className="bg-darker_almond w-[90%] flex flex-col justify-center items-center rounded-lg">
                    <h3 className="text-left w-full text-[2.25rem] text-title_orange font-title_font">Reset Password</h3>
                    <div className="mt-5 w-full">
                        <InputWithLabel type="password" id="new_password" label="new password" placeholder="" value={resetpasswordForm.new_password} changeHandler={handleChange}/>
                    </div>
                    <div className="mt-5 w-full">
                        <InputWithLabel type="password" id="confirm_password" label="confirm password" placeholder="" value={resetpasswordForm.confirm_password} changeHandler={handleChange}/>
                    </div>
                    <div className="flex items-center justify-between w-full mt-5">
                        <div className="w-full flex justify-end mt-5 ">
                            <button className="bg-button_orange p-2 rounded-lg px-4 text-lg" onClick={submitForm}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
} 

export default ResetPassword