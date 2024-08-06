import MainTitle from "../components/MainTitle";
import MetricExplanation from "../components/MetricExplanation";
import Nav from "./Header"
import RatingSlider from '../components/RatingSilder';
import { useNavigate } from "react-router";




const Question : React.FunctionComponent<{title : string,text:string,nextPath:string,textareaVisible?: boolean, values:{name : string, rating : number, improvements : string},setValues : (value:{name : string, rating : number, improvements : string})=>void}> = ({title,text,nextPath,textareaVisible = true,values,setValues}) => {

    let navigate = useNavigate();

    const redirectPath = () => {
        navigate(nextPath);
    }

    const handleRatingChange = (e: any) =>{   //set actual value
        setValues({...values,rating : e.target.value})
    }

    const handleImprovementChange = (e : any) => {
        setValues({...values,improvements : e.target.value})
    }

    return (
        <div className="flex flex-col items-center">
            <Nav />
            <MainTitle title={title}/>
            <MetricExplanation text = {text} />

            <div className="mt-5 w-11/12">
                <RatingSlider rating = {values.rating} onChange={handleRatingChange}/>
            </div>

            {textareaVisible && <div className="w-4/5 mt-3">
                <label htmlFor="improvements" className="text-left font-simple_text">What would you like to improve?</label>
                <textarea rows={5} name="improvements" id="" placeholder="Write your thoughts here" value={values.improvements} onChange={handleImprovementChange}  className="w-full p-2 text-md font-simple_text m-0 rounded-lg border bg-offwhite border-pumpkin-dark focus:border-pumpkin-default" />
            </div>}

            <div className="mt-2 w-full flex items-center justify-end px-10">
                <button className="bg-pumpkin-default px-3 py-1.5 rounded-md text-lg font-simple_text"
                type="button"
                onClick={redirectPath}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Question;