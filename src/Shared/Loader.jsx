import Lottie from 'lottie-react'
import React from 'react'
import animalLoader from '../assets/lotties/AnimalLoading.json'

function Loader() {
  return (
    <div className='flex justify-center items-center h-[80vh]'>
        <div>
            <Lottie animationData={animalLoader} className='h-48 md:h-72' loop={true}/>
            <p className='text-center -mt-8'><span className='text-xl font-black md:text-3xl text-primary'>Loading...</span></p>
        </div>
    </div>
  )
}

export default Loader