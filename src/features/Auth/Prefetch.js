import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { store } from '../../store/store'
import { usersApiSlice } from '../../store/apis/usersApiSlice'
import { staffsApiSlice } from '../../store/apis/staffsApiSlice'
import { customersApiSlice } from '../../store/apis/customersApiSlice'
import { categoriesApiSlice } from '../../store/apis/categoriesApiSlice'
import { productsApiSlice } from '../../store/apis/productsApiSlice'
import { salesApiSlice } from '../../store/apis/salesApiSlice'
import { ordersApiSlice } from '../../store/apis/ordersApiSlice'

const Prefetch = () => {
    useEffect(() =>{
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        store.dispatch(staffsApiSlice.util.prefetch('getStaffs', 'staffsList', { force: true }))
        store.dispatch(customersApiSlice.util.prefetch('getCustomers', 'customersList', { force: true }))
        store.dispatch(categoriesApiSlice.util.prefetch('getCategories', 'categoriesList', { force: true }))
        store.dispatch(ordersApiSlice.util.prefetch('getOrders', 'ordersList', { force: true }))
        store.dispatch(productsApiSlice.util.prefetch('getProducts', 'productsList', { force: true }))
        store.dispatch(salesApiSlice.util.prefetch('getSales', 'salesList', { force: true }))
    }, [])
    return <Outlet />
}

export default Prefetch