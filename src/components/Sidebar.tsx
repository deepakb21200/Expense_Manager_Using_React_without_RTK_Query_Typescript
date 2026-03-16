import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { BiAddToQueue } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import "../CSS/Sidebar.css"

interface SidebarProps{
  setIsLoggedIn:(data:boolean)=>void
}

function Sidebar({setIsLoggedIn}:SidebarProps) {
    const navigate = useNavigate();
   const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };
  return (
    <ul className={`list  `}  >
      <li className='list-item'>
        <NavLink to='/' >
          <AiFillHome size={25} className='icon' />
          <div>Dashboard</div>
        </NavLink>
      </li>
      <li className='list-item'>
        <NavLink to='/add'>
          <BiAddToQueue size={25} className='icon' />
          <div>Add Expense</div>
        </NavLink>
      </li>
      <li className='list-item'>
        <NavLink to='/search' >
          <FiSearch size={25} className='icon' />
          <div>Search Expense</div>
        </NavLink>
      </li>
      <li className='list-item'>
        <NavLink to='/profile'>
          <BsFillPersonFill size={25} className='icon' />
          <div>Profile</div>
        </NavLink>
      </li>
      <li className='list-item'>
        <Link to='/' onClick={handleLogout}>
          <AiOutlineLogout size={25} className='icon' />
          <div>Logout</div>
        </Link>
      </li>
      <li className='list-item'>
        <Button variant='info' className='mode-toggle'>
          Toggle Dark / Light Mode
        </Button>
      </li>
    </ul>
  );
}

export default Sidebar