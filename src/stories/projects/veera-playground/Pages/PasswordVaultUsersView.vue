<script setup lang="ts">
/**
 * Password Vault — Users Access Management (two-pane: Groups + resource access).
 * Circuit DS: DataTable, DataTableToolbar, SelectButton (segments), Dialog + FormField, Tag chips.
 */
import { computed, markRaw, ref, watch } from 'vue';
import { DataTable as CircuitDataTable, DataTableCellText, DataTableToolbar, FormField } from '@jumpcloud/circuit/components';
import type { RowsPerPageOption } from '@jumpcloud/circuit/components';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import MultiSelect from 'primevue/multiselect';
import SelectButton from 'primevue/selectbutton';
import { XMarkIcon } from '@heroicons/vue/24/outline';

import {
  ACCESS_PERMISSION_CHIPS,
  type AccessRow,
  type UserGroupRow,
} from './passwordVaultUsersTypes';
import AccessPermissionsCell from './AccessPermissionsCell.vue';
import PasswordVaultWebsiteNameCell from './PasswordVaultWebsiteNameCell.vue';
import { credentialTypeDisplayLabel, type VaultPreviewType } from './vaultDisplayTypes';

defineOptions({
  name: 'PasswordVaultUsersView',
});

const TOTAL_GROUP_ROWS = 435;
const TOTAL_ACCESS_ROWS = 435;

/** Name templates rotated for demo groups — includes screenshot examples */
const GROUP_TEMPLATES = [
  'Creative Coders',
  'Data Dynamos',
  'Security Guild',
  'DevOps Collective',
  'Finance Fellows',
  'HR Circle',
] as const;

const CREDENTIAL_PREVIEW_CYCLE: VaultPreviewType[] = [
  'Website',
  'Password',
  'Key',
  'Payment Card',
  'Note',
  '2FA',
  'Identity',
  'ID Card',
];

const RESOURCE_WEB_NAMES = [
  'Google',
  'Microsoft',
  'Salesforce',
  'Apple',
  'Workday',
  'GitHub',
  'AWS Console',
  'Jira',
  'Slack',
] as const;

const RESOURCE_CRED_PREFILL = [
  'Corp VPN Key',
  'Payment Portal',
  'Dev API Token',
  'Okta SSO',
  'Databricks',
  'Snowflake',
] as const;

function buildGroups(): UserGroupRow[] {
  const rows: UserGroupRow[] = [];
  for (let i = 0; i < TOTAL_GROUP_ROWS; i++) {
    const templateKey = GROUP_TEMPLATES[i % GROUP_TEMPLATES.length]!;
    const cycle = Math.floor(i / GROUP_TEMPLATES.length);
    rows.push({
      id: String(i + 1),
      name: cycle > 0 ? `${templateKey} (${cycle})` : templateKey,
      templateKey,
      memberCount: 3 + ((i * 11) % 98),
    });
  }
  return rows;
}

function slugHost(base: string): string {
  return `${base.toLowerCase().replace(/[^a-z0-9]+/g, '')}.com`;
}

function buildWebsiteAccess(groupId: string): AccessRow[] {
  const chips = [...ACCESS_PERMISSION_CHIPS];
  return Array.from({ length: TOTAL_ACCESS_ROWS }, (_, i) => {
    const base = RESOURCE_WEB_NAMES[i % RESOURCE_WEB_NAMES.length]!;
    const cycle = Math.floor(i / RESOURCE_WEB_NAMES.length);
    const name = cycle > 0 ? `${base} (${cycle})` : base;
    const urlDisplay = i % 17 === 3 ? 'www.example.com' : `www.${slugHost(base)}`;
    return {
      id: `w-${groupId}-${i}`,
      name,
      urlDisplay,
      permissions: chips,
      vaultPreviewType: 'Website',
    };
  });
}

