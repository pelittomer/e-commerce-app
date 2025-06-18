import { useGetCompaniesQuery } from '../../seller/company/store/companyApiSlice';
import CompanyListItem from './components/CompanyListItem';

const tableKey = ['Index', 'Name', 'Status', 'Edit']

function Company() {
    const { data: companies, isLoading, isSuccess } = useGetCompaniesQuery('companiesList')
    let content;
    if (isLoading) <p>Loading...</p>
    if (isSuccess) {
        const { ids } = companies
        const tableContent = ids?.length && ids.map((companyId, index) => <CompanyListItem
            key={companyId}
            companyId={companyId}
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

    return (
        <div>
            <h1>Company page</h1>
            {content}
        </div>
    )
}

export default Company