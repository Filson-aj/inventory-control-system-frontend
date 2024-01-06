import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { categorySchema } from '../../assets/schema/schema'
import useTitle from '../../hooks/useTitle'
import { useAddNewCategoryMutation } from '../../store/apis/categoriesApiSlice'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messagesSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const NewCategoryForm = () => {
    useTitle('Create: New Category')
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(categorySchema), mode: 'onBlur'})

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const [addNewCategory, {
        isSuccess, 
    }] = useAddNewCategoryMutation()

    const onSave = async(data) =>{
        const status = true
        let title = 'New Category Record', type, text

        dispatch(setSpinner({ visibility: true }))

        try {            
            const response = await addNewCategory(data)
            if(response?.error){
                type = 'Error'
                text = response?.error?.data?.message || 'Something went wrong'
            }else{
                type = 'Success'
                text = response?.data?.message || 'Category records has been saved successfully!'
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
           navigate('/dashboard/categories')
        }
    }

    const onCancel = () =>{
        navigate('/dashboard/categories')
    }

    const content = (
    <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
        <div className='w-full px-6 py-6 bg-white dark:text-gray-800
            border rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSave)} >
                <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                    <h2 className='text-xl font-bold text-center pb-2 '>New Category</h2>
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
                    <label htmlFor='name' className='block font-bold mb-2 text-sm'>
                        Name
                    </label>
                    <input type='text' name='name' id='name' className={styles.input} required
                        {...register('name')} placeholder='Enter your first name'
                        aria-invalid={errors.name ? 'true' : 'false'} />
                    {errors.name && <p className='text-red-400 text-sm'>{errors.name.message}</p>}
                </div>
                <div className='mb-2'>
                    <label htmlFor='price' className='block font-bold mb-2 text-sm'>
                        Price
                    </label>
                    <input type='number' name='price' id='price' className={styles.input} required
                        {...register('price')}
                        aria-invalid={errors.price ? 'true' : 'false'} />
                    {errors.price && <p className='text-red-400 text-sm'>{errors.price.message}</p>}
                </div>
                <div className='mb-2'>
                    <label htmlFor='quantity' className='block font-bold mb-2 text-sm'>
                        Quantity
                    </label>
                    <input 
                        type='number' 
                        name='quantity' 
                        id='quantity' 
                        min={1}
                        max={500}
                        className={styles.input}
                        {...register('quantity')}  />
                </div>
                <div className='mb-2'>
                    <label htmlFor='description' className='block font-bold mb-2 text-sm'>
                        Description
                    </label>
                    <textarea name='description' id='description' rows={4} className={styles.input} 
                        {...register('description')}
                        placeholder='Enter Description' 
                        aria-invalid={errors.description ? true : false}></textarea>
                    {errors.description && <p style={{color: 'red', fontSize: '10pt'}}>
                        {errors.description.message}</p>}
                </div>
                <div className=''>
                  <label className='block mb-2 font-bold text-md' htmlFor='image'>Image</label>
                  <input type='file'  name='image'  id='image' accept='image/*' className={styles.input} {...register('image')} />
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

export default NewCategoryForm