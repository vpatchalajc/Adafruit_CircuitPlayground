<script setup lang="ts">
import { computed, markRaw, ref, watch } from 'vue';
import { AppNavigation, LinkText, PageHeader, ProgressSpinner, ToastNotification } from '@jumpcloud/circuit/components';
import { useToast } from 'primevue/usetoast';
import { AccessIcon, PasswordManagerIcon } from '@jumpcloud/icons';

const headerIconAccess = markRaw(AccessIcon);
const headerIconPasswordVault = markRaw(PasswordManagerIcon);
import TopBar from '@/components/TopBar.vue';
import { menuItems, profileMenuItems } from '../data/passwordVaultNavigation';
import PasswordVaultMainPage from './PasswordVaultMainPage.vue';
import PasswordVaultPage from './PasswordVaultPage.vue';

defineOptions({
  name: 'AccessNavigationDemoPage',
});

type PasswordVaultStage = 'landing' | 'enabling' | 'ready';

const props = withDefaults(
  defineProps<{
    /** When set (e.g. from Storybook), open Password Vault on load */
    initialView?: 'access' | 'password-vault';
    /**
     * When true with `initialView: password-vault`, opens the tabbed Password Vault experience directly
     * (skips welcome + Enable flow). Default false: user sees the landing page first.
     */
    initialPasswordVaultActivated?: boolean;
  }>(),
  {
    initialView: 'access',
    initialPasswordVaultActivated: false,
  },
);

const toast = useToast();

const mainView = ref<'access' | 'password-vault'>(props.initialView);

const passwordVaultStage = ref<PasswordVaultStage>(
  props.initialView === 'password-vault' && props.initialPasswordVaultActivated ? 'ready' : 'landing',
);

watch(
  () => props.initialView,
  (v) => {
    if (v) mainView.value = v;
  },
);

watch(
  () => [props.initialView, props.initialPasswordVaultActivated] as const,
  ([view, activated]) => {
    if (view === 'password-vault' && activated) {
      passwordVaultStage.value = 'ready';
    }
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

async function startEnablePasswordVault() {
  passwordVaultStage.value = 'enabling';
  await new Promise((r) => setTimeout(r, 2800));
  toast.add({
    severity: 'success',
    summary: 'Password Vault is activated',
    detail: 'You can use Dashboard, Websites, Credentials, User Management, and Roles.',
    life: 5000,
  });
  passwordVaultStage.value = 'ready';
}
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <ToastNotification />
    <AppNavigation
      :menuItems="menuItems"
      :profileMenuItems="profileMenuItems"
      :activeItem="activeNavItem"
      :collapsible="true"
      :topNavToggle="true"
      @click="handleNavClick"
    >
      <template #custom-text>
        <p class="px-2 text-left text-body-xs text-neutral-subtle">
          Having trouble with the new navigation?
          <LinkText
            label="Check out the guide"
            href="https://jumpcloud.com/support"
            target="_blank"
            rel="noopener noreferrer"
            :showIcon="false"
            customClass="text-body-xs"
          />
        </p>
      </template>
    </AppNavigation>
      <div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <TopBar />
      <template v-if="mainView === 'password-vault'">
        <div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <template v-if="passwordVaultStage === 'landing'">
            <div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              <PageHeader title="Password Vault" :icon="headerIconPasswordVault" />
              <PasswordVaultPage class="min-h-0 flex-1" @enable="startEnablePasswordVault" />
            </div>
          </template>
          <template v-else-if="passwordVaultStage === 'enabling'">
            <div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              <PageHeader title="Password Vault" :icon="headerIconPasswordVault" />
              <div
                class="flex min-h-0 w-full min-w-0 flex-1 flex-col items-center justify-center gap-md overflow-auto border-t border-neutral-default_solid bg-neutral-surface px-6 py-6"
                role="status"
                aria-live="polite"
                aria-busy="true"
              >
                <ProgressSpinner :size="40" aria-label="Enabling Password Vault" />
                <p class="max-w-md text-center text-body-md text-neutral-subtle">
                  Do not refresh or press the Back button until the page is ready.
                </p>
              </div>
            </div>
          </template>
          <PasswordVaultMainPage v-else class="min-h-0 flex-1" />
        </div>
      </template>
      <template v-else>
        <PageHeader title="Access" :icon="headerIconAccess" />
        <div
          class="flex min-h-0 flex-1 flex-col overflow-auto border-t border-neutral-default_solid bg-neutral-surface px-6 py-6"
        >
          <p class="text-body-md text-neutral-subtle">
            Under
            <span class="text-body-md font-semibold text-neutral-base">Access</span>
            in the sidebar, choose
            <span class="text-body-md font-semibold text-neutral-base">Password Vault</span>
            to open the landing page, enable the vault, and view the dashboard.
          </p>
        </div>
      </template>
    </div>
  </div>
</template>
