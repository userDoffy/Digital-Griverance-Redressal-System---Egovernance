import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Citizen"], default: "User" },
    approved:{type:Boolean, default: false},
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
