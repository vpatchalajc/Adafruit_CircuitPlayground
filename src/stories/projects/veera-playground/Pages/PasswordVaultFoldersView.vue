<script setup lang="ts">
import { computed, markRaw, ref } from 'vue';
import {
  ActionsToolbar,
  DataTable as CircuitDataTable,
  DataTableCellAction,
  DataTableCellText,
  DataTableToolbar,
} from '@jumpcloud/circuit/components';
import type { Action, SelectedItem } from '@jumpcloud/circuit/components';
import FolderPrimaryCell from './FolderPrimaryCell.vue';
import ListPageLayout from '@/components/layout/page-layouts/ListPageLayout.vue';
import type { FolderRow } from './folderTypes';

defineOptions({
  name: 'PasswordVaultFoldersView',
});

/** Matches Credentials / Folder spec — MMM DD, YYYY @ h:mm AM/PM */
function formatLastUpdated(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  const datePart = d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timePart = d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${datePart} @ ${timePart}`;
}

const NAMES = ['Ocean', 'Crimson', 'Azure', 'Indigo', 'Slate', 'Sage', 'Ember', 'Glacier', 'Nova', 'Onyx'];

const OWNERS = [
  'Jordan Lee',
  'Priya Patel',
  'Marcus Reid',
  'Alex Morgan',
  'Sam Rivera',
];

function buildFolderRows(total: number): FolderRow[] {
  const base = new Date('2025-03-01T09:30:00.000Z');

  return Array.from({ length: total }, (_, i) => {
    const folderName =
      NAMES[i % NAMES.length]! +
      (Math.floor(i / NAMES.length) > 0 ? ` (${Math.floor(i / NAMES.length)})` : '');

    const last = new Date(base);
    last.setDate(last.getDate() + (i % 40));
    last.setHours(10 + (i % 9), (i * 11) % 60, 0, 0);

    return {
      id: String(i + 1),
      folderName,
      resourceCount: 3 + ((i * 7) % 120),
      ownerFullName: OWNERS[i % OWNERS.length]!,
      usersWithAccessCount: 1 + (i % 24),
      lastUpdatedIso: last.toISOString(),
    };
  });
}

const rows = ref<FolderRow[]>(buildFolderRows(48));

const searchQuery = ref('');
const filteredRows = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return rows.value;
  return rows.value.filter((row) => {
    const hay = `${row.folderName} ${row.ownerFullName} ${row.usersWithAccessCount}`.toLowerCase();
    return hay.includes(q);
  });
});

const selection = ref<FolderRow[]>([]);

const folderColumns = [
  {
    field: 'folderName',
    header: 'Folder',
    sortable: true,
    width: 'minmax(220px,1.4fr)',
    component: markRaw(FolderPrimaryCell),
    componentProps: () => ({}),
  },
  {
    field: 'owner',
    header: 'Owner',
    sortable: true,
    width: 'minmax(140px,1fr)',
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      label: (sp.data as FolderRow).ownerFullName,
    }),
  },
  {
    field: 'users',
    header: 'Users',
    sortable: true,
    width: '100px',
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      label: String((sp.data as FolderRow).usersWithAccessCount),
    }),
  },
  {
    field: 'lastUpdated',
    header: 'Last Updated',
    sortable: true,
    width: '200px',
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      label: formatLastUpdated((sp.data as FolderRow).lastUpdatedIso),
    }),
  },
  {
    field: 'actions',
    header: '',
    sortable: false,
    width: '240px',
    component: markRaw(DataTableCellAction),
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
          /** Second slot enables ellipsis “more” UI in Circuit DataTableCellAction */
          {
            label: '\u00a0',
            onClick: () => {
              console.info('[PasswordVault Folders] More menu', row.id);
            },
          },
        ],
      };
    },
  },
];

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

function handleSearch(query: unknown) {
  searchQuery.value = typeof query === 'string' ? query : '';
}

function handleBulkAction(act: Action) {
  console.info('[PasswordVault Folders]', act.id, selection.value.map((r) => r.id));
}

function handleClearSelection() {
  selection.value = [];
}

function handleAddFolder() {
  console.info('[PasswordVault Folders] Add folder');
}
</script>

<template>
  <div class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-surface">
    <ListPageLayout class="w-full! h-full! min-h-0! border-0">
      <div
        class="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-neutral-default_solid shadow-e100"
      >
        <CircuitDataTable
          v-model:selection="selection"
          class="min-h-0 flex-1"
          :columns="folderColumns"
          :data="filteredRows"
          data-key="id"
          selection-mode="multiple"
          :card="true"
          scrollable
          scroll-height="flex"
          :loading="false"
          :paginator="true"
          :lazy="false"
          :total-records="filteredRows.length"
          :rows="10"
          :show-rows-per-page-options="true"
          :show-page-report="true"
        >
          <template #toolbar>
            <DataTableToolbar
              add-button-label="Add Folder"
              :show-save-view-button="false"
              search-placeholder="Search folders…"
              :show-add-button="true"
              :show-filter-button="false"
              :show-refresh-button="true"
              :show-columns-button="false"
              :show-download-button="false"
              @add="handleAddFolder"
              @search="handleSearch"
            >
              <template #saved-views>
                <span class="mr-md text-body-md text-neutral-subtle">{{ filteredRows.length }} Folders</span>
              </template>
            </DataTableToolbar>
          </template>
          <template #empty>
            <div class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
              <span class="text-body-md">No folders match your search</span>
              <span class="mt-1 text-body-sm">Try a different term</span>
            </div>
          </template>
          <template #initialEmpty>
            <div class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
              <span class="text-body-md">No folders yet</span>
              <span class="mt-1 text-body-sm">Add a folder to get started</span>
            </div>
          </template>
        </CircuitDataTable>
      </div>
    </ListPageLayout>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
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
  </div>
</template>
