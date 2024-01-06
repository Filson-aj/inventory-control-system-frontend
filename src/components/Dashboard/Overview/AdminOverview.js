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

const AdminDashboard = () => {
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
      description: 'Manage and update staff information and records.',
      link: '/dashboard/staffs',
    },
    {
      icon: <FaUsers />,
      title: 'Customers',
      description: 'Manage customer information and preferences.',
      link: '/dashboard/customers',
    },
    {
      icon: <FaTags />,
      title: 'Categories',
      description: 'Manage product categories and attributes.',
      link: '/dashboard/categories',
    },
    {
      icon: <FaBeer />,
      title: 'Products',
      description: 'Manage brewery products and inventory.',
      link: '/dashboard/products',
    },
    {
      icon: <FaShoppingCart />,
      title: 'Orders',
      description: 'Manage customer orders and sales.',
      link: '/dashboard/orders',
    },
    {
      icon: <FaMoneyBill />,
      title: 'Sales',
      description: 'View and analyze sales data and reports.',
      link: '/dashboard/sales',
    },
  ]

  return (
    <div className='bg-gray-100 min-h-screen py-8 rounded shadow-xl border'>
      <h1 className='text-3xl font-semibold mb-8 border-b border-gray-200 pb-4 px-4'>Admin Dashboard</h1>

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

export default AdminDashboard