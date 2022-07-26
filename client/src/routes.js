import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Products from './pages/Products';
import Blog from './pages/Blog';
import SellerDashboard from './pages/SellerDashboard';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import CreateProductPost from './pages/CreateProductPost';
import ProductDescription from './pages/ProductDescription';
import DashboardApp from './pages/DashboardApp';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        // { path: 'app', element: <DashboardApp /> },
        { path: 'sellerDashboard', element: <SellerDashboard /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products />, },
        { path: 'productDescription', element: <ProductDescription /> },
        // { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/products" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'createProductPost', element: <CreateProductPost /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
