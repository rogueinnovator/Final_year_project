import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema( {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
} );

// Check if the 'User' model exists in the mongoose cache; if not, create a new one
export const User = mongoose.models.User || mongoose.model( "User", UserSchema );
