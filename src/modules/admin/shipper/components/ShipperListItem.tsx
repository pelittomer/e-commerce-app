import { memo } from 'react'
import { useGetShippersQuery } from '../store/shipperApiSlice'
import { useGetUploadFileQuery } from '../../../../common/service/uploadApiSlice'

const shipperDisplayFields = ['logo', 'name', 'description', 'email', 'is_active', 'phone']
interface ListItemProps {
    shipperId: string;
    index: number;

}
function ShipperListItem({ shipperId, index }: ListItemProps) {
    const { shipper } = useGetShippersQuery("shippersList", {
        selectFromResult: ({ data }) => ({
            shipper: data?.entities[shipperId]
        }),
    })
    const file = shipper['logo']
    const { data: uploadData, isLoading } = useGetUploadFileQuery(file)
    if (shipper) {
        return (
            <tr className="border-2">
                <td>{index}</td>
                {
                    shipperDisplayFields.map((field) => (
                        <td key={field} className="p-5">
                            {
                                field === 'is_active'
                                    ? (shipper[field] ? 'Yes' : 'No')
                                    : field === 'logo' ? (
                                        <div>
                                            {isLoading && <p>Loading...</p>}
                                            {uploadData && <img src={uploadData} alt="image.png" width={100} height={25} />}
                                        </div>
                                    ) : shipper[field]
                            }
                        </td>
                    ))
                }
                <td>Edit</td>
            </tr>
        )

    } else return null
}

export default memo(ShipperListItem)