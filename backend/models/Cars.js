import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  vin: {
    type: String,
    required: true,
    unique: true,
  },
  name:{
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
    },
  brand: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  Image:{
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});
const Car = mongoose.model("Car", carSchema);
export default Car;