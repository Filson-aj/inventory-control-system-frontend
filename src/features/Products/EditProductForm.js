import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { HiTrash } from 'react-icons/hi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { productSchema } from '../../assets/schema/schema'
import { useGetCategoriesQuery } from '../../store/apis/categoriesApiSlice'

const EditProductForm = ({ product, onSave, onDelete, onCancel  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({defaultValues: {
    id: product?.id,
    manufacturedate: product?.manufacturedate,
    expiredate: product?.expiredate,
    category: product?.category?._id,
  }, resolver: yupResolver(productSchema), mode: 'onBlur'})

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
  
  const content = (
    <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
        <div className='w-full px-6 py-6 bg-white dark:text-gray-800
            border rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSave)}>
              <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                <h2 className='text-xl font-bold text-center pb-2 '>Update Product's Records</h2>
                <div className='flex justify-end py-2 mb-2'>
                  <button
                      type='submit'
                      className='mr-2 px-3 py-1.5 cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center text-white'
                      title='Save'><span className='mr-2'><FiSave size={20} /></span> Save</button>
                  <button
                    type='button'
                    className='px-3 py-1.5 cursor-pointer bg-red-500 hover:bg-red-400 rounded-md disabled:bg-red-300 disabled:cursor-not-allowed flex items-center text-white'
                    title='Delete'
                    onClick={onDelete}><span className='mr-2'><HiTrash size={20} /></span> Delete</button>
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

  return content
}

export default EditProductForm