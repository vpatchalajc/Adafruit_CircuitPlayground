import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, defineComponent, markRaw, ref } from 'vue';
import {
  CardButton,
  DataTable as CircuitDataTable,
  DataTableCellButton,
  DataTableCellLink,
  DataTableCellText,
  DataTableToolbar,
  FormField,
  MessageNotification,
  PageHeader,
  ToastNotification,
} from '@jumpcloud/circuit/components';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import Tag from 'primevue/tag';
import { useToast } from 'primevue/usetoast';
import {
  ArrowPathIcon,
  GlobeAltIcon,
  KeyIcon,
  LockClosedIcon,
  ShieldExclamationIcon,
  StarIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';

import UserDemoNav from '@/components/Nav/UserDemoNav.vue';
import { userPortalNavMenuItems } from '@/components/Nav/userPortalNavData';

type PermissionLevel = 'Manage' | 'View Details' | 'View Secret' | 'Connect';
type WebsitePermissionLevel = 'Manage' | 'View Detail' | 'Connect';
type CredentialType =
  | 'Password'
  | 'SSH Key'
  | '2FA'
  | 'Address'
  | 'Identity'
  | 'Credit Card'
  | 'Secure Note';

interface CredentialRecord {
  id: number;
  name: string;
  username: string;
  domain: string;
  type: CredentialType;
  expirationDate: string;
  tags: string[];
  lastUsed: string;
  private: boolean;
  status: 'Active' | 'Archive';
  hasMfaRegistered: boolean;
  weak: boolean;
  expired: boolean;
  shareLevel: PermissionLevel;
}

interface WebsiteRecord {
  id: number;
  name: string;
  uri: string;
  status: 'Active' | 'Archive';
  tags: string[];
  lastSessionDate: string;
  credentialIds: number[];
  shareLevel: WebsitePermissionLevel;
  usernameSelector: string;
  passwordSelector: string;
  submitSelector: string;
}

interface FolderRecord {
  id: number;
  name: string;
  members: number;
  itemCount: number;
  access: PermissionLevel;
  notes: string;
}

const applicationTabs = [
  { label: 'All', value: 'all' },
  { label: 'Work (SSO Apps)', value: 'work' },
  { label: 'Password Vault', value: 'password-vault' },
  { label: 'Favourites', value: 'favourites' },
];

const vaultPageOptions = [
  { label: 'Overview', value: 'overview' },
  { label: 'Websites', value: 'websites' },
  { label: 'Credentials', value: 'credentials' },
  { label: 'Folders', value: 'folders' },
];

const credentialTypeOptions: CredentialType[] = [
  'Password',
  'SSH Key',
  '2FA',
  'Address',
  'Identity',
  'Credit Card',
  'Secure Note',
];

const permissionOptions: PermissionLevel[] = ['Manage', 'View Details', 'View Secret', 'Connect'];
const websitePermissionOptions: WebsitePermissionLevel[] = ['Manage', 'View Detail', 'Connect'];

const initialCredentials: CredentialRecord[] = [
  {
    id: 101,
    name: 'GitHub Work',
    username: 'surbhi.j',
    domain: 'github.com',
    type: 'Password',
    expirationDate: '2026-09-01',
    tags: ['Engineering', 'Work'],
    lastUsed: '2026-04-24',
    private: false,
    status: 'Active',
    hasMfaRegistered: true,
    weak: false,
    expired: false,
    shareLevel: 'Connect',
  },
  {
    id: 102,
    name: 'Legacy ERP',
    username: 'surbhi.j',
    domain: 'erp.example.com',
    type: 'Password',
    expirationDate: '2026-04-15',
    tags: ['Finance'],
    lastUsed: '2026-02-02',
    private: false,
    status: 'Active',
    hasMfaRegistered: false,
    weak: true,
    expired: true,
    shareLevel: 'View Secret',
  },
  {
    id: 103,
    name: 'AWS Root Key (Read only)',
    username: 'security.audit',
    domain: 'aws.amazon.com',
    type: 'SSH Key',
    expirationDate: '2027-01-01',
    tags: ['Security'],
    lastUsed: '2026-04-26',
    private: true,
    status: 'Active',
    hasMfaRegistered: true,
    weak: false,
    expired: false,
    shareLevel: 'Manage',
  },
];

const initialWebsites: WebsiteRecord[] = [
  {
    id: 201,
    name: 'GitHub',
    uri: 'https://github.com/login',
    status: 'Active',
    tags: ['Engineering', 'Favourite'],
    lastSessionDate: '2026-04-24',
    credentialIds: [101],
    shareLevel: 'Connect',
    usernameSelector: '#login_field',
    passwordSelector: '#password',
    submitSelector: 'input[name="commit"]',
  },
  {
    id: 202,
    name: 'Legacy ERP',
    uri: 'https://erp.example.com/login',
    status: 'Active',
    tags: ['Finance'],
    lastSessionDate: '2026-03-02',
    credentialIds: [102],
    shareLevel: 'View Detail',
    usernameSelector: '#username',
    passwordSelector: '#password',
    submitSelector: 'button[type="submit"]',
  },
  {
    id: 203,
    name: 'Travel Portal',
    uri: 'https://travel.vendor.com/auth',
    status: 'Archive',
    tags: ['HR'],
    lastSessionDate: '2026-01-10',
    credentialIds: [],
    shareLevel: 'Manage',
    usernameSelector: '.login-email',
    passwordSelector: '.login-password',
    submitSelector: '.login-submit',
  },
];

const initialFolders: FolderRecord[] = [
  {
    id: 301,
    name: 'Engineering Shared',
    members: 6,
    itemCount: 12,
    access: 'Manage',
    notes: 'Inherited permissions apply to every credential and website in this folder.',
  },
  {
    id: 302,
    name: 'Finance Operations',
    members: 4,
    itemCount: 9,
    access: 'View Secret',
    notes: 'End-users can add and remove credentials based on assigned role.',
  },
];

const UserPortalPasswordVaultPage = defineComponent({
  name: 'UserPortalPasswordVaultPage',
  components: {
    UserDemoNav,
    PageHeader,
    CircuitDataTable,
    DataTableToolbar,
    ToastNotification,
    CardButton,
    FormField,
    MessageNotification,
    PvButton: Button,
    PvDialog: Dialog,
    PvInputText: InputText,
    PvSelect: Select,
    PvSelectButton: SelectButton,
    PvMultiSelect: MultiSelect,
    PvTag: Tag,
    GlobeAltIcon,
    KeyIcon,
    LockClosedIcon,
    ShieldExclamationIcon,
    ArrowPathIcon,
    UserGroupIcon,
    StarIcon,
    XMarkIcon,
  },
  setup() {
    const toast = useToast();
    const currentPortalPage = ref<'applications' | 'password-vault'>('applications');
    const activeApplicationsTab = ref<'all' | 'work' | 'password-vault' | 'favourites'>('all');
    const activeVaultPage = ref<'overview' | 'websites' | 'credentials' | 'folders'>('overview');

    const websites = ref<WebsiteRecord[]>(JSON.parse(JSON.stringify(initialWebsites)));
    const credentials = ref<CredentialRecord[]>(JSON.parse(JSON.stringify(initialCredentials)));
    const folders = ref<FolderRecord[]>(JSON.parse(JSON.stringify(initialFolders)));

    const websiteSearch = ref('');
    const credentialSearch = ref('');
    const showWebsiteDialog = ref(false);
    const showCredentialDialog = ref(false);
    const showFolderDialog = ref(false);
    const showWebsiteFilters = ref(false);
    const showCredentialFilters = ref(false);

    const websiteDraftFilters = ref({
      name: '',
      uri: '',
      status: 'All',
      tags: [] as string[],
      fromDate: '',
      toDate: '',
    });
    const websiteAppliedFilters = ref({ ...websiteDraftFilters.value });

    const credentialDraftFilters = ref({
      name: '',
      username: '',
      domain: '',
      credentialTypes: [] as CredentialType[],
      tags: [] as string[],
      sharingPreference: 'All',
      status: 'All',
      mfaRegistered: 'All',
      expired: 'All',
      weak: 'All',
    });
    const credentialAppliedFilters = ref({ ...credentialDraftFilters.value });

    const websiteForm = ref({
      id: 0,
      name: '',
      uri: '',
      tags: [] as string[],
      status: 'Active' as 'Active' | 'Archive',
      credentialIds: [] as number[],
      shareLevel: 'Connect' as WebsitePermissionLevel,
      usernameSelector: '',
      passwordSelector: '',
      submitSelector: '',
    });
    const websiteFormWarnings = computed(() => ({
      noCredential: websiteForm.value.credentialIds.length === 0,
      noPermission: !websiteForm.value.shareLevel,
    }));

    const credentialForm = ref({
      id: 0,
      name: '',
      username: '',
      domain: '',
      type: 'Password' as CredentialType,
      expirationDate: '',
      tags: [] as string[],
      private: false,
      shareLevel: 'Connect' as PermissionLevel,
      hasMfaRegistered: false,
    });

    const folderForm = ref({
      name: '',
      members: 1,
      access: 'Manage' as PermissionLevel,
      notes: '',
    });

    const websiteTagOptions = computed(() => {
      const allTags = new Set<string>();
      websites.value.forEach((w) => w.tags.forEach((tag) => allTags.add(tag)));
      return Array.from(allTags);
    });
    const credentialTagOptions = computed(() => {
      const allTags = new Set<string>();
      credentials.value.forEach((c) => c.tags.forEach((tag) => allTags.add(tag)));
      return Array.from(allTags);
    });

    const websiteColumns = [
      {
        field: 'name',
        header: 'Website Name',
        sortable: true,
        width: '260px',
        component: markRaw(DataTableCellLink),
        componentProps: (sp: { data: WebsiteRecord }) => ({
          label: sp.data.name,
          href: '#',
          onClick: (event: MouseEvent) => {
            event.preventDefault();
            editWebsite(sp.data);
          },
        }),
      },
      {
        field: 'uri',
        header: 'URI',
        sortable: true,
        width: '280px',
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: WebsiteRecord }) => ({ label: sp.data.uri }),
      },
      {
        field: 'connect',
        header: 'Connect',
        width: '120px',
        component: markRaw(DataTableCellButton),
        componentProps: (sp: { data: WebsiteRecord }) => ({
          label: 'Connect',
          onClick: () => connectToWebsite(sp.data),
        }),
      },
      {
        field: 'actions',
        header: 'Action',
        width: '260px',
        component: markRaw(DataTableCellText),
        componentProps: () => ({
          label: 'Delete, Details, Activity, Duplicate, Archive',
        }),
      },
    ];

    const credentialColumns = [
      {
        field: 'name',
        header: 'Name',
        sortable: true,
        width: '260px',
        component: markRaw(DataTableCellLink),
        componentProps: (sp: { data: CredentialRecord }) => ({
          label: sp.data.name,
          href: '#',
          onClick: (event: MouseEvent) => {
            event.preventDefault();
            editCredential(sp.data);
          },
        }),
      },
      {
        field: 'type',
        header: 'Credential Type',
        sortable: true,
        width: '180px',
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: CredentialRecord }) => ({ label: sp.data.type }),
      },
      {
        field: 'expirationDate',
        header: 'Expiration Date',
        sortable: true,
        width: '150px',
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: CredentialRecord }) => ({ label: sp.data.expirationDate || 'Never' }),
      },
      {
        field: 'tags',
        header: 'Tags',
        width: '180px',
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: CredentialRecord }) => ({ label: sp.data.tags.join(', ') || '-' }),
      },
      {
        field: 'lastUsed',
        header: 'Last Time Used',
        sortable: true,
        width: '150px',
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: CredentialRecord }) => ({ label: sp.data.lastUsed }),
      },
      {
        field: 'actions',
        header: 'Action',
        width: '320px',
        component: markRaw(DataTableCellText),
        componentProps: () => ({
          label: 'View Secret, View TOTP, Delete, Details, Activity, History, Duplicate, Archive',
        }),
      },
    ];

    const folderColumns = [
      {
        field: 'name',
        header: 'Shared Folder',
        sortable: true,
        width: '220px',
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: FolderRecord }) => ({ label: sp.data.name }),
      },
      {
        field: 'members',
        header: 'Users/Groups',
        width: '140px',
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: FolderRecord }) => ({ label: String(sp.data.members) }),
      },
      {
        field: 'itemCount',
        header: 'Items',
        width: '100px',
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: FolderRecord }) => ({ label: String(sp.data.itemCount) }),
      },
      {
        field: 'access',
        header: 'Inherited Access',
        width: '160px',
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: FolderRecord }) => ({ label: sp.data.access }),
      },
      {
        field: 'notes',
        header: 'Notes',
        width: '380px',
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: FolderRecord }) => ({ label: sp.data.notes }),
      },
    ];

    const healthCounts = computed(() => {
      const weak = credentials.value.filter((c) => c.weak).length;
      const expired = credentials.value.filter((c) => c.expired).length;
      const expiring = credentials.value.filter((c) => !c.expired && c.expirationDate <= '2026-05-30').length;
      const unused = credentials.value.filter((c) => c.lastUsed < '2026-03-01').length;
      const mostConnected = websites.value.filter((w) => w.credentialIds.length > 0).length;
      return { weak, expired, expiring, unused, mostConnected };
    });

    const personalHealthScore = computed(() => {
      const risk = healthCounts.value.weak + healthCounts.value.expired + healthCounts.value.expiring;
      return Math.max(0, 100 - risk * 10);
    });

    const vaultTotals = computed(() => ({
      resources: websites.value.length,
      secrets: credentials.value.length,
      sharedFolders: folders.value.length,
      users: folders.value.reduce((acc, folder) => acc + folder.members, 0),
    }));

    const applicationTiles = computed(() => {
      const tiles = [
        { id: 'app-1', name: 'Google Workspace', category: 'work', favourite: true },
        { id: 'app-2', name: 'Jira', category: 'work', favourite: false },
        { id: 'app-3', name: 'GitHub', category: 'password-vault', favourite: true },
        { id: 'app-4', name: 'Legacy ERP', category: 'password-vault', favourite: false },
        { id: 'app-5', name: 'Travel Portal', category: 'password-vault', favourite: false },
      ];
      if (activeApplicationsTab.value === 'all') return tiles;
      if (activeApplicationsTab.value === 'work') return tiles.filter((t) => t.category === 'work');
      if (activeApplicationsTab.value === 'password-vault') return tiles.filter((t) => t.category === 'password-vault');
      return tiles.filter((t) => t.favourite);
    });

    const activeWebsiteFilterChips = computed(() => {
      const chips: Array<{ id: string; key: string; operator: string; value: string }> = [];
      const f = websiteAppliedFilters.value;
      if (f.name) chips.push({ id: 'name', key: 'Name', operator: 'contains', value: f.name });
      if (f.uri) chips.push({ id: 'uri', key: 'URL', operator: 'contains', value: f.uri });
      if (f.status !== 'All') chips.push({ id: 'status', key: 'Status', operator: 'is', value: f.status });
      if (f.tags.length > 0) chips.push({ id: 'tags', key: 'Tags', operator: 'is', value: f.tags.join(', ') });
      if (f.fromDate || f.toDate) chips.push({ id: 'date', key: 'Last Session', operator: 'between', value: `${f.fromDate || '...'} - ${f.toDate || '...'}` });
      return chips;
    });

    const activeCredentialFilterChips = computed(() => {
      const chips: Array<{ id: string; key: string; operator: string; value: string }> = [];
      const f = credentialAppliedFilters.value;
      if (f.name) chips.push({ id: 'name', key: 'Name', operator: 'contains', value: f.name });
      if (f.username) chips.push({ id: 'username', key: 'Username', operator: 'contains', value: f.username });
      if (f.domain) chips.push({ id: 'domain', key: 'Domain', operator: 'contains', value: f.domain });
      if (f.credentialTypes.length > 0) chips.push({ id: 'credentialTypes', key: 'Type', operator: 'is', value: f.credentialTypes.join(', ') });
      if (f.tags.length > 0) chips.push({ id: 'tags', key: 'Tags', operator: 'is', value: f.tags.join(', ') });
      if (f.sharingPreference !== 'All') chips.push({ id: 'sharingPreference', key: 'Sharing', operator: 'is', value: f.sharingPreference });
      if (f.status !== 'All') chips.push({ id: 'status', key: 'Status', operator: 'is', value: f.status });
      if (f.mfaRegistered !== 'All') chips.push({ id: 'mfaRegistered', key: 'MFA', operator: 'is', value: f.mfaRegistered });
      if (f.expired !== 'All') chips.push({ id: 'expired', key: 'Expired', operator: 'is', value: f.expired });
      if (f.weak !== 'All') chips.push({ id: 'weak', key: 'Weak', operator: 'is', value: f.weak });
      return chips;
    });

    const filteredWebsites = computed(() => {
      const f = websiteAppliedFilters.value;
      const globalQuery = websiteSearch.value.trim().toLowerCase();
      return websites.value.filter((website) => {
        if (f.name && !website.name.toLowerCase().includes(f.name.toLowerCase())) return false;
        if (f.uri && !website.uri.toLowerCase().includes(f.uri.toLowerCase())) return false;
        if (f.status !== 'All' && website.status !== f.status) return false;
        if (f.tags.length > 0 && !f.tags.every((tag) => website.tags.includes(tag))) return false;
        if (f.fromDate && website.lastSessionDate < f.fromDate) return false;
        if (f.toDate && website.lastSessionDate > f.toDate) return false;
        if (globalQuery) {
          const bucket = `${website.name} ${website.uri} ${website.status} ${website.tags.join(' ')} ${website.lastSessionDate}`.toLowerCase();
          if (!bucket.includes(globalQuery)) return false;
        }
        return true;
      });
    });

    const filteredCredentials = computed(() => {
      const f = credentialAppliedFilters.value;
      const globalQuery = credentialSearch.value.trim().toLowerCase();
      return credentials.value.filter((credential) => {
        if (f.name && !credential.name.toLowerCase().includes(f.name.toLowerCase())) return false;
        if (f.username && !credential.username.toLowerCase().includes(f.username.toLowerCase())) return false;
        if (f.domain && !credential.domain.toLowerCase().includes(f.domain.toLowerCase())) return false;
        if (f.credentialTypes.length > 0 && !f.credentialTypes.includes(credential.type)) return false;
        if (f.tags.length > 0 && !f.tags.every((tag) => credential.tags.includes(tag))) return false;
        if (f.sharingPreference === 'Private' && !credential.private) return false;
        if (f.sharingPreference === 'Non-Private' && credential.private) return false;
        if (f.status !== 'All' && credential.status !== f.status) return false;
        if (f.mfaRegistered === 'Yes' && !credential.hasMfaRegistered) return false;
        if (f.mfaRegistered === 'No' && credential.hasMfaRegistered) return false;
        if (f.expired === 'Yes' && !credential.expired) return false;
        if (f.expired === 'No' && credential.expired) return false;
        if (f.weak === 'Yes' && !credential.weak) return false;
        if (f.weak === 'No' && credential.weak) return false;
        if (globalQuery) {
          const bucket = `${credential.name} ${credential.username} ${credential.domain} ${credential.type} ${credential.tags.join(' ')}`.toLowerCase();
          if (!bucket.includes(globalQuery)) return false;
        }
        return true;
      });
    });

    function handleNavigation(label: string) {
      const lower = label.toLowerCase();
      if (lower === 'password vault') currentPortalPage.value = 'password-vault';
      if (lower === 'all applications') currentPortalPage.value = 'applications';
    }

    function openCreateWebsiteDialog() {
      websiteForm.value = {
        id: 0,
        name: '',
        uri: '',
        tags: [],
        status: 'Active',
        credentialIds: [],
        shareLevel: 'Connect',
        usernameSelector: '#username',
        passwordSelector: '#password',
        submitSelector: 'button[type="submit"]',
      };
      showWebsiteDialog.value = true;
    }

    function editWebsite(website: WebsiteRecord) {
      websiteForm.value = {
        id: website.id,
        name: website.name,
        uri: website.uri,
        tags: [...website.tags],
        status: website.status,
        credentialIds: [...website.credentialIds],
        shareLevel: website.shareLevel,
        usernameSelector: website.usernameSelector,
        passwordSelector: website.passwordSelector,
        submitSelector: website.submitSelector,
      };
      showWebsiteDialog.value = true;
    }

    function saveWebsite() {
      const payload: WebsiteRecord = {
        id: websiteForm.value.id || Date.now(),
        name: websiteForm.value.name.trim(),
        uri: websiteForm.value.uri.trim(),
        status: websiteForm.value.status,
        tags: [...websiteForm.value.tags],
        lastSessionDate: new Date().toISOString().slice(0, 10),
        credentialIds: [...websiteForm.value.credentialIds],
        shareLevel: websiteForm.value.shareLevel,
        usernameSelector: websiteForm.value.usernameSelector.trim(),
        passwordSelector: websiteForm.value.passwordSelector.trim(),
        submitSelector: websiteForm.value.submitSelector.trim(),
      };
      if (!payload.name || !payload.uri) return;
      const index = websites.value.findIndex((w) => w.id === payload.id);
      if (index >= 0) websites.value.splice(index, 1, payload);
      else websites.value.unshift(payload);
      showWebsiteDialog.value = false;
      toast.add({ severity: 'success', summary: 'Website Saved', detail: `${payload.name} is available in Password Vault.`, life: 2500 });
    }

    function connectToWebsite(website: WebsiteRecord) {
      toast.add({
        severity: 'info',
        summary: 'Autofill Launch',
        detail: `Launching ${website.name} with mapped autofill selectors.`,
        life: 2500,
      });
    }

    function refreshWebsites() {
      websites.value = [...websites.value];
      toast.add({ severity: 'success', summary: 'Refreshed', detail: 'Website entries were refreshed.', life: 1800 });
    }

    function exportWebsitesCsv() {
      const header = ['Website Name', 'URI', 'Status', 'Tags', 'Last Session Date'];
      const rows = websites.value.map((w) => [w.name, w.uri, w.status, w.tags.join('|'), w.lastSessionDate]);
      triggerCsvDownload('password-vault-websites.csv', [header, ...rows]);
    }

    function openCreateCredentialDialog() {
      credentialForm.value = {
        id: 0,
        name: '',
        username: '',
        domain: '',
        type: 'Password',
        expirationDate: '',
        tags: [],
        private: false,
        shareLevel: 'Connect',
        hasMfaRegistered: false,
      };
      showCredentialDialog.value = true;
    }

    function editCredential(credential: CredentialRecord) {
      credentialForm.value = {
        id: credential.id,
        name: credential.name,
        username: credential.username,
        domain: credential.domain,
        type: credential.type,
        expirationDate: credential.expirationDate,
        tags: [...credential.tags],
        private: credential.private,
        shareLevel: credential.shareLevel,
        hasMfaRegistered: credential.hasMfaRegistered,
      };
      showCredentialDialog.value = true;
    }

    function saveCredential() {
      const payload: CredentialRecord = {
        id: credentialForm.value.id || Date.now(),
        name: credentialForm.value.name.trim(),
        username: credentialForm.value.username.trim(),
        domain: credentialForm.value.domain.trim(),
        type: credentialForm.value.type,
        expirationDate: credentialForm.value.expirationDate,
        tags: [...credentialForm.value.tags],
        lastUsed: new Date().toISOString().slice(0, 10),
        private: credentialForm.value.private,
        status: 'Active',
        hasMfaRegistered: credentialForm.value.hasMfaRegistered,
        weak: false,
        expired: credentialForm.value.expirationDate ? credentialForm.value.expirationDate < new Date().toISOString().slice(0, 10) : false,
        shareLevel: credentialForm.value.shareLevel,
      };
      if (!payload.name || !payload.type) return;
      const index = credentials.value.findIndex((c) => c.id === payload.id);
      if (index >= 0) credentials.value.splice(index, 1, payload);
      else credentials.value.unshift(payload);
      showCredentialDialog.value = false;
      toast.add({ severity: 'success', summary: 'Credential Saved', detail: `${payload.name} has been updated.`, life: 2500 });
    }

    function refreshCredentials() {
      credentials.value = [...credentials.value];
      toast.add({ severity: 'success', summary: 'Refreshed', detail: 'Credential entries were refreshed.', life: 1800 });
    }

    function exportCredentialsCsv() {
      const header = ['Name', 'Type', 'Domain', 'Expiration Date', 'Tags', 'Private'];
      const rows = credentials.value.map((c) => [c.name, c.type, c.domain, c.expirationDate, c.tags.join('|'), c.private ? 'Yes' : 'No']);
      triggerCsvDownload('password-vault-credentials.csv', [header, ...rows]);
    }

    function createFolder() {
      if (!folderForm.value.name.trim()) return;
      folders.value.unshift({
        id: Date.now(),
        name: folderForm.value.name.trim(),
        members: folderForm.value.members,
        itemCount: 0,
        access: folderForm.value.access,
        notes: folderForm.value.notes.trim() || 'Inherited permissions apply to every credential and website in this folder.',
      });
      showFolderDialog.value = false;
      folderForm.value = { name: '', members: 1, access: 'Manage', notes: '' };
      toast.add({ severity: 'success', summary: 'Shared Folder Created', detail: 'Folder permissions were applied to all contained items.', life: 2500 });
    }

    function triggerCsvDownload(fileName: string, rows: string[][]) {
      const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(blob);
      anchor.download = fileName;
      anchor.click();
      URL.revokeObjectURL(anchor.href);
    }

    function openWebsiteFilters() {
      websiteDraftFilters.value = { ...websiteAppliedFilters.value, tags: [...websiteAppliedFilters.value.tags] };
      showWebsiteFilters.value = true;
    }
    function applyWebsiteFilters() {
      websiteAppliedFilters.value = { ...websiteDraftFilters.value, tags: [...websiteDraftFilters.value.tags] };
      showWebsiteFilters.value = false;
    }
    function clearWebsiteFilters() {
      websiteDraftFilters.value = { name: '', uri: '', status: 'All', tags: [], fromDate: '', toDate: '' };
    }
    function clearAllWebsiteFilters() {
      clearWebsiteFilters();
      websiteAppliedFilters.value = { ...websiteDraftFilters.value };
    }

    function openCredentialFilters() {
      credentialDraftFilters.value = {
        ...credentialAppliedFilters.value,
        credentialTypes: [...credentialAppliedFilters.value.credentialTypes],
        tags: [...credentialAppliedFilters.value.tags],
      };
      showCredentialFilters.value = true;
    }
    function applyCredentialFilters() {
      credentialAppliedFilters.value = {
        ...credentialDraftFilters.value,
        credentialTypes: [...credentialDraftFilters.value.credentialTypes],
        tags: [...credentialDraftFilters.value.tags],
      };
      showCredentialFilters.value = false;
    }
    function clearCredentialFilters() {
      credentialDraftFilters.value = {
        name: '',
        username: '',
        domain: '',
        credentialTypes: [],
        tags: [],
        sharingPreference: 'All',
        status: 'All',
        mfaRegistered: 'All',
        expired: 'All',
        weak: 'All',
      };
    }
    function clearAllCredentialFilters() {
      clearCredentialFilters();
      credentialAppliedFilters.value = { ...credentialDraftFilters.value };
    }

    function removeWebsiteFilterChip(chip: { id?: string }) {
      const id = chip.id ?? '';
      if (id === 'name') websiteAppliedFilters.value.name = '';
      else if (id === 'uri') websiteAppliedFilters.value.uri = '';
      else if (id === 'status') websiteAppliedFilters.value.status = 'All';
      else if (id === 'tags') websiteAppliedFilters.value.tags = [];
      else if (id === 'date') {
        websiteAppliedFilters.value.fromDate = '';
        websiteAppliedFilters.value.toDate = '';
      }
    }

    function removeCredentialFilterChip(chip: { id?: string }) {
      const id = chip.id ?? '';
      if (id === 'name') credentialAppliedFilters.value.name = '';
      else if (id === 'username') credentialAppliedFilters.value.username = '';
      else if (id === 'domain') credentialAppliedFilters.value.domain = '';
      else if (id === 'credentialTypes') credentialAppliedFilters.value.credentialTypes = [];
      else if (id === 'tags') credentialAppliedFilters.value.tags = [];
      else if (id === 'sharingPreference') credentialAppliedFilters.value.sharingPreference = 'All';
      else if (id === 'status') credentialAppliedFilters.value.status = 'All';
      else if (id === 'mfaRegistered') credentialAppliedFilters.value.mfaRegistered = 'All';
      else if (id === 'expired') credentialAppliedFilters.value.expired = 'All';
      else if (id === 'weak') credentialAppliedFilters.value.weak = 'All';
    }

    function viewCredentialCategory(category: 'weak' | 'expired' | 'expiring' | 'unused') {
      activeVaultPage.value = 'credentials';
      clearAllCredentialFilters();
      if (category === 'weak') credentialAppliedFilters.value.weak = 'Yes';
      if (category === 'expired') credentialAppliedFilters.value.expired = 'Yes';
      if (category === 'expiring') credentialAppliedFilters.value.expired = 'No';
      if (category === 'unused') credentialAppliedFilters.value.status = 'Active';
    }

    const pageTitle = computed(() => (currentPortalPage.value === 'applications' ? 'Applications' : 'Password Vault'));
    const pageTabs = computed(() => (currentPortalPage.value === 'applications' ? applicationTabs : []));

    return {
      currentPortalPage,
      activeApplicationsTab,
      activeVaultPage,
      websites,
      credentials,
      folders,
      pageTitle,
      pageTabs,
      applicationTiles,
      vaultPageOptions,
      websiteColumns,
      credentialColumns,
      folderColumns,
      websiteSearch,
      credentialSearch,
      showWebsiteDialog,
      showCredentialDialog,
      showFolderDialog,
      showWebsiteFilters,
      showCredentialFilters,
      websiteDraftFilters,
      websiteAppliedFilters,
      credentialDraftFilters,
      credentialAppliedFilters,
      websiteTagOptions,
      credentialTagOptions,
      permissionOptions,
      websitePermissionOptions,
      credentialTypeOptions,
      websiteForm,
      websiteFormWarnings,
      credentialForm,
      folderForm,
      healthCounts,
      personalHealthScore,
      vaultTotals,
      filteredWebsites,
      filteredCredentials,
      activeWebsiteFilterChips,
      activeCredentialFilterChips,
      userPortalNavMenuItems,
      handleNavigation,
      openCreateWebsiteDialog,
      editWebsite,
      saveWebsite,
      refreshWebsites,
      exportWebsitesCsv,
      openCreateCredentialDialog,
      editCredential,
      saveCredential,
      refreshCredentials,
      exportCredentialsCsv,
      createFolder,
      openWebsiteFilters,
      applyWebsiteFilters,
      clearWebsiteFilters,
      clearAllWebsiteFilters,
      openCredentialFilters,
      applyCredentialFilters,
      clearCredentialFilters,
      clearAllCredentialFilters,
      removeWebsiteFilterChip,
      removeCredentialFilterChip,
      viewCredentialCategory,
      connectToWebsite,
    };
  },
  template: `
    <div class="flex h-screen overflow-hidden">
      <ToastNotification />
      <UserDemoNav
        :menu-items="userPortalNavMenuItems"
        :active-item="currentPortalPage === 'password-vault' ? 'password vault' : 'all applications'"
        @navigate="handleNavigation"
      />

      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <PageHeader
          :title="pageTitle"
          :tabs="pageTabs"
          :activeTab="activeApplicationsTab"
          @update:activeTab="activeApplicationsTab = $event"
        />

        <div v-if="currentPortalPage === 'applications'" class="flex-1 overflow-auto bg-neutral-surface">
          <div class="w-full max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardButton
              v-for="tile in applicationTiles"
              :key="tile.id"
              @click="tile.category === 'password-vault' ? currentPortalPage = 'password-vault' : undefined"
            >
              <template #leading>
                <div class="size-10 rounded-md bg-neutral-surface border border-neutral-default_solid flex items-center justify-center">
                  <GlobeAltIcon class="size-5 text-neutral-base" />
                </div>
              </template>
              <div class="flex flex-col min-w-0">
                <span class="text-body-md-semi-bold text-neutral-base truncate">{{ tile.name }}</span>
                <span class="text-body-sm text-neutral-subtle">{{ tile.category === 'work' ? 'Work (SSO App)' : 'Password Vault Website' }}</span>
              </div>
              <template #trailing>
                <PvTag :severity="tile.category === 'work' ? 'info' : 'warn'" :value="tile.category === 'work' ? 'SSO' : 'Vault'" />
              </template>
            </CardButton>
          </div>
        </div>

        <div v-else class="flex-1 min-h-0 flex overflow-hidden">
          <aside class="w-56 shrink-0 border-r border-neutral-default_solid bg-neutral-base p-4">
            <div class="flex flex-col gap-2">
              <PvButton
                v-for="page in vaultPageOptions"
                :key="page.value"
                :label="page.label"
                :severity="activeVaultPage === page.value ? 'primary' : 'secondary'"
                :variant="activeVaultPage === page.value ? 'outlined' : 'text'"
                class="justify-start!"
                @click="activeVaultPage = page.value"
              />
            </div>
          </aside>

          <div class="flex-1 min-w-0 overflow-auto bg-neutral-surface">
            <div v-if="activeVaultPage === 'overview'" class="w-full max-w-6xl mx-auto px-6 py-6 flex flex-col gap-6">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <CardButton>
                  <template #leading><ShieldExclamationIcon class="size-6 text-warning-base" /></template>
                  <div class="flex flex-col">
                    <span class="text-heading-3">{{ personalHealthScore }}%</span>
                    <span class="text-body-sm text-neutral-subtle">Personal Health Score</span>
                  </div>
                </CardButton>
                <CardButton>
                  <template #leading><GlobeAltIcon class="size-6 text-info-base" /></template>
                  <div class="flex flex-col">
                    <span class="text-heading-3">{{ vaultTotals.resources }}</span>
                    <span class="text-body-sm text-neutral-subtle">Resources</span>
                  </div>
                </CardButton>
                <CardButton>
                  <template #leading><KeyIcon class="size-6 text-info-base" /></template>
                  <div class="flex flex-col">
                    <span class="text-heading-3">{{ vaultTotals.secrets }}</span>
                    <span class="text-body-sm text-neutral-subtle">Secrets</span>
                  </div>
                </CardButton>
                <CardButton>
                  <template #leading><UserGroupIcon class="size-6 text-info-base" /></template>
                  <div class="flex flex-col">
                    <span class="text-heading-3">{{ vaultTotals.sharedFolders }}</span>
                    <span class="text-body-sm text-neutral-subtle">Shared Folders</span>
                  </div>
                </CardButton>
              </div>

              <div class="border border-neutral-default_solid rounded-md bg-neutral-base">
                <div class="px-4 py-3 border-b border-neutral-default_solid">
                  <span class="text-body-md-semi-bold text-neutral-base">Password Health & Hygiene</span>
                </div>
                <div class="divide-y divide-neutral-default_solid">
                  <div class="px-4 py-3 flex items-center justify-between">
                    <span class="text-body-md text-neutral-base">Weak Credentials ({{ healthCounts.weak }})</span>
                    <PvButton label="View All" variant="text" severity="secondary" @click="viewCredentialCategory('weak')" />
                  </div>
                  <div class="px-4 py-3 flex items-center justify-between">
                    <span class="text-body-md text-neutral-base">Expired Credentials ({{ healthCounts.expired }})</span>
                    <PvButton label="View All" variant="text" severity="secondary" @click="viewCredentialCategory('expired')" />
                  </div>
                  <div class="px-4 py-3 flex items-center justify-between">
                    <span class="text-body-md text-neutral-base">Expiring Credentials ({{ healthCounts.expiring }})</span>
                    <PvButton label="View All" variant="text" severity="secondary" @click="viewCredentialCategory('expiring')" />
                  </div>
                  <div class="px-4 py-3 flex items-center justify-between">
                    <span class="text-body-md text-neutral-base">Unused Credentials ({{ healthCounts.unused }})</span>
                    <PvButton label="View All" variant="text" severity="secondary" @click="viewCredentialCategory('unused')" />
                  </div>
                  <div class="px-4 py-3 flex items-center justify-between">
                    <span class="text-body-md text-neutral-base">Most Connected Resources ({{ healthCounts.mostConnected }})</span>
                    <PvButton label="View All" variant="text" severity="secondary" @click="activeVaultPage = 'websites'" />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeVaultPage === 'websites'" class="w-full max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <MessageNotification
                  severity="info"
                  title="Website management supports credential association, sharing, connect, and autofill selectors."
                  detail="Warning actions are shown if a website is saved without credentials or without access permission levels."
                />
              </div>
              <div class="flex flex-col h-[640px] relative">
                <CircuitDataTable :data="filteredWebsites" :columns="websiteColumns" :scrollable="true" scrollHeight="flex" :paginator="true" :rows="10">
                  <template #toolbar>
                    <DataTableToolbar
                      add-button-label="Add Website"
                      search-placeholder="Global search across website fields..."
                      :showAddButton="true"
                      :showFilterButton="true"
                      :showRefreshButton="true"
                      :showColumnsButton="false"
                      :showDownloadButton="true"
                      :showSaveViewButton="false"
                      :activeFilters="activeWebsiteFilterChips"
                      @add="openCreateWebsiteDialog"
                      @search="websiteSearch = $event"
                      @filter="openWebsiteFilters"
                      @refresh="refreshWebsites"
                      @download="exportWebsitesCsv"
                      @clear-all="clearAllWebsiteFilters"
                      @filter-remove="removeWebsiteFilterChip"
                    />
                  </template>
                </CircuitDataTable>
              </div>
            </div>

            <div v-if="activeVaultPage === 'credentials'" class="w-full max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
              <MessageNotification
                severity="warn"
                title="Private credentials cannot be viewed by administrators in Admin Portal."
                detail="Credential sharing supports user-level and group-level permissions: Manage, View Details, View Secret, and Connect."
              />
              <div class="flex items-center gap-3">
                <PvButton label="Import from Custom File" severity="secondary" variant="outlined" />
                <PvButton label="Import from Template" severity="secondary" variant="outlined" />
                <PvButton label="Download File Template" severity="secondary" variant="text" />
              </div>
              <div class="flex flex-col h-[640px] relative">
                <CircuitDataTable :data="filteredCredentials" :columns="credentialColumns" :scrollable="true" scrollHeight="flex" :paginator="true" :rows="10">
                  <template #toolbar>
                    <DataTableToolbar
                      add-button-label="Add Credential"
                      search-placeholder="Global search across credential fields..."
                      :showAddButton="true"
                      :showFilterButton="true"
                      :showRefreshButton="true"
                      :showColumnsButton="false"
                      :showDownloadButton="true"
                      :showSaveViewButton="false"
                      :activeFilters="activeCredentialFilterChips"
                      @add="openCreateCredentialDialog"
                      @search="credentialSearch = $event"
                      @filter="openCredentialFilters"
                      @refresh="refreshCredentials"
                      @download="exportCredentialsCsv"
                      @clear-all="clearAllCredentialFilters"
                      @filter-remove="removeCredentialFilterChip"
                    />
                  </template>
                </CircuitDataTable>
              </div>
            </div>

            <div v-if="activeVaultPage === 'folders'" class="w-full max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
              <MessageNotification
                severity="info"
                title="Shared Folder inherited permissions apply to every credential and website inside the folder."
                detail="Admins manage access in Admin Portal. End-users can CRUD folders and contained credentials in User Portal based on assigned role."
              />
              <div class="flex items-center justify-between">
                <span class="text-body-md text-neutral-subtle">One credential can only belong to one shared folder.</span>
                <PvButton label="Create Shared Folder" @click="showFolderDialog = true" />
              </div>
              <div class="flex flex-col h-[520px]">
                <CircuitDataTable :data="folders" :columns="folderColumns" :scrollable="true" scrollHeight="flex" :paginator="true" :rows="10" />
              </div>
            </div>
          </div>
        </div>

        <PvDialog v-model:visible="showWebsiteDialog" :draggable="false" modal header="Website" :style="{ width: '620px' }">
          <template #closeicon><XMarkIcon /></template>
          <div class="flex flex-col gap-md">
            <MessageNotification
              v-if="websiteFormWarnings.noCredential || websiteFormWarnings.noPermission"
              severity="warn"
              title="Website warning actions"
              :detail="websiteFormWarnings.noCredential
                ? 'Creating a website with no credentials can block connect/autofill flows.'
                : 'Creating a website without assigning access permission levels limits sharing governance.'"
            />
            <FormField label="Website Name" required>
              <template #default="{ inputId }"><PvInputText :id="inputId" v-model="websiteForm.name" class="w-full" /></template>
            </FormField>
            <FormField label="URL" required>
              <template #default="{ inputId }"><PvInputText :id="inputId" v-model="websiteForm.uri" class="w-full" /></template>
            </FormField>
            <FormField label="Associate Credentials">
              <template #default="{ inputId }">
                <PvMultiSelect
                  :id="inputId"
                  v-model="websiteForm.credentialIds"
                  :options="credentials"
                  optionLabel="name"
                  optionValue="id"
                  placeholder="Select existing or create new credential"
                  class="w-full"
                  :maxSelectedLabels="2"
                />
              </template>
            </FormField>
            <FormField label="Website Share Permission">
              <template #default="{ inputId }"><PvSelect :id="inputId" v-model="websiteForm.shareLevel" :options="websitePermissionOptions" class="w-full!" /></template>
            </FormField>
            <FormField label="Tags">
              <template #default="{ inputId }"><PvMultiSelect :id="inputId" v-model="websiteForm.tags" :options="websiteTagOptions" class="w-full" /></template>
            </FormField>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
              <FormField label="Username Selector">
                <template #default="{ inputId }"><PvInputText :id="inputId" v-model="websiteForm.usernameSelector" class="w-full" /></template>
              </FormField>
              <FormField label="Password Selector">
                <template #default="{ inputId }"><PvInputText :id="inputId" v-model="websiteForm.passwordSelector" class="w-full" /></template>
              </FormField>
              <FormField label="Submit Selector">
                <template #default="{ inputId }"><PvInputText :id="inputId" v-model="websiteForm.submitSelector" class="w-full" /></template>
              </FormField>
            </div>
          </div>
          <template #footer>
            <div class="flex items-center flex-1 min-w-0">
              <span class="text-body-sm text-neutral-subtle">Websites can be shared with user or group-level permissions.</span>
            </div>
            <div class="flex gap-sm shrink-0">
              <PvButton label="Cancel" severity="secondary" variant="text" @click="showWebsiteDialog = false" />
              <PvButton label="Save Website" @click="saveWebsite" />
            </div>
          </template>
        </PvDialog>

        <PvDialog v-model:visible="showCredentialDialog" :draggable="false" modal header="Credential" :style="{ width: '620px' }">
          <template #closeicon><XMarkIcon /></template>
          <div class="flex flex-col gap-md">
            <FormField label="Credential Name" required>
              <template #default="{ inputId }"><PvInputText :id="inputId" v-model="credentialForm.name" class="w-full" /></template>
            </FormField>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
              <FormField label="Username">
                <template #default="{ inputId }"><PvInputText :id="inputId" v-model="credentialForm.username" class="w-full" /></template>
              </FormField>
              <FormField label="Domain">
                <template #default="{ inputId }"><PvInputText :id="inputId" v-model="credentialForm.domain" class="w-full" /></template>
              </FormField>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
              <FormField label="Credential Type" required>
                <template #default="{ inputId }"><PvSelect :id="inputId" v-model="credentialForm.type" :options="credentialTypeOptions" class="w-full!" /></template>
              </FormField>
              <FormField label="Expiration Date">
                <template #default="{ inputId }"><PvInputText :id="inputId" v-model="credentialForm.expirationDate" type="date" class="w-full" /></template>
              </FormField>
            </div>
            <FormField label="Tags">
              <template #default="{ inputId }"><PvMultiSelect :id="inputId" v-model="credentialForm.tags" :options="credentialTagOptions" class="w-full" /></template>
            </FormField>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
              <FormField label="Share Permission">
                <template #default="{ inputId }"><PvSelect :id="inputId" v-model="credentialForm.shareLevel" :options="permissionOptions" class="w-full!" /></template>
              </FormField>
              <FormField label="Sharing Preference">
                <template #default="{ inputId }">
                  <PvSelectButton
                    :id="inputId"
                    v-model="credentialForm.private"
                    :options="[{ label: 'Non-Private', value: false }, { label: 'Private', value: true }]"
                    option-label="label"
                    option-value="value"
                    :allowEmpty="false"
                  />
                </template>
              </FormField>
            </div>
          </div>
          <template #footer>
            <div class="flex items-center flex-1 min-w-0">
              <span class="text-body-sm text-neutral-subtle">Warning: always assign access permission level for shared users or groups.</span>
            </div>
            <div class="flex gap-sm shrink-0">
              <PvButton label="Cancel" severity="secondary" variant="text" @click="showCredentialDialog = false" />
              <PvButton label="Save Credential" @click="saveCredential" />
            </div>
          </template>
        </PvDialog>

        <PvDialog v-model:visible="showFolderDialog" :draggable="false" modal header="Create Shared Folder" :style="{ width: '560px' }">
          <template #closeicon><XMarkIcon /></template>
          <div class="flex flex-col gap-md">
            <FormField label="Folder Name" required>
              <template #default="{ inputId }"><PvInputText :id="inputId" v-model="folderForm.name" class="w-full" /></template>
            </FormField>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
              <FormField label="Assigned Users / Groups">
                <template #default="{ inputId }"><PvInputText :id="inputId" v-model="folderForm.members" type="number" min="1" class="w-full" /></template>
              </FormField>
              <FormField label="Inherited Permission Level">
                <template #default="{ inputId }"><PvSelect :id="inputId" v-model="folderForm.access" :options="permissionOptions" class="w-full!" /></template>
              </FormField>
            </div>
            <FormField label="Notes">
              <template #default="{ inputId }"><PvInputText :id="inputId" v-model="folderForm.notes" class="w-full" /></template>
            </FormField>
          </div>
          <template #footer>
            <div class="flex items-center flex-1 min-w-0">
              <span class="text-body-sm text-neutral-subtle">Manage access applies to every item in the folder by inheritance.</span>
            </div>
            <div class="flex gap-sm shrink-0">
              <PvButton label="Cancel" severity="secondary" variant="text" @click="showFolderDialog = false" />
              <PvButton label="Create Folder" @click="createFolder" />
            </div>
          </template>
        </PvDialog>

        <PvDialog
          :visible="showWebsiteFilters"
          :draggable="false"
          modal
          header="Apply filters"
          :style="{ width: '560px' }"
          @update:visible="!$event && (showWebsiteFilters = false)"
        >
          <template #closeicon><XMarkIcon /></template>
          <div class="flex flex-col gap-md">
            <FormField label="Name">
              <template #default="{ inputId }"><PvInputText :id="inputId" v-model="websiteDraftFilters.name" class="w-full" /></template>
            </FormField>
            <FormField label="URL">
              <template #default="{ inputId }"><PvInputText :id="inputId" v-model="websiteDraftFilters.uri" class="w-full" /></template>
            </FormField>
            <FormField label="Status">
              <template #default="{ inputId }"><PvSelect :id="inputId" v-model="websiteDraftFilters.status" :options="['All', 'Active', 'Archive']" class="w-full!" /></template>
            </FormField>
            <FormField label="Tags">
              <template #default="{ inputId }"><PvMultiSelect :id="inputId" v-model="websiteDraftFilters.tags" :options="websiteTagOptions" class="w-full" /></template>
            </FormField>
            <div class="grid grid-cols-2 gap-md">
              <FormField label="Last Session From">
                <template #default="{ inputId }"><PvInputText :id="inputId" v-model="websiteDraftFilters.fromDate" type="date" class="w-full" /></template>
              </FormField>
              <FormField label="Last Session To">
                <template #default="{ inputId }"><PvInputText :id="inputId" v-model="websiteDraftFilters.toDate" type="date" class="w-full" /></template>
              </FormField>
            </div>
          </div>
          <template #footer>
            <div class="flex items-center flex-1 min-w-0">
              <span class="text-body-sm text-neutral-subtle">{{ activeWebsiteFilterChips.length }} Filters applied</span>
            </div>
            <div class="flex gap-sm shrink-0">
              <PvButton label="Cancel" severity="secondary" variant="text" @click="showWebsiteFilters = false" />
              <PvButton label="Clear All" severity="secondary" variant="outlined" @click="clearWebsiteFilters" />
              <PvButton label="Apply" @click="applyWebsiteFilters" />
            </div>
          </template>
        </PvDialog>

        <PvDialog
          :visible="showCredentialFilters"
          :draggable="false"
          modal
          header="Apply filters"
          :style="{ width: '560px' }"
          @update:visible="!$event && (showCredentialFilters = false)"
        >
          <template #closeicon><XMarkIcon /></template>
          <div class="flex flex-col gap-md">
            <FormField label="Name">
              <template #default="{ inputId }"><PvInputText :id="inputId" v-model="credentialDraftFilters.name" class="w-full" /></template>
            </FormField>
            <div class="grid grid-cols-2 gap-md">
              <FormField label="Username">
                <template #default="{ inputId }"><PvInputText :id="inputId" v-model="credentialDraftFilters.username" class="w-full" /></template>
              </FormField>
              <FormField label="Domain">
                <template #default="{ inputId }"><PvInputText :id="inputId" v-model="credentialDraftFilters.domain" class="w-full" /></template>
              </FormField>
            </div>
            <FormField label="Credential Type">
              <template #default="{ inputId }"><PvMultiSelect :id="inputId" v-model="credentialDraftFilters.credentialTypes" :options="credentialTypeOptions" class="w-full" /></template>
            </FormField>
            <FormField label="Tags">
              <template #default="{ inputId }"><PvMultiSelect :id="inputId" v-model="credentialDraftFilters.tags" :options="credentialTagOptions" class="w-full" /></template>
            </FormField>
            <div class="grid grid-cols-2 gap-md">
              <FormField label="Sharing Preference">
                <template #default="{ inputId }"><PvSelect :id="inputId" v-model="credentialDraftFilters.sharingPreference" :options="['All', 'Private', 'Non-Private']" class="w-full!" /></template>
              </FormField>
              <FormField label="Status">
                <template #default="{ inputId }"><PvSelect :id="inputId" v-model="credentialDraftFilters.status" :options="['All', 'Active', 'Archive']" class="w-full!" /></template>
              </FormField>
            </div>
            <div class="grid grid-cols-3 gap-md">
              <FormField label="Have MFA Registered">
                <template #default="{ inputId }"><PvSelect :id="inputId" v-model="credentialDraftFilters.mfaRegistered" :options="['All', 'Yes', 'No']" class="w-full!" /></template>
              </FormField>
              <FormField label="Expired">
                <template #default="{ inputId }"><PvSelect :id="inputId" v-model="credentialDraftFilters.expired" :options="['All', 'Yes', 'No']" class="w-full!" /></template>
              </FormField>
              <FormField label="Weak">
                <template #default="{ inputId }"><PvSelect :id="inputId" v-model="credentialDraftFilters.weak" :options="['All', 'Yes', 'No']" class="w-full!" /></template>
              </FormField>
            </div>
          </div>
          <template #footer>
            <div class="flex items-center flex-1 min-w-0">
              <span class="text-body-sm text-neutral-subtle">{{ activeCredentialFilterChips.length }} Filters applied</span>
            </div>
            <div class="flex gap-sm shrink-0">
              <PvButton label="Cancel" severity="secondary" variant="text" @click="showCredentialFilters = false" />
              <PvButton label="Clear All" severity="secondary" variant="outlined" @click="clearCredentialFilters" />
              <PvButton label="Apply" @click="applyCredentialFilters" />
            </div>
          </template>
        </PvDialog>
      </div>
    </div>
  `,
});

const meta: Meta<typeof UserPortalPasswordVaultPage> = {
  title: "Projects/Surbhi's Playground/Pages/User Portal - Password Vault",
  component: UserPortalPasswordVaultPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof UserPortalPasswordVaultPage>;

export const Default: Story = {};
