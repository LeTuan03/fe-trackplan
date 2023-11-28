import React from 'react';
import { SvgIcon } from '@mui/material';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import SpeakerWaveIcon from '@heroicons/react/24/solid/SpeakerWaveIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Square3Stack3DIcon from '@heroicons/react/24/solid/Square3Stack3DIcon';
import { getCurrentUser } from 'src/appFunctions';

export const items = () => {
  let currentUser = getCurrentUser();
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
    currentUser?.role === "1"
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
    {
      title: 'Group',
      path: '/groups',
      icon: (
        <SvgIcon fontSize="small">
          <SpeakerWaveIcon />
        </SvgIcon>
      ),
    },
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
    // {
    //   title: 'Login',
    //   path: '/auth/login',
    //   icon: (
    //     <SvgIcon fontSize="small">
    //       <LockClosedIcon />
    //     </SvgIcon>
    //   ),
    // },
    // {
    //   title: 'Register',
    //   path: '/auth/register',
    //   icon: (
    //     <SvgIcon fontSize="small">
    //       <UserPlusIcon />
    //     </SvgIcon>
    //   ),
    // },
  ];
};
