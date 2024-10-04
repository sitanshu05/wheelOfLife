import { useState } from "react"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import config from "../config"

export const Popup = ({showModal, setShowModal} : any) => {
  const [rating, setRating] = useState(0);
  const [feedback,setFeedback] = useState("");

  const handleRating = (rate: number | null) => {
    if(rate)
      setRating(rate)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowModal(false);

    await axios.post(`${config.SERVER_API_URL}/feedback`, {
      rating,
      feedback
    })
  }

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 overflow-y-auto z-40 flex justify-center items-center mx-5">
          <div className="fixed inset-0 w-full h-full bg-black opacity-50"></div>
            

          <div className="relative bg-white dark:bg-darkmode_bg rounded-lg shadow-lg p-4 max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center flex-col mb-4">
              <button
              className="absolute top-0 right-0 mt-4 mr-4"
              onClick={() => setShowModal(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-div_orange hover:text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
                <h2 className="text-2xl mr-4 mb-8 font-body_font text-title_orange font-semibold text-center px-12">Rate the application!</h2>
                <div className="flex mb-10">
                <Rating
                  name="simple-controlled"
                  value={rating}
                  emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" sx={{ color: 'grey' }}/>}
                  onChange={(_event: any,newValue : number | null)=>handleRating(newValue)}
                />
                </div>
                <div className="w-full flex justify-center">
                  <textarea className="bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg w-10/12 h-24"
                    onChange={(e)=>setFeedback(e.target.value)}
                    placeholder="Leave a comment!">
                   </textarea>
                </div>
              </div>
              <div className="flex justify-end w-full">
                <button type="submit" className="bg-button_orange text-font_brown  font-bold py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );

}