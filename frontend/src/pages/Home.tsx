
import Features from '@/components/Features/Features'
import HeroAreaBrainwave from '@/components/Hero/HeroAreaBrainwave'
import HeaderBrainwave from '@/components/Navbar/HeaderBrainwave'

const Home = () => {
  return (
    <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden bg-s1'>
      <HeaderBrainwave />
      <HeroAreaBrainwave />
      <Features />
    </div>
  )
}

export default Home
