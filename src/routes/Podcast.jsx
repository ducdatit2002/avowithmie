import Transition from '../utils/Transition'
import First from '../assets/podcast/first.png'
import Second from '../assets/podcast/second.png'
import Card from '../assets/podcast/card.png'

export default function Podcast() {
  return (
    <Transition className='flex flex-grow overflow-auto flex-col bg-light_bg px-4 py-2'>
      <h1 className='text-5xl text-left font-bold text-font_small mb-4'>Podcast</h1>
      <div className='flex flex-wrap justify-center gap-4'>
        <img className='h-64 w-auto' src={First} alt='First img' />
        <img className='h-64 w-auto' src={Second} alt='Second img' />
      </div>
      <h4 className='text-3xl text-left font-bold text-font_small mt-8 mb-4'>Most watched</h4>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div className='bg-card_bg rounded-lg p-4 flex flex-col items-center' key={index}>
            <img className='h-auto w-auto rounded-lg' src={Card} alt='Card img' />
            <div className='text-center'>
              <h4 className='font-bold text-lg mt-2'>DEAR MEDIA</h4>
              <h3 className='font-bold text-xl mt-1'>A few or things by a kind</h3>
              <h4 className='font-bold text-lg mt-1'>POPSUGAR</h4>
            </div>
          </div>
        ))}
      </div>
    </Transition>
  )
}
