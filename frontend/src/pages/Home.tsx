import Footer from '@/components/Footer/Footer'
import Features from '@/components/Features/Features'
import Hero from '@/components/Hero/Hero'
import { AnimatedListDemo } from '@/components/Leaderboard/Leaderboard'
import Navbar from '@/components/Navbar/Navbar'
import CodeBlocks from '@/components/CodeBlocks/CodeBlocks'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <Hero />
      <Features />
      {/* <AnimatedBeamDemo/> */}
      <AnimatedListDemo />
      <CodeBlocks />
      <Footer />
    </div>
  )
}

export default Home
