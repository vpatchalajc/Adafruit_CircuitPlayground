<script setup lang="ts">
import { markRaw, ref } from 'vue';
import {
  CollapsiblePanel,
  DataTable,
  DataTableCellText,
  PageHeader,
} from '@jumpcloud/circuit/components';
import { PasswordManagerIcon } from '@jumpcloud/icons';
import {
  ArrowUpIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
  RectangleStackIcon,
} from '@heroicons/vue/24/outline';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import DashboardPageLayout from '@/components/layout/page-layouts/DashboardPageLayout.vue';
import PasswordVaultCredentialsView from './PasswordVaultCredentialsView.vue';
import PasswordVaultFoldersView from './PasswordVaultFoldersView.vue';
import PasswordVaultUsersView from './PasswordVaultUsersView.vue';
import PasswordVaultWebsitesView from './PasswordVaultWebsitesView.vue';

defineOptions({
  name: 'PasswordVaultMainPage',
});

const headerIcon = markRaw(PasswordManagerIcon);

const vaultTabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Websites', value: 'websites' },
  { label: 'Credentials', value: 'credentials' },
  { label: 'Folders', value: 'folders' },
  { label: 'Users', value: 'users' },
  { label: 'Roles', value: 'roles' },
];

const activeTab = ref('overview');

const statCards = [
  { title: 'Websites', value: '386', change: '23%', changeLabel: 'vs last month' },
  { title: 'Credentials', value: '1,332', change: '23%', changeLabel: 'vs last month' },
  { title: 'Shared Folders', value: '134', change: '8%', changeLabel: 'vs last month' },
  { title: 'User Groups', value: '134', change: '8%', changeLabel: 'vs last month' },
];

const resourceSelection = ref<Record<string, unknown>[]>([]);

const connectedResources = [
  { id: '1', name: 'AWS Console', type: 'Cloud' },
  { id: '2', name: 'Corporate VPN', type: 'Network' },
  { id: '3', name: 'Finance Portal', type: 'Web' },
];

const resourceColumns = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      label: sp.data.name,
    }),
  },
  {
    field: 'type',
    header: 'Type',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      label: sp.data.type,
    }),
  },
  {
    field: 'actions',
    header: 'Actions',
    sortable: false,
    component: markRaw(DataTableCellText),
    componentProps: () => ({
      label: '—',
    }),
  },
];

type ExpiryRow = { name: string; email: string; expires: string };

const upcomingRows: ExpiryRow[] = [
  { name: 'Sarah Chen', email: 'sarah@company.com', expires: '1 day' },
  { name: 'Marcus Rodriguez', email: 'marcus@company.com', expires: '2 day' },
  { name: 'Emily Johnson', email: 'emily@company.com', expires: '3 day' },
  { name: 'Michael Smith', email: 'michael@company.com', expires: '6 day' },
];

const weakRows = [
  { name: 'Sarah Chen', detail: '1 day' },
  { name: 'Marcus Rodriguez', detail: '2 day' },
  { name: 'Emily Johnson', detail: '3 day' },
  { name: 'Michael Smith', detail: '6 day' },
];

const unusedRows = [
  { name: 'Sarah Chen', detail: 'Last used 1 day ago' },
  { name: 'Marcus Rodriguez', detail: 'Last used 2 days ago' },
  { name: 'Emily Johnson', detail: 'Last used 3 days ago' },
  { name: 'Michael Smith', detail: 'Last used 6 days ago' },
];

const resourcesPanelCollapsed = ref(false);
</script>

