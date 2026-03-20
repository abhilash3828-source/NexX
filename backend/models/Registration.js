const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    eventId: { type: String, required: true, index: true },
    fullName: { type: String, required: true },
    inGameName: { type: String, required: true },
    uid: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },
    txnId: { type: String, required: true },
    screenshotUrl: { type: String },
    createdAt: { type: Date, default: Date.now, index: true },
    status: { type: String, enum: ["pending", "approved", "declined"], default: "pending", index: true }
  },
  { timestamps: true }
);

// Index for fast lookups
registrationSchema.index({ eventId: 1, status: 1 });
registrationSchema.index({ eventId: 1, uid: 1 });

module.exports = mongoose.model("Registration", registrationSchema);
