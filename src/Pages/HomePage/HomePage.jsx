import React from 'react'
import Carousel from './Carousel'
import PetCategories from './PetCategories'
import CallToAction from './CallToAction'
import OurMission from './OurMission'
import SuccessStories from './SuccessStories'
import ImpactStats from './ImpactStats'

function HomePage() {
  return (<>
    <PetCategories/>
    <CallToAction/>
    <OurMission/>
    <SuccessStories/>
    <ImpactStats/>
  </>
  )
}

export default HomePage