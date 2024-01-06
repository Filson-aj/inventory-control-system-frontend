import { Fragment, memo } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { PORT } from '../../assets/constants/data'
import useAuth from '../../hooks/useAuth'
import { useGetCategoriesQuery } from '../../store/apis/categoriesApiSlice'

const Category = ({ categoryId }) => {
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
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Category:</span> {category?.name}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Per Unit Price: </span> {priceFormatter(category?.price)}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Description:</span>
                    {category?.description}
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Quantity:</span>
                    {category?.quantity}
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Status:</span>
                    {category?.quantity > 0 ? <span className='bg-teal-300 px-2 py-1 rounded-full'>In Stock</span> : <span className='bg-red-300 px-2 py-1 rounded-full'>Out of Stock</span>}
                </p>
                {(status === 'Admin' || status === 'Staff') && <p className='flex justify-end items-center bg-gray-100 border-b border-gray-200 p-2'>
                    <button onClick={handleEdit}>
                        <span className=''><BiEdit size={20} /></span>
                    </button>
                </p>}
            </div>
        </Fragment>
    )
}

const memoizedCategory = memo(Category)

export default memoizedCategory