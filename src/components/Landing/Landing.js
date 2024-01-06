import Features from './Features/Features'
import Testimonials from './Testimonials/Testimonials'
import Packages from './Packages/Packages'
import Hero from './Hero/Hero'

const Landing = () => {
  return (
    <article className='flex flex-col w-full bg-gray-100 text-gray-900'>
        <Hero />
        <Features />
        <Testimonials />
        <Packages />
    </article>
  )
}

export default Landing