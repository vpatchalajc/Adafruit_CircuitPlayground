<script setup lang="ts">
import { computed, defineComponent, h, markRaw, ref, watch, type Component } from 'vue';
import {
  CheckboxWithLabel,
  CollapsiblePanel,
  DataTable,
  DataTableCellLink,
  DataTableCellText,
  DataTableToolbar,
  FormField,
} from '@jumpcloud/circuit/components';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import SelectButton from 'primevue/selectbutton';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import {
  BoltIcon,
  ChevronRightIcon,
  CubeIcon,
  GlobeAltIcon,
  KeyIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  TrashIcon,
  UserCircleIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';

defineOptions({
  name: 'PasswordVaultAddWebsiteView',
});

const emit = defineEmits<{ cancel: []; save: [] }>();

/** Collapsible panel: chevron-leading header row + rounded-lg surface + section padding rhythm */
const addWebsiteSectionPanelPt = {
  root: 'bg-neutral-base h-full rounded-lg shadow-e100 text-neutral-base w-full',
  header: ({ props }: { props: { toggleable?: boolean } }) =>
    props.toggleable
      ? 'flex flex-row items-start gap-xxs justify-start rounded-t-lg p-lg text-heading-3 bg-neutral-base'
      : 'rounded-t-lg p-lg text-heading-3 bg-neutral-base',
  content: ({ state }: { state: { d_collapsed?: boolean } }) => {
    const isCollapsed = state.d_collapsed;
    const base =
      'flex flex-col gap-md p-lg pt-0 text-body-md [&>*]:m-0 transition-[padding] duration-168 ease-out';
    return isCollapsed ? `${base} pb-0` : base;
  },
} as const;

const websiteName = ref('');
const websiteUri = ref('');
const websiteTags = ref<string[]>([]);
const websiteFolder = ref<string | null>(null);
const websiteNotes = ref('');

const tagOptions = ['Production', 'SSO', 'Internal', 'Customer', 'Dev', 'Sandbox'].map((t) => ({
  label: t,
  value: t,
}));

const folderOptions = [
  { label: 'Corporate', value: 'corporate' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Finance', value: 'finance' },
  { label: 'Shared', value: 'shared' },
];

type LinkedCredentialRow = {
  id: string;
  name: string;
  username: string;
  credentialTypeSlug: string;
  accessLabel: string;
};

const LINKED_CRED_PRESETS = [
  'Google',
  'Microsoft',
  'Apple',
  'Facebook',
  'Netflix',
  'Salesforce',
  'Adobe',
  'Amazon',
  'Slack',
  'Zoom',
  'Dropbox',
  'DocuSign',
  'Stripe',
  'CrowdStrike',
  'Okta Workflows',
  'Zendesk',
] as const;

const LINKED_CRED_TYPE_LABELS = [
  'Password',
  'Payment Card',
  'Key',
  'Note',
  'Website',
  '2FA',
] as const;

const TOTAL_LINKED_MOCK_ROWS = 435;

function slugifyCredentialFilter(label: string): string {
  return label.trim().replace(/\s+/g, '').toLowerCase();
}

function buildLinkedCredentialRowAtGlobalIndex(i: number): LinkedCredentialRow {
  const preset = LINKED_CRED_PRESETS[i % LINKED_CRED_PRESETS.length]!;
  const cycle = Math.floor(i / LINKED_CRED_PRESETS.length);
  const accessLabel =
    LINKED_CRED_TYPE_LABELS[i % LINKED_CRED_TYPE_LABELS.length] ?? LINKED_CRED_TYPE_LABELS[0]!;
  const name = cycle > 0 ? `${preset} (${cycle})` : preset;

  return {
    id: `lc-${String(i + 1)}`,
    name,
    username: `user${i + 123}@example.com`,
    credentialTypeSlug: slugifyCredentialFilter(accessLabel),
    accessLabel,
  };
}

function buildLinkedCredentialRows(total: number, startOffset = 0): LinkedCredentialRow[] {
  return Array.from({ length: total }, (_, k) =>
    buildLinkedCredentialRowAtGlobalIndex(startOffset + k),
  );
}

/** Initial linked rows mirror the Websites table paging demo (435 total records). */
const linkedCredentials = ref<LinkedCredentialRow[]>(buildLinkedCredentialRows(TOTAL_LINKED_MOCK_ROWS, 0));

/** Extra catalog entries for “Add credential” demo only — omit building rows 0–434 twice. */
const credentialCatalog = buildLinkedCredentialRows(50, TOTAL_LINKED_MOCK_ROWS);

const credLibrarySearch = ref('');
const showAddCredDialog = ref(false);

const catalogFiltered = computed(() => {
  const q = credLibrarySearch.value.trim().toLowerCase();
  const linkedIds = new Set(linkedCredentials.value.map((c) => c.id));
  return credentialCatalog.filter((c) => {
    if (linkedIds.has(c.id)) return false;
    if (!q) return true;
    return `${c.name} ${c.username} ${c.accessLabel}`.toLowerCase().includes(q);
  });
});

function addCredFromCatalog(c: LinkedCredentialRow) {
  if (linkedCredentials.value.some((x) => x.id === c.id)) return;
  linkedCredentials.value = [...linkedCredentials.value, { ...c }];
  showAddCredDialog.value = false;
  credLibrarySearch.value = '';
}

function openAddCredDialog() {
  credLibrarySearch.value = '';
  showAddCredDialog.value = true;
}

const linkedCredSearchQuery = ref('');

const linkedCredCredentialTypeFilter = ref<string>('all');

const linkedCredQuickFilters = computed(() => [
  {
    id: 'credentials-type',
    width: 'min-w-0 w-full min-[480px]:w-[260px]',
    value: linkedCredCredentialTypeFilter.value,
    options: [
      { label: 'Credentials: All', value: 'all' },
      ...LINKED_CRED_TYPE_LABELS.map((label) => ({
        label,
        value: slugifyCredentialFilter(label),
      })),
    ],
  },
]);

function handleLinkedCredQuickFilterChange(idx: number, value: unknown) {
  const v = typeof value === 'string' ? value : 'all';
  if (idx === 0) linkedCredCredentialTypeFilter.value = v;
}

watch(linkedCredCredentialTypeFilter, () => {
  linkedCredFirst.value = 0;
});

watch(linkedCredSearchQuery, () => {
  linkedCredFirst.value = 0;
});

const linkedCredFilteredRows = computed(() => {
  const q = linkedCredSearchQuery.value.trim().toLowerCase();
  const f = linkedCredCredentialTypeFilter.value;
  return linkedCredentials.value.filter((c) => {
    if (f !== 'all' && c.credentialTypeSlug !== f) return false;
    if (!q) return true;
    return `${c.name} ${c.username} ${c.accessLabel}`.toLowerCase().includes(q);
  });
});

const linkedCredFirst = ref(0);
const linkedCredRowsPerPage = ref(100);

const linkedCredPagerOptions = [
  { label: '100 items per page', value: 100 },
  { label: '50 items per page', value: 50 },
  { label: '25 items per page', value: 25 },
];

const linkedCredSelection = ref<LinkedCredentialRow[]>([]);

/** Lazy page slice — avoids mounting hundreds of Circuit table rows at once. */
const linkedCredRowsForTable = computed(() => {
  const all = linkedCredFilteredRows.value;
  const start = linkedCredFirst.value;
  const size = linkedCredRowsPerPage.value;
  return all.slice(start, start + size).map((c) => c as unknown as Record<string, unknown>);
});

function handleLinkedCredSearch(q: unknown) {
  linkedCredSearchQuery.value = typeof q === 'string' ? q : '';
}

function removeLinkedCredential(id: string) {
  linkedCredentials.value = linkedCredentials.value.filter((c) => c.id !== id);
}

function openManageLinkedCredential(row: LinkedCredentialRow) {
  console.info('[Linked credential] Manage', row.id);
}

const LinkedCredNameCell = markRaw(
  defineComponent({
    props: { data: { type: Object, required: true } },
    setup(props) {
      return () => {
        const row = props.data as LinkedCredentialRow;
        return h('div', { class: 'flex min-w-0 items-start gap-sm' }, [
          h(
            'div',
            {
              class:
                'flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-default_solid bg-info-surface',
              'aria-hidden': 'true',
            },
            [h(KeyIcon, { class: 'size-5 text-neutral-base' })],
          ),
          h('div', { class: 'min-w-0 flex-1' }, [
            h(
              'span',
              { class: 'block truncate text-body-md font-medium text-neutral-base' },
              row.name,
            ),
            h(
              'span',
              { class: 'mt-xxs block truncate text-body-sm text-neutral-subtle' },
              row.accessLabel,
            ),
          ]),
        ]);
      };
    },
  }),
);

const LinkedCredActionsCell = markRaw(
  defineComponent({
    props: { data: { type: Object, required: true } },
    setup(props) {
      return () => {
        const row = props.data as LinkedCredentialRow;
        return h('div', { class: 'flex min-w-0 items-center justify-end gap-sm' }, [
          h(Button as never, {
            label: 'Manage',
            severity: 'secondary',
            variant: 'outlined',
            size: 'small',
            onClick: () => openManageLinkedCredential(row),
          }),
          h(Button as never, {
            severity: 'danger',
            variant: 'text',
            size: 'small',
            rounded: true,
            'aria-label': `Remove ${row.name}`,
            onClick: () => removeLinkedCredential(row.id),
          }, {
            default: () => h(TrashIcon, { class: 'size-5' }),
          }),
        ]);
      };
    },
  }),
);

const linkedCredColumns = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    component: LinkedCredNameCell,
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      data: sp.data as LinkedCredentialRow,
    }),
  },
  {
    field: 'username',
    header: 'Username',
    sortable: true,
    component: markRaw(DataTableCellLink),
    componentProps: (sp: { data: Record<string, unknown> }) => {
      const row = sp.data as LinkedCredentialRow;
      return {
        label: row.username,
        href: `mailto:${encodeURIComponent(row.username)}`,
      };
    },
  },
  {
    field: 'actions',
    header: '',
    sortable: false,
    width: '160',
    component: LinkedCredActionsCell,
    componentProps: (sp: { data: Record<string, unknown> }) => ({
      data: sp.data as LinkedCredentialRow,
    }),
  },
];

