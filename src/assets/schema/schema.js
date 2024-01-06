import * as yup from 'yup'

//login form schema definition
export const signinSchema = yup.object().shape({
    email: yup.string().email().required('Your email address is required'),
    password: yup.string().min(8).max(32).required(),
})

export const userSchema = yup.object().shape({//scheme for signup form
    email: yup.string().email().required('Please provide email address'),
})

export const newUserSchema = yup.object().shape({//scheme for signup form
    email: yup.string().email().required('Please provide your email address'),
    password: yup.string().min(8).max(32).required('Please enter your password'),
    confirm_password: yup.string().min(8).max(32).required('Please confirm your password')
        .oneOf([yup.ref('password'), null], 'Password mismatch. Please make sure your password match'),
})

export const signupSchema = yup.object().shape({//scheme for signup form
    email: yup.string().email().required('Please provide your email address'),
    password: yup.string().min(8).max(32).required('Please enter your password'),
    confirm_password: yup.string().min(8).max(32).required('Please confirm your password')
        .oneOf([yup.ref('password'), null], 'Password mismatch. Please make sure your password match'),
})

export const staffSchema = yup.object().shape({//schema for staff data
    firstname: yup.string().required(`First name is required`),
    surname: yup.string().required(`Surname is required`),
    gender: yup.string().required(`Gender is required`),
    phone: yup.string().required(`Phone number is required`),
    address: yup.string().required(`Address is required`),
    email: yup.string().email().required('Email address is required'),
    password: yup.string().min(8).max(32).required('Password is required'),
    confirm_password: yup.string().min(8).max(32).required('Confirm password is required')
        .oneOf([yup.ref('password'), null], 'Passwords does not match'),
})
export const staffsSchema = yup.object().shape({//schema for staff data
    firstname: yup.string().required(`First name is required`),
    surname: yup.string().required(`Surname is required`),
    gender: yup.string().required(`Gender is required`),
    phone: yup.string().required(`Phone number is required`),
    address: yup.string().required(`Address is required`),
})

export const customerSchema = yup.object().shape({//schema for customer data
    firstname: yup.string().required(`First name is required`),
    surname: yup.string().required(`Surname is required`),
    gender: yup.string().required(`Gender is required`),
    phone: yup.string().required(`Phone number is required`),
    address: yup.string().required(`Address is required`),
    email: yup.string().email().required('Email address is required'),
    password: yup.string().min(8).max(32).required('Password is required'),
    confirm_password: yup.string().min(8).max(32).required('Confirm password is required')
        .oneOf([yup.ref('password'), null], 'Passwords does not match'),
})
export const customersSchema = yup.object().shape({//schema for customer data
    firstname: yup.string().required(`First name is required`),
    surname: yup.string().required(`Surname is required`),
    gender: yup.string().required(`Gender is required`),
    phone: yup.string().required(`Phone number is required`),
    address: yup.string().required(`Address is required`),
})

export const categorySchema = yup.object().shape({//schema for category data
    name: yup.string().required(`Name is required`),
    price: yup.number().required(`Price's is required`),
})

export const productSchema = yup.object().shape({//schema for product data
    manufacturedate: yup.string().required(`Manufacturing date is required`),
    expiredate: yup.string().required(`Expire date is required`),
    category: yup.string().required(`Category's id is required`),
})

export const orderSchema = yup.object().shape({//schema for order data
    customer: yup.string().required(`Customer's id is required`),
})

export const saleSchema = yup.object().shape({//schema for sale data
    staff: yup.string().required(`Staff is required`),
    customer: yup.string().required(`Customer's id is required`),
    order: yup.string().required(`Order's id is required`),
})