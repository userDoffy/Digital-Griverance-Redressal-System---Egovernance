import Grievance from '../models/grievanceModel.js'

export const addGrievance = async (req, res, next) => {
    try {
        const { title, category, description } = req.body
        const userId = req.user.id
        const newGrievance =await  Grievance.create({userId,title,category,description})
        res.status(201).json({ status: "success", message: "Complaint registered successfully!" });
    } catch (error) {
        next(error)
    }
}
export const getGrievance = async (req, res, next) => {
    try {
        const userId = req.user.id
        const grievances = await Grievance.find({ userId }); 
        res.status(200).json({ status: "success", data: grievances });
    } catch (error) {
        next(error)
    }
}