import Transition from '../utils/Transition'
import { Link } from 'react-router-dom'
import Bg from '../assets/home/bg.png'
export default function Home() {
  return (
    <Transition className='flex justify-center items-center py-20 px-24'>
      <div className='py-10 px-10 bg-gradient-to-r from-bg_top from-0% via-bg_mid via-56% to-bg_bottom to-100%'>
        {/* Header */}
        <div className='flex justify-items-center'>
          <div className='flex w-5/6 text-[1.5rem] text-dark_bg'>
            <ul className='flex flex-grow justify-between'>
              <li className='flex w-full justify-center'>
                <Link className='p-4' to='/'>
                  Home
                </Link>
              </li>
              <li className='flex w-full justify-center'>
                <Link className='p-4' to='/podcast'>
                  Pocast
                </Link>
              </li>
              <li className='flex w-full justify-center'>
                <Link className='p-4' to='/book'>
                  Book
                </Link>
              </li>
            </ul>
          </div>
          <div className='flex w-1/4 gap-6'>
            <Link to='/login'>
              <button className='text-2xl items-center my-3 bg-light_bg hover:bg-dark_bg text-font_small font-bold px-4 border border-dark_bg rounded-lg'>
                Login please
              </button>
            </Link>
          </div>
        </div>
        <div className='flex w-5/6 flex-grow justify-between'>
          {/* Content */}
          <div className='flex flex-grow flex-col py-10 px-10 items-center'>
            <h2 className='text-8xl '> For inspire you grow</h2>
            <p className='text-2xl py-10'>
              We have the best podcasts about movies, politics, music inspiration, relationship, and more.{' '}
            </p>
            <div className='flex-col space-x-14'>
              <Link to='/podcast'>
                <button className='text-3xl items-center my-3 bg-light_bg hover:bg-dark_bg text-font_small font-bold py-2 px-4 border border-dark_bg rounded-lg'>
                  Listening
                </button>
              </Link>
              <Link to='/book'>
                <button className='text-3xl items-center my-3 bg-light_bg hover:bg-dark_bg text-font_small font-bold py-2 px-4 border border-dark_bg rounded-lg'>
                  Reading
                </button>
              </Link>
            </div>
          </div>
          {/* Picture */}
          <div className='flex flex-grow justify-center flex-col'>
            <img className='scale-150 inline-block h-auto w-140 rounded-lg' src={Bg} alt='bg img' />
          </div>
        </div>
      </div>
    </Transition>
  )
}
