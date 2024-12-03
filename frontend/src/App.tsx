import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import CodingArena from './pages/CodingArena';
import CodingPlayground from './pages/CodingPlayground';
import Home from './pages/Home';

import Footer from './components/Footer/Footer';
import NotFound from './pages/NotFound';
import ProblemSet from './pages/ProblemSet';


function App() {
  return (
    <>
      <div className='min-h-screen w-full bg-s1'>
        <Router>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/codingarena/:id" element={<CodingArena />} />
            <Route path="/codingplayground" element={<CodingPlayground />} />
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
