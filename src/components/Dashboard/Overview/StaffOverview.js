import { Link } from 'react-router-dom'
import { FaFileMedical, FaHospitalUser, FaUsers, FaClipboard, FaCog, FaHeartbeat, FaFilePrescription, FaFlask, FaNotesMedical } from 'react-icons/fa'

import { urls } from '../../../assets/constants/data'

const DoctorOverview = () => {
  const modules = [
    {
      icon: <FaCog />,
      title: 'Dashboard',
      description: 'Overview of system activities and statistics.',
      link: `/${urls.dashboard}`
    },
    {
      icon: <FaFileMedical />,
      title: 'Patients',
      description: 'Manage and update patient information and records.',
      link: `/dashboard/${urls.patients}`
    },
    {
      icon: <FaHospitalUser />,
      title: 'Medical Staff',
      description: 'Medical staff management module for administrative tasks.',
      link: `/dashboard/${urls.staffs}`
    },
    {
      icon: <FaUsers />,
      title: 'Appointments',
      description: 'Manage and schedule medical appointments.',
      link: `/dashboard/${urls.appointments}`
    },
    {
      icon: <FaClipboard />,
      title: 'Medical Records',
      description: 'Enter and manage medical records for patients.',
      link: `/dashboard/${urls.medicalRecord}`
    },
    {
        icon: <FaNotesMedical />,
        title: 'Medical Data',
        description: 'Manage and access patient medical data.',
        link: `/dashboard/${urls.medicalData}`
    },
    {
      icon: <FaHeartbeat />,
      title: 'Disease',
      description: 'Track and manage information about diseases.',
      link: `/dashboard/${urls.diseases}`
    },
    {
      icon: <FaFilePrescription />,
      title: 'Prescriptions',
      description: 'Manage and track patient prescriptions.',
      link: `/dashboard/${urls.prescriptions}`
    },
    {
      icon: <FaFlask />,
      title: 'Lab Results',
      description: 'View and manage laboratory test results.',
      link: `/dashboard/${urls.lab}`
    },
  ]

  return (
    <div className='bg-gray-100 min-h-screen py-8 rounded shadow-xl border'>
      <h1 className='text-3xl font-semibold mb-8 border-b border-gray-200 pb-4 px-4'>Doctor Dashboard</h1>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8'>
        {modules.map((module, index) => (
          <Link
            key={index}
            to={module.link}
            className='p-4 bg-white rounded-lg shadow-md hover:border hover:border-blue-400 transform transition-transform duration-500 hover:scale-105 hover:-translate-y-1'
          >
            <div className='text-4xl text-blue-500 mb-2'>{module.icon}</div>
            <h3 className='text-xl font-semibold mb-2'>{module.title}</h3>
            <p className='text-gray-600'>{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DoctorOverview