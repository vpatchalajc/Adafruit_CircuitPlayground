<script setup lang="ts">
import { computed, markRaw, ref, watch } from 'vue';
import {
  ActionsToolbar,
  DataTable as CircuitDataTable,
  DataTableCellLink,
  DataTableCellText,
} from '@jumpcloud/circuit/components';
import type { Action, SelectedItem } from '@jumpcloud/circuit/components';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import { MagnifyingGlassIcon, ShieldCheckIcon, XMarkIcon } from '@heroicons/vue/24/outline';

import {
  ACCESS_PERMISSION_LABELS,
  type AccessRow,
  type UserGroupRow,
} from './passwordVaultUsersTypes';
import AccessPermissionsCell from './AccessPermissionsCell.vue';

defineOptions({
  name: 'PasswordVaultUsersView',
});

function faviconSrcForHost(urlDisplay: string): string {
  const host = urlDisplay.replace(/^https?:\/\//, '').split('/')[0]?.trim() ?? '';
  if (!host) return '';
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
}

const GROUP_NAMES = [
  'Data Dynamos',
  'Security Guild',
  'DevOps Collective',
  'Finance Fellows',
  'HR Circle',
];

function buildGroups(): UserGroupRow[] {
  const rows: UserGroupRow[] = [];
  const total = 118;
  for (let i = 0; i < total; i++) {
    const base = GROUP_NAMES[i % GROUP_NAMES.length]!;
    const cycle = Math.floor(i / GROUP_NAMES.length);
    rows.push({
      id: String(i + 1),
      name: cycle > 0 ? `${base} (${cycle})` : base,
      memberCount: 12 + ((i * 7) % 80),
    });
  }
  return rows;
}

function pickPermissionsForSeed(seed: number): string[] {
  const labels = ACCESS_PERMISSION_LABELS;
  const count = (seed % labels.length) + 1;
  return Array.from({ length: count }, (_, k) => labels[(seed + k) % labels.length]!);
}

function buildWebsiteAccess(groupId: string): AccessRow[] {
  const bases = [
    { name: 'Salesforce', url: 'login.salesforce.com' },
    { name: 'Workday', url: 'workday.com' },
    { name: 'GitHub', url: 'github.company.internal' },
    { name: 'Confluence', url: 'confluence.company.com' },
    { name: 'AWS Console', url: 'console.aws.amazon.com' },
    { name: 'Jira', url: 'jira.company.com' },
  ];
  const rows: AccessRow[] = [];
  for (let round = 0; round < 8; round++) {
    bases.forEach((b, idx) => {
      const seed = round * bases.length + idx;
      rows.push({
        id: `w-${groupId}-${round}-${idx}`,
        name: round > 0 ? `${b.name} (${round})` : b.name,
        urlDisplay: b.url,
        permissions: pickPermissionsForSeed(seed),
      });
    });
  }
  return rows;
}

function buildCredentialAccess(groupId: string): AccessRow[] {
  const bases = [
    { name: 'Salesforce SSO', url: 'login.salesforce.com' },
    { name: 'Corp VPN Key', url: 'vpn.company.com' },
    { name: 'Payment Portal', url: 'pay.company.internal' },
    { name: 'Dev API Token', url: 'api.dev.company.internal' },
  ];
  const rows: AccessRow[] = [];
  for (let round = 0; round < 10; round++) {
    bases.forEach((b, idx) => {
      const seed = round * bases.length + idx + 11;
      rows.push({
        id: `c-${groupId}-${round}-${idx}`,
        name: round > 0 ? `${b.name} (${round})` : b.name,
        urlDisplay: b.url,
        permissions: pickPermissionsForSeed(seed),
      });
    });
  }
  return rows;
}

const websitesByGroup: Record<string, AccessRow[]> = {};
const credentialsByGroup: Record<string, AccessRow[]> = {};

const groupsAll = ref<UserGroupRow[]>(buildGroups());

for (const g of groupsAll.value) {
  websitesByGroup[g.id] = buildWebsiteAccess(g.id).map((r) => ({ ...r }));
  credentialsByGroup[g.id] = buildCredentialAccess(g.id).map((r) => ({ ...r }));
}

const activeGroupId = ref<string>(groupsAll.value[0]?.id ?? '1');

const activeGroup = computed(
  (): UserGroupRow | undefined =>
    groupsAll.value.find((g) => g.id === activeGroupId.value) ?? groupsAll.value[0],
);

const masterSearch = ref('');
const filteredGroups = computed(() => {
  const q = masterSearch.value.trim().toLowerCase();
  if (!q) return groupsAll.value;
  return groupsAll.value.filter(
    (g) => `${g.name} ${g.memberCount}`.toLowerCase().includes(q),
  );
});

const masterSelection = ref<UserGroupRow[]>([]);

const leftFirst = ref(0);
const leftRows = ref(10);

const detailInnerTab = ref<'Websites' | 'Credentials'>('Websites');

const detailSearchWebsites = ref('');
const detailSearchCredentials = ref('');

const detailSearchCombined = computed({
  get() {
    return detailInnerTab.value === 'Websites'
      ? detailSearchWebsites.value
      : detailSearchCredentials.value;
  },
  set(v: string) {
    if (detailInnerTab.value === 'Websites') detailSearchWebsites.value = v;
    else detailSearchCredentials.value = v;
  },
});

function currentWebsiteRowsRaw(): AccessRow[] {
  const gid = activeGroupId.value;
  return websitesByGroup[gid] ?? [];
}

function currentCredentialRowsRaw(): AccessRow[] {
  const gid = activeGroupId.value;
  return credentialsByGroup[gid] ?? [];
}

function filterAccessRows(rows: AccessRow[], qRaw: string): AccessRow[] {
  const q = qRaw.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter(
    (r) =>
      `${r.name} ${r.urlDisplay} ${r.permissions.join(' ')}`.toLowerCase().includes(q),
  );
}

const detailRowsWebsites = computed(() =>
  filterAccessRows(currentWebsiteRowsRaw(), detailSearchWebsites.value),
);
const detailRowsCredentials = computed(() =>
  filterAccessRows(currentCredentialRowsRaw(), detailSearchCredentials.value),
);

const detailDataForTable = computed(() =>
  detailInnerTab.value === 'Websites'
    ? detailRowsWebsites.value
    : detailRowsCredentials.value,
);

const rightFirst = ref(0);
const rightRows = ref(10);

const detailSelection = ref<AccessRow[]>([]);

const showFilterDialog = ref(false);

watch([activeGroupId, detailInnerTab], () => {
  rightFirst.value = 0;
  detailSelection.value = [];
});

const credentialIcon = markRaw(ShieldCheckIcon);

const masterColumns = [
  {
    field: 'name',
    header: 'User Groups',
    sortable: true,
    width: 'minmax(160px,1fr)',
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: Record<string, unknown> }) => {
      const row = sp.data as UserGroupRow;
      return {
        label: row.name,
        description: 'Group of Users',
      };
    },
  },
  {
    field: 'memberCount',
    header: 'Members',
    sortable: true,
    width: '96px',
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      label: String((sp.data as UserGroupRow).memberCount),
    }),
  },
];

