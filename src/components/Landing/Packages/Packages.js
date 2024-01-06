const packagesData = [
  {
    id: 1,
    title: 'Brewery Tour Package',
    description: 'Explore our brewery with a guided tour and tasting experience.',
    price: '₦35,000',
  },
  {
    id: 2,
    title: 'Tasting Event Package',
    description: 'Join our special tasting event and sample a variety of craft brews.',
    price: '₦52,500',
  },
  {
    id: 3,
    title: `Beer Lover's Bundle',
    description: 'A curated bundle for beer enthusiasts, featuring exclusive brews.',
    price: '₦70,000`,
  },
]

const Packages = () => {
  return (
    <section className='bg-gray-100 py-12'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8'>Brewery Packages & Offers</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {packagesData.map((packageItem) => (
            <div
              key={packageItem.id}
              className='bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1'
            >
              <h3 className='text-lg font-semibold mb-2'>{packageItem.title}</h3>
              <p className='text-gray-600 mb-4'>{packageItem.description}</p>
              <div className='text-2xl font-bold text-indigo-700'>{packageItem.price}</div>
              <button className='mt-4 bg-pink-700 text-white py-2 px-4 rounded-full hover:bg-pink-600 transition duration-300'>
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Packages