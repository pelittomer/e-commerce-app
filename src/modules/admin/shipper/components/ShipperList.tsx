import { useGetShippersQuery } from '../store/shipperApiSlice'
import ShipperListItem from './ShipperListItem';

const tableKey = ['Index', 'Logo', 'Name', 'Description', 'Email', 'Active', 'Phone', 'Edit']

function ShipperList() {
    const { data: shippers, isLoading, isSuccess } = useGetShippersQuery('shippersList')
    let content;
    if (isLoading) <p>Loading...</p>
    if (isSuccess) {
        const { ids } = shippers
        const tableContent = ids?.length && ids.map((shipperId, index) => <ShipperListItem
            key={shipperId}
            shipperId={shipperId}
            index={index + 1} />)
        content = (
            <table className="">
                <thead className="">
                    <tr className=''>
                        {
                            tableKey.map((item, index) => (
                                <th key={index} className=''>
                                    {item}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table >
        )
    }

    return content
}

export default ShipperList