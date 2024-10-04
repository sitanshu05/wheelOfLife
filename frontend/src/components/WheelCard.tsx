import { useNavigate } from "react-router"
import SmallPolarChart from "./SmallPolarChart"

interface WheelCardProps {
    data : number[],
    id : string,
    month : string
}
const WheelCard:React.FC<WheelCardProps> = ({data,id,month}) => {

    const navigate = useNavigate();


    return (
        <div className="bg-div_orange mt-5 w-full p-2 rounded-2xl text-white font-body_font font-bold text-3xl flex items-center justify-between hover:bg-darker_almond"
        onClick={()=>{navigate(`/wheel?_id=${id}`)}}>
            <p className="ml-5">
                {month}
            </p>
            <div className="w-2/6">
                <SmallPolarChart data={data} />
            </div>
        </div>
    )
}

export default WheelCard