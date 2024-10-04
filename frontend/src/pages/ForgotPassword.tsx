import { useState } from "react"
import InputWithLabel from "../components/InputWithLabel"
import Header from "../layouts/Header"
import axios from "axios"
import config from "../config"
import { Loader } from "../components/Loader"
import { useNavigate } from "react-router"
import Alert from "../components/Alert"

const ForgotPassword = () => {

    const [email,setEmail] = useState("")
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    if(loading){
        return <Loader/>
    }
    const [error, setError] = useState<string | null>(null); // State for managing errors
    const [errorType, setErrorType] = useState<"error" | "success" | "info" | "warning" >("error");
    const setErrorWrapper = () => {
        setError(null);
        return {};
        };

    const handleChange = (event : any) => {
        const {value} = event.target;
        setEmail(value)
    }


    const handleSubmit = async () =>{
        try{
            setLoading(true)
            const response = await axios.post(`${config.SERVER_API_URL}/auth/forgotpassword`,{
                email : email
            })
            setError(response.data.message)
            setErrorType("success")
            setLoading(false)
            navigate("/login");

        }catch(err :Error | any){
            setError(err.response.data.message)
            setErrorType("error")
            setLoading(false)
        }   
    }


    return (
            <>
                {error && (
                <div className="fixed top-0 left-0 w-full flex justify-center z-[100]">
                    <Alert type={errorType} text={error} setError={setErrorWrapper}/>
                </div>
            )}
                <div>
                    <div className="mb-16">
                        <Header></Header>
                    </div>
                    <div className="lg:flex lg:justify-center">
                        <div className="w-full flex justify-center items-center max-w-[600px]">
                            <div className="w-11/12 flex flex-col ">
                                <div className="text-xl font-title_font text-left text-title_orange tracking-tight mb-6">
                                    Enter your registered email
                                </div>
                                <div className="w-full">
                                    <InputWithLabel type={"email"} id={"email"} label={"email"} value={email} changeHandler={handleChange} />
                                </div>
                                <button onClick={handleSubmit} className="px-4 py-2 mt-6 bg-button_orange text-black rounded">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                </>

    )
}

export default ForgotPassword;