function buildCredentialAccess(groupId: string): AccessRow[] {
  const chips = [...ACCESS_PERMISSION_CHIPS];
  return Array.from({ length: TOTAL_ACCESS_ROWS }, (_, i) => {
    if (i === 0) {
      return {
        id: `c-${groupId}-${i}`,
        name: 'Salesforce',
        urlDisplay: 'login.salesforce.com',
        permissions: chips,
        vaultPreviewType: 'Password' satisfies VaultPreviewType,
        credentialTypeLabel: credentialTypeDisplayLabel('Password'),
      };
    }

    const j = i - 1;
    const base = RESOURCE_CRED_PREFILL[j % RESOURCE_CRED_PREFILL.length]!;
    const cycle = Math.floor(j / RESOURCE_CRED_PREFILL.length);
    const name = cycle > 0 ? `${base} (${cycle})` : base;

    const vt = CREDENTIAL_PREVIEW_CYCLE[i % CREDENTIAL_PREVIEW_CYCLE.length]!;
    return {
      id: `c-${groupId}-${i}`,
      name,
      urlDisplay: `${slugHost(base)}`,
      permissions: chips,
      vaultPreviewType: vt,
      credentialTypeLabel: credentialTypeDisplayLabel(vt),
    };
  });
}

const websitesByGroup: Record<string, AccessRow[]> = {};
const credentialsByGroup: Record<string, AccessRow[]> = {};

const groupsAll = ref<UserGroupRow[]>(buildGroups());

function websiteRowsFor(groupId: string): AccessRow[] {
  if (!websitesByGroup[groupId]) websitesByGroup[groupId] = buildWebsiteAccess(groupId);
  return websitesByGroup[groupId];
}

function credentialRowsFor(groupId: string): AccessRow[] {
  if (!credentialsByGroup[groupId]) credentialsByGroup[groupId] = buildCredentialAccess(groupId);
  return credentialsByGroup[groupId];
}

const dataDynamos = groupsAll.value.find((g) => g.name === 'Data Dynamos');
const activeGroupId = ref<string>(dataDynamos?.id ?? groupsAll.value[0]?.id ?? '1');

const activeGroup = computed(
  (): UserGroupRow | undefined =>
    groupsAll.value.find((g) => g.id === activeGroupId.value) ?? groupsAll.value[0],
);

const masterToolbarQuery = ref('');
const draftGroupTemplates = ref<string[]>([]);
const appliedGroupTemplates = ref<string[]>([]);
const showGroupFilterDialog = ref(false);

const groupFilterOptions = computed(() =>
  GROUP_TEMPLATES.map((t) => ({ label: t, value: t })),
);

function formatGroupedTemplates(values: string[], maxVisible = 2): string {
  if (values.length <= maxVisible) return values.join(', ');
  return `${values.slice(0, maxVisible).join(', ')}, +${values.length - maxVisible}`;
}

const draftGroupFilterCount = computed(() =>
  draftGroupTemplates.value.length > 0 ? 1 : 0,
);

const activeGroupFilterChips = computed(() => {
  if (appliedGroupTemplates.value.length === 0) return [];
  return [
    {
      id: 'template',
      key: 'Groups',
      operator: 'is',
      value: formatGroupedTemplates(appliedGroupTemplates.value),
    },
  ];
});

const filteredGroups = computed(() => {
  let list = groupsAll.value;

  if (appliedGroupTemplates.value.length > 0) {
    const allow = new Set(appliedGroupTemplates.value);
    list = list.filter((g) => allow.has(g.templateKey));
  }

  const q = masterToolbarQuery.value.trim().toLowerCase();
  if (q) {
    list = list.filter((g) => `${g.name} ${g.memberCount}`.toLowerCase().includes(q));
  }
  return list;
});

const masterSelection = ref<UserGroupRow[]>([]);

watch(
  filteredGroups,
  (next) => {
    const ids = new Set(next.map((r) => r.id));
    masterSelection.value = masterSelection.value.filter((r) => ids.has(r.id));
    if (activeGroupId.value && !ids.has(activeGroupId.value)) {
      activeGroupId.value = next[0]?.id ?? groupsAll.value[0]?.id ?? '1';
    }
  },
  { flush: 'post' },
);

const leftFirst = ref(0);
const leftRows = ref(100);
const rightFirst = ref(0);
const rightRows = ref(100);

const rowsPerPageOptionsTyped: RowsPerPageOption[] = [
  { label: '100 items per page', value: 100 },
  { label: '50 items per page', value: 50 },
  { label: '25 items per page', value: 25 },
];

const detailTab = ref<'websites' | 'credentials'>('websites');

const resourceSegmentOptions: { label: string; value: 'websites' | 'credentials' }[] = [
  { label: 'Websites', value: 'websites' },
  { label: 'Credentials', value: 'credentials' },
];

