<script setup lang="ts">
import { computed, defineModel, markRaw, ref } from 'vue';
import {
  ActionsToolbar,
  DataTable as CircuitDataTable,
  DataTableCellAction,
  DataTableCellTags,
  DataTableCellText,
  DataTableToolbar,
  FormField,
} from '@jumpcloud/circuit/components';
import type { Action, SelectedItem } from '@jumpcloud/circuit/components';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import MultiSelect from 'primevue/multiselect';
import {
  ArrowTopRightOnSquareIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import PasswordVaultAddWebsiteView from './PasswordVaultAddWebsiteView.vue';
import PasswordVaultWebsiteNameCell from './PasswordVaultWebsiteNameCell.vue';

defineOptions({
  name: 'PasswordVaultWebsitesView',
});

export type WebsiteRow = {
  id: string;
  name: string;
  url: string;
  tags: string[];
  lastSeen: string;
};

const websitesSeed: WebsiteRow[] = [
  {
    id: '1',
    name: 'Salesforce',
    url: 'login.salesforce.com',
    tags: ['CRM', 'Sales', 'SSO'],
    lastSeen: '2 hours ago',
  },
  {
    id: '2',
    name: 'Workday',
    url: 'workday.com',
    tags: ['HR', 'Payroll'],
    lastSeen: 'Yesterday',
  },
  {
    id: '3',
    name: 'GitHub Enterprise',
    url: 'github.company.internal',
    tags: ['Dev', 'Repo', 'SSO'],
    lastSeen: '5 min ago',
  },
  {
    id: '4',
    name: 'Legacy CRM',
    url: 'legacy-crm.company.com',
    tags: ['Legacy'],
    lastSeen: '90 days ago',
  },
  {
    id: '5',
    name: 'Confluence',
    url: 'confluence.company.com',
    tags: ['Docs', 'Wiki'],
    lastSeen: '1 hour ago',
  },
  {
    id: '6',
    name: 'Okta SSO',
    url: 'jumpcloud.company.okta.com',
    tags: ['Identity', 'SSO', 'Security'],
    lastSeen: 'Just now',
  },
];

const websites = ref<WebsiteRow[]>(websitesSeed.map((w) => ({ ...w, tags: [...w.tags] })));

const searchQuery = ref('');

const appliedTags = ref<string[]>([]);
const draftTags = ref<string[]>([]);

const showFilterDialog = ref(false);

const tagOptions = computed(() => {
  const set = new Set<string>();
  for (const w of websites.value) {
    for (const t of w.tags) set.add(t);
  }
  return [...set].sort().map((t) => ({ label: t, value: t }));
});

function formatGroupedValues(values: string[], maxVisible = 2): string {
  if (values.length <= maxVisible) return values.join(', ');
  return `${values.slice(0, maxVisible).join(', ')}, +${values.length - maxVisible}`;
}

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

const draftFilterCount = computed(() => (draftTags.value.length > 0 ? 1 : 0));

const filteredRows = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  return websites.value.filter((row) => {
    if (appliedTags.value.length > 0) {
      const match = appliedTags.value.some((t) => row.tags.includes(t));
      if (!match) return false;
    }
    if (q) {
      const haystack = `${row.name} ${row.url} ${row.tags.join(' ')}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
});

function handleSearch(query: unknown) {
  searchQuery.value = typeof query === 'string' ? query : '';
}

function openFilterDialog() {
  draftTags.value = [...appliedTags.value];
  showFilterDialog.value = true;
}

function applyFilters() {
  appliedTags.value = [...draftTags.value];
  showFilterDialog.value = false;
}

function cancelFilterDialog() {
  showFilterDialog.value = false;
}

function clearDraftFilters() {
  draftTags.value = [];
}

function clearAllFilters() {
  appliedTags.value = [];
  searchQuery.value = '';
}

function removeFilterChip(chip: { id?: string }) {
  if ((chip.id ?? '') === 'tags') appliedTags.value = [];
}

const selection = ref<WebsiteRow[]>([]);

const websitesMode = defineModel<'list' | 'add'>('websitesMode', { default: 'list' });

const launchIcon = markRaw(ArrowTopRightOnSquareIcon);
const moreIcon = markRaw(EllipsisVerticalIcon);

/** Single source of truth for Tags column width (table + DataTableCellTags overflow math) */
const TAGS_COLUMN_WIDTH_PX = 260;

const websiteColumns = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    component: markRaw(PasswordVaultWebsiteNameCell),
    componentProps: (sp: { data: Record<string, unknown> }) => ({ data: sp.data }),
  },
  {
    field: 'tags',
    header: 'Tags',
    sortable: false,
    width: `${TAGS_COLUMN_WIDTH_PX}px`,
    component: markRaw(DataTableCellTags),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      tags: (sp.data.tags as string[]) ?? [],
      maxVisibleTags: 3,
      width: TAGS_COLUMN_WIDTH_PX,
    }),
  },
  {
    field: 'lastSeen',
    header: 'Last Seen',
    sortable: true,
    width: '180px',
    component: markRaw(DataTableCellText),
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      label: sp.data.lastSeen,
    }),
  },
  {
    field: 'actions',
    header: 'Actions',
    sortable: false,
    width: '200px',
    component: markRaw(DataTableCellAction),
    componentProps: () => ({
      type: 'Button Group',
      iconButtons: [
        { icon: launchIcon, ariaLabel: 'Launch' },
        { icon: moreIcon, ariaLabel: 'More' },
      ],
      maxVisibleIconButtons: 2,
    }),
  },
];

const bulkActions: Action[] = [
  { id: 'move-folder', label: 'Move folder' },
  { id: 'export', label: 'Export' },
  { id: 'remove', label: 'Remove', class: 'text-danger-base' },
];

const toolbarSelectedItems = computed<SelectedItem[]>(() =>
  selection.value.map((w) => ({
    id: w.id,
    label: w.name,
    description: w.tags.slice(0, 2).join(', ') || w.url,
  })),
);

function handleBulkAction(act: Action) {
  console.info('[PasswordVault Websites]', act.id, selection.value.map((w) => w.id));
}

function handleClearSelection() {
  selection.value = [];
}

function handleAddWebsite() {
  selection.value = [];
  websitesMode.value = 'add';
}

function handleCancelAddWebsite() {
  websitesMode.value = 'list';
}

function handleSaveAddWebsite() {
  websitesMode.value = 'list';
}

/** `table-fixed` so Circuit column min/max widths (e.g. Tags 260px) apply; body scrolls like Credentials */
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
  <div
    class="relative flex min-h-0 min-w-0 flex-1 flex-col bg-neutral-surface"
    :class="websitesMode === 'list' ? 'overflow-hidden' : 'min-h-0 overflow-x-hidden overflow-y-auto overscroll-contain'"
  >
    <PasswordVaultAddWebsiteView
      v-if="websitesMode === 'add'"
      class="min-h-0 w-full min-w-0 shrink-0"
      @cancel="handleCancelAddWebsite"
      @save="handleSaveAddWebsite"
    />
    <div
      v-else
      class="flex min-h-0 h-full min-w-0 flex-1 flex-col overflow-hidden px-lg pb-xl pt-lg md:px-xl"
    >
      <CircuitDataTable
        v-model:selection="selection"
        class="flex min-h-0 min-w-0 flex-1 flex-col"
        :columns="websiteColumns"
        :data="filteredRows"
        selection-mode="multiple"
        :card="true"
        scrollable
        scroll-height="flex"
        :loading="false"
        :paginator="true"
        :rows="10"
        data-key="id"
        :pt="dataTablePt"
        :pt-options="{ mergeSections: true, mergeProps: true }"
      >
        <template #toolbar>
          <div class="relative z-20 shrink-0">
            <DataTableToolbar
              add-button-label="Add Website"
              :show-save-view-button="false"
              search-placeholder="Search websites…"
              :show-add-button="true"
              :show-filter-button="true"
              :show-refresh-button="true"
              :show-columns-button="false"
              :show-download-button="false"
              :active-filters="activeFilterChips"
              :max-visible-filters="5"
              @add="handleAddWebsite"
              @search="handleSearch"
              @filter="openFilterDialog"
              @clear-all="clearAllFilters"
              @filter-remove="removeFilterChip"
            >
              <template #saved-views>
                <span class="mr-md text-body-md text-neutral-subtle">{{ filteredRows.length }} Websites</span>
              </template>
            </DataTableToolbar>
          </div>
        </template>
        <template #empty>
          <div class="flex flex-col items-center justify-center gap-xs py-xl text-neutral-subtle">
            <span class="text-body-md">No websites match your filters</span>
            <span class="text-body-sm">Try adjusting search or filters</span>
          </div>
        </template>
        <template #initialEmpty>
          <div class="flex flex-col items-center justify-center gap-xs py-xl text-neutral-subtle">
            <span class="text-body-md">No websites yet</span>
            <span class="text-body-sm">Add a website to get started</span>
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
        v-if="websitesMode === 'list' && toolbarSelectedItems.length > 0"
        class="absolute bottom-16 left-1/2 z-10 -translate-x-1/2"
      >
        <ActionsToolbar
          :actions="bulkActions"
          :selected-items="toolbarSelectedItems"
          :selection-label="selection.length === 1 ? 'Website selected' : 'Websites selected'"
          @action="handleBulkAction"
          @close="handleClearSelection"
        />
      </div>
    </Transition>

    <Dialog
      v-model:visible="showFilterDialog"
      :draggable="false"
      modal
      header="Apply filters"
      :style="{ width: '560px' }"
    >
      <template #closeicon><XMarkIcon /></template>

      <div class="flex flex-col gap-md">
        <FormField label="Tags">
          <template #default="{ inputId }">
            <MultiSelect
              :id="inputId"
              :model-value="draftTags"
              :options="tagOptions"
              option-label="label"
              option-value="value"
              placeholder="All tags"
              :max-selected-labels="2"
              class="w-full"
              @update:model-value="draftTags = $event"
            />
          </template>
        </FormField>
      </div>

      <template #footer>
        <div class="flex min-w-0 flex-1 items-center gap-sm">
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
