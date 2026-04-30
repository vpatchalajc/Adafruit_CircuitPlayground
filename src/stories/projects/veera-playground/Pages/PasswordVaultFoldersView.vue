<script setup lang="ts">
import { computed, markRaw, ref, watch } from 'vue';
import {
  ActionsToolbar,
  DataTable as CircuitDataTable,
  DataTableCellAction,
  DataTableCellText,
  DataTableToolbar,
  FormField,
} from '@jumpcloud/circuit/components';
import type {
  Action,
  ColumnConfig,
  DataTableColumn,
  ExportOption,
  RowsPerPageOption,
  SelectedItem,
} from '@jumpcloud/circuit/components';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import { EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import FolderPrimaryCell from './FolderPrimaryCell.vue';
import FolderLastUpdatedCell from './FolderLastUpdatedCell.vue';

defineOptions({
  name: 'PasswordVaultFoldersView',
});

const TOTAL_MOCK_RECORDS = 435;

const NAMES = ['Ocean', 'Crimson', 'Azure', 'Indigo', 'Slate', 'Sage', 'Ember', 'Glacier', 'Nova', 'Onyx'];

const OWNERS = [
  'Emma Johnson',
  'Jordan Lee',
  'Priya Patel',
  'Marcus Reid',
  'Alex Morgan',
  'Sam Rivera',
];

function buildFolderRows(total: number): FolderRow[] {
  const base = new Date(Date.UTC(2025, 2, 1, 14, 30, 0));

  return Array.from({ length: total }, (_, i) => {
    if (i === 0) {
      return {
        id: '1',
        folderName: 'Ocean',
        resourceCount: 23,
        ownerFullName: 'Emma Johnson',
        usersWithAccessCount: 47,
        lastUpdatedIso: new Date(2024, 2, 15, 8, 23, 0).toISOString(),
        shared: false,
      };
    }

    const folderName =
      NAMES[i % NAMES.length]! +
      (Math.floor(i / NAMES.length) > 0 ? ` (${Math.floor(i / NAMES.length)})` : '');

    const last = new Date(base);
    last.setUTCDate(last.getUTCDate() + (i % 40));
    last.setUTCHours(10 + (i % 9), (i * 11) % 60, 0, 0);

    return {
      id: String(i + 1),
      folderName,
      resourceCount: 3 + ((i * 7) % 120),
      ownerFullName: OWNERS[i % OWNERS.length]!,
      usersWithAccessCount: 1 + (i % 24),
      lastUpdatedIso: last.toISOString(),
      shared: i % 8 === 0,
    };
  });
}

const rows = ref<FolderRow[]>(buildFolderRows(TOTAL_MOCK_RECORDS));

const toolbarSearchQuery = ref('');
const draftOwners = ref<string[]>([]);
const appliedOwners = ref<string[]>([]);
const showFilterDialog = ref(false);

const selection = ref<FolderRow[]>([]);
const rowsPerPage = ref(100);
const first = ref(0);

const rowsPerPageOptionsTyped: RowsPerPageOption[] = [
  { label: '100 items per page', value: 100 },
  { label: '50 items per page', value: 50 },
  { label: '25 items per page', value: 25 },
];

const folderToolbarColumns = ref<ColumnConfig[]>([
  { id: 'folderName', label: 'Folder', visible: true, isDefault: true },
  { id: 'ownerFullName', label: 'Owner', visible: true, isDefault: true },
  { id: 'usersWithAccessCount', label: 'Users', visible: true, isDefault: true },
  { id: 'lastUpdatedIso', label: 'Last Updated', visible: true, isDefault: true },
]);

const visibleFolderToolbarColumnCount = computed(
  () => folderToolbarColumns.value.filter((c) => c.visible).length,
);

const folderExportOptions: ExportOption[] = [
  { id: 'csv', label: 'Export as CSV' },
  { id: 'xlsx', label: 'Export as Excel' },
];

function formatGroupedValues(values: string[], maxVisible = 2): string {
  if (values.length <= maxVisible) return values.join(', ');
  return `${values.slice(0, maxVisible).join(', ')}, +${values.length - maxVisible}`;
}

const ownerFilterOptions = computed(() =>
  [...new Set(rows.value.map((r) => r.ownerFullName))]
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((o) => ({ label: o, value: o })),
);

const draftFilterCount = computed(() => (draftOwners.value.length > 0 ? 1 : 0));

const activeFilterChips = computed(() => {
  const chips: { id: string; key: string; operator: string; value: string }[] = [];
  if (appliedOwners.value.length > 0) {
    chips.push({
      id: 'owner',
      key: 'Owner',
      operator: 'is',
      value: formatGroupedValues(appliedOwners.value),
    });
  }
  return chips;
});

function rowMatchesSearch(row: FolderRow): boolean {
  const q = toolbarSearchQuery.value.trim().toLowerCase();
  if (!q) return true;
  const haystack = `${row.folderName} ${row.ownerFullName} ${row.usersWithAccessCount}`.toLowerCase();
  return haystack.includes(q);
}

function rowMatchesOwnerFilter(row: FolderRow): boolean {
  if (appliedOwners.value.length === 0) return true;
  return appliedOwners.value.includes(row.ownerFullName);
}

const filteredRows = computed(() =>
  rows.value.filter((r) => rowMatchesOwnerFilter(r) && rowMatchesSearch(r)),
);

watch(
  filteredRows,
  (next) => {
    const ids = new Set(next.map((r) => r.id));
    selection.value = selection.value.filter((r) => ids.has(r.id));
  },
  { flush: 'post' },
);

const overflowIcon = markRaw(EllipsisHorizontalIcon);

const folderPrimaryCellC = markRaw(FolderPrimaryCell);
const folderLastUpdatedCellC = markRaw(FolderLastUpdatedCell);
const dataTableCellTextC = markRaw(DataTableCellText);
const dataTableCellActionC = markRaw(DataTableCellAction);

const COLUMN_ORDER_IDS = [
  'folderName',
  'ownerFullName',
  'usersWithAccessCount',
  'lastUpdatedIso',
] as const;

const FOLDER_DATA_COLUMN_DEFS: { id: string; def: DataTableColumn }[] = [
  {
    id: 'folderName',
    def: {
      field: 'folderName',
      header: 'Folder',
      sortable: true,
      /** HTML table columns cannot use grid `fr`; px keeps width stable under horizontal scroll */
      width: '240px',
      component: folderPrimaryCellC,
      componentProps: () => ({}),
    },
  },
  {
    id: 'ownerFullName',
    def: {
      field: 'ownerFullName',
      header: 'Owner',
      sortable: true,
      width: '180px',
      component: dataTableCellTextC,
      componentProps: (sp: { data: Record<string, unknown> }) => ({
        label: (sp.data as FolderRow).ownerFullName,
      }),
    },
  },
  {
    id: 'usersWithAccessCount',
    def: {
      field: 'usersWithAccessCount',
      header: 'Users',
      sortable: true,
      width: '100px',
      component: dataTableCellTextC,
      componentProps: (sp: { data: Record<string, unknown> }) => ({
        label: String((sp.data as FolderRow).usersWithAccessCount),
      }),
    },
  },
  {
    id: 'lastUpdatedIso',
    def: {
      field: 'lastUpdatedIso',
      header: 'Last Updated',
      sortable: true,
      width: '200px',
      component: folderLastUpdatedCellC,
      componentProps: (sp: { data: Record<string, unknown> }) => ({
        data: sp.data,
      }),
    },
  },
];

const ACTIONS_COLUMN_DEF: DataTableColumn = {
  field: 'actions',
  header: '',
  sortable: false,
  width: '240px',
  component: dataTableCellActionC,
  componentProps: (sp: { data: Record<string, unknown> }) => {
    const row = sp.data as FolderRow;
    return {
      type: 'Button & More' as const,
      actionButtons: [
        {
          label: 'Manage Access',
          onClick: () => {
            console.info('[PasswordVault Folders] Manage Access', row.id);
          },
        },
      ],
      iconButtons: [
        {
          icon: overflowIcon,
          ariaLabel: 'More actions',
          onClick: () => {
            console.info('[PasswordVault Folders] More menu', row.id);
          },
        },
      ],
      maxVisibleIconButtons: 2,
    };
  },
};

const folderTableColumns = computed<DataTableColumn[]>(() => {
  const config = folderToolbarColumns.value;
  const visibleOrdered = COLUMN_ORDER_IDS.map((id) => {
    const cfg = config.find((c) => c.id === id);
    return cfg?.visible ? id : null;
  }).filter((id): id is (typeof COLUMN_ORDER_IDS)[number] => id != null);

  const dataCols = visibleOrdered.map(
    (id) => FOLDER_DATA_COLUMN_DEFS.find((d) => d.id === id)!.def,
  );
  return [...dataCols, ACTIONS_COLUMN_DEF];
});

const bulkActions: Action[] = [
  { id: 'move', label: 'Move' },
  { id: 'export', label: 'Export' },
  { id: 'remove', label: 'Remove', class: 'text-danger-base' },
];

const toolbarSelectedItems = computed<SelectedItem[]>(() =>
  selection.value.map((r) => ({
    id: r.id,
    label: r.folderName,
    description: `${r.resourceCount} Resources`,
  })),
);

function handleToolbarSearch(query: string) {
  toolbarSearchQuery.value = query;
  first.value = 0;
}

function openFilterDialog() {
  draftOwners.value = [...appliedOwners.value];
  showFilterDialog.value = true;
}

function applyFilters() {
  appliedOwners.value = [...draftOwners.value];
  showFilterDialog.value = false;
  first.value = 0;
}

function cancelFilterDialog() {
  showFilterDialog.value = false;
}

function clearDraftFilters() {
  draftOwners.value = [];
}

function clearAllFilters() {
  appliedOwners.value = [];
  toolbarSearchQuery.value = '';
  first.value = 0;
}

function removeFilterChip(chip: { id?: string }) {
  if ((chip.id ?? '') === 'owner') appliedOwners.value = [];
  first.value = 0;
}

function handleFoldersRefresh() {
  rows.value = buildFolderRows(TOTAL_MOCK_RECORDS);
}

function handleFolderExport(option: ExportOption) {
  console.info('[PasswordVault Folders] Export', option.id);
}

function handleBulkAction(act: Action) {
  console.info('[PasswordVault Folders]', act.id, selection.value.map((r) => r.id));
}

function handleClearSelection() {
  selection.value = [];
}

function handleNewFolder() {
  console.info('[PasswordVault Folders] New');
}

function patchFolderColumnVisibility(column: ColumnConfig, visible: boolean) {
  const target = folderToolbarColumns.value.find((c) => c.id === column.id);
  if (target) target.visible = visible;
}

const dataTablePt = {
  root: { class: 'flex min-h-0 h-full flex-1 flex-col' },
  tableContainer: {
    class: 'z-10 flex min-h-0 flex-1 !overflow-x-auto !overflow-y-auto pb-md',
  },
  table: { class: '!w-full !max-w-full !table-fixed !overflow-visible' },
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
        :columns="folderTableColumns"
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
              add-button-label="New"
              search-placeholder="Search"
              :show-save-view-button="false"
              :show-add-button="true"
              :show-filter-button="true"
              :show-refresh-button="true"
              :show-columns-button="true"
              :show-download-button="true"
              :columns="folderToolbarColumns"
              :visible-columns-count="visibleFolderToolbarColumnCount"
              :export-options="folderExportOptions"
              :active-filters="activeFilterChips"
              :max-visible-filters="5"
              @add="handleNewFolder"
              @search="handleToolbarSearch"
              @filter="openFilterDialog"
              @refresh="handleFoldersRefresh"
              @visibility-change="patchFolderColumnVisibility"
              @download="handleFolderExport"
              @clear-all="clearAllFilters"
              @filter-remove="removeFilterChip"
            />
          </template>
          <template #empty>
            <div class="flex flex-col items-center justify-center gap-xs py-xl text-neutral-subtle">
              <span class="text-body-md">No folders match filters or search</span>
              <span class="text-body-sm">Adjust filters, search, or clear all</span>
            </div>
          </template>
          <template #initialEmpty>
            <div class="flex flex-col items-center justify-center gap-xs py-xl text-neutral-subtle">
              <span class="text-body-md">No folders yet</span>
              <span class="text-body-sm">Add a folder to get started</span>
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
          :selection-label="selection.length === 1 ? 'Folder selected' : 'Folders selected'"
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
        <FormField label="Owner">
          <template #default="{ inputId }">
            <MultiSelect
              :id="inputId"
              v-model="draftOwners"
              :options="ownerFilterOptions"
              option-label="label"
              option-value="value"
              placeholder="All owners"
              :max-selected-labels="2"
              class="w-full"
              filter
              filter-placeholder="Search owners…"
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
