import { useEffect, useState } from "react"
import InputWithLabel from "../components/InputWithLabel"
import axios from "axios";
import config from "../config"
import RatingSlider from "../components/RatingSilder";
import Nav from "../layouts/Header";
import { useNavigate } from "react-router";

interface User {
    username : string,
    email : string,
    frequency : number
}


const Profile = () => {
    const [user, setUser] = useState<User>();
    const [initialUser,setInitialUser] = useState<User>()
    const [isEditable, setIsEditable] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{

        try{
        const getUser = async() => {
            const response = await axios.get(`${config.SERVER_API_URL}/user/info`,{
                headers : {
                    "Authorization" : localStorage.getItem("Authorization")
                }
            })

            setInitialUser(response.data.user)
            setUser(response.data.user)
        }

        getUser()

        }catch(err){
            alert(err)
        }

    },[])

    const handleSubmit = async () => {

        if (!user) return;

        const updatedFields: Partial<User> = {};

        if (user.username !== initialUser?.username) {
        updatedFields.username = user.username;
        }
        if (user.email !== initialUser?.email) {
        updatedFields.email = user.email;
        }
        if (user.frequency !== initialUser?.frequency) {
        updatedFields.frequency = user.frequency;
        }

        try{
            const response = await axios.put(`${config.SERVER_API_URL}/user/update`,updatedFields,

                {
                    headers : {
                        "Authorization" : localStorage.getItem("Authorization")
                    }
                }
        )

            setIsEditable(false);
            localStorage.setItem("Authorization",response.data.token)

        }catch(err){

            console.log(err)

        }
    }


    const handleChange = (event : any) => {

        const {id,value} = event.target;

        setUser(prevState => {
            if(prevState)
                return {
                    ...prevState,
                    [id] : value
                }
        })
    }

    const handleFrequencyChange = (event:any) => {

        setUser((prevState)=>{
            if(prevState)
                return {
                    ...prevState,
                    frequency : event.target.value
                }
        })
    }
    const logout = () => {
        localStorage.removeItem("Authorization");
        navigate("/login")
    }


    return (
        <>
        <div className="ml-5"><Nav/></div>
        <div className="flex flex-col items-center mt-10">
            <div className="flex flex-col w-11/12 mt-10 max-w-xl">
                <div className="flex justify-between">
                    <h1 className="text-3xl text-left text-title_orange font-title_font leading-tight">
                        Profile
                    </h1>

                </div>
                <div className="mt-6">
                    <InputWithLabel
                        type="text"
                        id="username"
                        value={user ? user.username : "username"}
                        label="username"
                        changeHandler={isEditable ? handleChange :()=>{}}
                        disabled ={isEditable ? false : true}
                    />
                </div>
                <div className="mt-6">
                    <InputWithLabel
                        type="email"
                        id="email"
                        value={user ? user.email : "email"}
                        label="username"
                        changeHandler={isEditable ? handleChange :()=>{}}
                        disabled ={isEditable ? false : true}

                    />
                </div>
                <div className="mt-6">
                    <p className="block text-sm font-medium text-font_brown dark:text-white">Reminder in every {user ? user.frequency : 0} months</p>
                    <RatingSlider
                        rating={user ? user.frequency : 0}
                        min={0}
                        max={12}
                        id="frequency"
                        onChange={isEditable ? handleFrequencyChange : ()=>{}}
                    />
                </div>

                <div className="flex w-full items-center justify-between mt-6 mb-16">
                    <a  className="text-font_brown dark:text-white" onClick={()=>{navigate("/changePassword")}}>Change Password</a>
                    {!isEditable && <button className="bg-button_orange p-3 rounded-lg text-lg text-almond"
                    onClick={()=>{setIsEditable(!isEditable)}}
                    >Edit Profile</button>
                    }

                    {
                        isEditable && <button className="bg-button_orange  text-font_brown  p-3 px-5 rounded-lg text-lg"
                        onClick={handleSubmit}
                        >Save</button>
                    }
                    
                </div>
                <div className="flex justify-center">
                    <button className="bg-button_orange  text-font_brown  p-2 px-5 rounded-lg text-lg w-6/12"
                            onClick={logout}
                    >Logout</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile