import logo from '../src/assets/logo.png';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const handleHomeClick = () =>{
    navigate('/');
  }

  const handleReservationClick = () =>{
    navigate('/bookingPage');
  }

  return (
    <div className="header">
    <div className='flex justify-between items-center h-24 max-w-[1400px] mx-auto px-4'>
       <div>
    <img className='h-16 w-16 rounded full' src={logo} alt="Website Logo"/>
       </div>
      <h1 className='text-center text-3xl font-bold'>Rental Central </h1>
      <nav>
        <ul className='flex flex-row'>
          <li className='px-4'><button className='font-medium justify-between p-4 hover:bg-sky-400 rounded-xl m-2 cursor-pointer duration-300 hover:text-black' onClick={handleHomeClick}>Home</button></li>
          <li className='px-4'><button className='font-medium justify-between p-4 hover:bg-sky-400 rounded-xl m-2 cursor-pointer duration-300 hover:text-black'onClick={handleReservationClick}>Reservation</button></li>
        </ul>
      </nav>
    </div>
    </div>
  );
}