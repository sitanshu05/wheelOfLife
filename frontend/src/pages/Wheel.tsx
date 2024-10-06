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
import { Loader } from '../components/Loader';

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
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate()

  if(loading){
      return <Loader/>
  }
  const id = searchParams.get("_id")

  if(id){
    useEffect(()=>{
      setLoading(true)
      const fetchWheel = async () => {
        const response = await axios.get(`${config.SERVER_API_URL}/wheel/${id}`,{
          headers : {
            Authorization : localStorage.getItem("Authorization")
          }
        })
        setSegmentArray(response.data.wheel.segments);
      }
  
      fetchWheel()
      setLoading(false)
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
    setLoading(true)
    await axios.post(`${config.SERVER_API_URL}/wheel/create`,{
      segments : recoilSegmentArray
    },{
      headers : {
        Authorization : localStorage.getItem("Authorization")
      }
    })

    localStorage.removeItem("recoil-persist")
    setLoading(false);
    navigate("/allwheels")
  }

  return (
    <div className="">
      <div className='ml-5'>
        <Nav />
      </div>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col items-center justify-between mt-5 lg:flex-row max-w-[1200px]'>
          <div className='lg:flex items-center justify-between'>
            <div className='lg:flex lg:flex-col lg:justify-start'>
              <h2 className='w-full text-center lg:mt-[-14rem] text-[2rem] sm:text-[3rem] lg:text-[3.5rem] font-title_font text-title_orange tracking-tight mb-5'>Your Wheel on {month[date.getMonth()]} {date.getFullYear()}</h2>
            </div>
            <div className='flex justify-center lg:w-7/12'>
              <div className='w-full max-w-[500px] lg:max-w-[600px] lg:p-10'>
                <div className='mt-5 flex justify-center '>
                  <PolarChart
                    data={data}
                    labels={labels}
                    backgroundColors={adjustedBackgroundColors}
                    borderColors={adjustedBorderColors}
                    improvements={improvements}
                  />
                </div>
                  <div className='flex justify-center '>
                    <div className='max-w-[500px] w-full'>
                      <p className='w-full font-body_font text-2xl sm:text-[2rem] lg:text-[2.5rem] text-title_orange font-bold  max'>Joy: {joyRating}</p>
                      <Slider rating={joyRating} immovable={true} onChange={()=> {return null}}/>
                      <div className='w-full flex justify-end mt-5 bg'>
                        {!id && <button className='bg-button_orange text-xl sm:text-[1.5rem] lg:text-[2rem] p-3 lg:p-5 rounded-lg mr-5 px-5 text-'
                        onClick={localStorage.getItem("Authorization") ? handleWheelSubmit : ()=>{navigate("/login")}}
                        >Save</button>}
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




export default Wheel;