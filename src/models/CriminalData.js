import { model, Schema } from "mongoose";

/**
 * @fileoverview Mongoose schema and model definition for the Criminal collection.
 */
/**
 * User Schema
 * @typedef {Object} UserSchema
 * @property {String} unique_identifier - The unique id for each criminal.
 * @property {String} cnic - The unique CNIC (Computerized National Identity Card) number of each criminal.
 * @property {String} face_encoding - The unique face_encoding for each criminal.
 */

const UserSchema = new Schema({
  unique_identifier: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  face_encoding: {
    type: Array,
    unique: true,
    required: true,
  },
});

const User = model("user", UserSchema);

export default User;
