import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'

const salesAdapter = createEntityAdapter({})

const initialState = salesAdapter.getInitialState()

export const salesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getSales: builder.query({
            query: () =>({ 
                url: '/sales',
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
                const loadedSales = sortedData?.map(sale =>{
                    sale.id = sale._id
                    sale.sn = count++
                    return sale
                })
                return salesAdapter.setAll(initialState, loadedSales)
            },
            providesTags: (result, error, arg) =>{
                if(result?.ids){
                    return [
                        {type: 'Sale', id: 'LIST'},
                        ...result.ids.map(id =>({ type: 'Sale', id }))
                    ]
                }else return [{ type: 'Sales', id: 'LIST'}]
            },
        }),
        addNewSale: builder.mutation({
            query: initialSaleData =>({
                url: '/sales',
                method: 'POST', 
                body: {
                    ...initialSaleData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Sale', id: arg.id }
            ]
        }),
        updateSale: builder.mutation({
            query: initialSaleData =>({
                url: '/sales',
                method: 'PATCH', 
                body: {
                    ...initialSaleData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Sale', id: arg.id }
            ]
        }),
        deleteSale: builder.mutation({
            query: ({ id }) =>({
                url: `/sales/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Sale', id: arg.id }
            ]
        }),
        deleteSales: builder.mutation({
            query: () =>({
                url: '/sales',
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Sale', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetSalesQuery,
    useAddNewSaleMutation,
    useUpdateSaleMutation,
    useDeleteSaleMutation,
    useDeleteSalesMutation
} = salesApiSlice

//returns the query result object
export const selectSaleResult= apiSlice.endpoints.getSales.select()

//creates memoized selector
const selectSaleData = createSelector(
    selectSaleResult, 
    salesResult => salesResult.data // state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllSales,
    selectById: selectSaleById,
    selectIds: selectSaleIds,
    //pass in a selector that returns the sales slice of state
} = salesAdapter.getSelectors(state => selectSaleData(state) ?? initialState)