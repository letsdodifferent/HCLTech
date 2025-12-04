import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic identity info
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String },

    // Govt ID + Photo
    aadharCard: { type: String, required: true, unique: true },
    photoUrl: { type: String }, // store cloud link

    // Role-based system: "patient" or "provider"
    role: {
      type: String,
      enum: ["patient", "provider"],
      default: "patient",
    },

    // Patient wellness goals
    stepsGoal: { type: Number, default: 8000 },
    activeTimeGoal: { type: Number, default: 30 }, // minutes
    sleepGoal: { type: Number, default: 7 }, // hours
    waterGoal: { type: Number, default: 2.5 }, // litres

    // Preventive care info
    annualBloodTestDate: { type: Date },

    // Medical details (initially null)
    allergies: { type: String, default: null },
    currentMedications: { type: String, default: null },

    // Provider assignment
    healthcareProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // provider (role=provider)
      default: null,
    },

    // Compliance Status (provider updates)
    complianceStatus: {
      type: String,
      enum: ["Goal Met", "Missed Preventive Checkup", "Pending"],
      default: "Pending",
    },

    // Security
    password: { type: String, required: true },
    consent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