const websiteAccessColumns = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    width: 'minmax(180px,1.2fr)',
    component: markRaw(DataTableCellLink),
    componentProps: (sp: { data: Record<string, unknown> }) => {
      const row = sp.data as AccessRow;
      return {
        label: row.name,
        description: row.urlDisplay,
        href: '#',
        image: faviconSrcForHost(row.urlDisplay),
        imageAlt: `Favicon for ${row.name}`,
      };
    },
  },
  {
    field: 'permissions',
    header: 'Permissions',
    sortable: false,
    width: 'minmax(220px,1.75fr)',
    component: markRaw(AccessPermissionsCell),
    componentProps: () => ({}),
  },
];

const credentialAccessColumns = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    width: 'minmax(180px,1.2fr)',
    component: markRaw(DataTableCellLink),
    componentProps: (sp: { data: Record<string, unknown> }) => {
      const row = sp.data as AccessRow;
      return {
        label: row.name,
        description: row.urlDisplay,
        href: '#',
        icon: credentialIcon,
      };
    },
  },
  {
    field: 'permissions',
    header: 'Permissions',
    sortable: false,
    width: 'minmax(220px,1.75fr)',
    component: markRaw(AccessPermissionsCell),
    componentProps: () => ({}),
  },
];

const detailColumns = computed(() =>
  detailInnerTab.value === 'Websites'
    ? websiteAccessColumns
    : credentialAccessColumns,
);

