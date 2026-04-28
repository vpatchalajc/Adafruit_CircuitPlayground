<script setup lang="ts">
import { computed, markRaw, ref } from 'vue';
import {
  CollapsiblePanel,
  DataTable,
  DataTableCellText,
  DataTableToolbar,
  MessageNotification,
} from '@jumpcloud/circuit/components';
import Button from 'primevue/button';
import {
  ArchiveBoxIcon,
  ChartBarIcon,
  ChartBarSquareIcon,
  ClockIcon,
  CubeIcon,
  ExclamationTriangleIcon,
  FolderIcon,
  KeyIcon,
  NoSymbolIcon,
  ShieldExclamationIcon,
  UsersIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline';
import DashboardPageLayout from '@/components/layout/page-layouts/DashboardPageLayout.vue';

/**
 * Figma: Password Vault — Dashboard (node 9:2092).
 * https://www.figma.com/design/lV6RGPTrySjTHr2DEc1rUN/Password-Vault?node-id=9-2092
 */
defineOptions({
  name: 'PasswordVaultDashboardView',
});

type HealthFilter =
  | 'weak'
  | 'expired'
  | 'expiring'
  | 'unused'
  | 'most-connected';

const detailFilter = ref<HealthFilter | null>(null);
const detailSearch = ref('');

/* ─── Summary counts (Figma: Resources, Secrets, Shared Folders, Users) ─── */
const summaryMetrics = [
  { key: 'resources' as const, label: 'Resources', value: 128, icon: markRaw(CubeIcon) },
  { key: 'secrets' as const, label: 'Secrets', value: 542, icon: markRaw(KeyIcon) },
  { key: 'folders' as const, label: 'Shared Folders', value: 36, icon: markRaw(FolderIcon) },
  { key: 'users' as const, label: 'Users', value: 89, icon: markRaw(UsersIcon) },
] as const;

/* ─── Compact preview rows per health category ─── */
const weakPreview = [
  { id: 'w1', name: 'api-prod-ops', resource: 'AWS Console', score: 24 },
  { id: 'w2', name: 'legacy-vpn', resource: 'Corp VPN', score: 31 },
  { id: 'w3', name: 'jira-svc', resource: 'Jira Cloud', score: 38 },
];

const expiredPreview = [
  { id: 'e1', name: 'quarterly-rot', resource: 'Okta', expiredOn: '2025-10-12' },
  { id: 'e2', name: 'db-readonly', resource: 'Postgres (QA)', expiredOn: '2025-11-02' },
  { id: 'e3', name: 'ssh-jump', resource: 'Bastion host', expiredOn: '2025-11-18' },
];

const expiringPreview = [
  { id: 'x1', name: 'payroll-csv', resource: 'HR Portal', daysLeft: 3 },
  { id: 'x2', name: 'token-ci', resource: 'GitHub', daysLeft: 7 },
  { id: 'x3', name: 'wifi-guest', resource: 'Office Wi‑Fi', daysLeft: 12 },
];

const unusedPreview = [
  { id: 'u1', name: 'old-sandbox', resource: 'Google Cloud (sandbox)', lastUsed: '14 mo. ago' },
  { id: 'u2', name: 'vendor-vpn-22', resource: 'Vendor X VPN', lastUsed: '9 mo. ago' },
  { id: 'u3', name: 'archive-wiki', resource: 'Confluence', lastUsed: '6 mo. ago' },
];

const mostConnectedPreview = [
  { id: 'm1', resource: 'Okta (production)', connectionCount: 48 },
  { id: 'm2', resource: 'AWS (shared)', connectionCount: 36 },
  { id: 'm3', resource: 'GitHub Enterprise', connectionCount: 29 },
];

/* Full sets for "View all" (detail) */
const mockWeak = [
  ...weakPreview,
  { id: 'w4', name: 'support-zendesk', resource: 'Zendesk', score: 41 },
  { id: 'w5', name: 'ftp-backup', resource: 'Legacy FTP', score: 19 },
];

const mockExpired = [
  ...expiredPreview,
  { id: 'e4', name: 'cert-auto', resource: 'Internal CA', expiredOn: '2025-09-01' },
];

const mockExpiring = [
  ...expiringPreview,
  { id: 'x4', name: 'ldap-bind', resource: 'Active Directory', daysLeft: 18 },
  { id: 'x5', name: 'mobile-mdm', resource: 'Intune', daysLeft: 21 },
];

const mockUnused = [
  ...unusedPreview,
  { id: 'u4', name: 'lab-esxi', resource: 'ESXi (lab)', lastUsed: '11 mo. ago' },
];

const mockMostConnected = [
  ...mostConnectedPreview,
  { id: 'm4', resource: 'Azure AD', connectionCount: 24 },
  { id: 'm5', resource: '1Password (bridge)', connectionCount: 19 },
];

const filterTitles: Record<HealthFilter, string> = {
  weak: 'Weak credentials',
  expired: 'Expired credentials',
  expiring: 'Expiring credentials',
  unused: 'Unused credentials',
  'most-connected': 'Most connected resources',
};

const detailTitle = computed(() =>
  detailFilter.value ? `All: ${filterTitles[detailFilter.value]}` : 'Credentials',
);

function openViewAll(f: HealthFilter) {
  detailFilter.value = f;
  detailSearch.value = '';
}

function clearFilter() {
  detailFilter.value = null;
  detailSearch.value = '';
}

function onDetailToolbarSearch(query: string) {
  detailSearch.value = query;
}

/* Detail table: columns and data depend on filter */
const detailRows = computed(() => {
  const f = detailFilter.value;
  if (f === 'weak') return mockWeak;
  if (f === 'expired') return mockExpired;
  if (f === 'expiring') return mockExpiring;
  if (f === 'unused') return mockUnused;
  if (f === 'most-connected') return mockMostConnected;
  return [];
});

const filteredDetailRows = computed(() => {
  const q = detailSearch.value.trim().toLowerCase();
  if (!q) return detailRows.value;
  return detailRows.value.filter((row) => {
    const s = JSON.stringify(row).toLowerCase();
    return s.includes(q);
  });
});

type WeakRow = (typeof mockWeak)[number];
type ExpiredRow = (typeof mockExpired)[number];
type ExpiringRow = (typeof mockExpiring)[number];
type UnusedRow = (typeof mockUnused)[number];
type MostRow = (typeof mockMostConnected)[number];

const weakColumns = markRaw([
  {
    field: 'name',
    header: 'Credential',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: WeakRow }) => ({ label: sp.data.name }),
  },
  {
    field: 'resource',
    header: 'Resource',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: WeakRow }) => ({ label: sp.data.resource }),
  },
  {
    field: 'score',
    header: 'Security score',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: WeakRow }) => ({ label: String(sp.data.score) }),
  },
]);

