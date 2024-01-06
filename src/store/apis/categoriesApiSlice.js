import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'

const categoriesAdapter = createEntityAdapter({})

const initialState = categoriesAdapter.getInitialState()

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getCategories: builder.query({
            query: () =>({ 
                url: '/categories',
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
                const loadedCategories = sortedData?.map(category =>{
                    category.id = category._id
                    category.sn = count++
                    return category
                })
                return categoriesAdapter.setAll(initialState, loadedCategories)
            },
            providesTags: (result, error, arg) =>{
                if(result?.ids){
                    return [
                        {type: 'Category', id: 'LIST'},
                        ...result.ids.map(id =>({ type: 'Category', id }))
                    ]
                }else return [{ type: 'Categories', id: 'LIST'}]
            },
        }),
        addNewCategory: builder.mutation({
            query: initialCategoryData =>{
                const formData = new FormData()
                formData.append('name', initialCategoryData.name)
                formData.append('price', initialCategoryData.price)
                formData.append('description', initialCategoryData.description)
                formData.append('quantity', initialCategoryData.quantity)
                formData.append('image', initialCategoryData.image[0])
                return {
                    url: '/categories',
                    method: 'POST', 
                    body: formData,
                }
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.id }
            ]
        }),
        updateCategory: builder.mutation({
            query: initialCategoryData =>{
                const formData = new FormData()
                formData.append('name', initialCategoryData.name)
                formData.append('price', initialCategoryData.price)
                formData.append('description', initialCategoryData.description)
                formData.append('quantity', initialCategoryData.quantity)
                formData.append('image', initialCategoryData.image[0])
                return {
                    url: '/categories',
                    method: 'PATCH', 
                    body: formData
                }
                
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.id }
            ]
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) =>({
                url: `/categories/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.id }
            ]
        }),
        deleteCategories: builder.mutation({
            query: () =>({
                url: '/categories',
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetCategoriesQuery,
    useAddNewCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useDeleteCategoriesMutation
} = categoriesApiSlice

//returns the query result object
export const selectCategoryResult= apiSlice.endpoints.getCategories.select()

//creates memoized selector
const selectCategoryData = createSelector(
    selectCategoryResult, 
    categoriesResult => categoriesResult.data // state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds,
    //pass in a selector that returns the categories slice of state
} = categoriesAdapter.getSelectors(state => selectCategoryData(state) ?? initialState)