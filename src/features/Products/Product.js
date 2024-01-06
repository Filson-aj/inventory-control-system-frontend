import { Fragment, memo } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import { PORT } from '../../assets/constants/data'
import useAuth from '../../hooks/useAuth'
import { useGetProductsQuery } from '../../store/apis/productsApiSlice'

const Product = ({ productId }) => {
    const { user } = useAuth(),
        status = user?.status

    const { product } = useGetProductsQuery('productsList', {
            selectFromResult: ({ data }) => ({
                product: data?.entities[productId]
            }),
        }),
        navigate = useNavigate()
  
    const handleEdit = () => navigate(`/dashboard/products/${productId}`)

    const priceFormatter = price => `₦${price?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`

    return(
        <Fragment>
            <div className='flex flex-col justify-between bg-white shadow-lg border rounded hover:border-blue-500 transform transition-transform duration-500 hover:scale-105 hover:-translate-y-1'>
                <p className='bg-white border-b border-gray-200'>
                    <img src={`http://localhost:${PORT}/images/uploads/products/${product?.category?.image}`} className='w-full h-48 object-cover' alt={`${product?.category?.name}`} />
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Product ID:</span> {product?.productid}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Name: </span> {product?.category?.name}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Price:</span>
                    {priceFormatter(product?.category?.price)}
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Manufacture date:</span>
                    {moment(product?.manufacturedate).format('YYYY/MM/DD')}
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Expire date:</span>
                    {moment(product?.expiredate).format('YYYY/MM/DD')}
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

const memoizedProduct = memo(Product)

export default memoizedProduct