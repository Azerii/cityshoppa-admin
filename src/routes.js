import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
// import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import UserListView from 'src/views/users';
import ProductListView from './views/products';
import ServiceListView from './views/services';
import CategoryListView from './views/categories';
import CityListView from './views/cities';
import BusinessListView from './views/businesses';
import CaptionListView from './views/captions';
import FeatureListView from './views/features';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      // { path: 'dashboard', element: <UserListView /> },
      { path: 'users', element: <UserListView /> },
      { path: 'businesses', element: <BusinessListView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'services', element: <ServiceListView /> },
      { path: 'categories', element: <CategoryListView /> },
      { path: 'captions', element: <CaptionListView /> },
      { path: 'cities', element: <CityListView /> },
      { path: 'features', element: <FeatureListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/users" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
