import Car from "../models/Cars";
// created a filter for the cars to retrieve results based on the type, brand and search
export const getAllCars = async(req,res)=>{
    const {type,brand,search} = res.query;;
    const filter = {
      ...(type && { type }),
      ...(brand && { brand }),
      ...(search && {
        $or: [{ vin: { $regex: search, $options: "i" } }],
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