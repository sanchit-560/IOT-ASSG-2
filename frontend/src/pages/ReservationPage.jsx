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
        if(!availabilityOFCar){
            setOrderStatus("Fail");
            const updatedCar = {...lastSelectedCar, isAvailable: false};
            setLastSelectedCar(updatedCar);
            localStorage.setItem('lastSelectedCar', JSON.stringify(updatedCar));
            setIsSubmitting(false);
            return;
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