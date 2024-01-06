import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'

const productsAdapter = createEntityAdapter({})

const initialState = productsAdapter.getInitialState()

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getProducts: builder.query({
            query: () =>({ 
                url: '/products',
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
                const loadedProducts = sortedData?.map(product =>{
                    product.id = product._id
                    product.sn = count++
                    return product
                })
                return productsAdapter.setAll(initialState, loadedProducts)
            },
            providesTags: (result, error, arg) =>{
                if(result?.ids){
                    return [
                        {type: 'Product', id: 'LIST'},
                        ...result.ids.map(id =>({ type: 'Product', id }))
                    ]
                }else return [{ type: 'Products', id: 'LIST'}]
            },
        }),
        addNewProduct: builder.mutation({
            query: initialProductData =>({
                url: '/products',
                method: 'POST', 
                body: {
                    ...initialProductData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
        updateProduct: builder.mutation({
            query: initialProductData =>({
                url: '/products',
                method: 'PATCH', 
                body: {
                    ...initialProductData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) =>({
                url: `/products/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
        deleteProducts: builder.mutation({
            query: () =>({
                url: '/products',
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetProductsQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useDeleteProductsMutation
} = productsApiSlice

//returns the query result object
export const selectProductResult= apiSlice.endpoints.getProducts.select()

//creates memoized selector
const selectProductData = createSelector(
    selectProductResult, 
    productsResult => productsResult.data // state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds,
    //pass in a selector that returns the products slice of state
} = productsAdapter.getSelectors(state => selectProductData(state) ?? initialState)