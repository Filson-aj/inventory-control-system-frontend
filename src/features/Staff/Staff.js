import { Fragment, memo } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { useGetStaffsQuery } from '../../store/apis/staffsApiSlice'

const Staff = ({ staffId }) => {
    const { user } = useAuth(),
        status = user?.status

    const { staff } = useGetStaffsQuery('staffsList', {
            selectFromResult: ({ data }) => ({
                staff: data?.entities[staffId]
            }),
        }),
        navigate = useNavigate()
  
    const handleEdit = () => navigate(`/dashboard/staffs/${staffId}`)
    
    let role = 'Customer'
    if(staff?.user?.roles?.includes('Staff')) role = 'Staff'
    if(staff?.user?.roles?.includes('Admin')) role = 'Admin'

    return(
        <Fragment>
            <div className='flex flex-col justify-between bg-white shadow-lg border rounded hover:border-blue-500 transform transition-transform duration-500 hover:scale-105 hover:-translate-y-1'>
                <h2 className='font-bold text-lg text-teal-400 bg-white border-b border-gray-200 p-2'>{`${staff?.name?.firstname} ${staff?.name?.othername} ${staff?.name?.surname}`}</h2>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Staff ID:</span> {staff?.staffid}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Gender: </span> {staff?.gender}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Email:</span>
                    {staff?.user?.email}
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Phone:</span>
                    {staff?.contact?.phone}
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Address:</span>
                    {staff?.contact?.address}
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Role:</span>
                    {role}
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

const memoizedStaff = memo(Staff)

export default memoizedStaff