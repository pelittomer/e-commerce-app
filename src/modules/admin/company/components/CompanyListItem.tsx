import { memo } from 'react'
import { useGetCompaniesQuery } from '../../../seller/company/store/companyApiSlice';
import { Link } from 'react-router';

const companyDisplayFields = ['name', 'status', 'Edit']

interface ListItemProps {
    companyId: string;
    index: number;
}
function CompanyListItem({ companyId, index }: ListItemProps) {
    const { company } = useGetCompaniesQuery("companiesList", {
        selectFromResult: ({ data }) => ({
            company: data?.entities[companyId]
        }),
    })
    if (company) {
        return (
            <tr className="border-2">
                <td>{index}</td>
                {
                    companyDisplayFields.map((field) => (
                        <td key={field} className="p-5">
                            {
                                company[field]
                            }
                        </td>
                    ))
                }
                <td>
                    <Link to={`/admin/company/${company._id}`}>Details</Link>
                </td>
            </tr>
        )

    } else return null
}

export default memo(CompanyListItem)