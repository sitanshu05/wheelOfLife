import { useRecoilValue } from 'recoil';
import { segmentArraySelector } from '../data/selectors/segmentArraySelector';
import React, { useEffect, useState } from 'react';
import PolarChart from '../components/PolarChart';
import bgcolors from "../data/fixed/polarChartColors"
import bdrColors from "../data/fixed/polarChartBorderColors"
import Slider  from "../components/RatingSilder"
import Nav from '../layouts/Header';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import config from "../config"

interface Segment {
  name : string,
  rating :  number,
  improvements : string,
  _id? : string
}

const Wheel: React.FC = () => {

  const [searchParams] = useSearchParams();
  const [segmentArray,setSegmentArray] = useState<Segment[]>([]);
  const recoilSegmentArray = useRecoilValue(segmentArraySelector);
  const navigate = useNavigate()

  const id = searchParams.get("_id")

  if(id){
    useEffect(()=>{
      const fetchWheel = async () => {
        const response = await axios.get(`${config.SERVER_API_URL}/wheel/${id}`,{
          headers : {
            Authorization : localStorage.getItem("Authorization")
          }
        })
        setSegmentArray(response.data.wheel.segments);
      }
  
      fetchWheel()
    },[])
  }else{

    useEffect(()=> {
      setSegmentArray(recoilSegmentArray)
    },[segmentArraySelector])
  }

  

  let joyRating = 1;

  const segmentArrayWithoutJoy = segmentArray.filter((item)=>{
    if(item.name != "joy"){
        return true;
    }
    else{
      joyRating = item.rating;
    }

    return false;
  })
 

  const data = segmentArrayWithoutJoy.map(item => item.rating);

  const labels = segmentArrayWithoutJoy.map(item => {
    return item.name.charAt(0).toUpperCase() + item.name.slice(1)}

  );
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const improvements = segmentArrayWithoutJoy.map(item => item.improvements);

  const backgroundColors = bgcolors;

  const borderColors = bdrColors;
  const date = new Date();

  // Ensure the colors arrays match the number of segments
  const adjustedBackgroundColors = backgroundColors.slice(0, segmentArray.length);
  const adjustedBorderColors = borderColors.slice(0, segmentArray.length);

  async function handleWheelSubmit(event: any){
    event.preventDefault()
    await axios.post(`${config.SERVER_API_URL}/wheel/create`,{
      segments : recoilSegmentArray
    },{
      headers : {
        Authorization : localStorage.getItem("Authorization")
      }
    })

    localStorage.removeItem("recoil-persist")
    navigate("/allwheels")
  }

  return (
    <>
      <Nav />
      <div className='flex flex-col items-center justify-between'>
        <h2 className='w-full text-center mt-5 text-3xl font-title text-walnut'>Your Wheel of Life</h2>
        <h2 className='w-full text-center mt-1 text-3xl font-title text-walnut' >{month[date.getMonth()]} {date.getFullYear()}</h2>
        <div className='w-[95%] mt-10'>
          <PolarChart
            data={data}
            labels={labels}
            backgroundColors={adjustedBackgroundColors}
            borderColors={adjustedBorderColors}
            improvements={improvements}
          />
        </div>
        <div className='w-4/5 mt-10'>
          <p className='w-full font-title text-3xl text-walnut'>Your Overall Joy: {joyRating}</p>
          <Slider rating={joyRating} immovable={true} onChange={()=> {return null}}/>
        </div>
      </div>
 
      <div className='w-full flex justify-end mt-5'>
        {<button className='bg-darkest_almond text-xl p-3 rounded-lg mr-5 px-5 text-almond'
        onClick={localStorage.getItem("Authorization") ? handleWheelSubmit : ()=>{navigate("/login")}}
        >Save</button>}

      </div>
    </>
  );
};

export default Wheel;
