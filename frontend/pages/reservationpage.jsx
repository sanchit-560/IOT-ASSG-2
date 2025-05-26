import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';

// a  function to validate the form present on the page
function validateForm(formData) {
    const error = {};
    if(!formData.customerName.trim()){
        error.name = 'Name is required';
    }
    if(!formData.customerEmail.trim()){
        error.email = 'Email is required';
        //to check vaild mobile no
    }
     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail.trim())) {
        error.email = 'Enter a valid email address';
    }
    //to check vaild email
     if (!/^04\d{8}$/.test(formData.customerPhone.trim())) {
        error.phone = 'Enter a valid Australian mobile number (e.g. 0491234567)';
    }
    if(!formData.customerPhone.trim()){
        error.phone = 'Phone is required';
    }
    //valid date check
    if (!formData.startDate) {
        error.startDate = 'Start date is required';
    } else { 
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const selected = new Date(formData.startDate);
    
        if (selected < today) {
            error.startDate = 'Start date cannot be past date';
        }
    }
    if(!formData.totalDays || formData.totalDays < 1){
        error.totalDays = 'Minimum 1 day is required';
    }
    return error;
}

export const ReservationPage = () => {
    const navigate = useNavigate();
    const [lastSelectedCar, setLastSelectedCar] = useState(() => {
        const car = JSON.parse(localStorage.getItem('lastSelectedCar'));
        console.log('Initial car data:', car);
        return car;
    });
    // setting up the empty form
    const [form,setForm] = useState(()=> JSON.parse(localStorage.getItem("reservationForm")) || {
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        startDate: '',
        totalDays: ''
    });
    const [errors,setErrors] = useState({});
    const[isSubmitting,setIsSubmitting] = useState(false);
    const [orderStatus, setOrderStatus] = useState(null);
    const[fieldUsed,setFieldUsed] = useState({});
    
    useEffect(() => {
        console.log('Current orderStatus:', orderStatus);
        console.log('Current lastSelectedCar:', lastSelectedCar);
    }, [orderStatus, lastSelectedCar]);

    // function to store the form data in the local storage
    useEffect(()=>{
        const validationErrors = validateForm(form);
        setErrors(validationErrors);
        localStorage.setItem("reservationForm",JSON.stringify(form));
    },[form]);
    
    // if there car object in local storage 
    if(!lastSelectedCar){

        return <div className='pt-40'>
             <div className='text-center text-2xl font-bold'>Currently no car is selected, please return to the main menu and select a car.<br/>
            Happy Rentals
                </div>;
             <div className='flex justify-center'>
                <button className='font-medium justify-between p-4 hover:bg-sky-400 rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
                    onClick={() => {
                        localStorage.removeItem("reservationForm");
                        localStorage.removeItem("lastSelectedCar");
                        navigate("/");
                    }}>
                    Return to Homepage
                </button>
                </div>
        </div>
    }


     // check order status
    if(orderStatus === "Success"){
        return (
            <div className='pt-40'>
                <h2 className='text-center text-2xl font-bold'>Reservation Successful!</h2>
                <p className='text-center'>Your car has been reserved.</p>
                <div className='flex justify-center'>
                <button className='font-medium justify-between p-4 hover:bg-sky-400 rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
                    onClick={() => {
                        localStorage.removeItem("reservationForm");
                        localStorage.removeItem("lastSelectedCar");
                        navigate("/");
                    }}>
                    Return to Homepage Now
                </button>
                </div>
            </div>
        );
    }
    // check order status
    if(orderStatus === "Fail"){
        return (
            <div className='pt-40'>
                <h2 className='text-center text-2xl font-bold'>Reservation Unsuccessful!</h2>
                <p className='text-center'>The car is no longer available for booking. This could be because:</p>
                <ul className='text-center'>
                    <li>• The car was just booked by another customer</li>
                    <li>• The car's availability status has changed</li>
                </ul>
                <p className='text-center'>Please select another car from our available inventory.</p>
                <div className='flex justify-center'>
                <button className='font-medium justify-between p-4 hover:bg-sky-400 rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
                    onClick={() => {
                        localStorage.removeItem("reservationForm");
                        localStorage.removeItem("lastSelectedCar");
                        navigate("/");
                    }}>
                    Return to Homepage
                </button>
                </div>
            </div>
        );
    }


    // if the car is unavailable for rental
    if(!lastSelectedCar.isAvailable){
        return <div className='text-center text-2xl font-bold'>The selected car is not available for rental at the moment.<br/>
            Please select another car.
        </div>;
    }

    const totalPrice = lastSelectedCar.pricePerDay * form.totalDays;

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setForm({...form,[name]:value});
    }

    const handleBlur = (e) => {
        const {name} = e.target;
        setFieldUsed({...fieldUsed,[name]:true});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldUsed({
            customerName: true,
            customerEmail: true,
            customerPhone: true,
            startDate: true,
            totalDays: true
        });
        
        const validationErrors = validateForm(form);
        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            
            const availabilityOFCar = await api.get(`/cars/${lastSelectedCar.vin}/availability`);
            if(!availabilityOFCar.data.isAvailable){
                setOrderStatus("Fail")
                const updatedCar = {...lastSelectedCar,isAvailable:false}
                setLastSelectedCar(updatedCar)
                localStorage.setItem('lastSelectedCar',JSON.stringify(updatedCar))
                setIsSubmitting(false)
                alert('The car is no longer available')
                return
            }

            const orderData = {
                vin: lastSelectedCar.vin,
                customerName: form.customerName,
                customerEmail: form.customerEmail,
                customerPhone: form.customerPhone,
                startDate: form.startDate,
                totalDays: parseInt(form.totalDays)
            }; 
            console.log("Submitting order to API with data:", orderData);
            const response = await api.post("/orders", orderData);
            const orderId = response.data._id;
            console.log(orderId);
            await api.put(`/orders/confirm/${orderId}`);
            console.log("API response:", response);
        
            if (response.status === 201) {
                console.log("Order created successfully!");
                
                // Update car availability in both state and localStorage
                const updatedCar = {
                    ...lastSelectedCar,
                    isAvailable: false
                };
                setLastSelectedCar(updatedCar);
                localStorage.setItem("lastSelectedCar", JSON.stringify(updatedCar));
                console.log("Updated car availability:", updatedCar);
                
                localStorage.removeItem("reservationForm");
                console.log("Cleared reservation form data from localStorage.");
                
                setOrderStatus("Success");
            } else {
                console.warn("Order creation failed. Response status:", response.status);
                setOrderStatus("Fail");
            }
        } catch (err) {
            console.error('Reservation failed:', err);
            if (err.response && err.response.status === 404) {
                setOrderStatus("Fail");
                const updatedCar = {
                    ...lastSelectedCar,
                    isAvailable: false
                };
                setLastSelectedCar(updatedCar);
                localStorage.setItem("lastSelectedCar", JSON.stringify(updatedCar));
            } else {
                setOrderStatus("Fail");
            }
        } finally {
            console.log("Order submission attempt finished. isSubmitting will be set to false.");
            setIsSubmitting(false);
        }
    };

    const handleCancel = () =>{
        localStorage.removeItem("reservationForm");
         navigate("/");
    }

    return (
        <div className="p-5 max-w-2xl mt-32 mx-auto">
            <Header />
            <div className='flex flex-row items-center gap-20'>
               <div className="mb-5">
                <h1 className="text-2xl font-bold mb-2">{lastSelectedCar.name}</h1>
                <p className="my-1">{lastSelectedCar.brand}</p>
                <p className="my-1">{lastSelectedCar.type}</p>
                <p className="my-1">${lastSelectedCar.pricePerDay} per day</p>
                <p className="my-1">{lastSelectedCar.mileage} km</p>
                 </div>
                <div>
               <img className="w-40 h-auto object-cover rounded" src={lastSelectedCar.Image} alt={lastSelectedCar.name} />
                </div>
            </div>
            <form onSubmit={handleSubmit} className="border border-gray-300 p-5 rounded-lg">
                <div className="mb-4">
                    <label className="block mb-2">Full Name:</label>
                    <input
                        type="text"
                        name="customerName"
                        value={form.customerName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {fieldUsed.customerName && errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Email:</label>
                    <input
                        type="email"
                        name="customerEmail"
                        value={form.customerEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {fieldUsed.customerEmail && errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Phone Number:</label>
                    <input
                        type="tel"
                        name="customerPhone"
                        value={form.customerPhone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {fieldUsed.customerPhone && errors.phone && <p className="text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {fieldUsed.startDate && errors.startDate && <p className="text-red-500 mt-1">{errors.startDate}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Number of Days:</label>
                    <input
                        type="number"
                        name="totalDays"
                        min="1"
                        value={form.totalDays}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {fieldUsed.totalDays && errors.totalDays && <p className="text-red-500 mt-1">{errors.totalDays}</p>}
                </div>

                {form.totalDays > 0 && (
                    <div className="mb-4 p-3 bg-gray-50 rounded">
                        <p className="font-bold m-0">Total Price: ${totalPrice}</p>
                    </div>
                )}

                <div className="flex gap-3 justify-end">
                    <button 
                        type="button" 
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded bg-gray-50 hover:bg-gray-100">
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                        {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
                    </button>
                </div>
            </form>
        </div>
    );
} 