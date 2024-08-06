import WheelCard from "../components/WheelCard"
import Nav from "../layouts/Header"
import axios from "axios";
import config from "../config"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AllWheels = () => {

   
    const [wheels, setWheels] = useState([]);
    const navigate = useNavigate()

    useEffect(()=>{

        const fetchWheels = async () => {
            const response = await axios.get(`${config.SERVER_API_URL}/wheel`,{
                headers : {
                    "Authorization" : localStorage.getItem("Authorization")
                }
            })

            setWheels(response.data.wheels)


        }
        fetchWheels();
    },[])

    const getRatingArray = (wheel : any) => {
        if (!wheel.segments) {
            return [];
        }
        const segmentsWithoutJoy = wheel.segments.filter((segment : any)=>{
            if(segment.name !== "joy"){
                return true;
            }
            return false;
        })
        
        const ratingArray = segmentsWithoutJoy.map((segment : any)=> {
            return segment.rating;
        })

        return ratingArray;

    }

    const getIdArray = (wheels : any) => {

        const idArray = wheels.map((wheel : any)=> {
            return wheel._id;
        })

        return idArray;
    }

   


    return (
        <div className="">
        <Nav/>
        <h1 className="text-4xl text-rasin_black font-title ml-5 mt-5">Your Wheels of Life</h1>
        <div className="w-full flex items-center justify-center mt-8">
            <div className="w-11/12 ">
                <div className="bg-create_button p-8 py-12 rounded-2xl text-2xl text-white"
                onClick={()=>{navigate("/soul")}}>
                    Create New Wheel +
                </div>
                <div className="mt-2">
                    { wheels.length > 0 ? 
                        wheels.map((item,idx)=>{
                            return  (
                            <div className="mt-5" key={getIdArray(wheels)[idx]}>
                                <WheelCard data={getRatingArray(item)} id={getIdArray(wheels)[idx]} />
                            </div>
                            )
                        })
                        : <></>
                    }
                   
                </div>
            </div>
        </div>
        </div>
    )
}

export default AllWheels