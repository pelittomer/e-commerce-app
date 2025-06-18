import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../../../common/store/apiSlice";

const companyAdapter = createEntityAdapter({})
const initialState = companyAdapter.getInitialState()

export const companyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCompany: builder.query({
            query: () => ({
                url: '/company',
                method: 'GET'
            }),
            transformResponse: responseData => {
                const { data } = responseData
                return data
            },
        }),
        addNewCompany: builder.mutation<any, any>({
            query: initialData => ({
                url: '/company',
                method: 'POST',
                body: initialData,
            }),
            invalidatesTags: [
                { type: "Company", id: "LIST" }
            ],
            transformResponse: responseData => {
                const { data } = responseData
                return data
            },
        })
    })
})

export const {
    useGetCompanyQuery,
    useAddNewCompanyMutation
} = companyApiSlice

export const selectCompanyResult = companyApiSlice.endpoints.getCompany.select()

const selectCompanyData = createSelector(
    selectCompanyResult,
    companyResult => companyResult.data
)

export const {
    selectAll: selectAllCompany,
} = companyAdapter.getSelectors(state => selectCompanyData(state) ?? initialState)