/** Fixed table layout + scrollable body keeps paginator outside the body per list-page pattern */
const linkedDataTablePt = {
  root: { class: 'flex min-h-0 flex-1 flex-col' },
  tableContainer: {
    class: 'z-10 flex min-h-0 flex-1 !overflow-x-auto !overflow-y-auto pb-md',
  },
  table: { class: '!w-full !max-w-full !table-fixed !overflow-visible' },
  footer: { class: '!mt-0 shrink-0 flex-wrap gap-y-sm' },
} as const;

type CredentialPermissionEntry = {
  credentialId: string;
  viewPassword: boolean;
  connect: boolean;
};

type UserPermissionSubject = {
  id: string;
  kind: 'user' | 'group';
  displayName: string;
  subtitle: string;
  credentialPermissions: CredentialPermissionEntry[];
  /** Credential IDs explicitly removed — sync will not re-grant defaults */
  revokedCredentialIds?: string[];
};

type UserPermRow = UserPermissionSubject & {
  _credCount: number;
  _sortName: string;
  _sortPerm: string;
};

const userPermissionsSeed: UserPermissionSubject[] = (() => {
  const fillers: UserPermissionSubject[] = Array.from({ length: 432 }, (_, i) => ({
    id: `u-demo-${i + 1}`,
    kind: 'user',
    displayName: `User ${String(i + 1).padStart(3, '0')}`,
    subtitle: `user${i + 1}@demo.company.com`,
    credentialPermissions: [],
  }));
  return [
    {
      id: 'u-alice',
      kind: 'user',
      displayName: 'Alice Johnson',
      subtitle: 'alice.johnson@example.com',
      credentialPermissions: [],
    },
    {
      id: 'u1',
      kind: 'user',
      displayName: 'Ada Lovelace',
      subtitle: 'ada@company.com',
      credentialPermissions: [],
    },
    {
      id: 'u2',
      kind: 'user',
      displayName: 'Alan Turing',
      subtitle: 'alan@company.com',
      credentialPermissions: [],
    },
    ...fillers,
    {
      id: 'g1',
      kind: 'group',
      displayName: 'Engineering Vault',
      subtitle: '12 members · Group',
      credentialPermissions: [],
    },
  ];
})();

