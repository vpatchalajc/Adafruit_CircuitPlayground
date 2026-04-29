import { markRaw } from 'vue';
import {
  ArrowRightStartOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  CpuChipIcon,
  CubeIcon,
  TicketIcon,
} from '@heroicons/vue/24/outline';
import {
  SsoIcon,
  CheckListIcon,
  PasswordManagerIcon,
} from '@jumpcloud/icons';

/** Flat user-portal sidebar items (Baris User Portal — My Assets default). */
export const userPortalNavMenuItems = [
  { label: 'All Applications', leftIcon: markRaw(SsoIcon) },
  { label: 'Password Vault', leftIcon: markRaw(PasswordManagerIcon), isNew: true },
  { label: 'Requests', leftIcon: markRaw(TicketIcon) },
  { label: 'Tasks', leftIcon: markRaw(CheckListIcon) },
  { label: 'My Assets', leftIcon: markRaw(CubeIcon), isNew: true },
  { label: 'AI Gateway', leftIcon: markRaw(CpuChipIcon), isNew: true },
  { label: 'Security', leftIcon: markRaw(PasswordManagerIcon) },
];

export interface UserPortalProfileNavOptions {
  userName: string;
  userEmail: string;
  userInitials: string;
}

export function createUserPortalProfileMenuItems(options: UserPortalProfileNavOptions) {
  const { userName, userEmail, userInitials } = options;
  return [
    {
      label: userName,
      itemType: 'profile_compact',
      initials: userInitials,
      name: userName,
      items: [
        {
          label: userName,
          itemType: 'profile_large',
          name: userName,
          email: userEmail,
          initials: userInitials,
        },
        { separator: true },
        { label: 'Logout', rightIcon: markRaw(ArrowRightStartOnRectangleIcon) },
        { separator: true },
        { label: 'Change Password' },
        { label: 'Go to Admin Portal', rightIcon: markRaw(ArrowTopRightOnSquareIcon) },
      ],
    },
  ];
}
