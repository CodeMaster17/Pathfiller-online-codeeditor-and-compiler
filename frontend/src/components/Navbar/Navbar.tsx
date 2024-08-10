import { Button } from '../ui/button';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className='logo'>PathFiller</h1>
      <ul className="navbarList">
        <li><a href="#home">Problems</a></li>
        <li><a href="#contest">Contest</a></li>
        <li><a href="#discuss">Discuss</a></li>
        <li><a href="#documents">Documents</a></li>
      </ul>
      <Button className='bg-[#ffa825] text-black m-3 hover:bg-[#ff9800] text-lg'>Sign Up</Button>
    </div>
  );
}

export default Navbar;
