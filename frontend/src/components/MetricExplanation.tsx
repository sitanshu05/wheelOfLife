
const MetricExplanation : React.FunctionComponent<{text : string}> = ({text}) => {

    return (
        <p className="font-body_font font-normal text-left text-lg tracking-wider dark:text-white">
            {text}
        </p>
    )
}

export default MetricExplanation