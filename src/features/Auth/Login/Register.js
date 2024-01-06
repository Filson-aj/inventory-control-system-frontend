import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { styles, urls } from '../../../assets/constants/data'
import { customerSchema } from '../../../assets/schema/schema'
import { useRegisterUserMutation } from '../../../store/apis/usersApiSlice'
import { useAddNewCustomerMutation } from '../../../store/apis/customersApiSlice'
import { setMessage, resetMessage, selectCurrentMessage } from '../../../store/slice/messagesSlice'
import { setSpinner, selectCurrentSpinner } from '../../../store/slice/spinnerSlice'
import MessageBox from '../../../components/uis/MessageBox/MessageBox'
import Spinner from '../../../components/uis/Spinner/Spinner'

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({defaultValues: {
        roles: ['Customer'],
    }, resolver: yupResolver(customerSchema), mode: 'onBlur'})

    const [addNewCustomer] = useAddNewCustomerMutation()

    const [registerUser, {
        isSuccess: registerSuccess
    }] = useRegisterUserMutation()

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const onSave = async(data) =>{
        const status = true
        let title = 'Customer Authentication', type, text
        dispatch(setSpinner({ visibility: true }))

        try {
            const res = await registerUser({ email: data?.email, password: data?.password, confirm_password: data?.confirm_password, roles: data?.roles})
            if(registerSuccess || !res.data.error){
                const user = res?.data?.data
                const name = {
                    firstname: data?.firstname,
                    surname: data?.surname,
                    othername: data?.othername 
                }
                const contact = {
                    phone: data?.phone,
                    address: data?.address
                }
                const response = await addNewCustomer({ name, gender: data?.gender, contact, user: user.id })

                if(response?.error){
                    type = 'Error'
                    console.log(response)
                    text = response?.error?.data?.message || 'Customer user authentication error'
                }else{
                    type = 'Success'
                    text = 'You have been successfully authenticated! Please proceed to login!!'
                }
            }else{
                type = 'Error'
                text = res?.data?.message || 'An error occured while authenticating customer user!'
            }
            dispatch(setSpinner({ visibility: false }))
            dispatch(setMessage({ status, type, text, title }))
        } catch (err) {
            dispatch(setSpinner({ visibility: false }))
            type = 'Error'
            text = err.data?.message || 'Something weng wrong'
            dispatch(setMessage({ status, type, text, title }))
        }
    }
    
    const onDismiss = () =>{
        dispatch(resetMessage())
        if(message.type === 'Success'){
            navigate(`/${urls.signin}`)
        }
    }
    return (
        <div className='bg-gradient-to-r from-indigo-500 via-gray-300 to-amber-200 min-h-screen flex justify-center items-center'>
            {spinner && <Spinner />}
            {message?.status && <MessageBox open message={message?.text} title={message?.title} close={onDismiss} />}
            <div className='container mx-auto flex justify-center items-center'>
                <div className='w-1.5/3 bg-white p-8 rounded-lg shadow-lg text-gray-800 my-6'>
                    <h2 className='text-xl font-bold text-center mb-8 border-b border-gray-200 pb-2'>Customer Authenticaton</h2>
                    <form onSubmit={handleSubmit(onSave)}>
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
                        <div className='mb-2 border-t border-gray-200 mt-4 pt-2'>
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
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='password' className='block font-bold mb-2 text-sm'>
                                Password
                            </label>
                            <input 
                                type='password' 
                                name='password' 
                                id='password' 
                                className={styles.input} 
                                required
                                {...register('password')} 
                                placeholder='••••••••'
                                aria-invalid={errors.password ? 'true' : 'false'} />
                            {errors.password && <p style={{color: 'red', fontSize: '10pt'}}>{errors.password.message}</p>}
                        </div>
                        <div className=''>
                            <label htmlFor='confirm_password' className='block font-bold mb-2 text-sm'>
                                Confirm Password
                            </label>
                            <input 
                                type='password' 
                                name='confirm_password' 
                                id='confirm_password' 
                                className={styles.input} 
                                required
                                {...register('confirm_password')} 
                                placeholder='••••••••'
                                aria-invalid={errors.confirm_password ? 'true' : 'false'} />
                            {errors.confirm_password && <p style={{color: 'red', fontSize: '10pt'}}>{errors.confirm_password.message}</p>}
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-blue-700 hover:bg-blue-500 text-white font-bold py-3 
                            px-4 rounded-xl shadow-lg mt-3'>
                            Register
                        </button>
                    </form>
                    <p className='mt-4 text-center text-gray-500 text-gray-700'>
                        Already have an account?{' '}
                        <NavLink to={`/${urls.signin}`} className='text-blue-500 hover:text-blue-600 font-semibold'>
                            Log in
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register