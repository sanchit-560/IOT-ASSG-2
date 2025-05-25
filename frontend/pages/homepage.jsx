import { Header } from "../components/Header.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import React from "react";
import {Card} from "../components/Card.jsx";
import { useState, useEffect } from "react";
import api from "../services/api.js";


export const Homepage = () => {
 const [cars,setCars] = useState([]);

 const search = async ({search,brand,type})=>{
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
      console.log("Search results:", response.data);
     } catch (error) {
      console.error("Error searching cars:", error);
     }
 }

 useEffect(()=>{
  search({
    search: "",
    brand: "",
    type: ""
  })
 },[])

   return (
    <div>
      <Header/>
      <SearchBar search={search}/>
      <h1>Welcome to the Car Rental Service</h1>
      <p>Find your perfect car for rent.</p>
      <div className="grid grid-cols-3 gap-4">
        {cars.map((car) => (
          <Card key={car.vin} car={car} />
        ))}
      </div>
    </div>
  );
}