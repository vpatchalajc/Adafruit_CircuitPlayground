<script setup lang="ts">
import { computed, markRaw, ref } from 'vue';
import {
  ActionsToolbar,
  DataTable as CircuitDataTable,
  DataTableCellAction,
  DataTableCellTags,
  DataTableCellText,
  DataTableToolbar,
} from '@jumpcloud/circuit/components';
import type { Action, RowsPerPageOption, SelectedItem } from '@jumpcloud/circuit/components';
import { EllipsisVerticalIcon, EyeIcon } from '@heroicons/vue/24/outline';
import CredentialNameCell from './CredentialNameCell.vue';
import ListPageLayout from '@/components/layout/page-layouts/ListPageLayout.vue';

import type { CredentialCategory, CredentialRow } from './credentialTypes';

defineOptions({
  name: 'PasswordVaultCredentialsView',
});

/** "28 April 2026" style */
function formatExpiration(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** "Apr 28, 2026 @ 3:45 PM" style */
function formatLastUsed(iso: string): string {
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

const TOTAL_MOCK_RECORDS = 435;

/** Seeds first rows to mirror Figma / reference column (service + type pairing) */
const ROW_PRESETS: { serviceName: string; credentialType: CredentialCategory }[] = [
  { serviceName: 'Google', credentialType: 'password' },
  { serviceName: 'Netflix', credentialType: 'password' },
  { serviceName: 'Spotify', credentialType: 'password' },
  { serviceName: 'Uber', credentialType: 'password' },
  { serviceName: 'Salesforce', credentialType: 'password' },
  { serviceName: 'Microsoft', credentialType: 'payment_card' },
  { serviceName: 'Airbnb', credentialType: 'payment_card' },
  { serviceName: 'Apple', credentialType: 'secure_note' },
  { serviceName: 'Adobe', credentialType: 'secure_note' },
  { serviceName: 'Twitter', credentialType: 'secure_note' },
  { serviceName: 'Facebook', credentialType: 'key' },
  { serviceName: 'Snapchat', credentialType: 'key' },
  { serviceName: 'Tesla', credentialType: 'two_factor' },
];

const CATEGORY_LABELS: Record<CredentialCategory, string> = {
  password: 'Password',
  payment_card: 'Payment Card',
  key: 'Key',
  secure_note: 'Secured Note',
  two_factor: '2FA',
};

function buildCredentialRows(total: number): CredentialRow[] {
  const base = new Date('2025-06-01T12:00:00.000Z');
  return Array.from({ length: total }, (_, i) => {
    const preset = ROW_PRESETS[i % ROW_PRESETS.length]!;
    const credentialType = preset.credentialType;
    const cycle = Math.floor(i / ROW_PRESETS.length);

    let serviceName: string;
    if (credentialType === 'payment_card') {
      const suffix = cycle > 0 ? ` (${cycle})` : '';
      serviceName = `${preset.serviceName}${suffix} • Card •••• ${String(4240 + (i % 100)).slice(-4)}`;
    } else if (cycle > 0) {
      serviceName = `${preset.serviceName} (${cycle})`;
    } else {
      serviceName = preset.serviceName;
    }

    const monthOffset = (i % 18) + 1;
    const exp = new Date(base);
    exp.setMonth(exp.getMonth() + monthOffset);
    const last = new Date(base);
    last.setDate(last.getDate() - ((i * 17) % 120));
    last.setHours(9 + (i % 8), (i * 23) % 60, 0, 0);

    const tagA = `Tag ${String((i % 9) + 1).padStart(2, '0')}`;
    const tagB = `Tag ${String(((i + 3) % 9) + 1).padStart(2, '0')}`;

    return {
      id: String(i + 1),
      credentialType,
      categoryLabel: CATEGORY_LABELS[credentialType],
      serviceName,
      expirationIso: exp.toISOString(),
      lastUsedIso: last.toISOString(),
      tags: i % 5 === 0 ? [tagA] : [tagA, tagB],
    };
  });
}

const rows = ref<CredentialRow[]>(buildCredentialRows(TOTAL_MOCK_RECORDS));

const searchQuery = ref('');
const filteredRows = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return rows.value;
  return rows.value.filter((row) => {
    const hay = `${row.serviceName} ${row.categoryLabel} ${row.tags.join(' ')}`.toLowerCase();
    return hay.includes(q);
  });
});

