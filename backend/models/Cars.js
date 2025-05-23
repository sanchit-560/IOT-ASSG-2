import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  vin: {
    type: String,
    required: true,
    unique: true,
  },
  type:{
    type: String,
    required: true,
    },
  model: {
    type: String,
    required: true,
  },
  pricePerDaY: {
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