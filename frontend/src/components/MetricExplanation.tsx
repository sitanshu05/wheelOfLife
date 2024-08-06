
const MetricExplanation : React.FunctionComponent<{text : string}> = ({text}) => {

    return (
        <p className="font-simple_text font-normal text-center mt-2 mx-5 leading-7 tracking-wider ">
            {text}
        </p>
    )
}

export default MetricExplanation