<template>
  <div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-t border-neutral-default_solid bg-neutral-surface">
    <PageHeader
      title="Password Vault"
      :icon="headerIcon"
      :tabs="vaultTabs"
      :activeTab="activeTab"
      @update:activeTab="activeTab = $event"
    >
      <template #actions>
        <div class="flex items-center gap-sm">
          <Button label="Settings" variant="outlined" severity="secondary" />
          <Button variant="outlined" severity="secondary" aria-label="More actions">
            <template #icon="iconProps">
              <EllipsisHorizontalIcon :class="iconProps.class" />
            </template>
          </Button>
        </div>
      </template>
    </PageHeader>

    <PasswordVaultWebsitesView v-if="activeTab === 'websites'" class="min-h-0 flex-1" />

    <PasswordVaultCredentialsView v-else-if="activeTab === 'credentials'" class="min-h-0 flex-1" />

    <PasswordVaultFoldersView v-else-if="activeTab === 'folders'" class="min-h-0 flex-1" />

    <PasswordVaultUsersView v-else-if="activeTab === 'users'" class="min-h-0 flex-1" />

    <div
      v-else-if="activeTab !== 'overview'"
      class="flex min-h-0 flex-1 flex-col overflow-auto px-6 py-6"
    >
      <p class="text-body-md text-neutral-subtle">
        <span class="text-body-md font-semibold text-neutral-base">{{ vaultTabs.find((t) => t.value === activeTab)?.label }}</span>
        is not built in this demo — use Overview or Websites.
      </p>
    </div>

    <DashboardPageLayout v-else class="w-full! h-full! min-h-0! border-0 bg-transparent">
      <div class="flex min-h-0 flex-1 flex-col gap-6 pb-6">
        <div class="grid grid-cols-1 gap-4 min-[900px]:grid-cols-2 min-[1200px]:grid-cols-4">
          <div
            v-for="card in statCards"
            :key="card.title"
            class="flex flex-col gap-3 rounded-lg border border-neutral-default_solid bg-neutral-surface p-4"
          >
            <span class="text-heading-3 text-neutral-base">{{ card.title }}</span>
            <div class="flex flex-col gap-2">
              <span class="text-[32px] font-semibold leading-8 tracking-[-0.5px] text-neutral-base">{{
                card.value
              }}</span>
              <div class="flex flex-wrap items-center gap-1.5">
                <ArrowUpIcon class="size-4 shrink-0 text-success-base" />
                <span class="text-body-sm-bold text-success-base">{{ card.change }}</span>
                <span class="text-body-sm text-neutral-subtle">{{ card.changeLabel }}</span>
              </div>
            </div>
          </div>
        </div>

        <CollapsiblePanel
          v-model:collapsed="resourcesPanelCollapsed"
          header="Most Connected Resources"
          toggleable
        >
          <template #titleicon="iconProps">
            <RectangleStackIcon :class="iconProps.class" />
          </template>
          <template #toggleicon="iconProps">
            <ChevronRightIcon :class="iconProps.class" />
          </template>
          <DataTable
            v-model:selection="resourceSelection"
            :data="connectedResources"
            :columns="resourceColumns"
            selection-mode="multiple"
            :card="true"
            scrollable
            scroll-height="280px"
          />
        </CollapsiblePanel>

        <div class="grid grid-cols-1 gap-4 min-[1000px]:grid-cols-2">
          <div class="flex flex-col rounded-lg border border-neutral-default_solid bg-neutral-surface">
            <div class="flex flex-col gap-1 border-b border-neutral-default_solid p-4">
              <div class="flex items-start justify-between gap-sm">
                <h3 class="text-heading-3 text-neutral-base">Upcoming Password Expirations</h3>
                <Button label="View all" variant="text" size="small" class="shrink-0" />
              </div>
              <div class="flex flex-wrap items-center gap-2 text-body-sm">
                <span class="font-semibold text-neutral-base">7 Expiring Soon</span>
                <Divider layout="vertical" class="!mx-0 !min-h-4" />
                <span class="text-neutral-subtle">Next 7 days</span>
              </div>
            </div>
            <ul class="flex flex-col divide-y divide-neutral-default_solid px-4 py-0">
              <li
                v-for="row in upcomingRows"
                :key="row.email"
                class="flex items-center justify-between gap-sm py-3"
              >
                <div class="min-w-0">
                  <p class="text-body-sm font-semibold text-neutral-base">{{ row.name }}</p>
                  <p class="truncate text-body-xs text-neutral-subtle">{{ row.email }}</p>
                </div>
                <div class="flex shrink-0 items-center gap-sm">
                  <span class="text-body-sm text-neutral-subtle">Expires</span>
                  <span class="text-body-sm font-medium text-neutral-base">{{ row.expires }}</span>
                  <Button variant="text" severity="secondary" aria-label="Row actions" class="!p-1">
                    <template #icon="iconProps">
                      <EllipsisVerticalIcon :class="iconProps.class" class="size-5" />
                    </template>
                  </Button>
                </div>
              </li>
            </ul>
          </div>

          <div class="flex flex-col rounded-lg border border-neutral-default_solid bg-neutral-surface">
            <div class="flex flex-col gap-1 border-b border-neutral-default_solid p-4">
              <div class="flex items-start justify-between gap-sm">
                <h3 class="text-heading-3 text-neutral-base">Credential Expired</h3>
                <Button label="View all" variant="text" size="small" class="shrink-0" />
              </div>
              <div class="flex flex-wrap items-center gap-2 text-body-sm">
                <span class="font-semibold text-neutral-base">7 Expired</span>
                <Divider layout="vertical" class="!mx-0 !min-h-4" />
                <span class="text-neutral-subtle">Last 7 days</span>
              </div>
            </div>
            <ul class="flex flex-col divide-y divide-neutral-default_solid px-4 py-0">
              <li
                v-for="row in upcomingRows"
                :key="`exp-${row.email}`"
                class="flex items-center justify-between gap-sm py-3"
              >
                <div class="min-w-0">
                  <p class="text-body-sm font-semibold text-neutral-base">{{ row.name }}</p>
                  <p class="truncate text-body-xs text-neutral-subtle">{{ row.email }}</p>
                </div>
                <div class="flex shrink-0 items-center gap-sm">
                  <span class="text-body-sm text-neutral-subtle">Expires</span>
                  <span class="text-body-sm font-medium text-neutral-base">{{ row.expires }}</span>
                  <Button variant="text" severity="secondary" aria-label="Row actions" class="!p-1">
                    <template #icon="iconProps">
                      <EllipsisVerticalIcon :class="iconProps.class" class="size-5" />
                    </template>
                  </Button>
                </div>
              </li>
            </ul>
          </div>

          <div class="flex flex-col rounded-lg border border-neutral-default_solid bg-neutral-surface">
            <div class="flex flex-col gap-1 border-b border-neutral-default_solid p-4">
              <div class="flex items-start justify-between gap-sm">
                <h3 class="text-heading-3 text-neutral-base">Weak Credentials</h3>
                <Button label="View all" variant="text" size="small" class="shrink-0" />
              </div>
              <p class="text-body-sm font-semibold text-neutral-base">11 Credentials</p>
            </div>
            <ul class="flex flex-col divide-y divide-neutral-default_solid px-4 py-0">
              <li
                v-for="row in weakRows"
                :key="`weak-${row.name}`"
                class="flex items-center justify-between gap-sm py-2.5"
              >
                <span class="text-body-sm font-medium text-neutral-base">{{ row.name }}</span>
                <div class="flex shrink-0 items-center gap-sm">
                  <span class="text-body-sm text-neutral-base">{{ row.detail }}</span>
                  <Button variant="text" severity="secondary" aria-label="Row actions" class="!p-1">
                    <template #icon="iconProps">
                      <EllipsisVerticalIcon :class="iconProps.class" class="size-5" />
                    </template>
                  </Button>
                </div>
              </li>
            </ul>
          </div>

          <div class="flex flex-col rounded-lg border border-neutral-default_solid bg-neutral-surface">
            <div class="flex flex-col gap-1 border-b border-neutral-default_solid p-4">
              <div class="flex items-start justify-between gap-sm">
                <h3 class="text-heading-3 text-neutral-base">Unused Credentials</h3>
                <Button label="View all" variant="text" size="small" class="shrink-0" />
              </div>
              <p class="text-body-sm font-semibold text-neutral-base">14 Unused</p>
            </div>
            <ul class="flex flex-col divide-y divide-neutral-default_solid px-4 py-0">
              <li
                v-for="row in unusedRows"
                :key="`unused-${row.name}`"
                class="flex items-center justify-between gap-sm py-2.5"
              >
                <span class="text-body-sm font-medium text-neutral-base">{{ row.name }}</span>
                <div class="flex shrink-0 items-center gap-sm">
                  <span class="text-body-sm text-neutral-subtle">Last sign-in</span>
                  <span class="text-body-sm text-neutral-base">{{ row.detail }}</span>
                  <Button variant="text" severity="secondary" aria-label="Row actions" class="!p-1">
                    <template #icon="iconProps">
                      <EllipsisVerticalIcon :class="iconProps.class" class="size-5" />
                    </template>
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardPageLayout>
  </div>
</template>