const expiredColumns = markRaw([
  {
    field: 'name',
    header: 'Credential',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: ExpiredRow }) => ({ label: sp.data.name }),
  },
  {
    field: 'resource',
    header: 'Resource',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: ExpiredRow }) => ({ label: sp.data.resource }),
  },
  {
    field: 'expiredOn',
    header: 'Expired on',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: ExpiredRow }) => ({ label: sp.data.expiredOn }),
  },
]);

const expiringColumns = markRaw([
  {
    field: 'name',
    header: 'Credential',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: ExpiringRow }) => ({ label: sp.data.name }),
  },
  {
    field: 'resource',
    header: 'Resource',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: ExpiringRow }) => ({ label: sp.data.resource }),
  },
  {
    field: 'daysLeft',
    header: 'Days left',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: ExpiringRow }) => ({ label: String(sp.data.daysLeft) }),
  },
]);

const unusedColumns = markRaw([
  {
    field: 'name',
    header: 'Credential',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: UnusedRow }) => ({ label: sp.data.name }),
  },
  {
    field: 'resource',
    header: 'Resource',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: UnusedRow }) => ({ label: sp.data.resource }),
  },
  {
    field: 'lastUsed',
    header: 'Last used',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: UnusedRow }) => ({ label: sp.data.lastUsed }),
  },
]);

const mostConnectedColumns = markRaw([
  {
    field: 'resource',
    header: 'Resource',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: MostRow }) => ({ label: sp.data.resource }),
  },
  {
    field: 'connectionCount',
    header: 'Connected credentials',
    sortable: true,
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: MostRow }) => ({ label: String(sp.data.connectionCount) }),
  },
]);

