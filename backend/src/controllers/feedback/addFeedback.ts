import feedbackModel from "../../models/feedback.model";

export const addFeedback = async (req: any, res: any) => {

    try{
        const {rating, feedback} = req.body;

        const newFeedback = await feedbackModel.create({
            rating,
            feedback
        })

        res.status(200).json(newFeedback)
    }catch(err){
        res.status(500).json({message : err})
    }
}