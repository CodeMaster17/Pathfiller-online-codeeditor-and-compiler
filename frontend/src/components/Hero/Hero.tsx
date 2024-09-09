import './Hero.css';
import { Button } from '../ui/button';
import { CODING_PLAYGROUND_ROUTE, PROBLEM_SET_ROUTE } from '@/routes';
import GridPatternSquares from '../ui/GridPattern';

const HeroArea = () => {
  return (
    <header className="header">
      <h1 className="header-title">The Battleground for <span className='coders'>Coders</span>. Compete, <span className='coders'>Code</span>, Create.</h1>
      <p className="header-subtitle">Every challenge is an opportunity to showcase your coding process and rise above the rest.
        <br />
        Your code is your craft. Let every keystroke reflect your dedication to excellence.</p>
      <div className="header-buttons">
        <Button className='bg-brand-orange text-black m-3 hover:bg-brand-orange-s text-lg'>
          <a href={CODING_PLAYGROUND_ROUTE}>Start with Playground</a>
        </Button>
        <Button className='border-2 border-brand-orange text-white m-3 hover:bg-brand-orange hover:text-black text-lg'>
          <a href={PROBLEM_SET_ROUTE}>Try Battleground</a>
        </Button>
      </div>
      <GridPatternSquares />
    </header>
  );
}

export default HeroArea;
