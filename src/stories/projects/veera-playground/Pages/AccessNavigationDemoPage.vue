<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { AppNavigation, PageHeader } from '@jumpcloud/circuit/components';
import { AccessIcon, PasswordManagerIcon } from '@jumpcloud/icons';
import TopBar from '@/components/TopBar.vue';
import { menuItems, profileMenuItems } from '../data/passwordVaultNavigation';
import PasswordVaultPage from './PasswordVaultPage.vue';

defineOptions({
  name: 'AccessNavigationDemoPage',
});

const props = withDefaults(
  defineProps<{
    /** When set (e.g. from Storybook), open Password Vault on load */
    initialView?: 'access' | 'password-vault';
  }>(),
  {
    initialView: 'access',
  },
);

const mainView = ref<'access' | 'password-vault'>(props.initialView);

watch(
  () => props.initialView,
  (v) => {
    if (v) mainView.value = v;
  },
);

const activeNavItem = computed(() =>
  mainView.value === 'password-vault' ? 'password vault' : 'access',
);

function handleNavClick(item: { label?: string }) {
  const label = (item?.label ?? '').toLowerCase().trim();
  if (label === 'password vault') {
    mainView.value = 'password-vault';
  }
}
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <AppNavigation
      :menuItems="menuItems"
      :profileMenuItems="profileMenuItems"
      :activeItem="activeNavItem"
      :collapsible="true"
      :topNavToggle="true"
      @click="handleNavClick"
    />
    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <TopBar />
      <template v-if="mainView === 'password-vault'">
        <PageHeader title="Password Vault">
          <template #icon>
            <PasswordManagerIcon class="size-7" />
          </template>
        </PageHeader>
        <PasswordVaultPage class="min-h-0 flex-1" />
      </template>
      <template v-else>
        <PageHeader title="Access">
          <template #icon>
            <AccessIcon class="size-7" />
          </template>
        </PageHeader>
        <div
          class="flex min-h-0 flex-1 flex-col overflow-auto border-t border-neutral-default_solid bg-neutral-surface px-6 py-6"
        >
          <p class="text-body-md text-neutral-subtle">
            Under
            <span class="text-body-md font-semibold text-neutral-base">Access</span>
            in the sidebar, choose
            <span class="text-body-md font-semibold text-neutral-base">Password Vault</span>
            to open the Password Vault landing page (Figma node 3:7790).
          </p>
        </div>
      </template>
    </div>
  </div>
</template>
