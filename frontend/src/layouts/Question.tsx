import MainTitle from "../components/MainTitle";
import MetricExplanation from "../components/MetricExplanation";
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
        <div className="flex flex-col items-center ml-5 mr-5">
            <div className="max-w-[800px]">
                <div className="mb-4 w-full">
                    <MainTitle title={[title]}/>
                </div>
                <div className="mb-4">
                    <MetricExplanation text = {text} />
                </div>
                <div className="w-full mb-2">
                    <RatingSlider rating = {values.rating} onChange={handleRatingChange}/>
                </div>
                {textareaVisible && <div className="mb-2 w-full">
                    <label htmlFor="improvements" className="text-left font-body_font dark:text-white">What could be improved?</label>
                    <textarea rows={5} name="improvements" id="" placeholder="Write your thoughts here" value={values.improvements} onChange={handleImprovementChange}  className="w-full p-2 text-md  font-body_font m-0 rounded-lg border bg-gray-100  focus:border-div_orange dark:text-white dark:bg-gray-800" />
                </div>}
                <div className="w-full flex flex-col items-end">
                    <button className="bg-button_orange px-5 py-2 rounded-md text-lg font-simple_text"
                    type="button"
                    onClick={redirectPath}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Question;