import Car from "../models/Cars.js";
// created a filter for the cars to retrieve results based on the type, brand and search
export const getAllCars = async(req,res)=>{
    const {type,brand,search} = req.query;
    const filter = {
      ...(type && { type }),
      ...(brand && { brand }),
      ...(search && {
        $or: [
           { name: { $regex: search, $options: "i" } },
           { brand: { $regex: search, $options: "i" } },
           { type: { $regex: search, $options: "i" } },
           { color: { $regex: search, $options: "i" } },
        ],
      }),
    };

    try{
        const cars = await Car.find(filter)
        res.status(200).json(cars)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }

}

export const getCarAvailability = async (req,res)=>{
  try {
    const {vin} = req.params;
    const car = await Car.findOne({vin})
    if(!car){
      return  res.status(404).json({message:"Car does not exist"})
    }
    res.json({vin:car.vin,isAvailable:car.isAvailable})
    
  } catch (err) {
    res.status(500).json({message:err.message})
    
  }
}