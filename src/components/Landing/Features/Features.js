import React from 'react'
import { FaBeer, FaMugHot, FaWineBottle } from 'react-icons/fa'
import './Snowfall.css' // Import the snowfall effect CSS

const featuresData = [
  {
    id: 1,
    title: 'Craft Brews',
    description: 'Explore a variety of handcrafted brews with unique flavors.',
    icon: <FaBeer className='feature-icon text-4xl' />,
    color: 'bg-yellow-500',
  },
  {
    id: 2,
    title: 'Brewery Tours',
    description: 'Take guided tours to learn about our brewing process and history.',
    icon: <FaMugHot className='feature-icon text-4xl' />,
    color: 'bg-orange-500',
  },
  {
    id: 3,
    title: 'Tasting Events',
    description: 'Join us for tasting events featuring our finest brews.',
    icon: <FaWineBottle className='feature-icon text-4xl' />,
    color: 'bg-red-500',
  },
]

const Features = () => {
  return (
    <section className='relative py-12 bg-gray-100 overflow-hidden'>
      <div className='container mx-auto text-center mb-8'>
        <h2 className='text-3xl font-bold text-gray-800'>Explore Our Unique Brewery Features</h2>
      </div>
      <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative'>
        {featuresData.map((feature, index) => (
          <div
            key={feature.id}
            className='feature-card bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:-translate-y-2 relative'
          >
            <div className={`icon-container ${feature.color} text-white rounded-full p-4 mb-4 mx-auto relative`}>
              {feature.icon}
            </div>
            <h3 className='text-lg font-semibold mb-4'>{feature.title}</h3>
            <p className='text-gray-600'>{feature.description}</p>
          </div>
        ))}

        {/* Snowfall effect */}
        {[...Array(80)].map((_, index) => (
          <div
            key={index}
            className='snowflake'
            style={{ left: `${Math.random() * 100}%`, '--delay': Math.random() }}
          />
        ))}
      </div>
    </section>
  )
}

export default Features