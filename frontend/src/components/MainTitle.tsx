
const MainTitle : React.FunctionComponent<{title : string}> = ({title}) => {

    return(
        <h1 className="w-full font-title text-center text-6xl text-walnut mt-3">{title}</h1>
    )
}

export default MainTitle