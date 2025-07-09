import Section from '@/Shared/Section'
import React from 'react'
import CategoryCard from './CategoryCard'
import { Dog,Cat,Rabbit,Bird, Fish, Rat } from 'lucide-react'

const icons=[
  {
    icon:<Dog size={35} className="text-orange-600"/>,
    iconName:"Dog"
  },
  {
    icon: <Cat size={35} className="text-green-600"/>,
    iconName:"Cat"
  },
  {
    icon:<Rabbit size={35} className="text-blue-600"/>,
    iconName:"Rabbit"
  },
  {
    icon:<Bird size={35} className="text-slate-600"/>,
    iconName:"Bird"
  },
  {
    icon:<Fish size={35} className="text-pink-600"/>,
    iconName:"Fish"
  },
  {
    icon:<Rat size={35} className="text-cyan-600"/>,
    iconName:"Others"
  }
]


function PetCategories() {
  return (
    <Section>
        <h2>Explore Pet Categories</h2>
        <div className='mt-5 xs:justify-items-center sm:justify-items-start gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {icons.map((items)=><CategoryCard icon={items.icon} iconName={items.iconName}/>)}
        </div>
    </Section>
  )
}

export default PetCategories