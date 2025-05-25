import mongoose from "mongoose";
const ordersSchema = new mongoose.Schema({
    vin:{
        type: String,
        required: true,
        unique: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    customerPhone: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    totalDays: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
    },
    status:{
        type:String,
        enum:["Pending","Completed"],
        default:"Pending",
    }
})

const Order  = mongoose.model('Order',ordersSchema)
export default Order