import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Layout from 'src/ekutuphane/components/layout/Layout';

export const Dashboard = lazy(() => import('src/ekutuphane/components/Dashboard'));
export const Book = lazy(() => import('src/ekutuphane/components/Book'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/ekutuphane/components/Login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    { element: <LoginPage />, index: true },
    {
      element: (
        <Layout>
          <Suspense>
            <Outlet />
          </Suspense>
        </Layout>
      ),
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'book', element: <Book /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
