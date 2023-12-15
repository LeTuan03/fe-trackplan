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
  const currentUser = getCurrentUser();

  const roleBasedItems = [
    {
      title: 'Trang chủ',
      path: '/',
      icon: (
        <SvgIcon fontSize="small">
          <ChartBarIcon />
        </SvgIcon>
      ),
    },
    (currentUser?.role === "1")&& {
      title: 'Quản lý lớp học',
      path: '/plans',
      icon: (
        <SvgIcon fontSize="small">
          <Square3Stack3DIcon />
        </SvgIcon>
      ),
    },
    (currentUser?.role === "2") && {
      title: 'Quản lý giáo viên',
      path: '/giaovien',
      icon: (
        <SvgIcon fontSize="small">
          <UsersIcon />
        </SvgIcon>
      ),
    },
    (currentUser?.role === "2") && {
      title: 'Quản lý học sinh',
      path: '/member',
      icon: (
        <SvgIcon fontSize="small">
          <UsersIcon />
        </SvgIcon>
      ),
    },
    currentUser?.role === "2" && {
      title: 'Quản lý người dùng',
      path: '/customers',
      icon: (
        <SvgIcon fontSize="small">
          <UsersIcon />
        </SvgIcon>
      ),
    },
    currentUser?.role === "3" && {
      title: 'Lớp học',
      path: '/groups',
      icon: (
        <SvgIcon fontSize="small">
          <SpeakerWaveIcon />
        </SvgIcon>
      ),
    },
    {
      title: 'Thông tin cá nhân',
      path: '/account',
      icon: (
        <SvgIcon fontSize="small">
          <UserIcon />
        </SvgIcon>
      ),
    },
    {
      title: 'Cài đặt',
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

  return roleBasedItems.filter(Boolean);
};
