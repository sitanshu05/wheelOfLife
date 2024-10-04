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
            className="w-full bg-button_orange hover:bg-pumpkin-dark px-4 py-3 text-xl md:text-2xl rounded-lg font-normal text-center"
            >
            {text}
            </button>
       
      )
}

export default StartButton