function masterRowClass(data: Record<string, unknown>): string {
  return (data as UserGroupRow).id === activeGroupId.value ? 'bg-info-surface' : '';
}

function onMasterRowClick(event: unknown) {
  const e = event as { data?: Record<string, unknown> };
  const row = e?.data as UserGroupRow | undefined;
  if (row?.id) activeGroupId.value = row.id;
}

const bulkMasterActions: Action[] = [
  { id: 'export', label: 'Export' },
  { id: 'remove', label: 'Remove', class: 'text-danger-base' },
];

const masterToolbarItems = computed<SelectedItem[]>(() =>
  masterSelection.value.map((g) => ({
    id: g.id,
    label: g.name,
    description: `${g.memberCount} members`,
  })),
);

function handleMasterBulk(act: Action) {
  console.info('[PasswordVault Users] master', act.id, masterSelection.value.map((g) => g.id));
}

function clearMasterSelection() {
  masterSelection.value = [];
}

function handleAddGroup() {
  console.info('[PasswordVault Users] Add user group');
}

function handleFilterApply() {
  showFilterDialog.value = false;
}

function handleAddAccess() {
  console.info('[PasswordVault Users] Add access', activeGroupId.value, detailInnerTab.value);
}

function handleRemoveAccess() {
  console.info('[PasswordVault Users] Remove access', activeGroupId.value);
}

const bulkDetailActions: Action[] = [{ id: 'revoke', label: 'Revoke', class: 'text-danger-base' }];

const detailToolbarItems = computed<SelectedItem[]>(() =>
  detailSelection.value.map((r) => ({
    id: r.id,
    label: r.name,
    description: `${r.permissions.join(', ')} · ${r.urlDisplay}`,
  })),
);

function handleDetailBulk(act: Action) {
  console.info('[PasswordVault Users] detail access', act.id, detailSelection.value.map((r) => r.id));
}

function clearDetailSelection() {
  detailSelection.value = [];
}
</script>

