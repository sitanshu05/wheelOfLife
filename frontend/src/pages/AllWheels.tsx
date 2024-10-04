import WheelCard from "../components/WheelCard"
import Nav from "../layouts/Header"
import { useNavigate } from "react-router";
import { useAllWheel } from "../hooks/useAllWheel";
import { Loader } from "../components/Loader";

const AllWheels = () => {

   
    const {loading,wheels} = useAllWheel(); 

    const navigate = useNavigate()
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    if(loading){
        return <Loader/>
    }

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
        <div className="ml-5 mb-8">
            <div className="mb-8"><Nav/></div>
            <h1 className="text-5xl font-title_font tracking-tight text-title_orange text-left lg:ml-5">Your Wheels of Life</h1>
        </div>
            <div className="w-full flex justify-center">
                <div className="w-11/12 flex flex-col items-center justify-center sm:px-10 max-w-[700px] lg:max-w-[1200px]">
                    <div className="bg-button_orange p-8 py-12 w-full rounded-2xl text-3xl text-white font-body_font font-bold"
                    onClick={()=>{navigate("/soul")}}>
                        Create New Wheel +
                    </div>
                    
                        <div className="mt-2 w-full lg:flex flex-wrap justify-between">
                            { wheels.length > 0 ?
                                wheels.map((item : any,idx)=>{
                                    const date = new Date(item.time);
                                    return  (
                                    <div className="mt-5" key={getIdArray(wheels)[idx]}>
                                        <WheelCard data={getRatingArray(item)} id={getIdArray(wheels)[idx]} month={`${monthNames[date.getMonth()]} ${date.getFullYear()}`} />
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