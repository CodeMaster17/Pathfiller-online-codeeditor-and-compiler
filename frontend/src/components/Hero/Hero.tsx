import './Hero.css';
import { Button } from '../ui/button';
import GridPattern from '../magicui/grid-pattern';
import { cn } from '@/lib/utils';

const Hero = () => {
  return (
    <header className="header">
      <h1 className="header-title">The Battleground for <span className='coders'>Coders</span>. Compete, <span className='coders'>Code</span>, Create.</h1>
      <p className="header-subtitle">Every challenge is an opportunity to showcase your coding process and rise above the rest.Your code is your craft; let every keystroke reflect your dedication to excellence.</p>
      <div className="header-buttons">
        {/* <Button className='bg-[#ffa825] text-black m-3 hover:bg-[#ff9800] text-lg'>Sign Up</Button> */}
        <Button className='bg-[#ffa825] text-black m-3 hover:bg-[#ff9800] text-lg'><a href="/codingplayground">Start Coding</a></Button>
      </div>
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
    </header>
  );
}

export default Hero;
