import { useNavigate } from "react-router"
import SmallPolarChart from "./SmallPolarChart"

interface WheelCardProps {
    data : number[],
    id : string
}
const WheelCard:React.FC<WheelCardProps> = ({data,id}) => {

    const navigate = useNavigate();


    return (
        <div className="bg-darkest_almond w-full p-2 rounded-2xl text-white text-2xl flex items-center justify-between hover:bg-darker_almond"
        onClick={()=>{navigate(`/wheel?_id=${id}`)}}>
            <p className="ml-5">
                July 2024
            </p>
            <div className="w-2/6">
                <SmallPolarChart data={data} />
            </div>
        </div>
    )
}

export default WheelCard