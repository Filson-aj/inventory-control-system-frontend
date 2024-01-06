import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'

const customersAdapter = createEntityAdapter({})

const initialState = customersAdapter.getInitialState()

export const customersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getCustomers: builder.query({
            query: () =>({ 
                url: '/customers',
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
                const loadedCustomers = sortedData?.map(customer =>{
                    customer.id = customer._id
                    customer.sn = count++
                    return customer
                })
                return customersAdapter.setAll(initialState, loadedCustomers)
            },
            providesTags: (result, error, arg) =>{
                if(result?.ids){
                    return [
                        {type: 'Customer', id: 'LIST'},
                        ...result.ids.map(id =>({ type: 'Customer', id }))
                    ]
                }else return [{ type: 'Customers', id: 'LIST'}]
            },
        }),
        addNewCustomer: builder.mutation({
            query: initialCustomerData =>({
                url: '/customers',
                method: 'POST', 
                body: {
                    ...initialCustomerData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Customer', id: arg.id }
            ]
        }),
        updateCustomer: builder.mutation({
            query: initialCustomerData =>({
                url: '/customers',
                method: 'PATCH', 
                body: {
                    ...initialCustomerData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Customer', id: arg.id }
            ]
        }),
        deleteCustomer: builder.mutation({
            query: ({ id }) =>({
                url: `/customers/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Customer', id: arg.id }
            ]
        }),
        deleteCustomers: builder.mutation({
            query: () =>({
                url: '/customers',
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Customer', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetCustomersQuery,
    useAddNewCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useDeleteCustomersMutation
} = customersApiSlice

//returns the query result object
export const selectCustomerResult= apiSlice.endpoints.getCustomers.select()

//creates memoized selector
const selectCustomerData = createSelector(
    selectCustomerResult, 
    customersResult => customersResult.data // state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCustomers,
    selectById: selectCustomerById,
    selectIds: selectCustomerIds,
    //pass in a selector that returns the customers slice of state
} = customersAdapter.getSelectors(state => selectCustomerData(state) ?? initialState)