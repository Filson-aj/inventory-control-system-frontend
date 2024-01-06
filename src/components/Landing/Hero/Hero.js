import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='bg-gradient-to-b from-indigo-500 via-gray-300 to-amber-300 text-white h-screen flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>Welcome to Nigerian Breweries PLC. Enugu</h1>
        <p className='text-lg md:text-xl mb-8'>Crafting Exceptional Brews for You</p>
        <Link to='/brewery-tours' className='bg-white text-amber-800 py-2 px-6 rounded-full font-semibold hover:bg-amber-700 hover:text-white transition duration-300'>
          Explore Brewery Tours
        </Link>
      </div>
    </section>
  )
}

export default Hero