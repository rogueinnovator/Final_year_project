import mongoose, { model, Schema } from "mongoose";

const CriminalSchema = new Schema( {
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  photoUrl: {
    type: String,
  },
} );

export const Criminal =
  mongoose.models.Criminal || mongoose.model( "Criminal", CriminalSchema );
