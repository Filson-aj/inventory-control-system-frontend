import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { productSchema } from '../../assets/schema/schema'
import useTitle from '../../hooks/useTitle'
import { useAddNewProductMutation } from '../../store/apis/productsApiSlice'
import { useGetCategoriesQuery } from '../../store/apis/categoriesApiSlice'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messagesSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const NewProductForm = () => {
    useTitle('Create: New Product')
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(productSchema), mode: 'onBlur'})

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const [addNewProduct, {
        isSuccess, 
    }] = useAddNewProductMutation()

    const { data: categories } = useGetCategoriesQuery('categoriesList')

    const newcategories = []

    categories?.ids?.map(id => {
        newcategories.push({
            _id: categories?.entities[id]?._id,
            categoryid: categories?.entities[id]?.categoryid,
            name: categories?.entities[id]?.name,
            price: categories?.entities[id]?.price,
        })
        return true
    })

    const categoriesoptions = newcategories.map(newcategory => <option key={newcategory?._id} value={newcategory?._id}>{newcategory?.name}</option>)


    const onSave = async(data) =>{
        const payload = {
            manufacturedate: data?.manufacturedate,
            expiredate: data?.expiredate,
            category: data?.category,
        }
        const status = true
        let title = 'New Product Record', type, text

        dispatch(setSpinner({ visibility: true }))

        try {
            const response = await addNewProduct(payload)
            if(response?.error){
                type = 'Error'
                text = response?.error?.data?.message || 'Something went wrong'
            }else{
                type = 'Success'
                text = response?.data?.message || 'New product has been added successfully!'
            }
            dispatch(setSpinner({ visibility: false }))
            dispatch(setMessage({ status, type, text, title }))
        } catch (err) {
            //console.log(err)
            dispatch(setSpinner({ visibility: false }))
            type = 'Error'
            text = err.data?.message || 'Something weng wrong'
            dispatch(setMessage({ status, type, text, title }))
        }
    }

    const onDismiss = () =>{
        dispatch(resetMessage())
        if(isSuccess || message.type === 'Success'){
           navigate('/dashboard/products')
        }
    }

    const onCancel = () =>{
        navigate('/dashboard/products')
    }

    const content = (
    <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
        <div className='w-full px-6 py-6 bg-white dark:text-gray-800
            border rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSave)}>
                <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                    <h2 className='text-xl font-bold text-center pb-2 '>New Product</h2>
                    <div className='flex justify-end py-2 mb-2'>
                    <button
                        type='submit'
                        className='mr-2 px-3 py-1.5 cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center text-white'
                        title='Save'><span className='mr-2'><FiSave size={20} /></span> Save</button>
                    <button
                        type='button'
                        className='px-3 py-1.5 cursor-pointer bg-red-400 hover:bg-yellow-400 rounded-md disabled:bg-yellow-300 disabled:cursor-not-allowed flex items-center text-white ml-4'
                        title='Cancel'
                        onClick={onCancel}><span className='mr-2'><X size={20} /></span> Cancel</button>
                    </div>
                </div>
                <div className='mb-2'>
                    <label htmlFor='manufacturedate' className='block font-bold mb-2 text-sm'>
                        Manufacture Date
                    </label>
                    <input type='date' name='manufacturedate' id='manufacturedate' className={styles.input} required
                        {...register('manufacturedate')} aria-invalid={errors.manufacturedate ? 'true' : 'false'} />
                    {errors.manufacturedate && <p className='text-red-400 text-sm'>{errors.manufacturedate.message}</p>}
                </div>
                <div className='mb-2'>
                    <label htmlFor='expiredate' className='block font-bold mb-2 text-sm'>
                        Expire Date
                    </label>
                    <input type='date' name='expiredate' id='expiredate' className={styles.input} required
                        {...register('expiredate')} aria-invalid={errors.expiredate ? 'true' : 'false'} />
                    {errors.expiredate && <p className='text-red-400 text-sm'>{errors.expiredate.message}</p>}
                </div>
                <div className='mb-2'>
                    <label htmlFor='category' className='block font-bold mb-2 text-sm'>
                        Category
                    </label>
                    <select 
                        name='category' 
                        id='category' 
                        className={styles.input} 
                        {...register('category')} 
                        required
                        aria-invalid={errors.category ? 'true' : 'false'}>
                            <option value={``}>---Select---</option>
                            {categoriesoptions}
                        </select>
                    {errors.category && <p style={{color: 'red', fontSize: '10pt'}}>{errors.category.message}</p>}
                </div>
            </form>
        </div>
    </div>)

    return (
        <>
            {spinner && <Spinner />}
            {message.status && <MessageBox open message={message.text} title={message.title} close={onDismiss} />}
            {content}
        </>
    )
}

export default NewProductForm