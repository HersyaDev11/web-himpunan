import Navbar from './components/Navbar'
import Beranda from './components/beranda/Beranda'
import Tentang from './components/tentang/Tentang'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <Navbar />

      <main>
        {/* Section Beranda */}
        <Beranda />

        {/* Divider */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-green-300/50 to-transparent" />
        </div>

        {/* Section Tentang */}
        <Tentang />
      </main>

      <Footer />
    </div>
  )
}

export default App