const selection = ref<CredentialRow[]>([]);
const rowsPerPage = ref(100);
const rowsPerPageOptions: RowsPerPageOption[] = [
  { label: '100', value: 100 },
  { label: '50', value: 50 },
  { label: '25', value: 25 },
];

const moreIcon = markRaw(EllipsisVerticalIcon);
const quickViewEye = markRaw(EyeIcon);

const credentialColumns = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    width: 'minmax(200px,1.4fr)',
    component: markRaw(CredentialNameCell),
    componentProps: () => ({}),
  },
  {
    field: 'expiration',
    header: 'Expiration Date',
    sortable: true,
    width: '160px',
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      label: formatExpiration((sp.data as CredentialRow).expirationIso),
    }),
  },
  {
    field: 'tags',
    header: 'Tags',
    sortable: false,
    width: 'minmax(160px,1fr)',
    component: markRaw(DataTableCellTags),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      tags: (sp.data as CredentialRow).tags,
      maxVisibleTags: 4,
    }),
  },
  {
    field: 'lastUsed',
    header: 'Last Time Used',
    sortable: true,
    width: '200px',
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      label: formatLastUsed((sp.data as CredentialRow).lastUsedIso),
    }),
  },
  {
    field: 'actions',
    header: '',
    sortable: false,
    width: '200px',
    component: markRaw(DataTableCellAction),
    componentProps: (sp: { data: Record<string, unknown> }) => {
      const row = sp.data as CredentialRow;
      return {
        type: 'Button & More' as const,
        actionButtons: [
          {
            label: 'Quick View',
            icon: quickViewEye,
            onClick: () => {
              console.info('[PasswordVault Credentials] Quick View', row.id);
            },
          },
        ],
        iconButtons: [
          {
            icon: moreIcon,
            onClick: () => {
              console.info('[PasswordVault Credentials] More menu', row.id);
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
    label: r.serviceName,
    description: r.tags.slice(0, 2).join(', ') || r.categoryLabel,
  })),
);

function handleSearch(query: unknown) {
  searchQuery.value = typeof query === 'string' ? query : '';
}

function handleBulkAction(act: Action) {
  console.info('[PasswordVault Credentials]', act.id, selection.value.map((r) => r.id));
}

function handleClearSelection() {
  selection.value = [];
}

function handleAddCredential() {
  console.info('[PasswordVault Credentials] Add credential');
}
</script>

<template>
  <div class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral-surface">
    <ListPageLayout class="w-full! h-full! min-h-0! border-0">
      <CircuitDataTable
        v-model:selection="selection"
        :columns="credentialColumns"
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
        v-model:rows="rowsPerPage"
        :rows-per-page-options="rowsPerPageOptions"
        :show-rows-per-page-options="true"
        :show-page-report="true"
      >
        <template #toolbar>
          <DataTableToolbar
            add-button-label="Add Credential"
            :show-save-view-button="false"
            search-placeholder="Search credentials…"
            :show-add-button="true"
            :show-filter-button="false"
            :show-refresh-button="true"
            :show-columns-button="false"
            :show-download-button="false"
            @add="handleAddCredential"
            @search="handleSearch"
          >
            <template #saved-views>
              <span class="mr-md text-body-md text-neutral-subtle">{{ filteredRows.length }} Credentials</span>
            </template>
          </DataTableToolbar>
        </template>
        <template #empty>
          <div class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
            <span class="text-body-md">No credentials match your search</span>
            <span class="mt-1 text-body-sm">Try a different term</span>
          </div>
        </template>
        <template #initialEmpty>
          <div class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
            <span class="text-body-md">No credentials yet</span>
            <span class="mt-1 text-body-sm">Add a credential to get started</span>
          </div>
        </template>
      </CircuitDataTable>
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
          :selection-label="selection.length === 1 ? 'Credential selected' : 'Credentials selected'"
          @action="handleBulkAction"
          @close="handleClearSelection"
        />
      </div>
    </Transition>
  </div>
</template>
