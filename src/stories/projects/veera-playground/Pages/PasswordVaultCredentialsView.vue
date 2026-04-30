<script setup lang="ts">
import {
  ActionsToolbar,
  DataTable as CircuitDataTable,
  DataTableCellAction,
  DataTableCellTags,
  DataTableToolbar,
  FormField,
} from '@jumpcloud/circuit/components';
import type { Action, RowsPerPageOption, SelectedItem } from '@jumpcloud/circuit/components';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
  ShareIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import PasswordVaultCredentialLastSeenCell from './PasswordVaultCredentialLastSeenCell.vue';
import PasswordVaultWebsiteNameCell from './PasswordVaultWebsiteNameCell.vue';
import type { CredentialRow } from './credentialTypes';
import { credentialTypeDisplayLabel, type VaultPreviewType } from './vaultDisplayTypes';

import { computed, markRaw, ref, watch } from 'vue';

defineOptions({
  name: 'PasswordVaultCredentialsView',
});

const MOCK_URL = 'http://www.example.com/';

const CREDENTIAL_NAMES = [
  'Google',
  'Microsoft',
  'Apple',
  'Facebook',
  'Netflix',
  'Tesla',
  'Spotify',
  'Airbnb',
  'Uber',
  'Salesforce',
  'Adobe',
  'Twitter',
  'Snapchat',
  'ChatGPT',
] as const;

const TAG_TRIAD = ['Tag 01', 'Tag 02', 'Tag 03'] as const;

const TOTAL_MOCK_RECORDS = 435;

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

function buildCredentialRows(total: number): CredentialRow[] {
  const baseSeen = Date.UTC(2024, 3, 1, 14, 15, 0);
  return Array.from({ length: total }, (_, i) => {
    const preset = CREDENTIAL_NAMES[i % CREDENTIAL_NAMES.length]!;
    const cycle = Math.floor(i / CREDENTIAL_NAMES.length);
    const name = cycle > 0 ? `${preset} (${cycle})` : preset;

    const t = baseSeen - i * 13 * 60 * 1000;
    const vaultPreviewType = CREDENTIAL_PREVIEW_CYCLE[i % CREDENTIAL_PREVIEW_CYCLE.length]!;

    return {
      id: String(i + 1),
      name,
      url: MOCK_URL,
      tags: [...TAG_TRIAD],
      vaultPreviewType,
      credentialTypeLabel: credentialTypeDisplayLabel(vaultPreviewType),
      lastSeenIso: new Date(t).toISOString(),
      tagsSortKey: TAG_TRIAD.join(', '),
    };
  });
}

const rows = ref<CredentialRow[]>(buildCredentialRows(TOTAL_MOCK_RECORDS));

const toolbarSearchQuery = ref('');
const draftTags = ref<string[]>([]);
const appliedTags = ref<string[]>([]);
const showFilterDialog = ref(false);

function formatGroupedValues(values: string[], maxVisible = 2): string {
  if (values.length <= maxVisible) return values.join(', ');
  return `${values.slice(0, maxVisible).join(', ')}, +${values.length - maxVisible}`;
}

const tagPickerOptions = computed(() =>
  [...new Set(rows.value.flatMap((r) => r.tags))]
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((t) => ({ label: t, value: t })),
);

const draftFilterCount = computed(() => (draftTags.value.length > 0 ? 1 : 0));

const activeFilterChips = computed(() => {
  const chips: { id: string; key: string; operator: string; value: string }[] = [];
  if (appliedTags.value.length > 0) {
    chips.push({
      id: 'tags',
      key: 'Tags',
      operator: 'is',
      value: formatGroupedValues(appliedTags.value),
    });
  }
  return chips;
});

function rowMatchesSearch(row: CredentialRow): boolean {
  const q = toolbarSearchQuery.value.trim().toLowerCase();
  if (!q) return true;
  const haystack =
    `${row.name} ${row.url} ${row.credentialTypeLabel} ${row.tags.join(' ')}`.toLowerCase();
  return haystack.includes(q);
}

function rowMatchesTagFilter(row: CredentialRow): boolean {
  if (appliedTags.value.length === 0) return true;
  return appliedTags.value.some((t) => row.tags.includes(t));
}

const filteredRows = computed(() =>
  rows.value.filter((r) => rowMatchesTagFilter(r) && rowMatchesSearch(r)),
);

const selection = ref<CredentialRow[]>([]);
const rowsPerPage = ref(100);
const first = ref(0);

