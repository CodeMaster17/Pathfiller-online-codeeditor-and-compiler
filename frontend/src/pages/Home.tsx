
import { LeaderboardDemo } from '@/components/Leaderboard/Leaderboard'
import Navbar from '@/components/Navbar/Navbar'
import CodeBlocks from '@/components/CodeBlocks/CodeBlocks'
import Features from '@/components/Features/Features'
import HeroArea from '@/components/Hero/Hero'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <HeroArea />
      <Features />
      <LeaderboardDemo />
      <CodeBlocks />
    </div>
  )
}

export default Home
