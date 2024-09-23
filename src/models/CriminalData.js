import mongoose, { model, Schema } from "mongoose";

const CriminalSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
  },
});

export const Criminal =
  mongoose.model.criminal || mongoose.model("criminal", CriminalSchema);
