import mongoose, { model, Schema } from "mongoose";
const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
//this first check if there is user is a model named user exist in the mongoose cache if yes it assign it to auth and not it create a fresh one and assign it to auth
export const User = mongoose.models.user || mongoose.model("user", UserSchema);
