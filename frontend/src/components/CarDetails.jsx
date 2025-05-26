import React, { useState } from 'react';

const CarDetails = () => {
    const [lastSelectedCar, setLastSelectedCar] = useState(() => {
        const car = JSON.parse(localStorage.getItem('lastSelectedCar'));
        console.log('Initial car data:', car);
        
        // If we have a car, check its availability
        if (car?.vin) {
            const checkAvailability = async () => {
                try {
                    const response = await fetch(`/api/cars/${car.vin}/availability`);
                    const data = await response.json();
                    if (data.isAvailable !== undefined) {
                        setLastSelectedCar(prev => ({
                            ...prev,
                            isAvailable: data.isAvailable
                        }));
                    }
                } catch (error) {
                    console.error('Error checking car availability:', error);
                }
            };
            checkAvailability();
        }
        
        return car;
    });

    return (
        <div>
            {/* Your component JSX here */}
        </div>
    );
};

export default CarDetails; 