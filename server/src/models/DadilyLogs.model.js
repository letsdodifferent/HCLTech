import mongoose from "mongoose";

const dailyLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: { type: Date, required: true },

    // Daily entries
    steps: { type: Number, default: 0 },
    waterLitres: { type: Number, default: 0 },
    sleepHours: { type: Number, default: 0 },
    activeMinutes: { type: Number, default: 0 },

    // Automatically calculated by frontend or backend
    goalsMet: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("DailyLog", dailyLogSchema);
