
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <li className='logo'><a href="/">PathFiller</a></li>
      <ul className="navbarList">
        <li><a href="/problemset">Problems</a></li>
        <li><a href="/codingplayground">CodingPlayground</a></li>
      </ul>
    </div>
  );
}

export default Navbar;
