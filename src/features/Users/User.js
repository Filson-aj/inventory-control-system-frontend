import { Fragment, memo } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import moment from 'moment/moment'

import useAuth from '../../hooks/useAuth'
import { useGetUsersQuery } from '../../store/apis/usersApiSlice'

const User = ({ userId }) => {
    const { user: currentUser } = useAuth(),
        status = currentUser?.status

    const { user } = useGetUsersQuery('usersList', {
            selectFromResult: ({ data }) => ({
                user: data?.entities[userId]
            }),
        }),
        navigate = useNavigate()

    let role = 'Patient'
  
    const handleEdit = () => navigate(`/dashboard/users/${userId}`)

    if(user?.roles?.includes('Clerk')) role = 'Clerk'
    if(user?.roles?.includes('Technician')) role = 'Technician'
    if(user?.roles?.includes('Doctor')) role = 'Doctor'
    if(user?.roles?.includes('Admin')) role = 'Admin'

    return(
        <Fragment>
            <div className='flex flex-col justify-between bg-white shadow-lg border rounded hover:border-blue-500 transform transition-transform duration-500 hover:scale-105 hover:-translate-y-1'>
                <h2 className='font-bold text-lg text-teal-400 bg-white border-b border-gray-200 p-2'>{user?.email}</h2>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Role:</span> {role}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Created On:</span> {moment.utc(user?.createdAt).format('ddd D MMM,  YYYY')}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Last Modified:</span> {moment.utc(user?.updatedAt).format('ddd D MMM,  YYYY')}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Status:</span>
                    {user?.active ? <span className='text-teal-500 font-semibold'>Active</span> : <span className='text-red-400'>Invactive</span>}
                </p>
                {status === 'Admin' && <p className='flex justify-end items-center bg-gray-100 border-b border-gray-200 p-2'>
                    <button onClick={handleEdit}>
                        <span className=''><BiEdit size={20} /></span>
                    </button>
                </p>}
            </div>
        </Fragment>
    )
}

const memoizedUser = memo(User)

export default memoizedUser