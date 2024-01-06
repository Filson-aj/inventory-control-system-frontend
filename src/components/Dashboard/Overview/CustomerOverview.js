import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaUser,
  FaBeer,
  FaTags,
  FaShoppingCart,
  FaMoneyBill,
  FaUsers,
  FaCog,
} from 'react-icons/fa'

const CustomerDashboard = () => {
  const modules = [
    {
      icon: <FaCog />,
      title: 'Dashboard',
      description: 'Overview of brewery activities and statistics.',
      link: '/dashboard',
    },
    {
      icon: <FaUser />,
      title: 'Staff',
      description: 'View and update staff information and records.',
      link: '/dashboard/staffs',
    },
    {
      icon: <FaTags />,
      title: 'Categories',
      description: 'View product categories and attributes.',
      link: '/dashboard/categories',
    },
    {
      icon: <FaBeer />,
      title: 'Products',
      description: 'View brewery products and inventory.',
      link: '/dashboard/products/customer',
    },
    {
      icon: <FaShoppingCart />,
      title: 'Orders',
      description: 'View customer orders and sales.',
      link: '/dashboard/orders',
    },
  ]

  return (
    <div className='bg-gray-100 min-h-screen py-8 rounded shadow-xl border'>
      <h1 className='text-3xl font-semibold mb-8 border-b border-gray-200 pb-4 px-4'>Customer Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8'>
        {modules.map((module, index) => (
          <Link
            key={index}
            to={module.link}
            className='p-4 bg-white rounded-lg shadow-md hover:border hover:border-teal-400 transform transition-transform duration-500 hover:scale-105 hover:-translate-y-1'
          >
            <div className='text-4xl text-teal-500 mb-2'>{module.icon}</div>
            <h3 className='text-xl font-semibold mb-2'>{module.title}</h3>
            <p className='text-gray-600'>{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CustomerDashboard