function cloneSubjects(seed: UserPermissionSubject[]): UserPermissionSubject[] {
  return JSON.parse(JSON.stringify(seed)) as UserPermissionSubject[];
}

const userPermissions = ref<UserPermissionSubject[]>(cloneSubjects(userPermissionsSeed));

/**
 * Bulk-grant linked credentials only for featured demo subjects.
 * Granting 435 credentials × 432 filler users creates ~189k reactive nodes and freezes the UI for tens of seconds.
 */
const SUBJECTS_WITH_FULL_CRED_GRANT = new Set<string>(['u1', 'u2', 'g1']);

function syncCredentialPermissionsToUsers() {
  const ids = linkedCredentials.value.map((c) => c.id);
  const idSet = new Set(ids);

  /** Spec demo shows Alice tied to three linked credentials (not full catalog). */
  const aliceLimitedIds =
    ids.length <= 3 ? [...ids] : ids.slice().sort((a, b) => a.localeCompare(b)).slice(0, 3);

  for (const u of userPermissions.value) {
    const revoked = new Set(u.revokedCredentialIds ?? []);
    for (const r of [...revoked]) {
      if (!idSet.has(r)) revoked.delete(r);
    }
    u.revokedCredentialIds = revoked.size > 0 ? [...revoked] : [];

    let grantSequence: string[];
    if (u.id === 'u-alice') {
      grantSequence = aliceLimitedIds.filter((credId) => idSet.has(credId));
    } else if (SUBJECTS_WITH_FULL_CRED_GRANT.has(u.id)) {
      grantSequence = ids;
    } else {
      grantSequence = [];
    }

    const grantSet = new Set(grantSequence);

    u.credentialPermissions = u.credentialPermissions.filter(
      (cp) => grantSet.has(cp.credentialId) && idSet.has(cp.credentialId),
    );

    const existingCredIds = new Set(u.credentialPermissions.map((cp) => cp.credentialId));
    for (const credId of grantSequence) {
      if (revoked.has(credId)) continue;
      if (!existingCredIds.has(credId)) {
        u.credentialPermissions.push({
          credentialId: credId,
          viewPassword: true,
          connect: false,
        });
        existingCredIds.add(credId);
      }
    }
  }
}

function applyAliceMixedDemoForVault() {
  const u = userPermissions.value.find((sub) => sub.id === 'u-alice');
  if (!u || u.credentialPermissions.length < 2) return;

  u.credentialPermissions.forEach((entry, i) => {
    const m = i % 3;
    if (m === 0) {
      entry.viewPassword = true;
      entry.connect = false;
    } else if (m === 1) {
      entry.viewPassword = false;
      entry.connect = true;
    } else {
      entry.viewPassword = true;
      entry.connect = true;
    }
  });
}

watch(
  linkedCredentials,
  () => {
    syncCredentialPermissionsToUsers();
    applyAliceMixedDemoForVault();
  },
  { immediate: true },
);

function permissionLedgerLabel(perms: CredentialPermissionEntry[]): string {
  if (perms.length === 0 || linkedCredentials.value.length === 0) return 'None';
  const sameVp =
    perms.length > 0 && perms.every((p) => p.viewPassword === perms[0].viewPassword);
  const sameC = perms.length > 0 && perms.every((p) => p.connect === perms[0].connect);
  if (sameVp && sameC && perms[0]) return perms[0].viewPassword && perms[0].connect ? 'Aligned' : 'Partial';
  return 'Mixed';
}

function credentialsVisibleForSubject(u: UserPermissionSubject): LinkedCredentialRow[] {
  return linkedCredentials.value.filter((c) =>
    u.credentialPermissions.some((p) => p.credentialId === c.id),
  );
}

function findCredPerm(
  subject: UserPermissionSubject | Record<string, unknown> | undefined,
  credId: string,
): CredentialPermissionEntry | undefined {
  const u = subject as UserPermissionSubject | undefined;
  return u?.credentialPermissions.find((p) => p.credentialId === credId);
}

function effectiveCredentialPermissions(u: UserPermissionSubject): CredentialPermissionEntry[] {
  return u.credentialPermissions.filter((p) =>
    linkedCredentials.value.some((c) => c.id === p.credentialId),
  );
}

function permissionSummaryLabel(u: UserPermissionSubject): string {
  if (linkedCredentials.value.length === 0) return '—';
  return permissionLedgerLabel(effectiveCredentialPermissions(u));
}

function nestedCredPresentation(
  idx: number,
): { surface: string; Icon: Component } {
  const variants: { surface: string; Icon: Component }[] = [
    { surface: 'bg-info-surface', Icon: ShieldCheckIcon },
    { surface: 'bg-success-surface', Icon: LockClosedIcon },
    { surface: 'bg-warning-surface', Icon: KeyIcon },
    { surface: 'bg-info-surface', Icon: KeyIcon },
  ];
  return variants[idx % variants.length]!;
}

function credentialExpansionRows(subject: UserPermissionSubject) {
  const creds = credentialsVisibleForSubject(subject);
  return creds.map((cred, idx) => ({
    cred,
    presentation: nestedCredPresentation(idx),
  }));
}

const expandedUserRows = ref<UserPermRow[]>([]);

const usersSubjectTab = ref<'users' | 'groups'>('users');

