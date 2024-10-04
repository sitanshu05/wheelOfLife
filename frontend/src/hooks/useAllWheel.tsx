import axios from "axios";
import config from "../config"
import { useEffect, useState } from "react";


export const useAllWheel = () => {    

    try{

        const [wheels, setWheels] = useState([]);
        const [loading,setLoading] = useState(true)
    
        
        useEffect(()=>{
    
            const fetchWheels = async () => {
                const response = await axios.get(`${config.SERVER_API_URL}/wheel`,{
                    headers : {
                        "Authorization" : localStorage.getItem("Authorization")
                    }
                })
    
                setWheels(response.data.wheels)
                setLoading(false)
            }
            fetchWheels();
        },[localStorage.getItem("Authorization")])
    
        return {loading,wheels};
    }catch(err){
        throw err;
    }

    
}