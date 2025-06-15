import { Link, Outlet } from 'react-router'

const routes = [
    {
        text: 'Brand',
        href: '/admin/brand'
    },
    {
        text: 'Category',
        href: '/admin/category'
    },
    {
        text: 'Company',
        href: '/admin/company'
    },
    {
        text: 'Shipper',
        href: '/admin/shipper'
    },
    {
        text: 'Variation',
        href: '/admin/variation'
    }
]

function AdminLayout() {
    return (
        <div>
            <h3>Admin layout</h3>
            <nav className='flex gap-5'>
                {
                    routes.map((item, index) => (
                        <Link
                            key={index}
                            to={item.href}>
                            {item.text}
                        </Link>
                    ))
                }
            </nav>
            <Outlet />
        </div>
    )
}

export default AdminLayout