<script setup lang="ts">
import { AppNavigation, PageHeader } from '@jumpcloud/circuit/components';
import { PasswordManagerIcon } from '@jumpcloud/icons';
import TopBar from '@/components/TopBar.vue';
import ConfigPageLayout from '@/components/layout/page-layouts/ConfigPageLayout.vue';
import { menuItems, profileMenuItems } from '../data/passwordVaultNavigation';

defineOptions({
  name: 'AccessNavigationDemoPage',
});
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <AppNavigation
      :menuItems="menuItems"
      :profileMenuItems="profileMenuItems"
      activeItem="access"
      :collapsible="true"
      :topNavToggle="true"
    />
    <div class="flex flex-1 min-w-0 flex-col overflow-hidden">
      <TopBar />
      <PageHeader title="Password Vault">
        <template #icon>
          <PasswordManagerIcon class="size-7" />
        </template>
      </PageHeader>
      <ConfigPageLayout class="h-full! w-full!">
        <p class="text-body-md text-neutral-subtle">
          Open the <span class="text-body-md font-semibold text-neutral-base">Access</span> item in the
          sidebar to see the flyout: SSO Applications, Access Request (2), SaaS Management, Password Vault,
          LDAP, and RADIUS — matching the Password Vault Figma frame.
        </p>
      </ConfigPageLayout>
    </div>
  </div>
</template>
