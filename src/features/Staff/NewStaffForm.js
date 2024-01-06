import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { staffSchema } from '../../assets/schema/schema'
import { ROLES } from '../../configs/roles'
import useTitle from '../../hooks/useTitle'
import { useAddNewStaffMutation } from '../../store/apis/staffsApiSlice'
import { useAddNewUserMutation } from '../../store/apis/usersApiSlice'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messagesSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const NewStaffForm = () => {
    useTitle('Create: New Staff')
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(staffSchema), mode: 'onBlur'})

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const [addNewStaff, {
        isSuccess, 
    }] = useAddNewStaffMutation()

    const [addNewUser, {
        isSuccess: signupSuccess
    }] = useAddNewUserMutation()

    const rolesOptions = Object.values(ROLES).map(role => <option key={role} value={role}>{role}</option>)

    const onSave = async(data) =>{
        const payload = {
            name: {
                firstname: data?.firstname,
                surname: data?.surname,
                othername: data?.othername,
            },
            gender: data?.gender,
            contact: {
                phone: data?.phone,
                address: data?.address,
            },
        }
        const status = true
        let title = 'New Staff Record', type, text

        dispatch(setSpinner({ visibility: true }))

        try {
            const res = await addNewUser({ email: data?.email, password: data?.password, confirm_password: data?.confirm_password, roles: data?.roles})
            const user = res?.data?.data
            payload.user = user?.id
            
            if(signupSuccess || !res.data?.error){
                const response = await addNewStaff(payload)
                if(response?.error){
                    type = 'Error'
                    text = response?.error?.data?.message || 'Something went wrong'
                }else{
                    type = 'Success'
                    text = response?.data?.message || 'Staff records has been saved successfully!'
                }
            }else{
                type = 'Error'
                text = res?.data?.message || 'An error occured while save new staff record!'
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
           navigate('/dashboard/staffs')
        }
    }

    const onCancel = () =>{
        navigate('/dashboard/staffs')
    }

    const content = (
    <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
        <div className='w-full px-6 py-6 bg-white dark:text-gray-800
            border rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSave)}>
                <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                    <h2 className='text-xl font-bold text-center pb-2 '>New Staff</h2>
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
                <div className='mb-2 flex flex-row justify-between'>
                    <div className='mr-3 w-1/2'>
                        <label htmlFor='firstname' className='block font-bold mb-2 text-sm'>
                            First name
                        </label>
                        <input type='text' name='firstname' id='firstname' className={styles.input} required
                            {...register('firstname')} placeholder='Enter your first name'
                            aria-invalid={errors.firstname ? 'true' : 'false'} />
                        {errors.firstname && <p className='text-red-400 text-sm'>{errors.firstname.message}</p>}
                    </div>
                    <div className='mr-3 w-1/2'>
                        <label htmlFor='surname' className='block font-bold mb-2 text-sm'>
                            Surname
                        </label>
                        <input type='text' name='surname' id='surname' className={styles.input} required
                            {...register('surname')} placeholder='Enter your surname'
                            aria-invalid={errors.surname ? 'true' : 'false'} />
                        {errors.surname && <p className='text-red-400 text-sm'>{errors.surname.message}</p>}
                    </div>
                    <div className='mr-0 w-1/2'>
                        <label htmlFor='othername' className='block font-bold mb-2 text-sm'>
                            Other name
                        </label>
                        <input type='text' name='othername' id='othername' className={styles.input}
                            {...register('othername')} placeholder='Enter your other name' />
                    </div>
                </div>
                <div className='mb-2'>
                    <div className='inline-flex items-center text-sm ml-2'>
                        <label htmlFor='gender' className='block font-bold text-sm
                            mr-6'>
                            Gender
                        </label>
                        <input type='radio' name='gender' id='male' value='Male' {...register('gender')} />
                        <label className='font-semibold px-2' 
                            htmlFor='male'>Male</label>
                        <input type='radio' name='gender' id='female' value='Female'
                            {...register('gender')} />
                        <label className='font-semibold px-2' 
                            htmlFor='female'>Female</label>
                        {errors.gender && <p style={{color: 'red', fontSize: '10pt'}}>{errors.gender.message}</p>}
                    </div>
                </div>
                <div className='mb-2'>
                    <label htmlFor='phone' className='block font-bold mb-2 text-sm'>
                        Phone Number
                    </label>
                    <input type='tel' name='phone' id='phone' className={styles.input} required
                        {...register('phone')} placeholder='Your Phone Number'
                        aria-invalid={errors.phone ? 'true' : 'false'} />
                    {errors.phone && <p className='text-red-400 text-sm'>{errors.phone.message}</p>}
                </div>
                <div className='mb-2'>
                    <label htmlFor='email' className='block font-bold mb-2 text-sm'>
                        Email
                    </label>
                    <input 
                        type='email' 
                        name='email' 
                        id='email' 
                        className={styles.input} 
                        required
                        {...register('email')} 
                        placeholder='Enter your email'
                        aria-invalid={errors.email ? 'true' : 'false'} />
                    {errors.email && <p style={{color: 'red', fontSize: '10pt'}}>{errors.email.message}</p>}
                    <input 
                        type='hidden' 
                        name='password' 
                        id='password' 
                        value={'password'}
                        {...register('password')} />
                    <input 
                        type='hidden' 
                        name='confirm_password' 
                        id='confirm_password' 
                        value={'password'}
                        {...register('confirm_password')} />
                </div>
                <div className='mb-2'>
                    <label htmlFor='address' className='block font-bold mb-2 text-sm'>
                        Address
                    </label>
                    <textarea name='address' id='address' rows={4} className={styles.input} 
                        {...register('address')}
                        placeholder='Enter Contact Address' 
                        aria-invalid={errors.address ? true : false}></textarea>
                    {errors.address && <p style={{color: 'red', fontSize: '10pt'}}>
                        {errors.address.message}</p>}
                </div>
                <div className=''>
                  <label className='block mb-2 font-bold text-md' htmlFor='roles'>Roles</label>
                  <select 
                      id='roles'
                      name='roles'
                      className={`${styles.input}`}
                      multiple={true}
                      size={3}
                      /* value={roles} */
                      {...register('roles')}>{rolesOptions}</select>
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

export default NewStaffForm