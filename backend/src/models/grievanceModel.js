import mongoose from "mongoose";

const grievanceSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        title: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ["Pending", "InProgress", "Resolved"], default: "Pending" },
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
    },
    { timestamps: true }
);

export default mongoose.model("Grievance", grievanceSchema);
