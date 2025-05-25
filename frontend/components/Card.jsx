import { useNavigate } from 'react-router-dom';

export const Card = ({ car }) => {
    const navigate = useNavigate();

    const handleRentClick = (e) => {
        e.preventDefault();
        localStorage.setItem('lastSelectedCar', JSON.stringify(car));
        console.log('Navigating to booking page...');
        navigate('/bookingPage', { replace: true });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105">
            <img
                src={car.Image}
                alt={car.name}
                className="w-40 h-28 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-1">{car.name}</h2>
            <p className="text-gray-600 mb-1">{car.brand}</p>
            <p className="text-gray-500 mb-2">{car.type}</p>
            <p className="text-green-700 font-bold mb-1">Price: ${car.pricePerDay}</p>
            <p className="text-blue-700 mb-4">Mileage: {car.mileage} km</p>
            <p className="text-blue-700 mb-4">Available: {car.isAvailable ? "Yes" : "No"}</p>
            {car.isAvailable ? (
                <button 
                    onClick={handleRentClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full"
                >
                    Rent Now
                </button>
            ) : (
                <button className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed w-full">
                    Not Available
                </button>
            )}
        </div>
    );
}