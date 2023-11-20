import React from 'react';
import { SvgIcon } from '@mui/material';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import Square3Stack3DIcon from '@heroicons/react/24/solid/Square3Stack3DIcon';
import { useAuth } from 'src/hooks/use-auth';

export const items = () => {
  const { user, isAuthenticated } = useAuth();
  return [
    {
      title: 'Overview',
      path: '/',
      icon: (
        <SvgIcon fontSize="small">
          <ChartBarIcon />
        </SvgIcon>
      ),
    },
    user?.role === 1
      ? {
        title: 'Plans',
        path: '/plans',
        icon: (
          <SvgIcon fontSize="small">
            <Square3Stack3DIcon />
          </SvgIcon>
        ),
      }
      : {
        title: 'Customers',
        path: '/customers',
        icon: (
          <SvgIcon fontSize="small">
            <UsersIcon />
          </SvgIcon>
        ),
      },
    // {
    //   title: 'Companies',
    //   path: '/companies',
    //   icon: (
    //     <SvgIcon fontSize="small">
    //       <ShoppingBagIcon />
    //     </SvgIcon>
    //   ),
    // },
    {
      title: 'Account',
      path: '/account',
      icon: (
        <SvgIcon fontSize="small">
          <UserIcon />
        </SvgIcon>
      ),
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: (
        <SvgIcon fontSize="small">
          <CogIcon />
        </SvgIcon>
      ),
    },
    {
      title: 'Login',
      path: '/auth/login',
      icon: (
        <SvgIcon fontSize="small">
          <LockClosedIcon />
        </SvgIcon>
      ),
    },
    {
      title: 'Register',
      path: '/auth/register',
      icon: (
        <SvgIcon fontSize="small">
          <UserPlusIcon />
        </SvgIcon>
      ),
    },
    // {
    //   title: 'Error',
    //   path: '/404',
    //   icon: (
    //     <SvgIcon fontSize="small">
    //       <XCircleIcon />
    //     </SvgIcon>
    //   ),
    // },
  ];
};