const detailSearchWebsites = ref('');
const detailSearchCredentials = ref('');

function currentWebsiteRowsRaw(): AccessRow[] {
  return websiteRowsFor(activeGroupId.value);
}

function currentCredentialRowsRaw(): AccessRow[] {
  return credentialRowsFor(activeGroupId.value);
}

function filterAccessRows(rows: AccessRow[], qRaw: string): AccessRow[] {
  const q = qRaw.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((r) =>
    `${r.name} ${r.urlDisplay} ${r.credentialTypeLabel ?? ''} ${r.permissions.join(' ')}`
      .toLowerCase()
      .includes(q),
  );
}

const detailRowsWebsites = computed(() =>
  filterAccessRows(currentWebsiteRowsRaw(), detailSearchWebsites.value),
);
const detailRowsCredentials = computed(() =>
  filterAccessRows(currentCredentialRowsRaw(), detailSearchCredentials.value),
);

const detailDataForTable = computed(() =>
  detailTab.value === 'websites' ? detailRowsWebsites.value : detailRowsCredentials.value,
);

const detailSelection = ref<AccessRow[]>([]);

watch([activeGroupId, detailTab], () => {
  rightFirst.value = 0;
  detailSelection.value = [];
});

watch(
  detailRowsWebsites,
  (next) => {
    if (detailTab.value !== 'websites') return;
    const ids = new Set(next.map((r) => r.id));
    detailSelection.value = detailSelection.value.filter((r) => ids.has(r.id));
  },
  { flush: 'post' },
);

watch(
  detailRowsCredentials,
  (next) => {
    if (detailTab.value !== 'credentials') return;
    const ids = new Set(next.map((r) => r.id));
    detailSelection.value = detailSelection.value.filter((r) => ids.has(r.id));
  },
  { flush: 'post' },
);

const masterColumns = [
  {
    field: 'name',
    header: 'User Groups',
    sortable: true,
    /** No width → Circuit assigns flexible grid column (fills space after fixed peers). */
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: Record<string, unknown> }) => {
      const row = sp.data as UserGroupRow;
      return {
        label: row.name,
        description: 'Group of Users.',
      };
    },
  },
  {
    field: 'memberCount',
    header: 'Members',
    sortable: true,
    width: '120px',
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      label: String((sp.data as UserGroupRow).memberCount),
    }),
  },
];

const detailColumns = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    width: '55%',
    component: markRaw(PasswordVaultWebsiteNameCell),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      data: sp.data as Record<string, unknown>,
    }),
  },
  {
    field: 'permissions',
    header: 'Permission',
    sortable: true,
    /** No width — Circuit uses flexible column so this expands to fill space after Name (55%). */
    component: markRaw(AccessPermissionsCell),
    componentProps: () => ({}),
  },
];

function masterRowClass(data: Record<string, unknown>): string {
  return (data as UserGroupRow).id === activeGroupId.value ? 'bg-info-surface' : '';
}

function onMasterRowClick(event: unknown) {
  const e = event as { data?: Record<string, unknown> };
  const row = e?.data as UserGroupRow | undefined;
  if (row?.id) activeGroupId.value = row.id;
}

function handleMasterToolbarSearch(query: string) {
  masterToolbarQuery.value = query;
  leftFirst.value = 0;
}

function openGroupFilterDialog() {
  draftGroupTemplates.value = [...appliedGroupTemplates.value];
  showGroupFilterDialog.value = true;
}

function applyGroupFilters() {
  appliedGroupTemplates.value = [...draftGroupTemplates.value];
  showGroupFilterDialog.value = false;
  leftFirst.value = 0;
}

function cancelGroupFilterDialog() {
  showGroupFilterDialog.value = false;
}

function clearDraftGroupFilters() {
  draftGroupTemplates.value = [];
}

function clearAllGroupFilters() {
  appliedGroupTemplates.value = [];
  masterToolbarQuery.value = '';
  leftFirst.value = 0;
}

function removeGroupFilterChip(chip: { id?: string }) {
  if ((chip.id ?? '') === 'template') appliedGroupTemplates.value = [];
  leftFirst.value = 0;
}

function handleAddGroup() {
  console.info('[PasswordVault Users] Add group');
}

