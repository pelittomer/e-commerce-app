import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../../../common/store/apiSlice";

const categoryAdapter = createEntityAdapter({})
const initialState = categoryAdapter.getInitialState()

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewCategory: builder.mutation<any, any>({
            query: initialData => ({
                url: '/category',
                method: 'POST',
                body: initialData,
            }),
            transformResponse: responseData => {
                const { data } = responseData
                return data
            },
            invalidatesTags: [
                { type: "Category", id: "LIST" }
            ]
        }),
        getCategoryLeafs: builder.query({
            query: () => ({
                url: '/category/leafs',
                method: 'GET'
            }),
            transformResponse: responseData => {
                const { data } = responseData
                const loadedCategories = data.map(category => {
                    category.id = category._id
                    return category
                })
                return categoryAdapter.setAll(initialState, loadedCategories)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Category' as const, id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Category' as const, id }))
                    ]
                } else {
                    return [{ type: 'Category' as const, id: 'LIST' }]
                }
            }
        }),
        getCategoryRoots: builder.query({
            query: () => ({
                url: '/category/roots',
                method: 'GET'
            }),
            transformResponse: responseData => {
                const { data } = responseData
                const loadedCategories = data.map(category => {
                    category.id = category._id
                    return category
                })
                return categoryAdapter.setAll(initialState, loadedCategories)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Category' as const, id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Category' as const, id }))
                    ]
                } else {
                    return [{ type: 'Category' as const, id: 'LIST' }]
                }
            }
        }),
        getCategoryTree: builder.query({
            query: (categoryId) => ({
                url: `/category/tree?${categoryId && `categoryId=${categoryId}`}`,
                method: 'GET'
            }),
            transformResponse: responseData => {
                const { data } = responseData
                const loadedCategories = data.map(category => {
                    category.id = category._id
                    return category
                })
                return categoryAdapter.setAll(initialState, loadedCategories)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Category' as const, id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Category' as const, id }))
                    ]
                } else {
                    return [{ type: 'Category' as const, id: 'LIST' }]
                }
            }
        }),

    })
})

export const {
    useGetCategoryLeafsQuery,
    useAddNewCategoryMutation,
    useGetCategoryRootsQuery,
    useGetCategoryTreeQuery,
} = categoryApiSlice

export const selectCategoryResult = categoryApiSlice.endpoints.getCategoryLeafs.select()

const selectCategoryData = createSelector(
    selectCategoryResult,
    shipperResult => shipperResult.data
)

export const {
    selectAll: selectAllCategories,
} = categoryAdapter.getSelectors(state => selectCategoryData(state) ?? initialState)