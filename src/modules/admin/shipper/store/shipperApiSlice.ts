import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../../../common/store/apiSlice";

const shipperAdapter = createEntityAdapter({})
const initialState = shipperAdapter.getInitialState()

export const shipperApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getShippers: builder.query({
            query: () => ({
                url: '/shipper',
                method: 'GET'
            }),
            transformResponse: responseData => {
                const { data } = responseData
                const loadedShippers = data.map(shipper => {
                    shipper.id = shipper._id
                    return shipper
                })
                return shipperAdapter.setAll(initialState, loadedShippers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Shipper' as const, id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Shipper' as const, id }))
                    ]
                } else {
                    return [{ type: 'Shipper' as const, id: 'LIST' }]
                }
            }
        }),
        addNewShipper: builder.mutation<any, any>({
            query: initialData => ({
                url: '/shipper',
                method: 'POST',
                body: initialData,
            }),
            invalidatesTags: [
                { type: "Shipper", id: "LIST" }
            ]
        })
    })
})

export const {
    useGetShippersQuery,
    useAddNewShipperMutation,
} = shipperApiSlice

export const selectShipperResult = shipperApiSlice.endpoints.getShippers.select()

const selectShipperData = createSelector(
    selectShipperResult,
    shipperResult => shipperResult.data
)

export const {
    selectAll: selectAllShippers,
} = shipperAdapter.getSelectors(state => selectShipperData(state) ?? initialState)