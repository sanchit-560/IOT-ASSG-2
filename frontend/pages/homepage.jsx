import { Header } from "../components/Header.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import React from "react";
import {Card} from "../components/Card.jsx";
import { useState, useEffect } from "react";
import api from "../services/api.js";


export const Homepage = () => {
 const [cars,setCars] = useState([]);
 const [suggestions, setSuggestions] = useState([]);

 
 // function handling suggestions

 const searchHandler = async ({search,brand,type})=>{
     try {
      const response = await api.get('/cars',{
        params:{
          search: search,
          brand: brand,
          type: type
        }
      })
      console.log(response.request)
      setSuggestions(response.data);
      console.log("Search results:", response.data);
     } catch (error) {
      console.error("Error searching cars:", error);
     }
 }
// function for handling search with the filter, uses the sam logic as above 
 const submitHandler = async ({search,brand,type})=>{
     try {
      const response = await api.get('/cars',{
        params:{
          search: search,
          brand: brand,
          type: type
        }
      })
      console.log(response.request)
      setCars(response.data);
      setSuggestions([]);
      console.log("Search results:", response.data);
     } catch (error) {
      console.error("Error searching cars:", error);
     }
 }

 useEffect(()=>{
  submitHandler({search: "", brand: "", type: ""});
 },[])

   return (
    <div>
      <Header/>
      <SearchBar onSearch={searchHandler} onSubmit={submitHandler} clearSuggestions={()=>setSuggestions([])}/>
      {/* Displaying Suggestions */}
      {suggestions.length>0 && (
        <div className="absolute z-10 bg-white border rounded w-full max-h-60 overflow-y-auto shadow">
          {suggestions.slice(0,3).map((car) => (
            <div key={car.vin} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={()=>{setCars([car]);setSuggestions([])}}>
              {car.name} - ${car.pricePerDay}/day
            </div>
          ))}
        </div>
      )}
      <div className="container mx-auto my-8 mt-8">
      <h1 className="pl-8 text-center text-lg text-gray-600 mt-2">Welcome to the Car Rental Service</h1>
      <p className="pl-8 text-center font-medium">Find your perfect car for rent.</p>
      </div>
      {/* Displaying the cars */}
      <div className="grid grid-cols-3 gap-4">
        {cars.map((car) => (
          <Card key={car.vin} car={car} />
        ))}
      </div>
    </div>
  );
}