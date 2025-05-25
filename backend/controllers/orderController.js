import Order from "../models/Order.js";
import Car from "../models/Cars.js";

// Create Orders
export const createOrder = async(req,res)=>{
    const {vin,customerName,customerEmail,customerPhone,startDate,totalDays} = req.body;
    const car = await Car.findOne({vin});
    if(!car || !car.isAvailable){
        return res.status(404).json({
            message:"Car does not exist or it is not available"
        })
    }
    const totalPrice = car.pricePerDay*totalDays;
    try {
        const order = await Order.create({
        vin,
        customerName,
        customerEmail,
        customerPhone,
        startDate,
        totalDays,
        totalPrice
    })
    res.status(201).json(order);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    
}

// Method to confirm the order
export const confirmOrder  =  async(req,res)=>{
    const {id} = req.params
    try {
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({
                message:"Order not found"
            })
        }
        order.status = "Completed";
        await order.save();
        await Car.findByIdAndUpdate(order.vin,{
            isAvailable: false
        })
        res.status(200).json({
            message:"Order Confirmed"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
