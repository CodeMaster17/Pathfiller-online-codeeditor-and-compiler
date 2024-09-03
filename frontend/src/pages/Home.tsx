import Footer from '@/components/Footer/Footer'
import Hero from '@/components/Hero/Hero'
import { AnimatedListDemo } from '@/components/Leaderboard/Leaderboard'
import Navbar from '@/components/Navbar/Navbar'
import CodeBlocks from '@/components/CodeBlocks/CodeBlocks'
import Features from '@/components/Features/Features'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <Hero />
      <Features />
      <AnimatedListDemo />
      <CodeBlocks />
      <Footer />
    </div>
  )
}

export default Home
