import Transition from '../utils/Transition'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <Transition className='bg-light_bg w-1/5'>
      <div className='flex w-3/4 flex-col'>
        <div className='px-8 py-4 border-b'>
          <h1 className='text-4xl font-bold text-[#405944]'>AVO</h1>
        </div>
        <div className='flex flex-col p-8 border-b'>
          <Link to='/' className='my-3 text-black text-2xl'>
            Home
          </Link>
          <Link to='/podcast' className='my-3 text-black text-2xl'>
            Podcast
          </Link>
          <Link to='/playlist' className='my-3 text-black text-2xl'>
            Playlist
          </Link>
          <Link to='/book' className='my-3 text-black text-2xl'>
            Book
          </Link>
          <Link to='/booklist' className='my-3 text-black text-2xl'>
            Booklist
          </Link>
        </div>
        <div className='mt-auto px-4 py-4'>
          <button className='w-full bg-gray-800 text-white p-2 rounded'>Darkmode</button>
        </div>
      </div>
    </Transition>
  )
}
