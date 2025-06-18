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
        getCompanies: builder.query({
            query: () => ({
                url: '/company/get/all',
                method: 'GET'
            }),
            transformResponse: responseData => {
                const { data } = responseData
                const loadedCompanies = data.map(company => {
                    company.id = company._id
                    return company
                })
                return companyAdapter.setAll(initialState, loadedCompanies)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Company' as const, id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Company' as const, id }))
                    ]
                } else {
                    return [{ type: 'Company' as const, id: 'LIST' }]
                }
            }
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
        }),
        updateCompanyStatus: builder.mutation<any, any>({
            query: ({ initialData, query }) => ({
                url: `/company/${query}`,
                method: 'PUT',
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
    useGetCompaniesQuery,
    useAddNewCompanyMutation,
    useUpdateCompanyStatusMutation
} = companyApiSlice

export const selectCompanyResult = companyApiSlice.endpoints.getCompany.select()

const selectCompanyData = createSelector(
    selectCompanyResult,
    companyResult => companyResult.data
)

export const {
    selectAll: selectAllCompany,
} = companyAdapter.getSelectors(state => selectCompanyData(state) ?? initialState)