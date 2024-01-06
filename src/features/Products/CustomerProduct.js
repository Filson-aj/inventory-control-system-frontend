import { Fragment, memo } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { HiPlus } from 'react-icons/hi'

import { PORT } from '../../assets/constants/data'
import useAuth from '../../hooks/useAuth'
import { useGetCategoriesQuery } from '../../store/apis/categoriesApiSlice'

const CustomerProduct = ({ categoryId }) => {
    const { user } = useAuth(),
        status = user?.status

    const { category } = useGetCategoriesQuery('categoriesList', {
            selectFromResult: ({ data }) => ({
                category: data?.entities[categoryId]
            }),
        }),
        navigate = useNavigate()
  
    const handleEdit = () => navigate(`/dashboard/categories/${categoryId}`)

    const priceFormatter = price => `₦${price?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`

    return(
        <Fragment>
            <div className='flex flex-col justify-between bg-white shadow-lg border rounded hover:border-blue-500 transform transition-transform duration-500 hover:scale-105 hover:-translate-y-1'>
                <p className='bg-white border-b border-gray-200'>
                    <img src={`http://localhost:${PORT}/images/uploads/products/${category?.image}`} className='w-full h-48 object-cover' alt={`${category?.name}`} />
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Name:</span> {category?.name}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Per Unit Price: </span> {priceFormatter(category?.price)}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Description:</span>
                    {category?.description}
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Status:</span>
                    {category?.quantity > 0 ? <span className='bg-teal-300 px-2 py-1 rounded-full'>In Stock</span> : <span className='bg-red-300 px-2 py-1 rounded-full'>Out of Stock</span>}
                </p>
                {(status === 'Admin' || status === 'Staff') && <p className='flex justify-end items-center bg-gray-100 border-b border-gray-200 p-2'>
                    <button onClick={handleEdit}>
                        <span className=''><BiEdit size={20} /></span>
                    </button>
                </p>}
                {category?.quantity > 0 && (<p className='bg-white border-b border-gray-200 p-2 flex items-center justify-between'>
                    <input type='number' defaultValue={0} className='w-32 py-1 text-center px-2 border border-teal-200 active:border-sky-300 rounded-lg' min={1} max={100} />
                    <button className='bg-sky-300 hover:bg-sky-500 text-white font-fold p-2 rounded-lg ml-2 flex items-center'><span><HiPlus className='mr-2' /></span> Cart</button>
                </p>)}
            </div>
        </Fragment>
    )
}

const memoizedCustomerProduct = memo(CustomerProduct)

export default memoizedCustomerProduct