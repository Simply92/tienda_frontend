import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, { loader as productosLoader } from './views/Products'
import NewProducts, { action as newProductAction } from './views/NewProducts'
import EditProducts from './views/EditProduct'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productosLoader
            },
            {
                path: 'productos/nuevo',
                element: <NewProducts />,
                action: newProductAction
            },
            {
                path: 'productos/:id/editar',
                element: <EditProducts />
            }
        ]
    }
])