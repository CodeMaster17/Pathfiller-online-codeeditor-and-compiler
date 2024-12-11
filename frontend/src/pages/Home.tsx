
import Features from '@/components/Features/Features'
import HeroAreaBrainwave from '@/components/Hero/HeroAreaBrainwave'
import { HeroAreaModal } from '@/components/HeroAreaModal'
import HeaderBrainwave from '@/components/Navbar/HeaderBrainwave'
import { useEffect, useState } from 'react'

const Home = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  useEffect(() => {
    setOpenModal(true)
  }, [])
  const handleModalClose = () => setOpenModal(false)
  return (
    <>
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden bg-s1'>
        <HeroAreaModal open={openModal} onClose={handleModalClose} />
        <HeaderBrainwave />
        <HeroAreaBrainwave />
        <Features />
      </div>
    </>
  )
}

export default Home