const userPermSelection = ref<UserPermRow[]>([]);
const userPermFirst = ref(0);
const userPermRows = ref(100);
const showUserPermFilterDialog = ref(false);
const draftLedgerFilter = ref<'all' | 'mixed' | 'aligned' | 'none'>('all');
const appliedLedgerFilter = ref<'all' | 'mixed' | 'aligned' | 'none'>('all');

watch(usersSubjectTab, () => {
  expandedUserRows.value = [];
  userPermSelection.value = [];
});

const usersPermissionSearchPlaceholder = 'Search';

const userPermRowsPerPageOptions = [
  { label: '25 items per page', value: 25 },
  { label: '50 items per page', value: 50 },
  { label: '100 items per page', value: 100 },
];

const userPermDraftFilterCount = computed(() => (draftLedgerFilter.value === 'all' ? 0 : 1));

const usersSearchQuery = ref('');

function handleUsersSearch(q: unknown) {
  usersSearchQuery.value = typeof q === 'string' ? q : '';
}

const userPermLedgerOptions = [
  { label: 'All', value: 'all' as const },
  { label: 'Mixed only', value: 'mixed' as const },
  { label: 'Aligned or partial', value: 'aligned' as const },
  { label: 'None', value: 'none' as const },
];

const filteredUserPermissionRows = computed(() => {
  const q = usersSearchQuery.value.trim().toLowerCase();
  const rows = userPermissions.value.filter((u) => {
    if (usersSubjectTab.value === 'users' && u.kind !== 'user') return false;
    if (usersSubjectTab.value === 'groups' && u.kind !== 'group') return false;
    if (!q) return true;
    return `${u.displayName} ${u.subtitle}`.toLowerCase().includes(q);
  });
  rows.sort((a, b) => a.displayName.localeCompare(b.displayName));

  if (appliedLedgerFilter.value !== 'all') {
    const f = rows.filter((u) => {
      const ledger = permissionLedgerLabel(effectiveCredentialPermissions(u));
      switch (appliedLedgerFilter.value) {
        case 'mixed':
          return ledger === 'Mixed';
        case 'aligned':
          return ledger === 'Aligned' || ledger === 'Partial';
        case 'none':
          return ledger === 'None';
        default:
          return true;
      }
    });
    return f;
  }
  return rows;
});

const userPermTableRows = computed((): UserPermRow[] =>
  filteredUserPermissionRows.value.map((u) => {
    const perms = effectiveCredentialPermissions(u);
    return {
      ...u,
      _credCount: perms.length,
      _sortName: u.displayName,
      _sortPerm: permissionSummaryLabel(u),
    };
  }),
);

const userPermTableRowsForPage = computed(() => {
  const all = userPermTableRows.value;
  const start = userPermFirst.value;
  const size = userPermRows.value;
  return all.slice(start, start + size).map((r) => r as unknown as Record<string, unknown>);
});

const userPermActiveFilters = computed(() => {
  if (appliedLedgerFilter.value === 'all') return [];
  const opt = userPermLedgerOptions.find((o) => o.value === appliedLedgerFilter.value);
  return [{ id: 'ledger', key: 'Summarized permission', operator: 'is', value: opt?.label ?? '' }];
});

function removeUserPermissionSubject(row: UserPermissionSubject) {
  userPermissions.value = userPermissions.value.filter((sub) => sub.id !== row.id);
}

function openEditUserPermissionSubject(row: UserPermissionSubject) {
  console.info('[User permissions] Edit', row.id);
}

