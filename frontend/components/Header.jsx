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
    <div className='bg-white/90 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-10'>
      <div className='flex justify-between items-center h-24 max-w-[1200px] mx-auto px-8'>
       <div className='flex items-center gap-8'>
    <img className='h-16 w-16 rounded-lg shadow-md' src={logo} alt="Website Logo"/>
       </div>
      <h1 className='text-center text-3xl font-bold'>Rental Central </h1>
      <nav className='bg-white/50 rounded-xl p-2'>
        <ul className='flex gap-6'>
          <li><button className='font-medium justify-between px-6 py-3 hover:bg-sky-400 rounded-xl m-2 cursor-pointer duration-300 hover:text-black' onClick={handleHomeClick}>Home</button></li>
          <li><button className='font-medium justify-between px-6 py-3 hover:bg-sky-400 rounded-xl m-2 cursor-pointer duration-300 hover:text-black'onClick={handleReservationClick}>Reservation</button></li>
        </ul>
      </nav>
      </div>
    </div>

  );
}