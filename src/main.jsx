import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AddService from './components/AddService.jsx';
import Home from './components/Home.jsx';
import MyReviews from './components/MyReviews.jsx';
import MyServices from './components/MyServices.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRout.jsx';
import Services from './components/Services.jsx';
import UpdateService from './components/UpdateService.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import './index.css';
import MainLayout from './layouts/MainLayout.jsx';
import Details from './pages/Details.jsx';
import Error from './pages/Error.jsx';
import Loader from './pages/Loader.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Update from './pages/Update.jsx';
import UpdateReview from './pages/UpdateReview.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'addService',
        // Component: AddService,
        element: (
          <PrivateRoute>
            <AddService></AddService>
          </PrivateRoute>
        ),
      },
      {
        path: 'updateService',
        Component: UpdateService,
      },
      {
        path: 'myServices',
        // Component: MyServices,
        element: (
          <PrivateRoute>
            <MyServices></MyServices>
          </PrivateRoute>
        ),
      },
      {
        path: 'myReviews',
        // Component: MyReviews,
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'services',
        hydrateFallbackElement: <Loader></Loader>,
        loader: () =>
          fetch('https://services-code-server.vercel.app/AllServices'),
        Component: Services,
      },
      {
        path: 'update/:id',
        Component: Update,
      },
      {
        path: 'details/:id',
        Component: Details,
      },
      {
        path: 'update_review',
        Component: UpdateReview,
      },
      {
        path: '*',
        Component: Error,
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