function handleAddAccess() {
  console.info('[PasswordVault Users] Add access', activeGroupId.value, detailTab.value);
}

function handleRemoveAccess() {
  console.info('[PasswordVault Users] Remove access', activeGroupId.value);
}

function handleDetailSearchWebsites(query: string) {
  detailSearchWebsites.value = query;
  rightFirst.value = 0;
}

function handleDetailSearchCredentials(query: string) {
  detailSearchCredentials.value = query;
  rightFirst.value = 0;
}

/** PT overrides — full-width fixed layout; footer paginator wraps; scroll lives on tableContainer only. */
const tablePt = {
  root: { class: 'flex min-h-0 h-full w-full max-w-full flex-1 flex-col self-stretch' },
  tableContainer: {
    class:
      'z-10 flex min-h-0 w-full max-w-full flex-1 self-stretch !overflow-x-auto !overflow-y-auto pb-md min-h-0',
  },
  table: {
    class: '!w-full !max-w-full !table-fixed !overflow-visible',
  },
  footer: {
    class:
      '!mt-0 flex w-full max-w-full shrink-0 flex-wrap items-center justify-between gap-y-sm self-stretch pb-md min-w-0',
  },
} as const;
</script>

<template>
  <div
    class="flex min-h-0 h-full flex-1 flex-col bg-neutral-surface px-lg pb-xl pt-lg md:px-xl"
  >
    <!-- Equal split panes; gutter uses Circuit spacing token gap-md (--spacing extended step 4) -->
    <div class="flex h-full min-h-0 flex-1 gap-md">
      <section class="flex min-h-0 min-w-0 flex-1 flex-col">
        <div class="flex min-h-0 min-w-0 w-full max-w-full flex-1 flex-col self-stretch">
          <CircuitDataTable
            v-model:selection="masterSelection"
            v-model:first="leftFirst"
            v-model:rows="leftRows"
            class="flex min-h-0 min-w-0 w-full max-w-full flex-1 flex-col self-stretch"
            :columns="masterColumns"
            :card="true"
            :data="filteredGroups.map((r) => r as unknown as Record<string, unknown>)"
            data-key="id"
            selection-mode="multiple"
            removable-sort
            sort-mode="single"
            scrollable
            scroll-height="flex"
            :highlight-on-select="true"
            :row-class="masterRowClass"
            :paginator="true"
            :lazy="false"
            :total-records="filteredGroups.length"
            :rows-per-page-options="rowsPerPageOptionsTyped"
            :show-rows-per-page-options="false"
            :show-page-report="true"
            page-report-template="{first}–{last} of {totalRecords}"
            :page-link-size="3"
            :loading="false"
            :pt="tablePt"
            :pt-options="{ mergeSections: true, mergeProps: true }"
            @row-click="onMasterRowClick"
          >
            <template #toolbar>
              <DataTableToolbar
                add-button-label="Add"
                search-placeholder="Search"
                :show-save-view-button="false"
                :show-add-button="true"
                :show-filter-button="true"
                :show-refresh-button="false"
                :show-columns-button="false"
                :show-download-button="false"
                :active-filters="activeGroupFilterChips"
                :max-visible-filters="5"
                @add="handleAddGroup"
                @search="handleMasterToolbarSearch"
                @filter="openGroupFilterDialog"
                @clear-all="clearAllGroupFilters"
                @filter-remove="removeGroupFilterChip"
              />
            </template>
            <template #empty>
              <div class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                <span class="text-body-md">No groups match filters or search</span>
                <span class="mt-1 text-body-sm">Adjust filters, search, or clear all</span>
              </div>
            </template>
            <template #initialEmpty>
              <div class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                <span class="text-body-md">No user groups yet</span>
                <span class="mt-1 text-body-sm">Add a group to get started</span>
              </div>
            </template>
          </CircuitDataTable>
        </div>
      </section>

      <section class="flex min-h-0 min-w-0 flex-1 flex-col gap-md">
        <div class="flex shrink-0 items-center justify-between gap-md">
          <h2 class="min-w-0 truncate text-heading-3 text-neutral-base">
            {{ activeGroup?.name ?? '—' }}
          </h2>
          <Button
            label="Remove Access"
            severity="danger"
            variant="text"
            size="small"
            @click="handleRemoveAccess"
          />
        </div>

        <!-- Circuit DS segmented control (primevue/selectbutton bar pattern) -->
        <div class="w-full shrink-0 border-b border-neutral-default_solid py-md">
          <SelectButton
            id="vault-users-resource-segment"
            v-model="detailTab"
            :options="resourceSegmentOptions"
            option-label="label"
            option-value="value"
            :allow-empty="false"
            class="[&_.p-togglebutton:first-child]:rounded-l-md [&_.p-togglebutton:last-child]:rounded-r-md"
          />
        </div>

        <div class="flex min-h-0 min-w-0 w-full max-w-full flex-1 flex-col self-stretch">
          <CircuitDataTable
            :key="`${activeGroupId}-${detailTab}`"
            v-model:selection="detailSelection"
            v-model:first="rightFirst"
            v-model:rows="rightRows"
            class="flex min-h-0 min-w-0 w-full max-w-full flex-1 flex-col self-stretch"
            :columns="detailColumns"
            :card="true"
            :data="detailDataForTable.map((r) => r as unknown as Record<string, unknown>)"
            data-key="id"
            selection-mode="multiple"
            removable-sort
            sort-mode="single"
            scrollable
            scroll-height="flex"
            :highlight-on-select="true"
            :paginator="true"
            :lazy="false"
            :total-records="detailDataForTable.length"
            :rows-per-page-options="rowsPerPageOptionsTyped"
            :show-rows-per-page-options="false"
            :show-page-report="true"
            page-report-template="{first}–{last} of {totalRecords}"
            :page-link-size="3"
            :loading="false"
            :pt="tablePt"
            :pt-options="{ mergeSections: true, mergeProps: true }"
          >
            <template #toolbar>
              <DataTableToolbar
                v-if="detailTab === 'websites'"
                key="sites"
                add-button-label="Add"
                search-placeholder="Search"
                :show-save-view-button="false"
                :show-add-button="true"
                :show-filter-button="false"
                :show-refresh-button="false"
                :show-columns-button="false"
                :show-download-button="false"
                @add="handleAddAccess"
                @search="handleDetailSearchWebsites"
              />
              <DataTableToolbar
                v-else
                key="creds"
                add-button-label="Add"
                search-placeholder="Search"
                :show-save-view-button="false"
                :show-add-button="true"
                :show-filter-button="false"
                :show-refresh-button="false"
                :show-columns-button="false"
                :show-download-button="false"
                @add="handleAddAccess"
                @search="handleDetailSearchCredentials"
              />
            </template>
            <template #empty>
              <div class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                <span class="text-body-md">No resources match search</span>
                <span class="mt-1 text-body-sm">Try another keyword</span>
              </div>
            </template>
            <template #initialEmpty>
              <div class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                <span class="text-body-md">No access grants yet</span>
              </div>
            </template>
          </CircuitDataTable>
        </div>
      </section>
    </div>

    <Dialog
      v-model:visible="showGroupFilterDialog"
      modal
      :draggable="false"
      header="Apply filters"
      :style="{ width: '560px' }"
      @update:visible="!$event && cancelGroupFilterDialog()"
    >
      <template #closeicon>
        <XMarkIcon />
      </template>

      <div class="flex flex-col gap-md">
        <FormField label="Group template">
          <template #default="{ inputId }">
            <MultiSelect
              :id="inputId"
              v-model="draftGroupTemplates"
              :options="groupFilterOptions"
              option-label="label"
              option-value="value"
              placeholder="All groups"
              :max-selected-labels="2"
              class="w-full"
              filter
              filter-placeholder="Search templates…"
              :show-toggle-all="false"
            />
          </template>
        </FormField>
      </div>

      <template #footer>
        <div class="flex min-w-0 flex-1 items-center">
          <span class="text-body-sm text-neutral-subtle">{{ draftGroupFilterCount }} Filters applied</span>
        </div>
        <div class="flex shrink-0 gap-sm">
          <Button label="Cancel" severity="secondary" variant="text" @click="cancelGroupFilterDialog" />
          <Button label="Clear All" severity="secondary" variant="outlined" @click="clearDraftGroupFilters" />
          <Button label="Apply" @click="applyGroupFilters" />
        </div>
      </template>
    </Dialog>
  </div>
</template>
