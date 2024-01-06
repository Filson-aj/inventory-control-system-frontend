import { images } from '../../../assets/constants/data'

const testimonialsData = [
  {
    id: 1,
    name: 'John Brewer',
    position: 'Craft Beer Enthusiast',
    testimonial: `
      I am continually impressed by the exceptional craft beers and warm atmosphere at this brewery. 
      The staff is knowledgeable and friendly, making every visit an enjoyable experience.
    `,
    image: images.image1
  },
  {
    id: 2,
    name: 'Alice Taster',
    position: 'Beer Tasting Aficionado',
    testimonial: `
      The beer selection here is outstanding. I've attended several tasting events and have always been delighted by the flavors.
      The team truly knows their craft.
    `,
    image: images.image2,
  },
  {
    id: 3,
    name: 'Sam Hophead',
    position: 'Loyal Patron',
    testimonial: `
      I've been a regular visitor to this brewery for years, and it never disappoints. 
      The unique brews and friendly staff create an exceptional brewery experience.
    `,
    image: images.image3,
  },
]

const Testimonials = () => {
  return (
    <section className='bg-gray-100 py-12'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8'>What Our Customers Are Saying</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className='bg-white p-6 rounded-lg shadow-md hover:border hover:border-yellow-400 transition-transform duration-300 hover:transform hover:-translate-y-2'>
              <div className='flex items-center mb-4'>
                <img
                  className='w-12 h-12 rounded-full mr-4'
                  src={testimonial.image}
                  alt={`${testimonial.name}'s Profile`}
                />
                <div>
                  <div className='font-semibold'>{testimonial.name}</div>
                  <div className='text-gray-500'>{testimonial.position}</div>
                </div>
              </div>
              <p className='text-gray-600 text-justify mb-4'>{testimonial.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials