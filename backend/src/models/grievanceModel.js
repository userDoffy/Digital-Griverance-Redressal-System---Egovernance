import mongoose from "mongoose";

const grievanceSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        category: { type: String, required: true },
        description: { type: String, unique: true, required: true },
        adminresponses: [
            {
                response: { type: String },
                responseDate: { type: Date },
            },
        ],
        userresponses: [
            {
                response: { type: String },
                responseDate: { type: Date },
            },
        ],
        status: { type: String, enum: ["Pending", "InProgress", "Resolved"], default: "Pending" },
    },
    { timestamps: true }
);

export default mongoose.model("Grievance", grievanceSchema);
