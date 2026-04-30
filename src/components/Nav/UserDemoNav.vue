<script setup lang="ts">
import { computed } from 'vue';
import { AppNavigation } from '@jumpcloud/circuit/components';
import { createUserPortalProfileMenuItems } from '@/components/Nav/userPortalNavData';

export interface UserDemoNavMenuItem {
  label: string;
  leftIcon?: object;
  isNew?: boolean;
  [key: string]: unknown;
}

const props = defineProps<{
  menuItems: UserDemoNavMenuItem[];
  activeItem: string;
}>();

const emit = defineEmits<{
  navigate: [label: string];
}>();

const profileMenuItems = createUserPortalProfileMenuItems({
  userName: 'Demo User',
  userEmail: 'demo.user@jumpcloud.com',
  userInitials: 'DU',
});

const menuItemsWithCommands = computed(() =>
  props.menuItems.map(item => ({
    ...item,
    command: () => {
      emit('navigate', item.label);
    },
  })),
);
</script>

<template>
  <AppNavigation
    :menuItems="menuItemsWithCommands"
    :profileMenuItems="profileMenuItems"
    :activeItem="activeItem"
    :collapsible="true"
    :topNavToggle="true"
  />
</template>
