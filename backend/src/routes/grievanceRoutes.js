import express from "express";
import { addGrievance, getGrievance } from "../controllers/grievanceController.js";
import Grievance from '../models/grievanceModel.js'

const router = express.Router();

// Use async error handling with next()
router.post("/addGrievance", async (req, res, next) => {
    try {
        await addGrievance(req, res, next)
    } catch (error) {
        next(error);
    }
});

router.post("/getGrievance", async (req, res, next) => {
    try {
        await getGrievance(req, res, next)
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

export default router;