const rowsPerPageOptionsTyped: RowsPerPageOption[] = [
  { label: '100 items per page', value: 100 },
  { label: '50 items per page', value: 50 },
  { label: '25 items per page', value: 25 },
];

watch(
  filteredRows,
  (next) => {
    const ids = new Set(next.map((r) => r.id));
    selection.value = selection.value.filter((r) => ids.has(r.id));
  },
  { flush: 'post' },
);

const launchTrailingIcon = markRaw(ArrowTopRightOnSquareIcon);
const overflowIcon = markRaw(EllipsisHorizontalIcon);

const credentialColumns = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    component: markRaw(PasswordVaultWebsiteNameCell),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      data: sp.data,
    }),
  },
  {
    field: 'tagsSortKey',
    header: 'Tags',
    sortable: true,
    width: 'minmax(200px,1fr)',
    component: markRaw(DataTableCellTags),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      tags: ((sp.data as CredentialRow).tags ?? []) as string[],
      maxVisibleTags: 3,
    }),
  },
  {
    field: 'lastSeenIso',
    header: 'Last Seen',
    sortable: true,
    width: '200px',
    component: markRaw(PasswordVaultCredentialLastSeenCell),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      data: sp.data,
    }),
  },
  {
    field: 'actions',
    header: '',
    sortable: false,
    width: '220px',
    component: markRaw(DataTableCellAction),
    componentProps: (sp: { data: Record<string, unknown> }) => {
      const row = sp.data as CredentialRow;
      return {
        type: 'Button & More' as const,
        actionButtons: [
          {
            label: 'Launch',
            icon: launchTrailingIcon,
          },
        ],
        iconButtons: [
          {
            icon: overflowIcon,
            ariaLabel: 'More actions',
            onClick: () => {
              console.info('[Credentials] Overflow menu', row.id);
            },
          },
        ],
        maxVisibleIconButtons: 2,
      };
    },
  },
];

const bulkActions: Action[] = [
  { id: 'move-folder', label: 'Move folder' },
  { id: 'export', label: 'Export' },
  { id: 'remove', label: 'Remove', class: 'text-danger-base' },
];

const toolbarSelectedItems = computed<SelectedItem[]>(() =>
  selection.value.map((r) => ({
    id: r.id,
    label: r.name,
    description: r.tags.slice(0, 2).join(', '),
  })),
);

function handleToolbarSearch(query: string) {
  toolbarSearchQuery.value = query;
  first.value = 0;
}

function openFilterDialog() {
  draftTags.value = [...appliedTags.value];
  showFilterDialog.value = true;
}

function applyFilters() {
  appliedTags.value = [...draftTags.value];
  showFilterDialog.value = false;
  first.value = 0;
}

function cancelFilterDialog() {
  showFilterDialog.value = false;
}

function clearDraftFilters() {
  draftTags.value = [];
}

function clearAllFilters() {
  appliedTags.value = [];
  toolbarSearchQuery.value = '';
  first.value = 0;
}

function removeFilterChip(chip: { id?: string }) {
  if ((chip.id ?? '') === 'tags') appliedTags.value = [];
  first.value = 0;
}

function handleCredentialRefresh() {
  rows.value = buildCredentialRows(TOTAL_MOCK_RECORDS);
}

function handleShareToolbar() {
  console.info('[PasswordVault Credentials] Share');
}

function handleExportToolbar() {
  console.info('[PasswordVault Credentials] Export');
}

function handleBulkAction(act: Action) {
  console.info('[PasswordVault Credentials]', act.id, selection.value.map((r) => r.id));
}

function handleClearSelection() {
  selection.value = [];
}

function handleOpenAdd() {
  console.info('[PasswordVault Credentials] Add');
}

/** Overrides Circuit tableContainer overflow-hidden! — scroll locks to table body, fills tab height */
const dataTablePt = {
  root: { class: 'flex min-h-0 h-full flex-1 flex-col' },
  tableContainer: {
    class: 'z-10 flex min-h-0 flex-1 !overflow-x-auto !overflow-y-auto pb-md',
  },
  table: { class: '!overflow-visible' },
  footer: { class: '!mt-0 !shrink-0 shrink-0' },
} as const;
</script>

