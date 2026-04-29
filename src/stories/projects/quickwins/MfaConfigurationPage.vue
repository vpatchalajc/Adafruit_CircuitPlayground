<script setup lang="ts">
import MfaConfigurationPageShell from './MfaConfigurationPageShell.vue';
import { menuItems, profileMenuItems } from '../burak-agent0/features/agent0/shared/data/navigation';

defineOptions({
  name: 'MfaConfigurationPage',
});
</script>

<template>
  <MfaConfigurationPageShell
    :menu-items="menuItems"
    :profile-menu-items="profileMenuItems"
    active-item="Security"
  />
</template>
