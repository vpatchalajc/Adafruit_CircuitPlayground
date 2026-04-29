<script setup lang="ts">
import { AppNavigation, PageHeader } from '@jumpcloud/circuit/components';
import TopBar from '@/components/TopBar.vue';
import ConfigPageLayout from '@/components/layout/page-layouts/ConfigPageLayout.vue';
import MfaFactorsConfiguration from './MfaFactorsConfiguration.vue';

defineOptions({
  name: 'MfaConfigurationPageShell',
});

defineProps<{
  menuItems: unknown[];
  profileMenuItems: unknown[];
  activeItem: string;
}>();
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <AppNavigation
      :menuItems="menuItems"
      :profileMenuItems="profileMenuItems"
      :activeItem="activeItem"
      :collapsible="true"
      :topNavToggle="true"
    >
      <template v-if="$slots.customText" #custom-text>
        <slot name="customText" />
      </template>
    </AppNavigation>
    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <TopBar />
      <PageHeader title="MFA Configuration" />
      <ConfigPageLayout class="w-full! h-full!">
        <MfaFactorsConfiguration />
      </ConfigPageLayout>
    </div>
  </div>
</template>