<template>
  <div class="relative flex min-h-0 min-w-0 h-full flex-1 flex-col overflow-hidden bg-neutral-surface">
    <div class="flex min-h-0 min-w-0 flex-1 flex-col px-lg pb-xl pt-lg md:px-xl">
      <CircuitDataTable
        v-model:selection="selection"
        v-model:first="first"
        class="flex min-h-0 min-w-0 flex-1 flex-col"
        :columns="credentialColumns"
        :data="filteredRows.map((r) => r as unknown as Record<string, unknown>)"
        data-key="id"
        selection-mode="multiple"
        :card="true"
        removable-sort
        sort-mode="single"
        scrollable
        scroll-height="flex"
        :highlight-on-select="true"
        :paginator="true"
        :lazy="false"
        :total-records="filteredRows.length"
        v-model:rows="rowsPerPage"
        :rows-per-page-options="rowsPerPageOptionsTyped"
        :show-rows-per-page-options="true"
        :show-page-report="true"
        page-report-template="{first}–{last} of {totalRecords}"
        :page-link-size="6"
        :loading="false"
        :pt="dataTablePt"
        :pt-options="{ mergeSections: true, mergeProps: true }"
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
                :active-filters="activeFilterChips"
                :max-visible-filters="5"
                @add="handleOpenAdd"
                @search="handleToolbarSearch"
                @filter="openFilterDialog"
                @clear-all="clearAllFilters"
                @filter-remove="removeFilterChip"
              >
                <template #right-section>
                  <div class="flex items-center gap-xs">
                    <Button
                      severity="secondary"
                      variant="text"
                      aria-label="Refresh"
                      rounded
                      @click="handleCredentialRefresh"
                    >
                      <template #icon="iconProps">
                        <ArrowPathIcon :class="iconProps.class" />
                      </template>
                    </Button>
                    <Button
                      severity="secondary"
                      variant="text"
                      aria-label="Share"
                      rounded
                      @click="handleShareToolbar"
                    >
                      <template #icon="iconProps">
                        <ShareIcon :class="iconProps.class" />
                      </template>
                    </Button>
                    <Button
                      severity="secondary"
                      variant="text"
                      aria-label="Export"
                      rounded
                      @click="handleExportToolbar"
                    >
                      <template #icon="iconProps">
                        <ArrowDownTrayIcon :class="iconProps.class" />
                      </template>
                    </Button>
                  </div>
                </template>
              </DataTableToolbar>
            </template>
            <template #empty>
              <div class="flex flex-col items-center justify-center gap-xs py-xl text-neutral-subtle">
                <span class="text-body-md">No credentials match filters or search</span>
                <span class="text-body-sm">Adjust filters, search, or clear all</span>
              </div>
            </template>
            <template #initialEmpty>
              <div class="flex flex-col items-center justify-center py-xl text-neutral-subtle">
                <span class="text-body-md">No credentials yet</span>
              </div>
            </template>
      </CircuitDataTable>
    </div>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-md"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-md"
    >
      <div
        v-if="toolbarSelectedItems.length > 0"
        class="absolute bottom-16 left-1/2 z-10 -translate-x-1/2"
      >
        <ActionsToolbar
          :actions="bulkActions"
          :selected-items="toolbarSelectedItems"
          :selection-label="selection.length === 1 ? 'Credential selected' : 'Credentials selected'"
          @action="handleBulkAction"
          @close="handleClearSelection"
        />
      </div>
    </Transition>

    <Dialog
      v-model:visible="showFilterDialog"
      modal
      :draggable="false"
      header="Apply filters"
      :style="{ width: '560px' }"
      @update:visible="!$event && cancelFilterDialog()"
    >
      <template #closeicon>
        <XMarkIcon />
      </template>

      <div class="flex flex-col gap-md">
        <FormField label="Tags">
          <template #default="{ inputId }">
            <MultiSelect
              :id="inputId"
              v-model="draftTags"
              :options="tagPickerOptions"
              option-label="label"
              option-value="value"
              placeholder="All tags"
              :max-selected-labels="2"
              class="w-full"
              filter
              filter-placeholder="Search tags…"
              :show-toggle-all="false"
            />
          </template>
        </FormField>
      </div>

      <template #footer>
        <div class="flex min-w-0 flex-1 items-center">
          <span class="text-body-sm text-neutral-subtle">{{ draftFilterCount }} Filters applied</span>
        </div>
        <div class="flex shrink-0 gap-sm">
          <Button label="Cancel" severity="secondary" variant="text" @click="cancelFilterDialog" />
          <Button label="Clear All" severity="secondary" variant="outlined" @click="clearDraftFilters" />
          <Button label="Apply" @click="applyFilters" />
        </div>
      </template>
    </Dialog>
  </div>
</template>
