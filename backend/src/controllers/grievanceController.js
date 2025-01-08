import Grievance from "../models/grievanceModel.js";

// Add a new grievance
export const addGrievance = async (req, res, next) => {
    try {
        const { title, category, description } = req.body;
        const userId = req.user.id;
        const newGrievance = await Grievance.create({ userId, title, category, description });
        res.status(201).json({ status: "success", message: "Complaint registered successfully!" });
    } catch (error) {
        next(error);
    }
};

// Get all grievances of a specific user
export const getGrievance = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const grievances = await Grievance.find({ userId });
        res.status(200).json({ status: "success", data: grievances });
    } catch (error) {
        next(error);
    }
};

// Get complaints grouped by category for the pie chart
export const complaintsByCategory = async (req, res, next) => {
    try {
        const grievances = await Grievance.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } },
        ]);

        const formattedData = grievances.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, {});

        res.status(200).json({ status: "success", data: formattedData });
    } catch (error) {
        next(error);
    }
};


// Get all complaints
export const allComplaints = async (req, res, next) => {
    try {
        const grievances = await Grievance.find();
        res.status(200).json({ status: "success", data: grievances });
    } catch (error) {
        next(error);
    }
};
