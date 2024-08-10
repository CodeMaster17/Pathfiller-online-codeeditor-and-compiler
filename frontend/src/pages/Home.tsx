import Footer from '@/components/Footer/Footer'
import Features from '@/components/Features/Features'
import Hero from '@/components/Hero/Hero'
import { AnimatedListDemo } from '@/components/Leaderboard/Leaderboard'
import Navbar from '@/components/Navbar/Navbar'
// import { AnimatedBeamDemo } from '@/components/DiscussionForum/DiscussionForum'
import CodeBlocks from '@/components/CodeBlocks/CodeBlocks'
// import { Alert } from '../components/ui/alert'
// import { Button } from '../components/ui/button'

const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <Hero/>
        <Features/>
        {/* <AnimatedBeamDemo/> */}
        <AnimatedListDemo/>
        <CodeBlocks/>
        <Footer/>
    </div>
  )
}

export default Home
