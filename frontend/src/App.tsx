import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CodingArena from './pages/CodingArena';
import CodingPlayground from './pages/CodingPlayground';
import CodingBattleGround from './pages/CodingBattleGround';
import Home from './pages/Home';
import Footer from './components/common/Footer';
import ProblemSet from './pages/ProblemSet';
import NotFound from './pages/NotFound';


function App() {
  return (
    <>
      <div className='min-h-screen w-full'>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/codingarena/:id" element={<CodingArena />} />
            <Route path="/codingplayground" element={<CodingPlayground />} />
            <Route path="/codingbattleground" element={<CodingBattleGround />} />
            <Route path="/problemset" element={<ProblemSet />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  )
}

export default App
