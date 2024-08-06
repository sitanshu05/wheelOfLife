import { useNavigate } from "react-router-dom"

const StartButton : React.FunctionComponent<{text : string, path : string }> = ({text,path}) => {

      let navigate = useNavigate();

      const redirectToPath = () => {
            navigate(path);
      }

    return (
            <button
            type="button"
            onClick={redirectToPath}
            className="w-full bg-pumpkin-default hover:bg-pumpkin-dark p-4 px-8 text-xl rounded-xl font-simple_text font-normal text-center"
            >
            {text}
            </button>
       
      )
}

export default StartButton