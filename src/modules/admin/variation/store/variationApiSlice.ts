import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../../../common/store/apiSlice";

const variationAdapter = createEntityAdapter({})
const initialState = variationAdapter.getInitialState()

export const variationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getVariations: builder.query({
            query: (categoryId) => ({
                url: `/variation?${categoryId && "categoryId=" + categoryId}`,
                method: 'GET'
            }),
            transformResponse: responseData => {
                const { data } = responseData
                const loadedVariations = data.map(variation => {
                    variation.id = variation._id
                    return variation
                })
                return variationAdapter.setAll(initialState, loadedVariations)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Variation' as const, id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Variation' as const, id }))
                    ]
                } else {
                    return [{ type: 'Variation' as const, id: 'LIST' }]
                }
            }
        }),
        addNewVariation: builder.mutation<any, any>({
            query: initialData => ({
                url: '/variation',
                method: 'POST',
                body: initialData,
            }),
            invalidatesTags: [
                { type: "Variation", id: "LIST" }
            ],
            transformResponse: responseData => {
                const { data } = responseData
                return data
            },
        })
    })
})

export const {
    useGetVariationsQuery,
    useAddNewVariationMutation
} = variationApiSlice

export const selectVariationResult = variationApiSlice.endpoints.getVariations.select()

const selectVariationData = createSelector(
    selectVariationResult,
    variationResult => variationResult.data
)

export const {
    selectAll: selectAllVariations,
} = variationAdapter.getSelectors(state => selectVariationData(state) ?? initialState)