const detailColumns = computed(() => {
  const f = detailFilter.value;
  if (f === 'weak') return weakColumns;
  if (f === 'expired') return expiredColumns;
  if (f === 'expiring') return expiringColumns;
  if (f === 'unused') return unusedColumns;
  if (f === 'most-connected') return mostConnectedColumns;
  return weakColumns;
});
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-surface">
    <template v-if="!detailFilter">
      <DashboardPageLayout class="h-full! w-full!" maxWidth="1440">
        <div class="flex flex-col gap-lg">
          <div>
            <h2 class="text-heading-2 text-neutral-base">At a glance</h2>
            <p class="text-body-sm text-neutral-subtle mt-0.5">
              Totals and password health across your organization.
            </p>
          </div>

          <ul
            class="grid list-none grid-cols-1 gap-md sm:grid-cols-2 xl:grid-cols-4 p-0 m-0"
            aria-label="Password Vault totals"
          >
            <li
              v-for="m in summaryMetrics"
              :key="m.key"
              class="border border-neutral-default_solid rounded-md bg-neutral-surface px-md py-md shadow-sm"
            >
              <div class="flex items-start gap-sm">
                <component :is="m.icon" class="size-5 shrink-0 text-button-primary-base" aria-hidden="true" />
                <div class="min-w-0 flex-1">
                  <span class="text-body-sm text-neutral-subtle">{{ m.label }}</span>
                  <p class="text-heading-1 text-neutral-base mt-sm tabular-nums">
                    {{ m.value.toLocaleString() }}
                  </p>
                </div>
              </div>
            </li>
          </ul>

          <div>
            <h2 class="text-heading-2 text-neutral-base">Password health</h2>
            <p class="text-body-sm text-neutral-subtle mt-0.5">
              High-level overview; use
              <span class="text-body-sm text-neutral-base font-semibold">View all</span>
              to focus on a single category in the list below.
            </p>
          </div>

          <section
            class="grid grid-cols-1 gap-md lg:grid-cols-2 xl:grid-cols-2"
            aria-label="Password health overviews"
          >
            <CollapsiblePanel class="h-auto" header="Weak credentials">
              <template #titleicon="iconProps">
                <ShieldExclamationIcon :class="iconProps.class" />
              </template>
              <template #actions>
                <Button
                  label="View all"
                  severity="secondary"
                  variant="outlined"
                  size="small"
                  @click="openViewAll('weak')"
                />
              </template>
              <p class="text-body-sm text-neutral-subtle mb-sm">
                Strength score below your policy threshold.
              </p>
              <ol class="m-0 flex list-decimal flex-col gap-0 border-t border-neutral-default_solid p-0 pl-5 text-body-sm text-neutral-base">
                <li
                  v-for="r in weakPreview"
                  :key="r.id"
                  class="border-b border-neutral-default_solid py-sm last:border-b-0"
                >
                  <span class="text-body-sm font-medium text-neutral-base">{{ r.name }}</span>
                  <span class="text-body-sm text-neutral-subtle"> — {{ r.resource }} · score {{ r.score }}</span>
                </li>
              </ol>
            </CollapsiblePanel>

            <CollapsiblePanel class="h-auto" header="Expired credentials">
              <template #titleicon="iconProps">
                <XCircleIcon :class="iconProps.class" />
              </template>
              <template #actions>
                <Button
                  label="View all"
                  severity="secondary"
                  variant="outlined"
                  size="small"
                  @click="openViewAll('expired')"
                />
              </template>
              <p class="text-body-sm text-neutral-subtle mb-sm">Past the expiration or rotation date.</p>
              <ol class="m-0 flex list-decimal flex-col gap-0 border-t border-neutral-default_solid p-0 pl-5 text-body-sm text-neutral-base">
                <li
                  v-for="r in expiredPreview"
                  :key="r.id"
                  class="border-b border-neutral-default_solid py-sm last:border-b-0"
                >
                  <span class="text-body-sm font-medium text-neutral-base">{{ r.name }}</span>
                  <span class="text-body-sm text-neutral-subtle"> — {{ r.resource }} · {{ r.expiredOn }}</span>
                </li>
              </ol>
            </CollapsiblePanel>

            <CollapsiblePanel class="h-auto" header="Expiring credentials">
              <template #titleicon="iconProps">
                <ClockIcon :class="iconProps.class" />
              </template>
              <template #actions>
                <Button
                  label="View all"
                  severity="secondary"
                  variant="outlined"
                  size="small"
                  @click="openViewAll('expiring')"
                />
              </template>
              <p class="text-body-sm text-neutral-subtle mb-sm">Will expire within the next window you define.</p>
              <ol class="m-0 flex list-decimal flex-col gap-0 border-t border-neutral-default_solid p-0 pl-5 text-body-sm text-neutral-base">
                <li
                  v-for="r in expiringPreview"
                  :key="r.id"
                  class="border-b border-neutral-default_solid py-sm last:border-b-0"
                >
                  <span class="text-body-sm font-medium text-neutral-base">{{ r.name }}</span>
                  <span class="text-body-sm text-neutral-subtle"> — {{ r.resource }} · {{ r.daysLeft }}d left</span>
                </li>
              </ol>
            </CollapsiblePanel>

            <CollapsiblePanel class="h-auto" header="Unused credentials">
              <template #titleicon="iconProps">
                <ArchiveBoxIcon :class="iconProps.class" />
              </template>
              <template #actions>
                <Button
                  label="View all"
                  severity="secondary"
                  variant="outlined"
                  size="small"
                  @click="openViewAll('unused')"
                />
              </template>
              <p class="text-body-sm text-neutral-subtle mb-sm">No use recorded for a long period.</p>
              <ol class="m-0 flex list-decimal flex-col gap-0 border-t border-neutral-default_solid p-0 pl-5 text-body-sm text-neutral-base">
                <li
                  v-for="r in unusedPreview"
                  :key="r.id"
                  class="border-b border-neutral-default_solid py-sm last:border-b-0"
                >
                  <span class="text-body-sm font-medium text-neutral-base">{{ r.name }}</span>
                  <span class="text-body-sm text-neutral-subtle"> — {{ r.resource }} · {{ r.lastUsed }}</span>
                </li>
              </ol>
            </CollapsiblePanel>

            <CollapsiblePanel class="h-auto min-h-0 lg:col-span-2" header="Most connected resources">
              <template #titleicon="iconProps">
                <ChartBarSquareIcon :class="iconProps.class" />
              </template>
              <template #actions>
                <Button
                  label="View all"
                  severity="secondary"
                  variant="outlined"
                  size="small"
                  @click="openViewAll('most-connected')"
                />
              </template>
              <p class="text-body-sm text-neutral-subtle mb-sm">Resources with the most linked credentials.</p>
              <ol class="m-0 flex list-decimal flex-col gap-0 border-t border-neutral-default_solid p-0 pl-5 text-body-sm text-neutral-base">
                <li
                  v-for="r in mostConnectedPreview"
                  :key="r.id"
                  class="border-b border-neutral-default_solid py-sm last:border-b-0"
                >
                  <span class="text-body-sm font-medium text-neutral-base">{{ r.resource }}</span>
                  <span class="text-body-sm text-neutral-subtle"> — {{ r.connectionCount }} connected</span>
                </li>
              </ol>
            </CollapsiblePanel>
          </section>
        </div>
      </DashboardPageLayout>
    </template>

    <div v-else class="flex min-h-0 flex-1 flex-col">
      <div class="shrink-0 space-y-sm border-b border-neutral-default_solid bg-neutral-surface px-6 py-md">
        <MessageNotification
          severity="info"
          :title="filterTitles[detailFilter as HealthFilter]"
          :detail="`Filter applied from dashboard. Showing all rows in this category. Use search to narrow further.`"
        />
        <div class="flex flex-wrap items-end justify-between gap-sm">
          <div class="flex min-w-0 items-center gap-sm">
            <ExclamationTriangleIcon
              v-if="detailFilter === 'weak' || detailFilter === 'expired'"
              class="size-5 shrink-0 text-warning-base"
              aria-hidden="true"
            />
            <ClockIcon
              v-else-if="detailFilter === 'expiring'"
              class="size-5 shrink-0 text-info-base"
              aria-hidden="true"
            />
            <NoSymbolIcon
              v-else-if="detailFilter === 'unused'"
              class="size-5 shrink-0 text-neutral-subtle"
              aria-hidden="true"
            />
            <ChartBarIcon
              v-else
              class="size-5 shrink-0 text-button-primary-base"
              aria-hidden="true"
            />
            <h2 class="text-heading-2 text-neutral-base">{{ detailTitle }}</h2>
          </div>
          <Button
            label="Back to overview"
            severity="secondary"
            variant="outlined"
            @click="clearFilter"
          />
        </div>
      </div>

      <div class="relative flex min-h-0 flex-1 flex-col px-6 py-md">
        <DataTable
          :key="String(detailFilter)"
          :data="filteredDetailRows"
          :columns="detailColumns"
          :card="true"
          scrollable
          scroll-height="flex"
          class="min-h-0 h-full flex-1"
        >
          <template #toolbar>
            <DataTableToolbar
              :search-placeholder="`Search ${filterTitles[detailFilter as HealthFilter].toLowerCase()}…`"
              :show-save-view-button="false"
              :show-add-button="false"
              :show-filter-button="false"
              @search="onDetailToolbarSearch"
            />
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>
