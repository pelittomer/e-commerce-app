import { useState } from "react";
import { useGetVariationsQuery } from "../store/variationApiSlice";
import SelectCategory from "./SelectCategory";
import VariationListItem from "./VariationListItem";

function VariationList() {
    const [categoryId, setCategoryId] = useState('')
    const { data: variations, isLoading, isSuccess } = useGetVariationsQuery(categoryId)
    let content;
    if (isLoading) <p>Loading...</p>
    if (isSuccess && categoryId) {
        const { ids } = variations
        const tableContent = ids?.length && ids.map((variationId) => <VariationListItem
            key={variationId}
            variationId={variationId}
            categoryId={categoryId} />)
        content = (
            <div>
                {tableContent}
            </div>
        )
    }

    return (
        <div>
            <h1>Variation List</h1>
            <SelectCategory setCategoryId={setCategoryId} />
            {content}
        </div>
    )
}

export default VariationList