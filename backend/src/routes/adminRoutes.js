import express from "express";
import { complaintsByCategory, allComplaints} from "../controllers/grievanceController.js";
import Grievance from '../models/grievanceModel.js'

const router = express.Router();

// Use async error handling with next()

router.get("/complaintsByCategory", async (req, res, next) => {
    try {
        await complaintsByCategory(req, res, next)
    } catch (error) {
        next(error);
    }
});

router.get("/allComplaints", async (req, res, next) => {
    try {
        await allComplaints(req, res, next)
    } catch (error) {
        next(error);
    }
});


router.get("/getGrievance/:id", async (req, res, next) => {
    try {
        const grievance = await Grievance.findById(req.params.id); // Fetch by grievance ID
        if (!grievance) {
            return res.status(404).json({ message: "Grievance not found." });
        }
        res.status(200).json({ status: "success", data: grievance });
    } catch (error) {
        next(error);
    }
});

router.post("/addAdminResponse/:id", async (req, res, next) => {
    try {
        const { response } = req.body;
        const grievanceId = req.params.id;

        if (!response) {
            return res.status(400).json({ message: "Response cannot be empty." });
        }

        const grievance = await Grievance.findById(grievanceId);
        if (!grievance) {
            return res.status(404).json({ message: "Grievance not found." });
        }

        grievance.adminresponses.push({ response, responseDate: new Date() });
        await grievance.save();

        res.status(200).json({
            status: "success",
            message: "Response added successfully.",
            response: grievance.adminresponses[grievance.adminresponses.length - 1], // Return the last added response
        });
    } catch (error) {
        next(error);
    }
})

router.patch("/closeGrievance/:id", async (req, res, next) => {
    try {
        const grievance = await Grievance.findById(req.params.id);
        if (!grievance) {
            return res.status(404).json({ message: "Grievance not found." });
        }

        grievance.status = "Resolved";
        await grievance.save();

        res.status(200).json({ status: "Resolved" });
    } catch (error) {
        next(error);
    }
});


export default router;
