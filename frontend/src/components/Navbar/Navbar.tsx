
import { CODING_PLAYGROUND_ROUTE, PROBLEM_SET_ROUTE } from '@/routes';
import { Button } from '../ui/button';
import './Navbar.css';
import HomeRoute from '../HomeRoute';

const Navbar = () => {
  return (
    <div className="navbar">
      <li className='logo'>
        <HomeRoute />
      </li>
      <ul className="navbarList flex items-center px-4">
        <li>
          <Button className='mr-3 bg-black'>
            <a href={PROBLEM_SET_ROUTE}>Problems</a>
          </Button>
        </li>

        <li>
          <Button variant="brandorange">
            <a href={CODING_PLAYGROUND_ROUTE}>Try Playground !</a>
          </Button>
        </li>
      </ul>
    </div >
  );
}

export default Navbar;
