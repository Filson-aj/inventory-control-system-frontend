import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'

import { selectCurrentToken } from '../store/slice/authSlice'
import { useGetCustomersQuery } from '../store/apis/customersApiSlice'
import { useGetStaffsQuery } from '../store/apis/staffsApiSlice'

const useAuth = () => {
    const token = useSelector(selectCurrentToken),
        { data: customers } = useGetCustomersQuery('getCustomers'),
        { data: staffs } = useGetStaffsQuery('getCustomers'),
        user = {
            id: '',
            userid: '',
            email: '',
            status: 'Customer',
            roles: [],
        }
    let isStaff = false,
        isAdmin = false,
        auth = false

    if(token){
        auth = true
        const decoded = jwtDecode(token),
            { id, email, roles } = decoded.user
            
        isStaff = roles.includes('Staff')
        isAdmin = roles.includes('Admin')
        user.id = id
        user.email = email
        user.roles = roles

        if(isStaff) user.status = 'Staff'
        if(isAdmin) user.status = 'Admin'

        if(user.status === 'Customer'){
            const customerid = customers?.ids?.filter(customerid => customers?.entities[customerid]?.user?._id === id)
            const customer = customers?.entities[customerid]
            user.userid = customer?._id
        }else{
            const staffid = staffs?.ids?.filter(staffid => staffs?.entities[staffid]?.user?._id === id)
            const staff = staffs?.entities[staffid]
            user.userid = staff?._id
        }
        return { auth, user, isAdmin, isStaff }
    }

    return { auth, user, isAdmin, isStaff }
}

export default useAuth