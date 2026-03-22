import { lazy } from 'react';

export const Layout = lazy(() => import('./components/Layout'));
export const ExpenseList = lazy(() => import('./components/ExpenseList'));
export const AddExpense = lazy(() => import('./components/AddExpense'));
export const EditExpense = lazy(() => import('./components/EditExpense'));
export const Login = lazy(() => import('./components/Login'));
export const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
export const Profile = lazy(() => import('./components/Profile'));
export const Register = lazy(() => import('./components/Register'));
export const SearchExpense = lazy(() => import('./components/SearchExpenses'));
