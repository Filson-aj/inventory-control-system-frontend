import { Fragment, memo } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { useGetCustomersQuery } from '../../store/apis/customersApiSlice'

const Customer = ({ customerId }) => {
    const { user } = useAuth(),
        status = user?.status

    const { customer } = useGetCustomersQuery('customersList', {
            selectFromResult: ({ data }) => ({
                customer: data?.entities[customerId]
            }),
        }),
        navigate = useNavigate()
  
    const handleEdit = () => navigate(`/dashboard/customers/${customerId}`)
    
    let role = 'Customer'
    if(customer?.user?.roles?.includes('Customer')) role = 'Customer'
    if(customer?.user?.roles?.includes('Admin')) role = 'Admin'

    return(
        <Fragment>
            <div className='flex flex-col justify-between bg-white shadow-lg border rounded hover:border-blue-500 transform transition-transform duration-500 hover:scale-105 hover:-translate-y-1'>
                <h2 className='font-bold text-lg text-teal-400 bg-white border-b border-gray-200 p-2'>{`${customer?.name?.firstname} ${customer?.name?.othername} ${customer?.name?.surname}`}</h2>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Customer ID:</span> {customer?.customerid}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Gender: </span> {customer?.gender}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Email:</span>
                    {customer?.user?.email}
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Phone:</span>
                    {customer?.contact?.phone}
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Address:</span>
                    {customer?.contact?.address}
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

const memoizedCustomer = memo(Customer)

export default memoizedCustomer