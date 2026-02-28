import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Beranda from './components/beranda/Beranda'
import Tentang from './components/tentang/Tentang'
import Kepengurusan from './components/kepengurusan/Kepengurusan'
import Kontak from './components/kontak/Kontak'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/kepengurusan" element={<Kepengurusan />} />
          <Route path="/kontak" element={<Kontak />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