function handleUserPermAddSubject() {
  const id = `perm-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
  if (usersSubjectTab.value === 'users') {
    const next = userPermissions.value.filter((u) => u.kind === 'user').length + 1;
    userPermissions.value.push({
      id,
      kind: 'user',
      displayName: `Added user ${next}`,
      subtitle: `added${next}@company.com`,
      credentialPermissions: [],
    });
  } else {
    const next = userPermissions.value.filter((u) => u.kind === 'group').length + 1;
    userPermissions.value.push({
      id,
      kind: 'group',
      displayName: `Added group ${next}`,
      subtitle: '0 members · Group',
      credentialPermissions: [],
    });
  }
  syncCredentialPermissionsToUsers();
}

function openUserPermissionFilterDialog() {
  draftLedgerFilter.value = appliedLedgerFilter.value;
  showUserPermFilterDialog.value = true;
}

function applyUserPermissionLedgerFilter() {
  appliedLedgerFilter.value = draftLedgerFilter.value;
  userPermFirst.value = 0;
  showUserPermFilterDialog.value = false;
}

function cancelUserPermissionFilterDialog() {
  showUserPermFilterDialog.value = false;
}

function clearDraftUserPermissionFilters() {
  draftLedgerFilter.value = 'all';
}

function handleUserPermToolbarChipRemove(chip: { id?: string }) {
  if (chip.id === 'ledger') {
    appliedLedgerFilter.value = 'all';
  }
}

function handleUserPermToolbarClearAll() {
  appliedLedgerFilter.value = 'all';
  usersSearchQuery.value = '';
  userPermFirst.value = 0;
}

function handleUserPermRefresh() {
  syncCredentialPermissionsToUsers();
  console.info('[User permissions] Refresh');
}

function toggleCredViewPassword(subjectId: string, credId: string) {
  const u = userPermissions.value.find((sub) => sub.id === subjectId);
  const p = u?.credentialPermissions.find((c) => c.credentialId === credId);
  if (p) {
    p.viewPassword = !p.viewPassword;
  }
}

function revokeSubjectCredential(subjectId: string, credId: string) {
  const u = userPermissions.value.find((sub) => sub.id === subjectId);
  if (!u) {
    return;
  }
  const revoked = [...(u.revokedCredentialIds ?? [])];
  if (!revoked.includes(credId)) {
    revoked.push(credId);
  }
  u.revokedCredentialIds = revoked;
  u.credentialPermissions = u.credentialPermissions.filter((c) => c.credentialId !== credId);
}

function openNestedCredentialEdit(subjectId: string, cred: LinkedCredentialRow) {
  console.info('[User permissions] Edit credential mapping', subjectId, cred.id);
}




const UserPermActionsCell = markRaw(
  defineComponent({
    props: { data: { type: Object, required: true } },
    setup(props) {
      return () => {


        const row = props.data as UserPermissionSubject;





        return h('div', { class: 'flex min-w-0 items-center justify-end gap-sm' }, [
          h(Button as never, {
            label: 'Edit',
            severity: 'secondary',
            variant: 'outlined',

            size: 'small',
            onClick: () => openEditUserPermissionSubject(row),
          }),

          h(Button as never, {
            severity: 'danger',

            variant: 'text',
            size: 'small',
            rounded: true,
            'aria-label': `Remove ${row.displayName}`,
            onClick: () => removeUserPermissionSubject(row),
          }, {
            default: () => h(TrashIcon, { class: 'size-5' }),

          }),
        ]);
      };


    },

  }),

);

const UserPermMasterCellFlat = markRaw(
  defineComponent({
    props: { data: { type: Object, required: true } },
    setup(props) {
      return () => {
        const row = props.data as UserPermissionSubject;
        const letter = row.displayName.slice(0, 2).toUpperCase().slice(0, 2);
        return h('div', { class: 'flex min-w-0 items-center gap-sm' }, [
          h(Avatar, { label: letter, shape: 'circle', size: 'normal' }),
          h('div', { class: 'min-w-0' }, [
            h('span', { class: 'block truncate text-body-md font-medium text-neutral-base' }, row.displayName),
            h('span', { class: 'block truncate text-body-sm text-neutral-subtle' }, row.subtitle),
          ]),
        ]);
      };
    },
  }),
);

const userPermColumns = computed(() => {
  const subjectHeader = usersSubjectTab.value === 'users' ? 'User' : 'User group';
  return [
    {
      field: '_sortName',
      header: subjectHeader,
      sortable: true,
      component: UserPermMasterCellFlat,
      componentProps: (sp: { data: Record<string, unknown> }) => ({
        data: sp.data as UserPermissionSubject,
      }),
    },
    {
      field: '_credCount',
      header: 'Credentials',
      sortable: true,
      width: '120',
      component: markRaw(DataTableCellText),
      componentProps: (sp: { data: Record<string, unknown> }) => ({
        label: String((sp.data as UserPermRow)._credCount ?? 0),
      }),
    },
    {
      field: '_sortPerm',
      header: 'Permission',
      sortable: true,
      width: '140',
      component: markRaw(DataTableCellText),
      componentProps: (sp: { data: Record<string, unknown> }) => ({
        label: permissionSummaryLabel(sp.data as UserPermissionSubject),
      }),
    },
    {
      field: 'actions',
      header: '',
      sortable: false,
      width: '120',
      component: UserPermActionsCell,
      componentProps: (sp: { data: Record<string, unknown> }) => ({
        data: sp.data as UserPermissionSubject,
      }),
    },
  ];
});

/** Paginator below scroll region for Permissions table body */
const userPermissionsDataTablePt = {
  root: { class: 'flex min-h-0 flex-1 flex-col' },
  tableContainer: {
    class: 'z-10 flex min-h-0 flex-1 !overflow-x-auto !overflow-y-auto pb-md',
  },
  table: { class: '!w-full !max-w-full !table-fixed !overflow-visible' },
  footer: { class: '!mt-0 shrink-0 flex-wrap gap-y-sm' },
} as const;

const collapsedWebsite = ref(false);
const collapsedLinked = ref(false);
const collapsedUsers = ref(false);
const collapsedAutofill = ref(false);

const autofillSelectors = ref({
  usernameEmailSelector: '',
  passwordSelector: '',
  nextButtonSelector: '',
  loginButtonSelector: '',
  selectorsToHide: '',
});

const delayAfterNextSecondsModel = ref('');
const fillDelaySecondsModel = ref('');

const delaySecondOptions = Array.from({ length: 61 }, (_, s) => ({
  label: String(s),
  value: String(s),
}));

const fillFieldsMoreThanOnce = ref(false);
const automaticLogin = ref(true);

const extensionAutofillPayload = computed(() => ({
  website: {
    name: websiteName.value,
    uri: websiteUri.value,
    tags: [...websiteTags.value],
    folder: websiteFolder.value,
    notes: websiteNotes.value,
  },
  linkedCredentialIds: linkedCredentials.value.map((c) => c.id),
  userPermissions: userPermissions.value.map((u) => ({
    ...u,
    credentialPermissions: u.credentialPermissions.map((cp) => ({ ...cp })),
    revokedCredentialIds: [...(u.revokedCredentialIds ?? [])],
  })),
  selectors: { ...autofillSelectors.value },
  delays: {
    afterNextSeconds: delayAfterNextSecondsModel.value,
    fillDelaySeconds: fillDelaySecondsModel.value,
  },
  behaviors: {
    fillFieldsMoreThanOnce: fillFieldsMoreThanOnce.value,
    automaticLogin: automaticLogin.value,
  },
}));

const saveAttempted = ref(false);

const nameFieldErrorHelp = computed(() =>
  saveAttempted.value && !websiteName.value.trim() ? 'Name is required.' : undefined,
);

const uriFieldErrorHelp = computed(() =>
  saveAttempted.value && !websiteUri.value.trim() ? 'URI is required.' : undefined,
);

function handleSaveWebsite() {
  saveAttempted.value = true;
  if (!websiteName.value.trim() || !websiteUri.value.trim()) {
    console.warn('[Add website] Validation blocked save — missing required fields.');
    return;
  }

  console.info('[Add website] Save payload:', {
    payload: extensionAutofillPayload.value,
    linkedCredentials: linkedCredentials.value,
    users: userPermissions.value,
  });
  emit('save');
}

function rowUser(data: Record<string, unknown>): UserPermissionSubject {
  return data as UserPermissionSubject;
}
</script>

<template>
  <div class="flex min-h-0 min-w-0 w-full flex-1 flex-col bg-neutral-surface">
    <div class="min-h-0 flex-1 overflow-auto">
      <div class="mx-auto flex w-full max-w-[1120px] flex-col gap-lg px-xl py-xl">
        <CollapsiblePanel
          v-model:collapsed="collapsedWebsite"
          header="Website Details"
          toggleable
          :pt="addWebsiteSectionPanelPt"
          :pt-options="{ mergeSections: true, mergeProps: true }"
        >
          <template #titleicon="iconProps">
            <GlobeAltIcon :class="iconProps.class" />
          </template>
          <template #toggleicon="iconProps">
            <ChevronRightIcon :class="iconProps.class" />
          </template>
          <div class="grid grid-cols-1 gap-md lg:grid-cols-2">
            <FormField
              label="Name"
              required
              :help-text="nameFieldErrorHelp"
              :help-text-severity="nameFieldErrorHelp ? 'error' : 'default'"
            >
              <template #default="{ inputId }">
                <InputText
                  :id="inputId"
                  v-model="websiteName"
                  placeholder="Ex: JumpCloud"
                  class="w-full"
                />
              </template>
            </FormField>
            <FormField
              label="URI (Hostname, IP, Address, etc.)"
              required
              :help-text="uriFieldErrorHelp"
              :help-text-severity="uriFieldErrorHelp ? 'error' : 'default'"
            >
              <template #default="{ inputId }">
                <InputText :id="inputId" v-model="websiteUri" placeholder="Ex: JumpCloud" class="w-full" />
              </template>
            </FormField>
            <FormField label="Tags">
              <template #default="{ inputId }">
                <MultiSelect
                  :id="inputId"
                  v-model="websiteTags"
                  :options="tagOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="Add tags"
                  :max-selected-labels="3"
                  display="chip"
                  class="w-full"
                  filter
                />
              </template>
            </FormField>
            <FormField label="Folder">
              <template #default="{ inputId }">
                <Select
                  :id="inputId"
                  v-model="websiteFolder"
                  :options="folderOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="Select Folder"
                  show-clear
                  class="w-full"
                />
              </template>
            </FormField>
            <FormField label="Notes" class="lg:col-span-2">
              <template #default="{ inputId }">
                <Textarea :id="inputId" v-model="websiteNotes" rows="4" class="w-full" />
              </template>
            </FormField>
          </div>
        </CollapsiblePanel>

        <CollapsiblePanel
          v-model:collapsed="collapsedLinked"
          header="Linked Credentials"
          toggleable
          :pt="addWebsiteSectionPanelPt"
          :pt-options="{ mergeSections: true, mergeProps: true }"
        >
          <template #titleicon="iconProps">
            <CubeIcon :class="iconProps.class" />
          </template>
          <template #toggleicon="iconProps">
            <ChevronRightIcon :class="iconProps.class" />
          </template>
          <div class="flex min-h-0 min-w-0 flex-col gap-md">
            <DataTable
              v-model:selection="linkedCredSelection"
              v-model:first="linkedCredFirst"
              v-model:rows="linkedCredRowsPerPage"
              :data="linkedCredRowsForTable"
              :columns="linkedCredColumns"
              :paginator="true"
              :lazy="true"
              :total-records="linkedCredFilteredRows.length"
              :rows-per-page-options="linkedCredPagerOptions"
              :show-rows-per-page-options="true"
              :show-page-report="true"
              page-report-template="{first}–{last} of {totalRecords}"
              :page-link-size="6"
              scrollable
              scroll-height="flex"
              :card="true"
              data-key="id"
              selection-mode="multiple"
              class="flex min-h-0 min-w-0 flex-1 flex-col"
              :pt="linkedDataTablePt"
              :pt-options="{ mergeSections: true, mergeProps: true }"
            >
              <template #toolbar>
                <div class="relative z-20 shrink-0">
                  <DataTableToolbar
                    add-button-label="Add"
                    :show-save-view-button="false"
                    :show-columns-button="false"
                    search-placeholder="Search"
                    :show-add-button="true"
                    :show-filter-button="false"
                    :show-refresh-button="false"
                    :show-download-button="false"
                    :quick-filters="linkedCredQuickFilters"
                    @add="openAddCredDialog"
                    @search="handleLinkedCredSearch"
                    @quick-filter-change="handleLinkedCredQuickFilterChange"
                  />
                </div>
              </template>
            <template #empty>
              <div class="flex flex-col items-center justify-center gap-xs px-md py-xl text-neutral-subtle">
                <CubeIcon class="size-8 text-neutral-muted" aria-hidden="true" />
                <span class="text-body-md">
                  {{
                    linkedCredentials.length === 0
                      ? 'Link credentials before delegating vault access.'
                      : 'No credentials match your filters.'
                  }}
                </span>
              </div>
            </template>
            <template #initialEmpty>
              <div class="flex flex-col items-center justify-center gap-xs py-xl text-neutral-subtle">
                <span class="text-body-md">Nothing linked yet</span>
              </div>
            </template>
          </DataTable>
        </div>
      </CollapsiblePanel>

      <CollapsiblePanel
        v-model:collapsed="collapsedUsers"
        header="User Permissions"
        toggleable
        :pt="addWebsiteSectionPanelPt"
        :pt-options="{ mergeSections: true, mergeProps: true }"
      >
        <template #titleicon="iconProps">
          <UsersIcon :class="iconProps.class" />
        </template>
        <template #toggleicon="iconProps">
          <ChevronRightIcon :class="iconProps.class" />
        </template>
        <div class="flex min-h-0 min-w-0 flex-col gap-md">
          <Tabs v-model:value="usersSubjectTab" class="min-w-0">
            <TabList withPadding class="min-w-0">
              <Tab value="users">
                <span class="inline-flex items-center gap-xs text-body-md text-tab-sub-text-base">
                  <UserCircleIcon class="size-4 shrink-0" aria-hidden="true" /> Users
                </span>
              </Tab>
              <Tab value="groups">
                <span class="inline-flex items-center gap-xs text-body-md text-tab-sub-text-base">
                  <UsersIcon class="size-4 shrink-0" aria-hidden="true" /> User Groups
                </span>
              </Tab>
            </TabList>
          </Tabs>
          <DataTable
            v-model:expanded-rows="expandedUserRows"
            v-model:selection="userPermSelection"
            :data="userPermTableRowsForPage"
            :columns="userPermColumns"
            data-key="id"
            scrollable
            scroll-height="flex"
            :card="true"
            expander
            selection-mode="multiple"
            :highlight-on-select="false"
            :paginator="true"
            :lazy="true"
            :total-records="userPermTableRows.length"
            v-model:first="userPermFirst"
            v-model:rows="userPermRows"
            :rows-per-page-options="userPermRowsPerPageOptions"
            :show-rows-per-page-options="true"
            :show-page-report="true"
            page-report-template="{first}–{last} of {totalRecords}"
            :page-link-size="6"
            class="flex min-h-0 min-w-0 flex-1 flex-col"
            :pt="userPermissionsDataTablePt"
            :pt-options="{ mergeSections: true, mergeProps: true }"
          >
            <template #toolbar>
              <div class="relative z-20 shrink-0">
                <DataTableToolbar
                  add-button-label="Add"
                  :show-save-view-button="false"
                  :show-add-button="true"
                  :show-filter-button="true"
                  :search-placeholder="usersPermissionSearchPlaceholder"
                  :show-refresh-button="true"
                  :show-columns-button="false"
                  :show-download-button="false"
                  :active-filters="userPermActiveFilters"
                  :max-visible-filters="5"
                  @add="handleUserPermAddSubject"
                  @search="handleUsersSearch"
                  @filter="openUserPermissionFilterDialog"
                  @refresh="handleUserPermRefresh"
                  @filter-remove="handleUserPermToolbarChipRemove"
                  @clear-all="handleUserPermToolbarClearAll"
                />
              </div>
            </template>
            <template #expansion="{ data }">
              <div class="border-t border-neutral-default_solid bg-neutral-surface_deep">
                <p
                  v-if="linkedCredentials.length === 0"
                  class="px-lg py-md text-body-sm text-neutral-subtle"
                >
                  Link credentials above to delegate access per credential.
                </p>
                <ul
                  v-else
                  class="divide-y divide-neutral-default_solid px-lg py-xs"
                  :aria-label="'Credentials for ' + rowUser(data).displayName"
                >
                  <li
                    v-for="{ cred, presentation } in credentialExpansionRows(rowUser(data))"
                    :key="`${rowUser(data).id}:${cred.id}`"
                    class="grid grid-cols-1 gap-md gap-x-lg py-md sm:grid-cols-[minmax(0,1fr)_minmax(140px,200px)_auto] sm:items-center"
                  >
                    <div class="flex min-w-0 items-start gap-sm">
                      <div
                        class="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-default_solid"
                        :class="presentation.surface"
                        aria-hidden="true"
                      >
                        <component :is="presentation.Icon" class="size-5 shrink-0 text-neutral-base" />
                      </div>
                      <div class="min-w-0 pt-xxs">
                        <span class="block truncate text-body-md font-medium text-neutral-base">{{
                          cred.name
                        }}</span>
                        <span class="mt-xxs block text-body-sm text-neutral-subtle">{{ cred.accessLabel }}</span>
                      </div>
                    </div>
                    <div class="flex min-w-0 items-center sm:justify-self-start">
                      <Button
                        label="View Password"
                        size="small"
                        severity="secondary"
                        :variant="findCredPerm(rowUser(data), cred.id)?.viewPassword ? 'outlined' : 'text'"
                        @click="toggleCredViewPassword(rowUser(data).id, cred.id)"
                      />
                    </div>
                    <div class="flex shrink-0 items-center justify-end gap-sm sm:justify-self-end">
                      <Button
                        label="Edit"
                        severity="secondary"
                        variant="outlined"
                        size="small"
                        @click="openNestedCredentialEdit(rowUser(data).id, cred)"
                      />
                      <Button
                        severity="danger"
                        variant="text"
                        size="small"
                        rounded
                        :aria-label="`Remove access to ${cred.name}`"
                        @click="revokeSubjectCredential(rowUser(data).id, cred.id)"
                      >
                        <TrashIcon class="size-5" />
                      </Button>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
            <template #empty>
              <div class="px-md py-xl text-center text-body-md text-neutral-subtle">
                No subjects match filters.
              </div>
            </template>
          </DataTable>
        </div>
      </CollapsiblePanel>

      <CollapsiblePanel
        v-model:collapsed="collapsedAutofill"
        header="Autofill Parameters"
        toggleable
        :pt="addWebsiteSectionPanelPt"
        :pt-options="{ mergeSections: true, mergeProps: true }"
      >
        <template #titleicon="iconProps">
          <BoltIcon :class="iconProps.class" />
        </template>
        <template #toggleicon="iconProps">
          <ChevronRightIcon :class="iconProps.class" />
        </template>

        <div class="flex flex-col gap-lg">
          <div class="flex flex-col gap-sm">
            <span class="text-body-md-bold text-neutral-base">Field Selectors</span>
            <p class="text-body-sm text-neutral-subtle">
              Provide the CSS selectors for the login form elements. Use the inspector tool in your browser to find them.
            </p>
            <div class="mt-md grid grid-cols-1 gap-md lg:grid-cols-2">
              <FormField label="Username/email field selector">
                <template #default="{ inputId }">
                  <InputText
                    :id="inputId"
                    v-model="autofillSelectors.usernameEmailSelector"
                    class="w-full"
                  />
                </template>
              </FormField>
              <FormField label="Password field selector">
                <template #default="{ inputId }">
                  <InputText :id="inputId" v-model="autofillSelectors.passwordSelector" class="w-full" />
                </template>
              </FormField>
              <FormField label="Next button selector">
                <template #default="{ inputId }">
                  <InputText :id="inputId" v-model="autofillSelectors.nextButtonSelector" class="w-full" />
                </template>
              </FormField>
              <FormField label="Login button selector">
                <template #default="{ inputId }">
                  <InputText :id="inputId" v-model="autofillSelectors.loginButtonSelector" class="w-full" />
                </template>
              </FormField>
              <FormField
                label="Field selector to hide"
                class="lg:col-span-2"
                help-text="Selectors must be separated by a semicolon"
              >
                <template #default="{ inputId }">
                  <Textarea :id="inputId" v-model="autofillSelectors.selectorsToHide" class="w-full" rows="4" />
                </template>
              </FormField>
            </div>
          </div>

          <Divider />

          <div class="flex flex-col gap-sm">
            <span class="text-body-md-bold text-neutral-base">Behaviors &amp; Timing</span>
            <div class="mt-md grid grid-cols-1 gap-md lg:grid-cols-2">
              <FormField label="Delay after clicking next button (seconds)" help-text="Maximum: 60">
                <template #default="{ inputId }">
                  <Select
                    :id="inputId"
                    v-model="delayAfterNextSecondsModel"
                    :options="delaySecondOptions"
                    option-label="label"
                    option-value="value"
                    placeholder="Enter Username or Email"
                    show-clear
                    class="w-full"
                  />
                </template>
              </FormField>
              <FormField label="Fill delay (seconds)" help-text="Maximum: 60">
                <template #default="{ inputId }">
                  <Select
                    :id="inputId"
                    v-model="fillDelaySecondsModel"
                    :options="delaySecondOptions"
                    option-label="label"
                    option-value="value"
                    placeholder="Select"
                    show-clear
                    class="w-full"
                  />
                </template>
              </FormField>
            </div>
            <div class="mt-md flex flex-col gap-md">
              <CheckboxWithLabel v-model="fillFieldsMoreThanOnce" :binary="true">
                <template #label>Fill in fields more than once</template>
              </CheckboxWithLabel>

              <CheckboxWithLabel v-model="automaticLogin" :binary="true">
                <template #label>Automatic Login</template>
              </CheckboxWithLabel>
            </div>
          </div>
        </div>
      </CollapsiblePanel>
      </div>
    </div>

    <footer
      class="sticky bottom-0 z-20 shrink-0 border-t border-neutral-default_solid bg-neutral-base py-md"
    >
      <div class="mx-auto flex w-full max-w-[1120px] justify-end gap-md px-xl">
        <Button label="Cancel" severity="secondary" variant="outlined" @click="emit('cancel')" />
        <Button label="Save" @click="handleSaveWebsite" />
      </div>
    </footer>

    <Dialog
      v-model:visible="showAddCredDialog"
      modal
      :draggable="false"
      header="Add credential from library"
      :style="{ width: '560px' }"
      @hide="credLibrarySearch = ''"
    >
      <template #closeicon>
        <XMarkIcon />
      </template>

      <div class="flex flex-col gap-md">
        <IconField fluid>
          <InputIcon><MagnifyingGlassIcon class="size-4" /></InputIcon>
          <InputText v-model="credLibrarySearch" placeholder="Search library…" class="w-full" />
        </IconField>

        <ul class="max-h-72 divide-y divide-neutral-default_solid overflow-auto rounded-lg border border-neutral-default_solid">
          <li v-if="catalogFiltered.length === 0" class="px-md py-lg text-body-sm text-neutral-subtle">
            No unused credentials match this search — try another query or unlink a row first.
          </li>
          <li v-for="row in catalogFiltered" :key="row.id">
            <button
              type="button"
              class="flex w-full items-center gap-md px-md py-sm text-left transition-colors hover:bg-info-surface"
              @click="addCredFromCatalog(row)"
            >
              <div class="min-w-0 flex-1">
                <span class="block text-body-md font-medium text-neutral-base">{{ row.name }}</span>
                <span class="text-body-sm text-neutral-subtle">{{ row.username }}</span>
              </div>
            </button>
          </li>
        </ul>
      </div>

      <template #footer>
        <div class="flex min-w-0 flex-1 items-center gap-sm">
          <span class="text-body-sm text-neutral-subtle">
            {{ credentialCatalog.length - linkedCredentials.length }} available · {{ linkedCredentials.length }} linked
          </span>
        </div>
        <div class="flex shrink-0 gap-sm">
          <Button label="Close" severity="secondary" variant="text" @click="showAddCredDialog = false" />
        </div>
      </template>
    </Dialog>

    <Dialog
      v-model:visible="showUserPermFilterDialog"
      modal
      :draggable="false"
      header="Apply filters"
      :style="{ width: '560px' }"
    >
      <template #closeicon>
        <XMarkIcon />
      </template>

      <div class="flex flex-col gap-md">
        <FormField label="Summarized permission">
          <template #default="{ inputId }">
            <SelectButton
              :id="inputId"
              v-model="draftLedgerFilter"
              :options="userPermLedgerOptions"
              option-label="label"
              option-value="value"
              :allow-empty="false"
              class="[&_.p-togglebutton:first-child]:rounded-l-md [&_.p-togglebutton:last-child]:rounded-r-md"
            />
          </template>
        </FormField>
      </div>

      <template #footer>
        <div class="flex min-w-0 flex-1 items-center">
          <span class="text-body-sm text-neutral-subtle">{{ userPermDraftFilterCount }} Filters applied</span>
        </div>
        <div class="flex shrink-0 gap-sm">
          <Button label="Cancel" severity="secondary" variant="text" @click="cancelUserPermissionFilterDialog" />
          <Button label="Clear All" severity="secondary" variant="outlined" @click="clearDraftUserPermissionFilters" />
          <Button label="Apply" @click="applyUserPermissionLedgerFilter" />
        </div>
      </template>
    </Dialog>
  </div>
</template>
