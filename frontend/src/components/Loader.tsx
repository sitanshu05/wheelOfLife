import Lottie from "lottie-react"
import loader from "../data/lottie/loader.json"
import Header from "../layouts/Header"

export const Loader = () => {

    return (
        <div className="overflow-y-hidden">
            <div className="mb-4 lg:mb-20 mt-3">
                <Header />
            </div>
            <div className="flex justify-center items-center mt-60 ">
                <div className="w-4/12 max-w-[200px]">
                    <Lottie animationData={loader} loop={true}/>
                </div>
            </div>
        </div>
    )
}