<template>
  <div class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-surface px-lg pb-xl pt-lg md:px-xl">
    <div class="flex min-h-0 flex-1 gap-xl">
      <!-- Master (~40%) -->
      <section
        class="relative flex min-h-0 min-w-[280px] w-[40%] flex-col bg-neutral-surface"
      >
        <div
          class="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-neutral-default_solid shadow-e100"
        >
        <CircuitDataTable
          v-model:selection="masterSelection"
          class="min-h-0 flex-1"
          :columns="masterColumns"
          :card="true"
          :data="filteredGroups"
          data-key="id"
          selection-mode="multiple"
          size="default"
          scrollable
          scroll-height="flex"
          :paginator="true"
          :lazy="false"
          :total-records="filteredGroups.length"
          v-model:first="leftFirst"
          v-model:rows="leftRows"
          :show-rows-per-page-options="true"
          :show-page-report="true"
          :highlight-on-select="false"
          :row-class="masterRowClass"
          @row-click="onMasterRowClick"
        >
          <template #toolbar>
            <div class="flex flex-wrap items-center gap-sm px-lg pb-md pt-0 md:py-md">
              <Button label="+ Add" severity="primary" size="small" @click="handleAddGroup" />
              <IconField class="min-w-[140px] flex-1">
                <InputIcon>
                  <MagnifyingGlassIcon class="size-4 text-neutral-muted" aria-hidden="true" />
                </InputIcon>
                <InputText
                  v-model="masterSearch"
                  placeholder="Search… /"
                  class="w-full"
                  autocomplete="off"
                />
              </IconField>
              <Button
                label="Filter"
                variant="outlined"
                severity="secondary"
                size="small"
                @click="showFilterDialog = true"
              />
            </div>
          </template>
          <template #empty>
            <div class="flex flex-col items-center justify-center py-12 text-neutral-subtle">
              <span class="text-body-md">No groups match your search</span>
              <span class="mt-1 text-body-sm">Try another keyword</span>
            </div>
          </template>
          <template #initialEmpty>
            <div class="flex flex-col items-center justify-center py-12 text-neutral-subtle">
              <span class="text-body-md">No user groups yet</span>
              <span class="mt-1 text-body-sm">Create a group to get started</span>
            </div>
          </template>
        </CircuitDataTable>
        </div>

        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-4"
        >
          <div
            v-if="masterToolbarItems.length > 0"
            class="absolute bottom-16 left-1/2 z-10 -translate-x-1/2"
          >
            <ActionsToolbar
              :actions="bulkMasterActions"
              :selected-items="masterToolbarItems"
              selection-label="Groups selected"
              @action="handleMasterBulk"
              @close="clearMasterSelection"
            />
          </div>
        </Transition>
      </section>

      <!-- Detail (~60%) -->
      <section class="relative flex min-h-0 min-w-0 w-[60%] flex-1 flex-col bg-neutral-surface">
        <div class="flex shrink-0 flex-wrap items-start justify-between gap-sm px-lg pb-md pt-lg">
          <div class="min-w-0">
            <p class="text-body-sm text-neutral-subtle">Shared access</p>
            <h2 class="text-heading-3 text-neutral-base">
              {{ activeGroup?.name ?? '—' }}
            </h2>
          </div>
          <Button
            label="Remove Access"
            variant="outlined"
            severity="secondary"
            size="small"
            @click="handleRemoveAccess"
          />
        </div>

        <div class="w-full px-lg pb-md pt-0 lg:px-xl">
          <SelectButton
            v-model="detailInnerTab"
            :options="['Websites', 'Credentials']"
            aria-label="Access type"
          />
        </div>

        <div class="flex shrink-0 flex-wrap items-center gap-sm px-lg py-md lg:px-xl">
          <Button label="+ Add" severity="primary" size="small" @click="handleAddAccess" />
          <IconField class="min-w-[120px] max-w-xl flex-1">
            <InputIcon>
              <MagnifyingGlassIcon class="size-4 text-neutral-muted" aria-hidden="true" />
            </InputIcon>
            <InputText
              v-model="detailSearchCombined"
              placeholder="Search…"
              class="w-full text-body-sm"
              autocomplete="off"
            />
          </IconField>
        </div>

        <div
          class="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-neutral-default_solid shadow-e100"
        >
        <CircuitDataTable
          :key="`${activeGroupId}-${detailInnerTab}`"
          v-model:selection="detailSelection"
          class="min-h-0 flex-1"
          :columns="detailColumns"
          :card="true"
          :data="detailDataForTable"
          data-key="id"
          selection-mode="multiple"
          size="small"
          scrollable
          scroll-height="flex"
          :paginator="true"
          :lazy="false"
          :total-records="detailDataForTable.length"
          v-model:first="rightFirst"
          v-model:rows="rightRows"
          :show-rows-per-page-options="true"
          :show-page-report="true"
        >
          <template #empty>
            <div class="flex flex-col items-center justify-center py-12 text-neutral-subtle">
              <span class="text-body-sm">No items for this tab</span>
              <span class="mt-1 text-body-xs">Add access or adjust search</span>
            </div>
          </template>
          <template #initialEmpty>
            <div class="flex flex-col items-center justify-center py-12 text-neutral-subtle">
              <span class="text-body-sm">No access grants yet</span>
            </div>
          </template>
        </CircuitDataTable>
        </div>

        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-4"
        >
          <div
            v-if="detailToolbarItems.length > 0"
            class="absolute bottom-16 left-1/2 z-10 -translate-x-1/2"
          >
            <ActionsToolbar
              :actions="bulkDetailActions"
              :selected-items="detailToolbarItems"
              selection-label="Items selected"
              @action="handleDetailBulk"
              @close="clearDetailSelection"
            />
          </div>
        </Transition>
      </section>
    </div>

    <Dialog
      v-model:visible="showFilterDialog"
      :draggable="false"
      modal
      header="Filter groups"
      :style="{ width: '520px' }"
    >
      <template #closeicon><XMarkIcon /></template>

      <p class="text-body-md text-neutral-subtle">
        Filters are a Storybook demo. Connect to real filter chips when wired to APIs.
      </p>

      <template #footer>
        <div class="flex flex-1 min-w-0 items-center"></div>
        <div class="flex shrink-0 gap-sm">
          <Button label="Cancel" severity="secondary" variant="text" @click="showFilterDialog = false" />
          <Button label="Apply" @click="handleFilterApply" />
        </div>
      </template>
    </Dialog>
  </div>
</template>
