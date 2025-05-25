import logo from '../src/assets/logo.png';
export const Header = () => {
  return (
    <div className="header">
    <div className='flex justify-between items-center h-24 max-w-[1400px] mx-auto px-4'>
       <div>
    <img className='h-16 w-16 rounded full' src={logo} alt="Website Logo"/>
       </div>
      <h1>Car Rental</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/cars">Reservation</a></li>
        </ul>
      </nav>
    </div>
    </div>
  );
}