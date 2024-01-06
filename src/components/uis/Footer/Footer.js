import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import { Clock } from 'react-feather'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {/* Quick Links */}
        <div>
          <h2 className='text-lg font-bold mb-4'>Quick Links</h2>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/brewery-tours'>Brewery Tours</Link></li>
            <li><Link to='/beer-selection'>Beer Selection</Link></li>
            <li><Link to='/events-promotions'>Events & Promotions</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className='text-lg font-bold mb-4'>Contact Us</h2>
          <p>123 Brewery Lane</p>
          <p>City, Country</p>
          <p>Email: info@example.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>

        {/* Working Hours */}
        <div>
          <h2 className='text-lg font-bold mb-4'>Tasting Room Hours</h2>
          <ul>
            <li>
              <Clock size={16} className='inline-block mr-2' />
              Monday - Friday: 4 pm - 9 pm
            </li>
            <li>
              <Clock size={16} className='inline-block mr-2' />
              Saturday: 12 pm - 7 pm
            </li>
            <li>
              <Clock size={16} className='inline-block mr-2' />
              Sunday: Closed
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className='text-lg font-bold mb-4'>Connect With Us</h2>
          <ul className='flex space-x-4'>
            <li>
              <Link to='https://facebook.com' target='_blank' rel='noopener noreferrer'>
                <FaFacebook size={24} />
              </Link>
            </li>
            <li>
              <Link to='https://twitter.com' target='_blank' rel='noopener noreferrer'>
                <FaTwitter size={24} />
              </Link>
            </li>
            <li>
              <Link to='https://instagram.com' target='_blank' rel='noopener noreferrer'>
                <FaInstagram size={24} />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className='mt-8 text-center border-y border-gray-600 py-3'>
        <h2 className='text-lg font-bold mb-2'>Subscribe to Our Brewery Updates</h2>
        <p>Stay updated with the latest brews and events.</p>
        <form className='flex justify-center mt-4 text-gray-800'>
          <input
            type='email'
            placeholder='Your Email'
            className='p-2 border border-white rounded-l focus:outline-none'
            required
          />
          <button type='submit' className='bg-pink-500 text-white p-2 rounded-r hover:text-xl hover:font-bold'>
            Subscribe
          </button>
        </form>
      </div>

      {/* Copyright and Disclaimer */}
      <div className='bg-gray-900 p-4 text-center text-sm text-gray-100'>
        <p>&copy; 2023.</p>
        <p>Your Brewery Name</p>
      </div>
    </footer>
  )
}

export default Footer