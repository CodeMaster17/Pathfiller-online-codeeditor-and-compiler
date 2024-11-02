
import CodeBlocks from '@/components/CodeBlocks/CodeBlocks'
import Features from '@/components/Features/Features'
import HeroAreaBrainwave from '@/components/Hero/HeroAreaBrainwave'
import { LeaderboardDemo } from '@/components/Leaderboard/Leaderboard'
import HeaderBrainwave from '@/components/Navbar/HeaderBrainwave'

const Home = () => {
  return (
    <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
      {/* <Header />
      <div className={`bg-dark-fill-3 ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <HeroArea />
        </div>
      </div> */}
      <HeaderBrainwave />
      <HeroAreaBrainwave />
      <Features />
    </div>
  )
}

export default Home
