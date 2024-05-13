//import { useSelector } from 'react-redux'
import { useLocation, Route, Routes } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Searchbar from './components/Searchbar'
import Home from './routes/Home'
import Podcast from './routes/Podcast'
import Book from './routes/Book'
import Playlist from './routes/Playlist'
import Booklist from './routes/Booklist'
import Header from './components/Header'
import MusicPlayer from './components/MusicPlayer'
import LoginPage from './routes/LoginSign/Login'
import RegisterPage from './routes/LoginSign/Register'

const App = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className='relative flex'>
      {!isHomePage && <Sidebar />}
      <div className={`flex-1 flex flex-col ${isHomePage ? '' : 'ml-[var(--sidebar-width)]'}`}>
        <div className='flex justify-between items-center p-4 shadow-md'>
          {!isHomePage && <Searchbar />}
          {!isHomePage && <Header />}
        </div>
        <div className='px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
          <div className='flex-1 h-fit pb-40'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/podcast' element={<Podcast />} />
              <Route path='/playlist' element={<Playlist />} />
              <Route path='/book' element={<Book />} />
              <Route path='/booklist' element={<Booklist />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
      </div>

      {!isHomePage && (
        <div className='absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-background  z-10'>
          <MusicPlayer />
        </div>
      )}
    </div>
  )
}

export default App
