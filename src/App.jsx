import Navbar from './components/Navbar'
import Tentang from './components/tentang/Tentang'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <Navbar />

      {/* Konten Utama Aplikasi */}
      <main className="pt-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-green-900 mt-10 tracking-tight">
            Selamat Datang di Portal
          </h1>

          {/* Contoh Card Konten */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          </div>
        </div>

        {/* Section Tentang */}
        <Tentang />
      </main>
    </div>
  )
}

export default App
