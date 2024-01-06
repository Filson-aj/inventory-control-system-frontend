import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'

const ordersAdapter = createEntityAdapter({})

const initialState = ordersAdapter.getInitialState()

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getOrders: builder.query({
            query: () =>({ 
                url: '/orders',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            /* keepUnusedDataFor: 5, */
            transformResponse: responseData =>{
                const sortedData = responseData?.data
                sortedData?.sort((a, b) => {
                    const idA = parseInt(a._id, 16),
                        idB = parseInt(b._id, 16)
                    return idB - idA
                })

                let count = 1
                const loadedOrders = sortedData?.map(order =>{
                    order.id = order._id
                    order.sn = count++
                    return order
                })
                return ordersAdapter.setAll(initialState, loadedOrders)
            },
            providesTags: (result, error, arg) =>{
                if(result?.ids){
                    return [
                        {type: 'Order', id: 'LIST'},
                        ...result.ids.map(id =>({ type: 'Order', id }))
                    ]
                }else return [{ type: 'Orders', id: 'LIST'}]
            },
        }),
        addNewOrder: builder.mutation({
            query: initialOrderData =>({
                url: '/orders',
                method: 'POST', 
                body: {
                    ...initialOrderData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id: arg.id }
            ]
        }),
        updateOrder: builder.mutation({
            query: initialOrderData =>({
                url: '/orders',
                method: 'PATCH', 
                body: {
                    ...initialOrderData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id: arg.id }
            ]
        }),
        deleteOrder: builder.mutation({
            query: ({ id }) =>({
                url: `/orders/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id: arg.id }
            ]
        }),
        deleteOrders: builder.mutation({
            query: () =>({
                url: '/orders',
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetOrdersQuery,
    useAddNewOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useDeleteOrdersMutation
} = ordersApiSlice

//returns the query result object
export const selectOrderResult= apiSlice.endpoints.getOrders.select()

//creates memoized selector
const selectOrderData = createSelector(
    selectOrderResult, 
    ordersResult => ordersResult.data // state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById,
    selectIds: selectOrderIds,
    //pass in a selector that returns the orders slice of state
} = ordersAdapter.getSelectors(state => selectOrderData(state) ?? initialState)