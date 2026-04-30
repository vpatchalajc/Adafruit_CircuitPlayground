import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, defineComponent, h, markRaw, ref } from 'vue';
import {
  AppNavigation,
  CheckboxWithLabel,
  CollapsiblePanel,
  DataTable,
  DataTableCellLink,
  DataTableCellStatus,
  DataTableCellText,
  DataTableToolbar,
  FormField,
  PageHeader,
  Password,
  RadioButtonWithLabel,
} from '@jumpcloud/circuit/components';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import RadioButtonGroup from 'primevue/radiobuttongroup';
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import Menu from 'primevue/menu';
import Paginator from 'primevue/paginator';
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import Tabs from 'primevue/tabs';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Divider from 'primevue/divider';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import {
  RocketLaunchIcon,
  HomeIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  ClockIcon,
  BellIcon,
  UserIcon,
  UsersIcon,
  CommandLineIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  CreditCardIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowUpIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CircleStackIcon,
  ChevronRightIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  EllipsisHorizontalIcon,
  FingerPrintIcon,
  FolderIcon,
  FunnelIcon,
  GlobeAltIcon,
  KeyIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  NoSymbolIcon,
  PlusIcon,
  PencilSquareIcon,
  PowerIcon,
  PlayCircleIcon,
  QuestionMarkCircleIcon,
  ServerIcon,
  Square2StackIcon,
  ServerStackIcon,
  TrashIcon,
  VideoCameraIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import {
  DeviceManagementIcon,
  AccessIcon,
  DeviceListsIcon,
  DeviceGroupsIcon,
  SsoIcon,
  SaasManagementIcon,
  PasswordManagerIcon,
  WorkflowIcon,
} from '@jumpcloud/icons';
import TopBar from '@/components/TopBar.vue';
import DashboardPageLayout from '@/components/layout/page-layouts/DashboardPageLayout.vue';
import ListPageLayout from '@/components/layout/page-layouts/ListPageLayout.vue';
import DashboardRecentActivity from '@/stories/projects/burak-agent0/features/agent0/dashboard/DashboardRecentActivity.vue';
import DashboardStatCard from '@/stories/projects/burak-agent0/features/agent0/dashboard/DashboardStatCard.vue';
import DashboardTopList from '@/stories/projects/burak-agent0/features/agent0/dashboard/DashboardTopList.vue';

const menuItems = [
  {
    label: 'Get Started',
    leftIcon: markRaw(RocketLaunchIcon),
  },
  {
    label: 'Home',
    leftIcon: markRaw(HomeIcon),
  },
  {
    label: 'Alerts',
    leftIcon: markRaw(BellIcon),
    count: 25,
  },
  {
    label: 'User Management',
    leftIcon: markRaw(UserGroupIcon),
    items: [
      { label: 'Users', leftIcon: markRaw(UserIcon) },
      { label: 'User Groups', leftIcon: markRaw(UsersIcon) },
      { separator: true },
      { label: 'Active Directories' },
      { label: 'Cloud Directories' },
      { label: 'HR Directories' },
      { label: 'Identity Providers' },
    ],
  },
  {
    label: 'Device Management',
    leftIcon: markRaw(DeviceManagementIcon),
    items: [
      { label: 'Devices', leftIcon: markRaw(DeviceListsIcon) },
      { label: 'Device Groups', leftIcon: markRaw(DeviceGroupsIcon) },
      { label: 'Commands', leftIcon: markRaw(CommandLineIcon) },
      { label: 'Asset Management', leftIcon: markRaw(ClipboardDocumentListIcon), isNew: true },
      { separator: true },
      { label: 'Policy Management' },
      { label: 'Patch Management' },
      { label: 'Policy Groups' },
      { label: 'Software Management' },
      { label: 'MDM' },
    ],
  },
  {
    label: 'Access',
    leftIcon: markRaw(AccessIcon),
    items: [
      { label: 'SSO Applications', leftIcon: markRaw(SsoIcon) },
      { label: 'Access Requests', leftIcon: markRaw(ClipboardDocumentCheckIcon) },
      { label: 'AI & SaaS Management', leftIcon: markRaw(SaasManagementIcon) },
      { label: 'Password Vault', leftIcon: markRaw(PasswordManagerIcon), isNew: true },
      { label: 'PAM', leftIcon: markRaw(ServerStackIcon), isNew: true },
      { separator: true },
      { label: 'LDAP' },
      { label: 'RADIUS' },
    ],
  },
  {
    label: 'Workflows',
    leftIcon: markRaw(WorkflowIcon),
  },
  {
    label: 'Security',
    leftIcon: markRaw(ShieldCheckIcon),
    items: [
      { label: 'Conditional Access Policies' },
      { label: 'Conditional Lists' },
      { label: 'Certificate Authority', isNew: true },
      { label: 'MFA Configurations' },
      { label: 'Device Trust' },
      { label: 'Password Policies' },
    ],
  },
  {
    label: 'Insights',
    leftIcon: markRaw(ChartBarSquareIcon),
    items: [
      { label: 'Reports' },
      { label: 'Directory Insights' },
    ],
  },
  {
    label: 'Settings',
    leftIcon: markRaw(Cog6ToothIcon),
  },
];

const profileMenuItems = [
  {
    label: 'Gabriel Ramos',
    itemType: 'profile_compact',
    initials: 'GR',
    name: 'Gabriel Ramos',
    items: [
      {
        label: 'Gabriel Ramos',
        itemType: 'profile_large',
        name: 'Gabriel Ramos',
        email: 'gabriel.ramos@jumpcloud.com',
        initials: 'GR',
      },
      { separator: true },
      {
        label: 'Logout',
        rightIcon: markRaw(ArrowRightStartOnRectangleIcon),
      },
      { separator: true },
      { label: 'Change Password' },
      {
        label: 'Launch User Portal',
        rightIcon: markRaw(ArrowTopRightOnSquareIcon),
      },
      { separator: true },
      { label: 'Billing' },
      { label: 'My API Key' },
      { separator: true },
      {
        label: 'Use Old Navigation',
        itemType: 'button',
      },
    ],
  },
];

const AdminPortalWithPasswordManagerStory = defineComponent({
  name: 'AdminPortalWithPasswordManagerStory',
  components: {
    AppNavigation,
    PageHeader,
    TopBar,
    ListPageLayout,
    DashboardPageLayout,
    CollapsiblePanel,
    DashboardStatCard,
    DashboardTopList,
    DashboardRecentActivity,
    CircuitDataTable: DataTable,
    DataTableToolbar,
    CheckboxWithLabel,
    RadioButtonWithLabel,
    FormField,
    Password,
    PvButton: Button,
    PvCheckbox: Checkbox,
    PvDialog: Dialog,
    PvDivider: Divider,
    PvIconField: IconField,
    PvInputIcon: InputIcon,
    PvInputText: InputText,
    PvTextarea: Textarea,
    PvSelect: Select,
    PvMultiSelect: MultiSelect,
    PvPaginator: Paginator,
    PvTabs: Tabs,
    PvTabList: TabList,
    PvTab: Tab,
    PvTabPanels: TabPanels,
    PvTabPanel: TabPanel,
    SelectButton,
    PvSelectButton: SelectButton,
    PvRadioButtonGroup: RadioButtonGroup,
    PvTag: Tag,
    ChartBarSquareIcon,
    ClipboardDocumentListIcon,
    CircleStackIcon,
    ArrowTopRightOnSquareIcon,
    ArrowUpIcon,
    ChevronRightIcon,
    Cog6ToothIcon,
    EllipsisHorizontalIcon,
    FunnelIcon,
    GlobeAltIcon,
    KeyIcon,
    MagnifyingGlassIcon,
    NoSymbolIcon,
    PlusIcon,
    PowerIcon,
    QuestionMarkCircleIcon,
    ServerIcon,
    ServerStackIcon,
    UserGroupIcon,
    VideoCameraIcon,
    XMarkIcon,
  },
  setup() {
    const pamEnabled = ref(false);
    const passwordVaultEnabled = ref(false);
    const pendingPage = ref({ key: 'pam', label: 'PAM' });
    const currentPage = ref('home');
    const activeItem = ref('home');
    const passwordVaultTab = ref<'overview' | 'user-groups' | 'websites' | 'credentials' | 'folders' | 'users'>('overview');
    const passwordVaultTabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'Websites', value: 'websites' },
      { label: 'Credentials', value: 'credentials' },
      { label: 'Folders', value: 'folders' },
      { label: 'Users', value: 'users' },
    ];
    const passwordVaultIcon = markRaw(
      defineComponent({
        name: 'PasswordVaultHeaderIcon',
        inheritAttrs: false,
        setup(_, { attrs }) {
          return () =>
            h(PasswordManagerIcon, {
              class: ['size-8', 'mr-0', '-mt-1.5', attrs.class],
            });
        },
      }),
    );
    const privilegedResourcesTab = ref('web-shield');
    const privilegedResourcesTabs = [
      { label: 'Web Shield', value: 'web-shield' },
      { label: 'Servers', value: 'servers' },
      { label: 'Databases', value: 'databases' },
      { label: 'Privileged Credentials', value: 'privileged-credentials' },
    ];
    const privilegedManagementTab = ref('overview');
    const privilegedManagementTabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'User Groups', value: 'user-groups' },
    ];
    const pamTab = ref('overview');
    const pamTabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'Privileged Resources', value: 'privileged-resources' },
      { label: 'Blocking Rules', value: 'blocking-rules' },
      { label: 'Jump Servers', value: 'jump-servers' },
      { label: 'Session History', value: 'session-history' },
      { label: 'User Groups', value: 'user-groups' },
    ];

    const pageKeyByLabel: Record<string, string> = {
      Home: 'home',
      'Password Vault': 'password-vault',
      PAM: 'pam',
    };

    const pageTitleByKey: Record<string, string> = {
      home: 'Home',
      'password-vault': 'Password Vault',
      pam: 'Privileged Access Management',
    };

    const subItemToParent = new Map<string, string>();
    menuItems.forEach(item => {
      if (!item.items) return;
      item.items.forEach(subItem => {
        if (subItem?.label) {
          subItemToParent.set(subItem.label, item.label);
        }
      });
    });

    function toKebabCase(label: string): string {
      return label
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    function pageKeyFromLabel(label: string): string {
      return pageKeyByLabel[label] ?? toKebabCase(label);
    }

    function pageTitleFromKey(key: string): string {
      if (pageTitleByKey[key]) return pageTitleByKey[key];
      return key
        .split('-')
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    function setActiveItemFromLabel(label: string) {
      const parent = subItemToParent.get(label) ?? label;
      activeItem.value = parent.trim().toLowerCase();
    }

    function goToPage(pageKey: string, activeLabel: string) {
      if (pageKey.startsWith('pam-')) {
        currentPage.value = 'pam';
        if (pageKey === 'pam-privileged-resources') {
          pamTab.value = 'privileged-resources';
          privilegedResourcesTab.value = 'web-shield';
        } else if (pageKey === 'pam-privileged-management') {
          pamTab.value = 'overview';
          privilegedManagementTab.value = 'overview';
        } else if (pageKey === 'pam-blocking-rules') {
          pamTab.value = 'blocking-rules';
        } else if (pageKey === 'pam-session-history') {
          pamTab.value = 'session-history';
        } else if (pageKey === 'pam-jump-servers') {
          pamTab.value = 'jump-servers';
        }
      } else {
        currentPage.value = pageKey;
      }
      if (pageKey === 'password-vault') {
        passwordVaultTab.value = 'overview';
      }
      if (pageKey === 'pam') {
        pamTab.value = 'overview';
      }
      setActiveItemFromLabel(activeLabel);
    }

    function goToPamTab(tabValue: string) {
      currentPage.value = 'pam';
      pamTab.value = tabValue;
      if (tabValue === 'privileged-resources') {
        privilegedResourcesTab.value = 'web-shield';
      }
      setActiveItemFromLabel('PAM');
    }

    function goToSessionHistory() {
      goToPamTab('session-history');
    }

    function onNavClick(processedItem: { item?: { label?: string } }) {
      const label = processedItem.item?.label?.trim() ?? '';
      if (!label) return;
      const pageKey = pageKeyFromLabel(label);
      if (pageKey === 'pam' && !pamEnabled.value) {
        pendingPage.value = { key: pageKey, label };
        currentPage.value = pageKey;
        setActiveItemFromLabel(label);
        return;
      }
      goToPage(pageKey, label);
    }

    const pageTitle = computed(() => pageTitleFromKey(currentPage.value));

    const isPamPage = computed(() => currentPage.value === 'pam');
    const showPasswordVaultOverlay = computed(
      () => currentPage.value === 'password-vault' && !passwordVaultEnabled.value,
    );
    const showPamOverlay = computed(() => isPamPage.value && !pamEnabled.value);
    const overlayActive = computed(
      () => showPasswordVaultOverlay.value || showPamOverlay.value,
    );

    function enablePasswordVault() {
      passwordVaultEnabled.value = true;
      goToPage('password-vault', 'Password Vault');
    }

    function enablePam() {
      pamEnabled.value = true;
      goToPage(pendingPage.value.key, pendingPage.value.label);
    }

    const overlayConfig = computed(() => {
      if (showPasswordVaultOverlay.value) {
        return {
          title: 'Password Vault: Secure Credential Management',
          description:
            'An all-in-one solution for password management. Secure user credentials, enforce policies, and control access to high-risk resources.',
          ctaLabel: 'Enable Password Vault',
          onCta: enablePasswordVault,
        };
      }
      if (showPamOverlay.value) {
        return {
          title: 'Privileged Access Management',
          description:
            'Control, monitor, and audit privileged access to critical resources with session recording and granular access controls.',
          ctaLabel: 'Enable PAM',
          onCta: enablePam,
        };
      }
      return null;
    });

    const ActionMenuCell = defineComponent({
      name: 'ActionMenuCell',
      components: { PvMenu: Menu, PvButton: Button },
      props: {
        iconButtons: { type: Array, default: () => [] },
        menuItems: { type: Array, default: () => [] },
      },
      setup() {
        const menu = ref<InstanceType<typeof Menu> | null>(null);
        function toggleMenu(event: Event) {
          menu.value?.toggle(event);
        }
        const menuPt = {
          root: { class: 'bg-neutral-surface rounded-lg shadow-lg border border-neutral-default_solid' },
          list: { class: 'flex flex-col w-full py-1' },
          item: { class: 'w-full' },
          itemLink: { class: 'px-3 py-2 text-body-md text-neutral-base hover:bg-neutral-hover cursor-pointer flex items-center w-full' },
          itemLabel: { class: 'text-body-md text-neutral-base' },
        };
        return { menu, toggleMenu, EllipsisHorizontalIcon, menuPt };
      },
      template: `
        <div class="flex items-center gap-xs">
          <PvButton
            v-for="(btn, idx) in iconButtons"
            :key="idx"
            severity="secondary"
            variant="text"
            size="small"
            :aria-label="btn.ariaLabel"
          >
            <template #icon="iconProps">
              <component :is="btn.icon" :class="iconProps.class" />
            </template>
          </PvButton>
          <PvButton
            v-if="menuItems.length"
            severity="secondary"
            variant="text"
            size="small"
            aria-label="More actions"
            @click="toggleMenu"
          >
            <template #icon="iconProps">
              <component :is="EllipsisHorizontalIcon" :class="iconProps.class" />
            </template>
          </PvButton>
          <PvMenu
            v-if="menuItems.length"
            ref="menu"
            :model="menuItems"
            popup
            :pt="menuPt"
            style="z-index: 9999;"
          />
        </div>
      `,
    });

    const resourceActionMenuItems = [
      { id: 'sessions', label: 'Sessions' },
      { id: 'details', label: 'Details' },
      { id: 'activity', label: 'Activity' },
      { id: 'approval-requests', label: 'Approval Requests' },
      { id: 'duplicates', label: 'Duplicates' },
      { id: 'archive', label: 'Archive' },
    ];

    const resourceActionButtons = [
      { icon: markRaw(PencilSquareIcon), ariaLabel: 'Edit' },
      { icon: markRaw(Square2StackIcon), ariaLabel: 'Copy' },
      { icon: markRaw(TrashIcon), ariaLabel: 'Delete' },
    ];

    const jumpServerActionButtons = [
      { icon: markRaw(PencilSquareIcon), ariaLabel: 'Edit' },
      { icon: markRaw(Square2StackIcon), ariaLabel: 'Copy' },
      { icon: markRaw(TrashIcon), ariaLabel: 'Delete' },
    ];

    const blockingRuleActionButtons = [
      { icon: markRaw(TrashIcon), ariaLabel: 'Delete' },
    ];

    const sessionHistoryActionButtons = [
      { icon: markRaw(PlayCircleIcon), ariaLabel: 'View recording' },
      { icon: markRaw(DocumentTextIcon), ariaLabel: 'View keystroke audit' },
    ];

    const credentialActionButtons = [
      { icon: markRaw(PencilSquareIcon), ariaLabel: 'Edit' },
      { icon: markRaw(TrashIcon), ariaLabel: 'Delete' },
    ];

    const credentialActionMenuItems = [
      { id: 'view', label: 'View Details' },
      { id: 'rotate', label: 'Rotate Secret' },
      { id: 'audit', label: 'Audit Activity' },
    ];

    const privilegedAvailabilityTokenMapping: Record<string, { label: string; severity: string }> = {
      'In Use': { label: 'In Use', severity: 'danger' },
      Available: { label: 'Available', severity: 'success' },
    };

    const jumpServerAvailabilityTokenMapping: Record<string, { label: string; severity: string }> = {
      Offline: { label: 'Offline', severity: 'danger' },
      Online: { label: 'Online', severity: 'success' },
    };

    const blockingSeverityTokenMapping = {
      Alert: { label: 'Alert', severity: 'warn' },
      Warning: { label: 'Warning', severity: 'warn' },
      Critical: { label: 'Critical', severity: 'danger' },
      Emergency: { label: 'Emergency', severity: 'danger' },
    };

    const sessionStatusTokenMapping = {
      Available: { label: 'Available', severity: 'success' },
      Pending: { label: 'Pending', severity: 'warning' },
    };

    const pamStatCards = [
      { header: 'Web Shield', value: '201', icon: markRaw(GlobeAltIcon) },
      { header: 'Servers', value: '158', icon: markRaw(ServerIcon) },
      { header: 'Databases', value: '298', icon: markRaw(CircleStackIcon) },
      { header: 'Active Sessions', value: '91', icon: markRaw(PowerIcon) },
      { header: 'Blocking Rules', value: '11', icon: markRaw(NoSymbolIcon) },
      { header: 'Jump Servers', value: '5', icon: markRaw(ArrowsRightLeftIcon) },
    ];

    const passwordVaultStatCards = [
      {
        header: 'Websites',
        value: '386',
        changeValue: '23%',
        changeLabel: 'vs last month',
        showArrow: true,
      },
      {
        header: 'Credentials',
        value: '1,332',
        changeValue: '23%',
        changeLabel: 'vs last month',
        showArrow: true,
      },
      {
        header: 'Shared Folders',
        value: '134',
        changeValue: '8%',
        changeLabel: 'vs last month',
        showArrow: true,
      },
      {
        header: 'User Groups',
        value: '134',
        changeValue: '8%',
        changeLabel: 'vs last month',
        showArrow: true,
      },
    ];

    const passwordVaultMostConnectedResources = [
      { name: 'Finance Admin Console', type: 'Website', action: 'View' },
      { name: 'AWS Root Key', type: 'Credential', action: 'View' },
      { name: 'HR Shared Vault', type: 'Shared Folder', action: 'View' },
      { name: 'Okta Admin', type: 'Website', action: 'View' },
    ];

    const passwordVaultMostConnectedColumns = [
      { field: 'name', header: 'Name', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.name }) },
      { field: 'type', header: 'Type', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.type }) },
      { field: 'actions', header: 'Actions', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.action }) },
    ];

    const credentialExpirationsSummary = { count: 7, label: 'Expiring Soon', range: 'Next 7 days' };
    const credentialExpirations = [
      { name: 'Sarah Chen', email: 'sarah@company.com', metaLabel: 'Key: Expires', metaValue: '1 day', metaClass: 'text-error-base' },
      { name: 'Marcus Rodriguez', email: 'marcus@company.com', metaLabel: 'Password: Expires', metaValue: '2 days', metaClass: 'text-error-base' },
      { name: 'Emily Johnson', email: 'emily@company.com', metaLabel: 'Password: Expires', metaValue: '3 days', metaClass: 'text-warning-base' },
      { name: 'Michael Smith', email: 'michael@company.com', metaLabel: 'Key: Expires', metaValue: '6 days', metaClass: 'text-info-base' },
    ];

    const credentialExpiredSummary = { count: 7, label: 'Expired', range: 'Last 7 days' };
    const credentialExpired = [
      { name: 'Sarah Chen', email: 'sarah@company.com', metaLabel: 'Key: Expires', metaValue: '1 day', metaClass: 'text-error-base' },
      { name: 'Marcus Rodriguez', email: 'marcus@company.com', metaLabel: 'Password: Expires', metaValue: '2 days', metaClass: 'text-error-base' },
      { name: 'Emily Johnson', email: 'emily@company.com', metaLabel: 'Password: Expires', metaValue: '3 days', metaClass: 'text-warning-base' },
      { name: 'Michael Smith', email: 'michael@company.com', metaLabel: 'Key: Expires', metaValue: '6 days', metaClass: 'text-info-base' },
    ];

    const weakCredentialsSummary = { count: 11, label: 'Credentials' };
    const weakCredentials = [
      { name: 'AWS Gabriel', metaValue: 'Key Credential', metaClass: 'text-error-base' },
      { name: 'Test 10', metaValue: 'Password Credential', metaClass: 'text-error-base' },
      { name: 'AWS Gabriel', metaValue: 'Password Credential', metaClass: 'text-error-base' },
      { name: 'MySQL Admin', metaValue: 'Key Credential', metaClass: 'text-error-base' },
    ];

    const unusedCredentialsSummary = { count: 14, label: 'Unused' };
    const unusedCredentials = [
      { name: 'AWS Gabriel', metaLabel: 'Key: Last Used', metaValue: '46 days ago', metaClass: 'text-error-base' },
      { name: 'Test 10', metaLabel: 'Password: Last Used', metaValue: '123 days ago', metaClass: 'text-error-base' },
      { name: 'AWS Gabriel', metaLabel: 'Password: Last Used', metaValue: '53 days ago', metaClass: 'text-error-base' },
      { name: 'MySQL Admin', metaLabel: 'Key: Last Used', metaValue: '66 days ago', metaClass: 'text-error-base' },
    ];

    const credentialTypeOptions = [
      { label: 'Password', value: 'Password' },
      { label: 'Key', value: 'Key' },
      { label: 'MFA', value: 'MFA' },
    ];

    const credentialTagOptions = ['cloud', 'linux', 'windows', 'prod', 'infra'];

    const credentialsData = [
      { name: 'AWS Root Key', type: 'Key', expirationDate: 'May 12, 2026', tags: 'cloud, prod', lastUsed: 'Apr 6, 2026', favorite: true },
      { name: 'GitHub Deploy Key', type: 'Key', expirationDate: '--', tags: 'infra', lastUsed: 'Apr 4, 2026', favorite: false },
      { name: 'Ubuntu MFA', type: 'MFA', expirationDate: '--', tags: 'linux', lastUsed: 'Apr 1, 2026', favorite: false },
      { name: 'Windows Admin', type: 'Password', expirationDate: 'Jun 2, 2026', tags: 'windows, prod', lastUsed: 'Apr 5, 2026', favorite: true },
      { name: 'MySQL Root', type: 'Password', expirationDate: '--', tags: 'prod', lastUsed: '--', favorite: false },
      { name: 'Okta Admin', type: 'Password', expirationDate: 'May 30, 2026', tags: 'cloud', lastUsed: 'Apr 6, 2026', favorite: true },
      { name: 'Prod SSH Key', type: 'Key', expirationDate: '--', tags: 'infra, prod', lastUsed: 'Mar 28, 2026', favorite: false },
      { name: 'Azure Service Principal', type: 'Key', expirationDate: 'Jul 9, 2026', tags: 'cloud', lastUsed: 'Apr 2, 2026', favorite: false },
      { name: 'Datadog API Key', type: 'Key', expirationDate: '--', tags: 'infra', lastUsed: 'Mar 22, 2026', favorite: false },
      { name: 'Linux Root', type: 'Password', expirationDate: '--', tags: 'linux', lastUsed: '--', favorite: false },
      { name: 'Billing Portal', type: 'Password', expirationDate: 'May 18, 2026', tags: '--', lastUsed: 'Apr 6, 2026', favorite: false },
      { name: 'GCP Admin', type: 'Password', expirationDate: '--', tags: 'cloud', lastUsed: 'Apr 3, 2026', favorite: true },
      { name: 'Jira Admin', type: 'Password', expirationDate: '--', tags: '--', lastUsed: 'Mar 30, 2026', favorite: false },
      { name: 'Snowflake Admin', type: 'Password', expirationDate: 'Jun 15, 2026', tags: 'cloud, prod', lastUsed: '--', favorite: false },
      { name: 'VPN Credentials', type: 'Password', expirationDate: '--', tags: 'prod', lastUsed: 'Apr 1, 2026', favorite: false },
      { name: 'Backup Agent Key', type: 'Key', expirationDate: 'Aug 1, 2026', tags: 'infra', lastUsed: 'Mar 18, 2026', favorite: false },
      { name: 'Finance Portal', type: 'MFA', expirationDate: '--', tags: 'prod', lastUsed: 'Apr 4, 2026', favorite: false },
      { name: 'CI Runner Key', type: 'Key', expirationDate: '--', tags: 'infra', lastUsed: 'Apr 5, 2026', favorite: false },
      { name: 'Staging SSH Key', type: 'Key', expirationDate: '--', tags: 'infra', lastUsed: '--', favorite: false },
      { name: 'Docker Hub', type: 'Password', expirationDate: '--', tags: '--', lastUsed: 'Mar 27, 2026', favorite: false },
    ];

    const credentialColumns = [
      {
        field: 'name',
        header: 'Name',
        sortable: true,
        component: markRaw(DataTableCellLink),
        componentProps: (sp: { data: Record<string, unknown> }) => ({
          label: sp.data.name,
          href: '#',
        }),
      },
      { field: 'type', header: 'Type', sortable: true, component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.type }) },
      { field: 'expirationDate', header: 'Expiration Date', sortable: true, component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.expirationDate }) },
      { field: 'tags', header: 'Tags', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.tags }) },
      { field: 'lastUsed', header: 'Last Time Used', sortable: true, component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.lastUsed }) },
      {
        field: 'actions',
        header: 'Actions',
        component: markRaw(ActionMenuCell),
        componentProps: () => ({ iconButtons: credentialActionButtons, menuItems: credentialActionMenuItems }),
      },
    ];

    const mostAccessedResources = [
      { name: 'Finance Admin Console', value: 182, valueSuffix: 'connections' },
      { name: 'HR Jump Server', value: 144, valueSuffix: 'connections' },
      { name: 'Prod PostgreSQL', value: 121, valueSuffix: 'connections' },
      { name: 'Okta Admin', value: 97, valueSuffix: 'connections' },
      { name: 'JS-AWS-E1', value: 86, valueSuffix: 'connections' },
    ];

    const recentConnections = [
      { user: 'Gabriel Ramos', server: 'JS-PROD-01', time: '2m ago', event: 'Connected to Prod PostgreSQL' },
      { user: 'Albert Weihermann', server: 'JS-AWS-E1', time: '18m ago', event: 'Connected to AWS Admin Console' },
      { user: 'Ruth Cole', server: 'JS-EU-DC', time: '1h ago', event: 'Connected to EU MSSQL' },
      { user: 'Elena Park', server: 'JS-PROD-01', time: '2h ago', event: 'Connected to Payroll Admin Console' },
      { user: 'Gabriel Ramos', server: 'JS-AWS-E1', time: '3h ago', event: 'Connected to Finance Admin Console' },
    ];

    const sessionActivityBars = [
      { date: 'Mar 9', value: 12 },
      { date: 'Mar 14', value: 18 },
      { date: 'Mar 19', value: 24 },
      { date: 'Mar 24', value: 20 },
      { date: 'Mar 29', value: 28 },
      { date: 'Apr 3', value: 22 },
      { date: 'Apr 7', value: 16 },
    ];
    const maxSessionValue = computed(() =>
      Math.max(...sessionActivityBars.map(item => item.value)),
    );

    const lastRecordingData = [
      { resourceName: 'Prod PostgreSQL', type: 'Database', credential: 'svc-pam', user: 'gabriel.ramos', jumpServer: 'JS-PROD-01', sessionDuration: '00:26:12' },
      { resourceName: 'AWS Admin Console', type: 'Admin Console', credential: 'aws-root', user: 'albert.weihermann', jumpServer: 'JS-AWS-E1', sessionDuration: '00:18:44' },
      { resourceName: 'EU MSSQL', type: 'Database', credential: 'db-admin', user: 'ruth.cole', jumpServer: 'JS-EU-DC', sessionDuration: '00:33:09' },
      { resourceName: 'Payroll Admin Console', type: 'Admin Console', credential: 'payroll-admin', user: 'elena.park', jumpServer: 'JS-PROD-01', sessionDuration: '00:12:58' },
    ];

    const lastRecordingColumns = [
      { field: 'resourceName', header: 'Resource Name', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.resourceName }) },
      { field: 'type', header: 'Type', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.type }) },
      { field: 'credential', header: 'Credential', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.credential }) },
      { field: 'user', header: 'User', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.user }) },
      { field: 'jumpServer', header: 'Jump Server', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.jumpServer }) },
      { field: 'sessionDuration', header: 'Session Duration', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.sessionDuration }) },
    ];

    const webShieldData = [
      { name: 'Finance Admin Console', address: 'https://admin.finance.internal', jumpServer: 'JS-AWS-E1', status: 'In Use', lastConnection: 'Today 10:21 AM' },
      { name: 'HR Admin Console', address: 'https://hr-console.internal', jumpServer: 'JS-EU-DC', status: 'Available', lastConnection: 'Yesterday 4:18 PM' },
      { name: 'Okta Admin', address: 'https://jumpcloud-admin.okta.com', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 9:07 AM' },
      { name: 'Salesforce Admin', address: 'https://company-admin.salesforce.com', jumpServer: 'JS-PROD-01', status: 'Available', lastConnection: 'Mar 22, 2026' },
      { name: 'AWS Console', address: 'https://console.aws.amazon.com', jumpServer: 'JS-AWS-E1', status: 'Available', lastConnection: 'Today 7:30 AM' },
      { name: 'GitHub Enterprise', address: 'https://github.acme-corp.com', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 8:15 AM' },
      { name: 'Jira Admin', address: 'https://acme.atlassian.net/admin', jumpServer: 'JS-EU-DC', status: 'Available', lastConnection: 'Mar 31, 2026' },
      { name: 'Datadog Admin', address: 'https://app.datadoghq.com', jumpServer: 'JS-AWS-E1', status: 'In Use', lastConnection: 'Today 9:44 AM' },
      { name: 'Confluence Admin', address: 'https://acme.atlassian.net/wiki/admin', jumpServer: 'JS-EU-DC', status: 'Available', lastConnection: 'Apr 2, 2026' },
      { name: 'PagerDuty Admin', address: 'https://acme.pagerduty.com', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 6:50 AM' },
      { name: 'Zoom Admin Console', address: 'https://admin.zoom.us', jumpServer: 'JS-AWS-E1', status: 'Available', lastConnection: 'Apr 1, 2026' },
      { name: 'Workday Admin', address: 'https://impl.workday.com/acme/login', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 10:02 AM' },
      { name: 'ServiceNow Admin', address: 'https://acme.service-now.com/admin', jumpServer: 'JS-EU-DC', status: 'Available', lastConnection: 'Mar 29, 2026' },
      { name: 'Zendesk Admin', address: 'https://acme.zendesk.com/admin', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 11:18 AM' },
      { name: 'Snowflake Console', address: 'https://app.snowflake.com/acme', jumpServer: 'JS-AWS-E1', status: 'Available', lastConnection: 'Mar 27, 2026' },
      { name: 'Splunk Admin', address: 'https://splunk.acme-internal.com', jumpServer: 'JS-AWS-E1', status: 'In Use', lastConnection: 'Today 7:05 AM' },
      { name: 'GCP Console', address: 'https://console.cloud.google.com', jumpServer: 'JS-AWS-E1', status: 'Available', lastConnection: 'Apr 3, 2026' },
      { name: 'Azure Portal', address: 'https://portal.azure.com', jumpServer: 'JS-EU-DC', status: 'In Use', lastConnection: 'Today 9:30 AM' },
      { name: 'Terraform Cloud', address: 'https://app.terraform.io/acme', jumpServer: 'JS-PROD-01', status: 'Available', lastConnection: 'Mar 26, 2026' },
      { name: 'Grafana Admin', address: 'https://grafana.acme-internal.com', jumpServer: 'JS-AWS-E1', status: 'In Use', lastConnection: 'Today 8:40 AM' },
      { name: 'Vault Admin UI', address: 'https://vault.acme-internal.com/ui', jumpServer: 'JS-PROD-01', status: 'Available', lastConnection: 'Apr 4, 2026' },
      { name: 'Kibana Admin', address: 'https://kibana.acme-internal.com', jumpServer: 'JS-EU-DC', status: 'In Use', lastConnection: 'Today 10:55 AM' },
      { name: 'MS Teams Admin', address: 'https://admin.teams.microsoft.com', jumpServer: 'JS-EU-DC', status: 'Available', lastConnection: 'Mar 28, 2026' },
      { name: 'Hubspot Admin', address: 'https://app.hubspot.com/settings', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 11:47 AM' },
    ];

    const serversData = [
      { name: 'JumpCloud-Sec-01', address: '10.14.22.11', jumpServer: 'JS-AWS-E1', status: 'In Use', lastConnection: 'Today 8:42 AM' },
      { name: 'Auth-North-02', address: '10.14.22.19', jumpServer: 'JS-PROD-01', status: 'Available', lastConnection: 'Mar 21, 2026' },
      { name: 'EU-Apps-01', address: '10.22.31.55', jumpServer: 'JS-EU-DC', status: 'Available', lastConnection: 'Mar 19, 2026' },
      { name: 'PCI-DB-Proxy', address: '10.44.9.12', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 11:05 AM' },
      { name: 'Prod-API-01', address: '10.10.1.22', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 7:58 AM' },
      { name: 'EU-Auth-03', address: '10.22.14.8', jumpServer: 'JS-EU-DC', status: 'Available', lastConnection: 'Apr 1, 2026' },
      { name: 'Bastion-AWS-01', address: '10.14.30.5', jumpServer: 'JS-AWS-E1', status: 'Available', lastConnection: 'Mar 28, 2026' },
      { name: 'CI-Runner-04', address: '10.44.2.17', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 10:33 AM' },
      { name: 'Prod-Worker-02', address: '10.10.5.31', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 9:12 AM' },
      { name: 'EU-Cache-01', address: '10.22.8.19', jumpServer: 'JS-EU-DC', status: 'Available', lastConnection: 'Apr 2, 2026' },
      { name: 'AWS-NAT-Gateway', address: '10.14.0.1', jumpServer: 'JS-AWS-E1', status: 'Available', lastConnection: 'Mar 30, 2026' },
      { name: 'Monitoring-01', address: '10.10.9.44', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 6:30 AM' },
      { name: 'EU-Worker-03', address: '10.22.20.7', jumpServer: 'JS-EU-DC', status: 'In Use', lastConnection: 'Today 8:05 AM' },
      { name: 'Staging-App-01', address: '10.50.1.10', jumpServer: 'JS-PROD-01', status: 'Available', lastConnection: 'Mar 25, 2026' },
      { name: 'Prod-LB-01', address: '10.10.2.5', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 11:00 AM' },
      { name: 'AWS-ECS-Host-02', address: '10.14.18.33', jumpServer: 'JS-AWS-E1', status: 'Available', lastConnection: 'Apr 3, 2026' },
      { name: 'Backup-Server-01', address: '10.44.11.6', jumpServer: 'JS-PROD-01', status: 'Available', lastConnection: 'Mar 22, 2026' },
      { name: 'EU-LB-02', address: '10.22.3.14', jumpServer: 'JS-EU-DC', status: 'In Use', lastConnection: 'Today 7:20 AM' },
      { name: 'Prod-Queue-01', address: '10.10.7.88', jumpServer: 'JS-PROD-01', status: 'Available', lastConnection: 'Apr 1, 2026' },
      { name: 'AWS-Lambda-Host', address: '10.14.22.50', jumpServer: 'JS-AWS-E1', status: 'In Use', lastConnection: 'Today 9:55 AM' },
      { name: 'Infra-Ansible-01', address: '10.44.5.3', jumpServer: 'JS-PROD-01', status: 'Available', lastConnection: 'Mar 24, 2026' },
      { name: 'EU-Monitoring-02', address: '10.22.30.11', jumpServer: 'JS-EU-DC', status: 'Available', lastConnection: 'Mar 31, 2026' },
      { name: 'Prod-Kafka-01', address: '10.10.12.9', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 10:10 AM' },
      { name: 'AWS-EKS-Node-01', address: '10.14.25.77', jumpServer: 'JS-AWS-E1', status: 'In Use', lastConnection: 'Today 8:22 AM' },
    ];

    const databasesData = [
      { name: 'Prod PostgreSQL', provider: 'PostgreSQL', address: '10.33.4.25', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 9:56 AM' },
      { name: 'EU MSSQL', provider: 'Microsoft SQL', address: '10.28.7.19', jumpServer: 'JS-EU-DC', status: 'Available', lastConnection: 'Mar 20, 2026' },
      { name: 'Analytics Warehouse', provider: 'Snowflake', address: 'analytics.snowflakecomputing.com', jumpServer: 'JS-AWS-E1', status: 'Available', lastConnection: 'Mar 18, 2026' },
      { name: 'Billing MySQL', provider: 'MySQL', address: '10.18.11.7', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 8:18 AM' },
      { name: 'Auth MongoDB', provider: 'MongoDB', address: '10.12.3.44', jumpServer: 'JS-PROD-01', status: 'Available', lastConnection: 'Mar 30, 2026' },
      { name: 'EU Reporting DB', provider: 'PostgreSQL', address: '10.28.9.3', jumpServer: 'JS-EU-DC', status: 'In Use', lastConnection: 'Today 8:50 AM' },
      { name: 'Logs Oracle DB', provider: 'Oracle', address: '10.33.18.2', jumpServer: 'JS-AWS-E1', status: 'Available', lastConnection: 'Mar 25, 2026' },
      { name: 'Dev MySQL', provider: 'MySQL', address: '10.18.22.9', jumpServer: 'JS-PROD-01', status: 'Available', lastConnection: 'Mar 27, 2026' },
      { name: 'Prod Redis Cache', provider: 'Redis', address: '10.10.4.8', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 9:05 AM' },
      { name: 'EU Mongo Cluster', provider: 'MongoDB', address: '10.28.15.6', jumpServer: 'JS-EU-DC', status: 'Available', lastConnection: 'Apr 2, 2026' },
      { name: 'Staging PostgreSQL', provider: 'PostgreSQL', address: '10.50.4.12', jumpServer: 'JS-PROD-01', status: 'Available', lastConnection: 'Mar 23, 2026' },
      { name: 'AWS RDS Primary', provider: 'MySQL', address: '10.14.6.20', jumpServer: 'JS-AWS-E1', status: 'In Use', lastConnection: 'Today 7:40 AM' },
      { name: 'Audit Log DB', provider: 'PostgreSQL', address: '10.33.22.1', jumpServer: 'JS-PROD-01', status: 'Available', lastConnection: 'Apr 1, 2026' },
      { name: 'EU Oracle Finance', provider: 'Oracle', address: '10.28.20.5', jumpServer: 'JS-EU-DC', status: 'In Use', lastConnection: 'Today 10:20 AM' },
      { name: 'Prod Snowflake DW', provider: 'Snowflake', address: 'acme.snowflakecomputing.com', jumpServer: 'JS-AWS-E1', status: 'Available', lastConnection: 'Mar 29, 2026' },
      { name: 'Session Store Redis', provider: 'Redis', address: '10.10.8.3', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 11:30 AM' },
      { name: 'EU MySQL Replica', provider: 'MySQL', address: '10.28.12.7', jumpServer: 'JS-EU-DC', status: 'Available', lastConnection: 'Mar 26, 2026' },
      { name: 'Data Lake DB', provider: 'Snowflake', address: 'acme-dl.snowflakecomputing.com', jumpServer: 'JS-AWS-E1', status: 'In Use', lastConnection: 'Today 8:35 AM' },
      { name: 'Compliance Oracle', provider: 'Oracle', address: '10.44.7.15', jumpServer: 'JS-PROD-01', status: 'Available', lastConnection: 'Mar 21, 2026' },
      { name: 'Prod MS SQL', provider: 'Microsoft SQL', address: '10.33.5.9', jumpServer: 'JS-PROD-01', status: 'In Use', lastConnection: 'Today 9:48 AM' },
      { name: 'EU Redis Cache', provider: 'Redis', address: '10.22.6.4', jumpServer: 'JS-EU-DC', status: 'Available', lastConnection: 'Apr 3, 2026' },
      { name: 'Backup MySQL', provider: 'MySQL', address: '10.44.14.2', jumpServer: 'JS-PROD-01', status: 'Available', lastConnection: 'Mar 20, 2026' },
      { name: 'Metrics MongoDB', provider: 'MongoDB', address: '10.14.9.31', jumpServer: 'JS-AWS-E1', status: 'In Use', lastConnection: 'Today 10:45 AM' },
      { name: 'EU MS SQL Replica', provider: 'Microsoft SQL', address: '10.28.18.4', jumpServer: 'JS-EU-DC', status: 'Available', lastConnection: 'Mar 28, 2026' },
    ];

    const resourceColumns = [
      { field: 'name', header: 'Name', sortable: true, component: markRaw(DataTableCellLink), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.name, href: '#' }) },
      { field: 'address', header: 'Address', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.address }) },
      { field: 'jumpServer', header: 'Jump Server', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.jumpServer }) },
      {
        field: 'status',
        header: 'Status',
        component: markRaw(DataTableCellStatus),
        componentProps: (sp: { data: Record<string, unknown> }) => {
          const status = String(sp.data.status ?? '');
          return privilegedAvailabilityTokenMapping[status] ?? { label: status, severity: 'info' };
        },
      },
      { field: 'lastConnection', header: 'Last Connection', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.lastConnection }) },
      {
        field: 'actions',
        header: 'Actions',
        component: markRaw(ActionMenuCell),
        componentProps: () => ({ iconButtons: resourceActionButtons, menuItems: resourceActionMenuItems }),
      },
    ];

    const databaseColumns = [
      { field: 'name', header: 'Name', sortable: true, component: markRaw(DataTableCellLink), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.name, href: '#' }) },
      { field: 'provider', header: 'Provider', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.provider }) },
      { field: 'address', header: 'Address', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.address }) },
      { field: 'jumpServer', header: 'Jump Server', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.jumpServer }) },
      {
        field: 'status',
        header: 'Status',
        component: markRaw(DataTableCellStatus),
        componentProps: (sp: { data: Record<string, unknown> }) => {
          const status = String(sp.data.status ?? '');
          return privilegedAvailabilityTokenMapping[status] ?? { label: status, severity: 'info' };
        },
      },
      { field: 'lastConnection', header: 'Last Connection', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.lastConnection }) },
      {
        field: 'actions',
        header: 'Actions',
        component: markRaw(ActionMenuCell),
        componentProps: () => ({ iconButtons: resourceActionButtons, menuItems: resourceActionMenuItems }),
      },
    ];

    const blockingRulesData = [
      { name: '123', type: 'Database', priority: '1', severity: 'Alert', tags: 'PCI' },
      { name: 'Actions', type: 'Database', priority: '1', severity: 'Critical', tags: 'Prod' },
      { name: 'Block Delete', type: 'Database', priority: '1', severity: 'Emergency', tags: 'Finance' },
      { name: 'Block Select', type: 'Database', priority: '1', severity: 'Warning', tags: 'Reporting' },
      { name: 'Delete Block', type: 'Database', priority: '1', severity: 'Critical', tags: 'Security' },
      { name: 'Select Block', type: 'Database', priority: '1', severity: 'Alert', tags: 'PCI' },
      { name: 'tes2', type: 'Database', priority: '2', severity: 'Warning', tags: 'Test' },
    ];

    const blockingRulesColumns = [
      { field: 'name', header: 'Name', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.name, description: sp.data.type }) },
      { field: 'priority', header: 'Priority', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.priority }) },
      {
        field: 'severity',
        header: 'Severity',
        component: markRaw(DataTableCellStatus),
        componentProps: (sp: { data: Record<string, unknown> }) => {
          const severity = String(sp.data.severity ?? '');
          return blockingSeverityTokenMapping[severity] ?? { label: severity, severity: 'info' };
        },
      },
      { field: 'tags', header: 'Tags', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.tags }) },
      {
        field: 'actions',
        header: 'Actions',
        component: markRaw(ActionMenuCell),
        componentProps: () => ({ iconButtons: blockingRuleActionButtons, menuItems: [] }),
      },
    ];

    const sessionHistoryData = [
      { name: 'Finance Admin Console', sessionId: 'S-10291', connector: 'Connector-01', credential: 'aws-root', category: 'Website', email: 'gabriel.ramos@jumpcloud.com', start: 'Apr 6, 2026 09:42', end: 'Apr 6, 2026 10:01', status: 'Available' },
      { name: 'Prod PostgreSQL', sessionId: 'S-10288', connector: 'Connector-02', credential: 'svc-pam', category: 'Computer', email: 'albert.weihermann@jumpcloud.com', start: 'Apr 6, 2026 08:12', end: 'Apr 6, 2026 08:54', status: 'Available' },
      { name: 'HR Admin Console', sessionId: 'S-10277', connector: 'Connector-03', credential: 'hr-admin', category: 'Website', email: 'gabriel.ramos@jumpcloud.com', start: 'Apr 5, 2026 17:20', end: 'Apr 5, 2026 17:43', status: 'Available' },
      { name: 'EU MSSQL', sessionId: 'S-10261', connector: 'Connector-04', credential: 'db-admin', category: 'Computer', email: 'albert.weihermann@jumpcloud.com', start: 'Apr 5, 2026 14:02', end: 'Apr 5, 2026 14:36', status: 'Available' },
      { name: 'Payroll Admin Console', sessionId: 'S-10244', connector: 'Connector-01', credential: 'payroll-admin', category: 'Website', email: 'gabriel.ramos@jumpcloud.com', start: 'Apr 4, 2026 12:18', end: 'Apr 4, 2026 12:49', status: 'Available' },
      { name: 'AWS Billing Console', sessionId: 'S-10238', connector: 'Connector-02', credential: 'billing-admin', category: 'Website', email: 'bruno.souza@jumpcloud.com', start: 'Apr 4, 2026 10:05', end: 'Apr 4, 2026 10:28', status: 'Available' },
      { name: 'EU Jump Server', sessionId: 'S-10222', connector: 'Connector-04', credential: 'js-admin', category: 'Computer', email: 'albert.weihermann@jumpcloud.com', start: 'Apr 3, 2026 15:14', end: 'Apr 3, 2026 15:49', status: 'Available' },
      { name: 'Okta Admin', sessionId: 'S-10215', connector: 'Connector-03', credential: 'okta-admin', category: 'Website', email: 'gabriel.ramos@jumpcloud.com', start: 'Apr 3, 2026 11:42', end: 'Apr 3, 2026 12:07', status: 'Available' },
      { name: 'EU Reporting DB', sessionId: 'S-10203', connector: 'Connector-04', credential: 'reporting-read', category: 'Computer', email: 'bruno.souza@jumpcloud.com', start: 'Apr 2, 2026 09:30', end: 'Apr 2, 2026 10:02', status: 'Available' },
      { name: 'PagerDuty Admin', sessionId: 'S-10196', connector: 'Connector-01', credential: 'pd-admin', category: 'Website', email: 'albert.weihermann@jumpcloud.com', start: 'Apr 1, 2026 16:20', end: 'Apr 1, 2026 16:44', status: 'Available' },
    ];

    const sessionHistoryColumns = [
      {
        field: 'name',
        header: 'Name',
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: Record<string, unknown> }) => ({
          label: sp.data.name,
          icon: sp.data.category === 'Website' ? markRaw(GlobeAltIcon) : markRaw(ComputerDesktopIcon),
        }),
      },
      { field: 'sessionId', header: 'Session ID', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.sessionId }) },
      { field: 'connector', header: 'Connector', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.connector }) },
      { field: 'credential', header: 'Credential', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.credential }) },
      { field: 'category', header: 'Category', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.category }) },
      { field: 'email', header: 'Email', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.email }) },
      { field: 'start', header: 'Start', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.start }) },
      { field: 'end', header: 'End', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.end }) },
      { field: 'status', header: 'Status', component: markRaw(DataTableCellStatus), tokenMapping: sessionStatusTokenMapping },
      {
        field: 'actions',
        header: 'Actions',
        component: markRaw(ActionMenuCell),
        componentProps: () => ({ iconButtons: sessionHistoryActionButtons, menuItems: [] }),
      },
    ];

    const jumpServersData = [
      { name: 'JS-AWS-E1', address: '10.14.8.10', connector: 'Connector-01', tags: 'AWS, Prod', lastConnection: 'Today 9:31 AM', status: 'Offline' },
      { name: 'JS-EU-DC', address: '10.22.17.40', connector: 'Connector-04', tags: 'EU, DC', lastConnection: 'Mar 24, 2026', status: 'Online' },
      { name: 'JS-PROD-01', address: '10.33.2.18', connector: 'Connector-02', tags: 'Prod, PCI', lastConnection: 'Today 8:45 AM', status: 'Offline' },
      { name: 'JS-LEGACY-01', address: '10.40.11.7', connector: 'Connector-05', tags: 'Legacy', lastConnection: 'Mar 20, 2026', status: 'Online' },
    ];

    const jumpServersColumns = [
      { field: 'name', header: 'Name', component: markRaw(DataTableCellLink), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.name, href: '#' }) },
      { field: 'address', header: 'Address', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.address }) },
      { field: 'connector', header: 'Connector', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.connector }) },
      { field: 'tags', header: 'Tags', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.tags }) },
      { field: 'lastConnection', header: 'Last Connection', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.lastConnection }) },
      {
        field: 'status',
        header: 'Status',
        component: markRaw(DataTableCellStatus),
        componentProps: (sp: { data: Record<string, unknown> }) => {
          const status = String(sp.data.status ?? '');
          return jumpServerAvailabilityTokenMapping[status] ?? { label: status, severity: 'info' };
        },
      },
      {
        field: 'actions',
        header: 'Actions',
        component: markRaw(ActionMenuCell),
        componentProps: () => ({ iconButtons: jumpServerActionButtons, menuItems: resourceActionMenuItems }),
      },
    ];

    const sessionHistoryExportOptions = [
      { id: 'csv', label: 'Export as CSV' },
      { id: 'json', label: 'Export as JSON' },
    ];

    const resourceStatusOptions = [
      { label: 'All', value: 'All' },
      { label: 'Available', value: 'Available' },
      { label: 'In Use', value: 'In Use' },
    ];

    const connectorOptions = [
      { label: 'Connector-01', value: 'Connector-01' },
      { label: 'Connector-02', value: 'Connector-02' },
      { label: 'Connector-03', value: 'Connector-03' },
      { label: 'Connector-04', value: 'Connector-04' },
      { label: 'Connector-05', value: 'Connector-05' },
    ];

    const jumpServerOptions = [
      { label: 'JS-AWS-E1', value: 'JS-AWS-E1' },
      { label: 'JS-EU-DC', value: 'JS-EU-DC' },
      { label: 'JS-PROD-01', value: 'JS-PROD-01' },
      { label: 'JS-LEGACY-01', value: 'JS-LEGACY-01' },
    ];

    const poolOptions = [
      { label: 'Default Pool', value: 'Default Pool' },
      { label: 'Prod Pool', value: 'Prod Pool' },
      { label: 'EU Pool', value: 'EU Pool' },
    ];

    const osOptions = [
      { label: 'Windows', value: 'Windows' },
      { label: 'Linux', value: 'Linux' },
      { label: 'macOS', value: 'macOS' },
    ];

    const protocolOptions = [
      { label: 'RDP', value: 'RDP' },
      { label: 'SSH', value: 'SSH' },
      { label: 'HTTPS', value: 'HTTPS' },
    ];

    const providerOptions = [
      { label: 'PostgreSQL', value: 'PostgreSQL' },
      { label: 'Microsoft SQL', value: 'Microsoft SQL' },
      { label: 'MySQL', value: 'MySQL' },
      { label: 'Snowflake', value: 'Snowflake' },
    ];

    const tagOptions = ['PCI', 'Prod', 'Finance', 'EU', 'Legacy'];

    const showResourceFilterDialog = ref(false);
    const appliedResourceStatus = ref('All');
    const appliedResourceConnectors = ref([] as string[]);
    const appliedResourceJumpServers = ref([] as string[]);
    const draftResourceStatus = ref('All');
    const draftResourceConnectors = ref([] as string[]);
    const draftResourceJumpServers = ref([] as string[]);

    function formatGroupedValues(values: string[], maxVisible = 2): string {
      if (values.length <= maxVisible) return values.join(', ');
      return `${values.slice(0, maxVisible).join(', ')}, +${values.length - maxVisible}`;
    }

    const resourceDraftFilterCount = computed(() => {
      let count = 0;
      if (draftResourceStatus.value !== 'All') count += 1;
      if (draftResourceConnectors.value.length > 0) count += 1;
      if (draftResourceJumpServers.value.length > 0) count += 1;
      return count;
    });

    const resourceFilterChips = computed(() => {
      const chips: { id: string; key: string; operator: string; value: string }[] = [];
      if (appliedResourceStatus.value !== 'All') {
        chips.push({ id: 'status', key: 'Status', operator: 'is', value: appliedResourceStatus.value });
      }
      if (appliedResourceConnectors.value.length > 0) {
        chips.push({
          id: 'connector',
          key: 'Connector',
          operator: 'is',
          value: formatGroupedValues(appliedResourceConnectors.value),
        });
      }
      if (appliedResourceJumpServers.value.length > 0) {
        chips.push({
          id: 'jump-server',
          key: 'Jump Server',
          operator: 'is',
          value: formatGroupedValues(appliedResourceJumpServers.value),
        });
      }
      return chips;
    });

    function openResourceFilterDialog() {
      draftResourceStatus.value = appliedResourceStatus.value;
      draftResourceConnectors.value = [...appliedResourceConnectors.value];
      draftResourceJumpServers.value = [...appliedResourceJumpServers.value];
      showResourceFilterDialog.value = true;
    }

    function applyResourceFilters() {
      appliedResourceStatus.value = draftResourceStatus.value;
      appliedResourceConnectors.value = [...draftResourceConnectors.value];
      appliedResourceJumpServers.value = [...draftResourceJumpServers.value];
      showResourceFilterDialog.value = false;
    }

    function cancelResourceFilters() {
      showResourceFilterDialog.value = false;
    }

    function clearDraftResourceFilters() {
      draftResourceStatus.value = 'All';
      draftResourceConnectors.value = [];
      draftResourceJumpServers.value = [];
    }

    function clearAllResourceFilters() {
      appliedResourceStatus.value = 'All';
      appliedResourceConnectors.value = [];
      appliedResourceJumpServers.value = [];
    }

    function removeResourceFilterChip(chip: { id?: string }) {
      const chipId = chip.id ?? '';
      if (chipId === 'status') appliedResourceStatus.value = 'All';
      if (chipId === 'connector') appliedResourceConnectors.value = [];
      if (chipId === 'jump-server') appliedResourceJumpServers.value = [];
    }

    const showCredentialFilterDialog = ref(false);
    const appliedCredentialTypes = ref([] as string[]);
    const appliedCredentialTags = ref([] as string[]);
    const draftCredentialTypes = ref([] as string[]);
    const draftCredentialTags = ref([] as string[]);
    const credentialSearch = ref('');

    const credentialDraftFilterCount = computed(() => {
      let count = 0;
      if (draftCredentialTypes.value.length > 0) count += 1;
      if (draftCredentialTags.value.length > 0) count += 1;
      return count;
    });

    const credentialFilterChips = computed(() => {
      const chips: { id: string; key: string; operator: string; value: string }[] = [];
      if (appliedCredentialTypes.value.length > 0) {
        chips.push({
          id: 'type',
          key: 'Type',
          operator: 'is',
          value: formatGroupedValues(appliedCredentialTypes.value),
        });
      }
      if (appliedCredentialTags.value.length > 0) {
        chips.push({
          id: 'tags',
          key: 'Tags',
          operator: 'is',
          value: formatGroupedValues(appliedCredentialTags.value),
        });
      }
      return chips;
    });

    const filteredCredentialsData = computed(() => {
      if (!credentialSearch.value) return credentialsData;
      const searchTerm = credentialSearch.value.toLowerCase();
      return credentialsData.filter(item =>
        [item.name, item.type, item.tags, item.lastUsed, item.expirationDate]
          .join(' ')
          .toLowerCase()
          .includes(searchTerm),
      );
    });

    function openCredentialFilterDialog() {
      draftCredentialTypes.value = [...appliedCredentialTypes.value];
      draftCredentialTags.value = [...appliedCredentialTags.value];
      showCredentialFilterDialog.value = true;
    }

    function applyCredentialFilters() {
      appliedCredentialTypes.value = [...draftCredentialTypes.value];
      appliedCredentialTags.value = [...draftCredentialTags.value];
      showCredentialFilterDialog.value = false;
    }

    function cancelCredentialFilters() {
      showCredentialFilterDialog.value = false;
    }

    function clearDraftCredentialFilters() {
      draftCredentialTypes.value = [];
      draftCredentialTags.value = [];
    }

    function clearAllCredentialFilters() {
      appliedCredentialTypes.value = [];
      appliedCredentialTags.value = [];
    }

    function removeCredentialFilterChip(chip: { id?: string }) {
      const chipId = chip.id ?? '';
      if (chipId === 'type') appliedCredentialTypes.value = [];
      if (chipId === 'tags') appliedCredentialTags.value = [];
    }

    function handleCredentialSearch(value: string) {
      credentialSearch.value = value;
    }

    function openCredentialDialog() {}

    const showPrivilegedCredentialFilterDialog = ref(false);
    const appliedPrivilegedCredentialTypes = ref([] as string[]);
    const appliedPrivilegedCredentialTags = ref([] as string[]);
    const draftPrivilegedCredentialTypes = ref([] as string[]);
    const draftPrivilegedCredentialTags = ref([] as string[]);
    const privilegedCredentialSearch = ref('');

    const privilegedCredentialFilterChips = computed(() => {
      const chips: { id: string; key: string; operator: string; value: string }[] = [];
      if (appliedPrivilegedCredentialTypes.value.length > 0) {
        chips.push({
          id: 'type',
          key: 'Type',
          operator: 'is',
          value: formatGroupedValues(appliedPrivilegedCredentialTypes.value),
        });
      }
      if (appliedPrivilegedCredentialTags.value.length > 0) {
        chips.push({
          id: 'tags',
          key: 'Tags',
          operator: 'is',
          value: formatGroupedValues(appliedPrivilegedCredentialTags.value),
        });
      }
      return chips;
    });

    const filteredPrivilegedCredentialsData = computed(() => {
      if (!privilegedCredentialSearch.value) return credentialsData;
      const searchTerm = privilegedCredentialSearch.value.toLowerCase();
      return credentialsData.filter(item =>
        [item.name, item.type, item.tags, item.lastUsed, item.expirationDate]
          .join(' ')
          .toLowerCase()
          .includes(searchTerm),
      );
    });

    function openPrivilegedCredentialFilterDialog() {
      draftPrivilegedCredentialTypes.value = [...appliedPrivilegedCredentialTypes.value];
      draftPrivilegedCredentialTags.value = [...appliedPrivilegedCredentialTags.value];
      showPrivilegedCredentialFilterDialog.value = true;
    }

    function clearAllPrivilegedCredentialFilters() {
      appliedPrivilegedCredentialTypes.value = [];
      appliedPrivilegedCredentialTags.value = [];
    }

    function removePrivilegedCredentialFilterChip(chip: { id?: string }) {
      const chipId = chip.id ?? '';
      if (chipId === 'type') appliedPrivilegedCredentialTypes.value = [];
      if (chipId === 'tags') appliedPrivilegedCredentialTags.value = [];
    }

    function handlePrivilegedCredentialSearch(value: string) {
      privilegedCredentialSearch.value = value;
    }

    function openPrivilegedCredentialDialog() {}

    const userGroupsData = ref([
      { id: '1', name: 'IT', membershipType: 'Static' },
      { id: '2', name: 'Security', membershipType: 'Dynamic' },
      { id: '3', name: 'Engineering', membershipType: 'Static' },
      { id: '4', name: 'Directors', membershipType: 'Static' },
      { id: '5', name: 'DevOps', membershipType: 'Dynamic' },
      { id: '6', name: 'Finance', membershipType: 'Static' },
      { id: '7', name: 'Sales', membershipType: 'Static' },
      { id: '8', name: 'Marketing', membershipType: 'Dynamic' },
      { id: '9', name: 'Support', membershipType: 'Static' },
      { id: '10', name: 'Compliance', membershipType: 'Dynamic' },
    ]);
    const selectedUserGroupRows = ref([] as string[]);

    const availableGroupsData = [
      { id: '11', name: 'HR', membershipType: 'Static' },
      { id: '12', name: 'Legal', membershipType: 'Static' },
      { id: '13', name: 'Product', membershipType: 'Dynamic' },
      { id: '14', name: 'Design', membershipType: 'Static' },
      { id: '15', name: 'Executive', membershipType: 'Static' },
      { id: '16', name: 'QA', membershipType: 'Dynamic' },
      { id: '17', name: 'Data', membershipType: 'Static' },
      { id: '18', name: 'Infrastructure', membershipType: 'Dynamic' },
    ];

    const showEnrollGroupsDialog = ref(false);
    const enrollGroupsSearch = ref('');
    const selectedGroupsToEnroll = ref([] as string[]);

    const filteredAvailableGroups = computed(() => {
      if (!enrollGroupsSearch.value) return availableGroupsData;
      const term = enrollGroupsSearch.value.toLowerCase();
      return availableGroupsData.filter(g => g.name.toLowerCase().includes(term));
    });

    const allGroupsSelected = computed(
      () => filteredAvailableGroups.value.every(g => selectedGroupsToEnroll.value.includes(g.id)),
    );

    function toggleSelectAllGroups() {
      if (allGroupsSelected.value) {
        selectedGroupsToEnroll.value = [];
      } else {
        selectedGroupsToEnroll.value = filteredAvailableGroups.value.map(g => g.id);
      }
    }

    const userGroupsColumns = [
      { field: 'name', header: 'User Group', sortable: true },
      { field: 'membershipType', header: 'Membership Type', sortable: true },
    ];

    function enrollSelectedGroups() {
      const toAdd = availableGroupsData.filter(g => selectedGroupsToEnroll.value.includes(g.id));
      userGroupsData.value.push(...toAdd);
      selectedGroupsToEnroll.value = [];
      enrollGroupsSearch.value = '';
      showEnrollGroupsDialog.value = false;
    }

    function removeSelectedUserGroups() {
      userGroupsData.value = userGroupsData.value.filter(
        g => !selectedUserGroupRows.value.includes(g.id),
      );
      selectedUserGroupRows.value = [];
    }

    const sharingUsersData = [
      { id: 'u1', name: 'Gabriel Ramos', email: 'gabriel.ramos@company.com' },
      { id: 'u2', name: 'Albert Weihermann', email: 'albert.w@company.com' },
      { id: 'u3', name: 'Bruno Souza', email: 'bruno.souza@company.com' },
      { id: 'u4', name: 'Heitor Silva', email: 'heitor.silva@company.com' },
      { id: 'u5', name: 'Sarah Chen', email: 'sarah.chen@company.com' },
      { id: 'u6', name: 'Marcus Rodriguez', email: 'marcus.r@company.com' },
    ];

    const sharingGroupsData = [
      { id: 'g1', name: 'IT' },
      { id: 'g2', name: 'Security' },
      { id: 'g3', name: 'Engineering' },
      { id: 'g4', name: 'Directors' },
      { id: 'g5', name: 'DevOps' },
      { id: 'g6', name: 'Finance' },
    ];

    const sharingTab = ref('users');
    const selectedSharingUsers = ref([] as string[]);
    const selectedSharingGroups = ref([] as string[]);
    const sharingSearch = ref('');

    const filteredSharingUsers = computed(() => {
      if (!sharingSearch.value) return sharingUsersData;
      const term = sharingSearch.value.toLowerCase();
      return sharingUsersData.filter(
        u => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term),
      );
    });

    const filteredSharingGroups = computed(() => {
      if (!sharingSearch.value) return sharingGroupsData;
      const term = sharingSearch.value.toLowerCase();
      return sharingGroupsData.filter(g => g.name.toLowerCase().includes(term));
    });

    const showSelectExistingCredentialDialog = ref(false);
    const showAddNewCredentialDialog = ref(false);
    const selectedExistingCredentialId = ref('');
    const newCredentialForm = ref({ name: '', type: 'Password', username: '', secret: '' });
    const existingCredentialSearch = ref('');
    const addedCredentials = ref([] as { name: string; type: string }[]);
    const filteredExistingCredentials = computed(() => {
      if (!existingCredentialSearch.value) return credentialsData;
      const term = existingCredentialSearch.value.toLowerCase();
      return credentialsData.filter((c: any) => c.name.toLowerCase().includes(term));
    });

    function confirmSelectExistingCredential() {
      const found = credentialsData.find((c: any) => c.name === selectedExistingCredentialId.value);
      if (found && !addedCredentials.value.find(c => c.name === found.name)) {
        addedCredentials.value.push({ name: found.name, type: found.type });
      }
      selectedExistingCredentialId.value = '';
      existingCredentialSearch.value = '';
      showSelectExistingCredentialDialog.value = false;
    }

    function confirmAddNewCredential() {
      if (newCredentialForm.value.name) {
        addedCredentials.value.push({
          name: newCredentialForm.value.name,
          type: newCredentialForm.value.type,
        });
        newCredentialForm.value = { name: '', type: 'Password', username: '', secret: '' };
      }
      showAddNewCredentialDialog.value = false;
    }

    const pwmUserGroupsData = ref([
      { id: '1', name: 'IT', membershipType: 'Static' },
      { id: '2', name: 'Security', membershipType: 'Dynamic' },
      { id: '3', name: 'Engineering', membershipType: 'Static' },
      { id: '4', name: 'Directors', membershipType: 'Static' },
      { id: '5', name: 'DevOps', membershipType: 'Dynamic' },
      { id: '6', name: 'Finance', membershipType: 'Static' },
      { id: '7', name: 'Sales', membershipType: 'Static' },
      { id: '8', name: 'Marketing', membershipType: 'Dynamic' },
      { id: '9', name: 'Support', membershipType: 'Static' },
      { id: '10', name: 'Compliance', membershipType: 'Dynamic' },
    ]);
    const pwmSelectedUserGroupRows = ref([] as string[]);

    const pwmAvailableGroupsData = [
      { id: '11', name: 'HR', membershipType: 'Static' },
      { id: '12', name: 'Legal', membershipType: 'Static' },
      { id: '13', name: 'Product', membershipType: 'Dynamic' },
      { id: '14', name: 'Design', membershipType: 'Static' },
      { id: '15', name: 'Executive', membershipType: 'Static' },
      { id: '16', name: 'QA', membershipType: 'Dynamic' },
      { id: '17', name: 'Data', membershipType: 'Static' },
      { id: '18', name: 'Infrastructure', membershipType: 'Dynamic' },
    ];

    const pwmShowEnrollGroupsDialog = ref(false);
    const pwmEnrollGroupsSearch = ref('');
    const pwmSelectedGroupsToEnroll = ref([] as string[]);

    const pwmFilteredAvailableGroups = computed(() => {
      if (!pwmEnrollGroupsSearch.value) return pwmAvailableGroupsData;
      const term = pwmEnrollGroupsSearch.value.toLowerCase();
      return pwmAvailableGroupsData.filter(g => g.name.toLowerCase().includes(term));
    });

    const pwmAllGroupsSelected = computed(
      () => pwmFilteredAvailableGroups.value.every(g => pwmSelectedGroupsToEnroll.value.includes(g.id)),
    );

    function pwmToggleSelectAllGroups() {
      if (pwmAllGroupsSelected.value) {
        pwmSelectedGroupsToEnroll.value = [];
      } else {
        pwmSelectedGroupsToEnroll.value = pwmFilteredAvailableGroups.value.map(g => g.id);
      }
    }

    const pwmUserGroupsColumns = [
      { field: 'name', header: 'User Group', sortable: true },
      { field: 'membershipType', header: 'Membership Type', sortable: true },
    ];

    function pwmEnrollSelectedGroups() {
      const toAdd = pwmAvailableGroupsData.filter(g => pwmSelectedGroupsToEnroll.value.includes(g.id));
      pwmUserGroupsData.value.push(...toAdd);
      pwmSelectedGroupsToEnroll.value = [];
      pwmEnrollGroupsSearch.value = '';
      pwmShowEnrollGroupsDialog.value = false;
    }

    function pwmRemoveSelectedUserGroups() {
      pwmUserGroupsData.value = pwmUserGroupsData.value.filter(
        g => !pwmSelectedUserGroupRows.value.includes(g.id),
      );
      pwmSelectedUserGroupRows.value = [];
    }

    const vaultWebsitesData = [
      { id: '1', name: 'Gmail', address: 'https://mail.google.com', jumpServer: '--', status: 'Available', lastSeen: 'Today 9:15 AM', tags: ['Marketing', 'Prod'] },
      { id: '2', name: 'LinkedIn', address: 'https://www.linkedin.com', jumpServer: '--', status: 'Available', lastSeen: 'Today 8:30 AM', tags: ['HR', 'Marketing'] },
      { id: '3', name: 'Slack', address: 'https://slack.com', jumpServer: '--', status: 'In Use', lastSeen: 'Today 10:00 AM', tags: ['Engineering', 'Prod'] },
      { id: '4', name: 'Notion', address: 'https://www.notion.so', jumpServer: '--', status: 'Available', lastSeen: 'Yesterday 3:00 PM', tags: ['Design', 'Dev'] },
      { id: '5', name: 'Figma', address: 'https://www.figma.com', jumpServer: '--', status: 'Available', lastSeen: 'Today 9:45 AM', tags: ['Design', 'Prod'] },
      { id: '6', name: 'GitHub', address: 'https://github.com', jumpServer: '--', status: 'In Use', lastSeen: 'Today 11:00 AM', tags: ['Engineering', 'Dev'] },
      { id: '7', name: 'Spotify', address: 'https://www.spotify.com', jumpServer: '--', status: 'Available', lastSeen: 'Yesterday 6:00 PM', tags: ['Marketing', 'Dev'] },
      { id: '8', name: 'Twitter / X', address: 'https://twitter.com', jumpServer: '--', status: 'Available', lastSeen: 'Mar 30, 2026', tags: ['Marketing'] },
      { id: '9', name: 'Netflix', address: 'https://www.netflix.com', jumpServer: '--', status: 'Available', lastSeen: 'Apr 1, 2026', tags: ['Prod'] },
      { id: '10', name: 'Amazon', address: 'https://www.amazon.com', jumpServer: '--', status: 'Available', lastSeen: 'Mar 28, 2026', tags: ['Finance', 'Prod'] },
      { id: '11', name: 'Dropbox', address: 'https://www.dropbox.com', jumpServer: '--', status: 'Available', lastSeen: 'Apr 2, 2026', tags: ['Engineering', 'Prod'] },
      { id: '12', name: 'Zoom', address: 'https://zoom.us', jumpServer: '--', status: 'In Use', lastSeen: 'Today 10:30 AM', tags: ['HR', 'Prod'] },
      { id: '13', name: 'Trello', address: 'https://trello.com', jumpServer: '--', status: 'Available', lastSeen: 'Apr 3, 2026', tags: ['Engineering', 'Dev'] },
      { id: '14', name: 'Reddit', address: 'https://www.reddit.com', jumpServer: '--', status: 'Available', lastSeen: 'Yesterday 9:00 PM', tags: ['Marketing'] },
      { id: '15', name: 'PayPal', address: 'https://www.paypal.com', jumpServer: '--', status: 'Available', lastSeen: 'Mar 25, 2026', tags: ['Finance', 'Prod'] },
    ];
    const vaultWebsitesSelection = ref([] as string[]);

    const vaultWebsitesView = ref<'list' | 'add'>('list');
    const addWebsiteSections = [
      { id: 'general', label: 'General' },
      { id: 'link-credentials', label: 'Link Credentials' },
      { id: 'user-permissions', label: 'User Permissions' },
      { id: 'autofill-parameters', label: 'Autofill Parameters' },
    ];
    const addWebsiteActiveSection = ref('general');
    const addWebsiteWebsiteDetailsCollapsed = ref(false);
    const addWebsiteLinkedCredentialsCollapsed = ref(false);
    const addWebsiteUserPermissionsCollapsed = ref(false);
    const addWebsiteAutofillParametersCollapsed = ref(false);
    const addWebsiteFolderOptions = [
      { label: 'Engineering', value: 'engineering' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Finance', value: 'finance' },
      { label: 'HR', value: 'hr' },
      { label: 'Design', value: 'design' },
    ];

    function makeEmptyAddWebsiteForm() {
      return {
        name: '',
        uri: '',
        tags: '',
        folder: null as string | null,
        notes: '',
        usernameSelector: '',
        passwordSelector: '',
        nextButtonSelector: '',
        loginButtonSelector: '',
        fieldSelectorToHide: '',
        delayAfterNext: '',
        fillDelay: '',
        fillMultipleTimes: false,
        automaticLogin: true,
      };
    }
    const addWebsiteForm = ref(makeEmptyAddWebsiteForm());

    function resetAddWebsiteForm() {
      addWebsiteForm.value = makeEmptyAddWebsiteForm();
      addWebsiteWebsiteDetailsCollapsed.value = false;
      addWebsiteLinkedCredentialsCollapsed.value = false;
      addWebsiteUserPermissionsCollapsed.value = false;
      addWebsiteAutofillParametersCollapsed.value = false;
      addWebsiteActiveSection.value = 'general';
    }

    function openAddWebsite() {
      resetAddWebsiteForm();
      vaultWebsitesView.value = 'add';
    }

    function closeAddWebsite() {
      showLinkCredentialsDialog.value = false;
      showAddUsersDialog.value = false;
      vaultWebsitesView.value = 'list';
    }

    function goToAddWebsiteSection(sectionId: string) {
      addWebsiteActiveSection.value = sectionId;
      const el = document.getElementById(`add-website-section-${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    const showLinkCredentialsDialog = ref(false);
    const linkCredentialsPickerSelection = ref<
      { id: string; name: string; type: string; lastTimeUsed: string }[]
    >([]);
    const linkCredentialsPickerSearch = ref('');
    const linkCredentialsPickerFilter = ref('all');

    function openLinkCredentialsDialog() {
      linkCredentialsPickerSelection.value = [];
      showLinkCredentialsDialog.value = true;
    }

    function closeLinkCredentialsDialog() {
      showLinkCredentialsDialog.value = false;
    }

    const showAddUsersDialog = ref(false);
    const addUsersPickerSearch = ref('');
    const addUsersPickerSelection = ref<{ id: string; name: string; email: string }[]>([]);
    const addUsersPickerData = [
      { id: 'au-1', name: 'Alice Johnson', email: 'alice.johnson@example.com' },
      { id: 'au-2', name: 'Michael Smith', email: 'michael.smith@domain.com' },
      { id: 'au-3', name: 'Samantha Lee', email: 'samantha.lee@mailservice.org' },
      { id: 'au-4', name: 'David Kim', email: 'd.kim123@webmail.net' },
      { id: 'au-5', name: 'Emily Davis', email: 'emily.davis@inbox.com' },
      { id: 'au-6', name: 'Carlos Martinez', email: 'carlos.martinez@provider.co' },
    ];
    const addUsersPickerDisplayData = computed(() => {
      const q = addUsersPickerSearch.value.trim().toLowerCase();
      if (!q) return addUsersPickerData;
      return addUsersPickerData.filter(
        (r) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q),
      );
    });

    function openAddUsersDialog() {
      addUsersPickerSelection.value = [];
      addUsersPickerSearch.value = '';
      showAddUsersDialog.value = true;
    }

    function closeAddUsersDialog() {
      showAddUsersDialog.value = false;
    }

    function getWebsiteFaviconUrl(address: string): string {
      try {
        const domain = new URL(address).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
      } catch {
        return '';
      }
    }
    const vaultCredentialsData = [
      { name: 'Google', type: 'Password', expirationDate: '20 July 2024', tags: ['Tag 01', 'Tag 02', 'Tag 03'], lastTimeUsed: 'Mar 15, 2024 @ 08:23 AM' },
      { name: 'Microsoft', type: 'Payment Card', expirationDate: '21 July 2024', tags: ['Tag 01', 'Tag 02', 'Tag 03'], lastTimeUsed: 'Mar 16, 2024 @ 10:05 AM' },
      { name: 'Apple', type: 'Secured Note', expirationDate: '22 July 2024', tags: ['Tag 01', 'Tag 02', 'Tag 03'], lastTimeUsed: 'Mar 17, 2024 @ 11:47 AM' },
      { name: 'Facebook', type: 'Key', expirationDate: '23 July 2024', tags: ['Tag 01', 'Tag 02', 'Tag 03'], lastTimeUsed: 'Mar 18, 2024 @ 02:14 PM' },
      { name: 'Netflix', type: '2FA', expirationDate: '24 July 2024', tags: ['Tag 01', 'Tag 02', 'Tag 03'], lastTimeUsed: 'Mar 19, 2024 @ 04:32 PM' },
      { name: 'Tesla', type: 'Password', expirationDate: '25 July 2024', tags: ['Tag 01', 'Tag 02', 'Tag 03'], lastTimeUsed: 'Mar 20, 2024 @ 09:08 AM' },
      { name: 'Spotify', type: 'Payment Card', expirationDate: '26 July 2024', tags: ['Tag 01', 'Tag 02', 'Tag 03'], lastTimeUsed: 'Mar 21, 2024 @ 07:55 AM' },
      { name: 'Airbnb', type: 'Secured Note', expirationDate: '27 July 2024', tags: ['Tag 01', 'Tag 02', 'Tag 03'], lastTimeUsed: 'Mar 22, 2024 @ 01:19 PM' },
      { name: 'Uber', type: 'Key', expirationDate: '28 July 2024', tags: ['Tag 01', 'Tag 02', 'Tag 03'], lastTimeUsed: 'Mar 23, 2024 @ 06:42 PM' },
      { name: 'Salesforce', type: '2FA', expirationDate: '29 July 2024', tags: ['Tag 01', 'Tag 02', 'Tag 03'], lastTimeUsed: 'Mar 24, 2024 @ 12:03 PM' },
      { name: 'Adobe', type: 'Password', expirationDate: '30 July 2024', tags: ['Tag 01', 'Tag 02', 'Tag 03'], lastTimeUsed: 'Mar 25, 2024 @ 03:27 PM' },
      { name: 'Twitter', type: 'Payment Card', expirationDate: '31 July 2024', tags: ['Tag 01', 'Tag 02', 'Tag 03'], lastTimeUsed: 'Mar 26, 2024 @ 05:18 PM' },
      { name: 'Snapchat', type: 'Secured Note', expirationDate: '1 Aug 2024', tags: ['Tag 01', 'Tag 02', 'Tag 03'], lastTimeUsed: 'Mar 27, 2024 @ 08:49 AM' },
    ];
    const vaultWebsitesStatusOptions = [
      { label: 'All', value: 'All' },
      { label: 'Available', value: 'Available' },
      { label: 'In Use', value: 'In Use' },
    ];
    const vaultCredentialsStatusOptions = [
      { label: 'All', value: 'All' },
      { label: 'Available', value: 'Available' },
      { label: 'In Use', value: 'In Use' },
    ];
    const vaultWebsitesConnectorOptions = [
      { label: 'Connector-01', value: 'Connector-01' },
      { label: 'Connector-02', value: 'Connector-02' },
      { label: 'Connector-03', value: 'Connector-03' },
      { label: 'Connector-04', value: 'Connector-04' },
    ];
    const vaultCredentialsConnectorOptions = [
      { label: 'Connector-01', value: 'Connector-01' },
      { label: 'Connector-02', value: 'Connector-02' },
      { label: 'Connector-03', value: 'Connector-03' },
      { label: 'Connector-04', value: 'Connector-04' },
    ];
    const vaultWebsitesJumpServerOptions = [
      { label: 'JS-AWS-E1', value: 'JS-AWS-E1' },
      { label: 'JS-PROD-01', value: 'JS-PROD-01' },
      { label: 'JS-EU-DC', value: 'JS-EU-DC' },
    ];
    const vaultCredentialsJumpServerOptions = [
      { label: 'JS-AWS-E1', value: 'JS-AWS-E1' },
      { label: 'JS-PROD-01', value: 'JS-PROD-01' },
      { label: 'JS-EU-DC', value: 'JS-EU-DC' },
    ];
    const showVaultWebsitesFilterDialog = ref(false);
    const appliedVaultWebsitesStatus = ref('All');
    const appliedVaultWebsitesConnectors = ref([] as string[]);
    const appliedVaultWebsitesJumpServers = ref([] as string[]);
    const draftVaultWebsitesStatus = ref('All');
    const draftVaultWebsitesConnectors = ref([] as string[]);
    const draftVaultWebsitesJumpServers = ref([] as string[]);
    const draftVaultWebsitesTags = ref<string[]>([]);
    const draftVaultWebsitesAddress = ref('');
    const vaultWebsitesTagOptions = ['aws', 'security', 'dropbox', 'git', 'personal', 'social', 'pic'];
    const showVaultCredentialsFilterDialog = ref(false);
    const appliedVaultCredentialsStatus = ref('All');
    const appliedVaultCredentialsConnectors = ref([] as string[]);
    const appliedVaultCredentialsJumpServers = ref([] as string[]);
    const draftVaultCredentialsStatus = ref('All');
    const draftVaultCredentialsConnectors = ref([] as string[]);
    const draftVaultCredentialsJumpServers = ref([] as string[]);
    const draftVaultCredentialsTags = ref<string[]>([]);
    const draftVaultCredentialsExpirationDate = ref('');
    const vaultCredentialsTagOptions = ['Tag 01', 'Tag 02', 'Tag 03'];
    const vaultCredentialsSelection = ref([]);
    const vaultFoldersSelection = ref([]);
    const vaultUserGroupsSelection = ref([]);

    const vaultFoldersData = [
      { id: 'vf-1', name: 'Ocean', resourceCount: 23, owner: 'Emma Johnson', users: 47, lastUpdated: 'Mar 15, 2024 @ 08:23 AM' },
      { id: 'vf-2', name: 'Crimson', resourceCount: 23, owner: 'Liam Smith', users: 83, lastUpdated: 'Apr 02, 2024 @ 02:47 PM' },
      { id: 'vf-3', name: 'Silent', resourceCount: 12, owner: 'Olivia Brown', users: 29, lastUpdated: 'May 19, 2024 @ 11:01 AM' },
      { id: 'vf-4', name: 'Twilight', resourceCount: 2, owner: 'Noah Davis', users: 66, lastUpdated: 'Jun 04, 2024 @ 05:33 PM' },
      { id: 'vf-5', name: 'Golden', resourceCount: 0, owner: 'Ava Wilson', users: 54, lastUpdated: 'Jul 21, 2024 @ 09:12 AM' },
      { id: 'vf-6', name: 'Mystic', resourceCount: 1, owner: 'Elijah Martinez', users: 91, lastUpdated: 'Aug 08, 2024 @ 01:56 PM' },
      { id: 'vf-7', name: 'Ironclad', resourceCount: 23, owner: 'Sophia Anderson', users: 38, lastUpdated: 'Sep 14, 2024 @ 10:22 AM' },
      { id: 'vf-8', name: 'Velvet', resourceCount: 23, owner: 'James Thomas', users: 72, lastUpdated: 'Oct 03, 2024 @ 04:41 PM' },
      { id: 'vf-9', name: 'Frozen', resourceCount: 15, owner: 'Charlotte White', users: 55, lastUpdated: 'Nov 11, 2024 @ 08:09 AM' },
      { id: 'vf-10', name: 'Emerald', resourceCount: 1, owner: 'Benjamin Harris', users: 63, lastUpdated: 'Dec 02, 2024 @ 12:58 PM' },
      { id: 'vf-11', name: 'Shadow', resourceCount: 4, owner: 'Mia Clark', users: 41, lastUpdated: 'Jan 18, 2025 @ 03:14 PM' },
      { id: 'vf-12', name: 'Crimson', resourceCount: 45, owner: 'Lucas Lewis', users: 19, lastUpdated: 'Feb 07, 2025 @ 07:30 AM' },
    ];

    const vaultUserGroupsData = [
      { id: 'vug-1', name: 'Creative Coders', description: 'Group of Users.', members: 12 },
      { id: 'vug-2', name: 'Data Dynamos', description: 'Group of Users.', members: 3 },
      { id: 'vug-3', name: 'UX Unicorns', description: 'Group of Users.', members: 12 },
      { id: 'vug-4', name: 'Marketing Mavericks', description: 'Group of Users.', members: 2 },
      { id: 'vug-5', name: 'Product Pioneers', description: 'Group of Users.', members: 23 },
      { id: 'vug-6', name: 'Support Squad', description: 'Group of Users.', members: 32 },
      { id: 'vug-7', name: 'QA Questers', description: 'Group of Users.', members: 1 },
      { id: 'vug-8', name: 'Security Sentinels', description: 'Group of Users.', members: 0 },
      { id: 'vug-9', name: 'DevOps Dreamers', description: 'Group of Users.', members: 1 },
      { id: 'vug-10', name: 'Analytics Aces', description: 'Group of Users.', members: 54 },
      { id: 'vug-11', name: 'Content Creators', description: 'Group of Users.', members: 124 },
      { id: 'vug-12', name: 'Innovation Insiders', description: 'Group of Users.', members: 12 },
      { id: 'vug-13', name: 'Community Champions', description: 'Group of Users.', members: 7 },
    ];

    const vaultUserGroupsFirst = ref(0);
    const vaultUserGroupsRows = ref(100);
    const vaultUserGroupsTotalRecords = computed(() => vaultUserGroupsData.length);
    const vaultUserGroupsPageData = computed(() =>
      vaultUserGroupsData.slice(
        vaultUserGroupsFirst.value,
        vaultUserGroupsFirst.value + vaultUserGroupsRows.value,
      ),
    );
    function onVaultUserGroupsPage(event: { first: number; rows: number }) {
      vaultUserGroupsFirst.value = event.first;
      vaultUserGroupsRows.value = event.rows;
    }

    const vaultWebsitesDraftFilterCount = computed(() => {
      let count = 0;
      if (draftVaultWebsitesStatus.value !== 'All') count += 1;
      if (draftVaultWebsitesConnectors.value.length > 0) count += 1;
      if (draftVaultWebsitesJumpServers.value.length > 0) count += 1;
      return count;
    });
    const vaultCredentialsDraftFilterCount = computed(() => {
      let count = 0;
      if (draftVaultCredentialsStatus.value !== 'All') count += 1;
      if (draftVaultCredentialsConnectors.value.length > 0) count += 1;
      if (draftVaultCredentialsJumpServers.value.length > 0) count += 1;
      return count;
    });

    const vaultWebsitesFilterChips = computed(() => {
      const chips: { id: string; key: string; operator: string; value: string }[] = [];
      if (appliedVaultWebsitesStatus.value !== 'All') {
        chips.push({ id: 'status', key: 'Status', operator: 'is', value: appliedVaultWebsitesStatus.value });
      }
      if (appliedVaultWebsitesConnectors.value.length > 0) {
        chips.push({
          id: 'connector',
          key: 'Connector',
          operator: 'is',
          value: formatGroupedValues(appliedVaultWebsitesConnectors.value),
        });
      }
      if (appliedVaultWebsitesJumpServers.value.length > 0) {
        chips.push({
          id: 'jump-server',
          key: 'Jump Server',
          operator: 'is',
          value: formatGroupedValues(appliedVaultWebsitesJumpServers.value),
        });
      }
      return chips;
    });
    const vaultCredentialsFilterChips = computed(() => {
      const chips: { id: string; key: string; operator: string; value: string }[] = [];
      if (appliedVaultCredentialsStatus.value !== 'All') {
        chips.push({ id: 'status', key: 'Status', operator: 'is', value: appliedVaultCredentialsStatus.value });
      }
      if (appliedVaultCredentialsConnectors.value.length > 0) {
        chips.push({
          id: 'connector',
          key: 'Connector',
          operator: 'is',
          value: formatGroupedValues(appliedVaultCredentialsConnectors.value),
        });
      }
      if (appliedVaultCredentialsJumpServers.value.length > 0) {
        chips.push({
          id: 'jump-server',
          key: 'Jump Server',
          operator: 'is',
          value: formatGroupedValues(appliedVaultCredentialsJumpServers.value),
        });
      }
      return chips;
    });

    function openVaultWebsitesFilterDialog() {
      draftVaultWebsitesStatus.value = appliedVaultWebsitesStatus.value;
      draftVaultWebsitesConnectors.value = [...appliedVaultWebsitesConnectors.value];
      draftVaultWebsitesJumpServers.value = [...appliedVaultWebsitesJumpServers.value];
      showVaultWebsitesFilterDialog.value = true;
    }

    function applyVaultWebsitesFilters() {
      appliedVaultWebsitesStatus.value = draftVaultWebsitesStatus.value;
      appliedVaultWebsitesConnectors.value = [...draftVaultWebsitesConnectors.value];
      appliedVaultWebsitesJumpServers.value = [...draftVaultWebsitesJumpServers.value];
      showVaultWebsitesFilterDialog.value = false;
    }

    function cancelVaultWebsitesFilters() {
      showVaultWebsitesFilterDialog.value = false;
    }

    function clearVaultWebsitesDraftFilters() {
      draftVaultWebsitesStatus.value = 'All';
      draftVaultWebsitesConnectors.value = [];
      draftVaultWebsitesJumpServers.value = [];
    }

    function clearAllVaultWebsitesFilters() {
      appliedVaultWebsitesStatus.value = 'All';
      appliedVaultWebsitesConnectors.value = [];
      appliedVaultWebsitesJumpServers.value = [];
    }

    function removeVaultWebsitesFilterChip(chip: { id?: string }) {
      const chipId = chip.id ?? '';
      if (chipId === 'status') appliedVaultWebsitesStatus.value = 'All';
      if (chipId === 'connector') appliedVaultWebsitesConnectors.value = [];
      if (chipId === 'jump-server') appliedVaultWebsitesJumpServers.value = [];
    }

    function openVaultWebsitesDialog() {
      openAddWebsite();
    }

    function openVaultCredentialsFilterDialog() {
      draftVaultCredentialsStatus.value = appliedVaultCredentialsStatus.value;
      draftVaultCredentialsConnectors.value = [...appliedVaultCredentialsConnectors.value];
      draftVaultCredentialsJumpServers.value = [...appliedVaultCredentialsJumpServers.value];
      showVaultCredentialsFilterDialog.value = true;
    }

    function applyVaultCredentialsFilters() {
      appliedVaultCredentialsStatus.value = draftVaultCredentialsStatus.value;
      appliedVaultCredentialsConnectors.value = [...draftVaultCredentialsConnectors.value];
      appliedVaultCredentialsJumpServers.value = [...draftVaultCredentialsJumpServers.value];
      showVaultCredentialsFilterDialog.value = false;
    }

    function cancelVaultCredentialsFilters() {
      showVaultCredentialsFilterDialog.value = false;
    }

    function clearVaultCredentialsDraftFilters() {
      draftVaultCredentialsStatus.value = 'All';
      draftVaultCredentialsConnectors.value = [];
      draftVaultCredentialsJumpServers.value = [];
    }

    function clearAllVaultCredentialsFilters() {
      appliedVaultCredentialsStatus.value = 'All';
      appliedVaultCredentialsConnectors.value = [];
      appliedVaultCredentialsJumpServers.value = [];
    }

    function removeVaultCredentialsFilterChip(chip: { id?: string }) {
      const chipId = chip.id ?? '';
      if (chipId === 'status') appliedVaultCredentialsStatus.value = 'All';
      if (chipId === 'connector') appliedVaultCredentialsConnectors.value = [];
      if (chipId === 'jump-server') appliedVaultCredentialsJumpServers.value = [];
    }

    function openVaultCredentialsDialog() {
      console.log('Add vault credential');
    }

    function openVaultNewFolder() {
      console.log('New folder');
    }

    function openVaultUsersAdd() {
      console.log('Add user group');
    }

    const VaultActionMenuCell = defineComponent({
      name: 'VaultActionMenuCell',
      components: { PvMenu: Menu, PvButton: Button },
      props: {
        iconButtons: { type: Array, default: () => [] },
        menuItems: { type: Array, default: () => [] },
      },
      setup() {
        const menu = ref<InstanceType<typeof Menu> | null>(null);
        function toggleMenu(event: Event) {
          menu.value?.toggle(event);
        }
        const menuPt = {
          root: { class: 'bg-neutral-surface rounded-lg shadow-lg border border-neutral-default_solid' },
          list: { class: 'flex flex-col w-full py-1' },
          item: { class: 'w-full' },
          itemLink: { class: 'px-3 py-2 text-body-md text-neutral-base hover:bg-neutral-hover cursor-pointer flex items-center w-full' },
          itemLabel: { class: 'text-body-md text-neutral-base' },
        };
        return { menu, toggleMenu, EllipsisHorizontalIcon, menuPt };
      },
      template: `
        <div class="flex items-center gap-xs">
          <PvButton
            v-for="(btn, idx) in iconButtons"
            :key="idx"
            severity="secondary"
            variant="text"
            size="small"
            :aria-label="btn.ariaLabel"
          >
            <template #icon="iconProps">
              <component :is="btn.icon" :class="iconProps.class" />
            </template>
          </PvButton>
          <PvButton
            v-if="menuItems.length"
            severity="secondary"
            variant="text"
            size="small"
            aria-label="More actions"
            @click="toggleMenu"
          >
            <template #icon="iconProps">
              <component :is="EllipsisHorizontalIcon" :class="iconProps.class" />
            </template>
          </PvButton>
          <PvMenu
            v-if="menuItems.length"
            ref="menu"
            :model="menuItems"
            popup
            :pt="menuPt"
            style="z-index: 9999;"
          />
        </div>
      `,
    });

    const VaultWebsiteNameCell = defineComponent({
      name: 'VaultWebsiteNameCell',
      components: { DataTableCellLink },
      props: {
        data: { type: Object, required: true },
      },
      setup(props) {
        const faviconUrl = computed(() => getWebsiteFaviconUrl(String((props.data as Record<string, unknown>).address ?? '')));
        return { faviconUrl };
      },
      template: `
        <div class="flex items-center gap-sm pl-2">
          <div class="w-7 h-7 rounded-md overflow-hidden flex items-center justify-center bg-neutral-hover shrink-0">
            <img v-if="faviconUrl" :src="faviconUrl" alt="" class="w-5 h-5" />
          </div>
          <div class="flex flex-col min-w-0 flex-1">
            <a href="#" class="text-body-md font-bold text-neutral-base truncate hover:underline">{{ data.name }}</a>
            <span class="text-body-xs text-neutral-subtle truncate">{{ data.address }}</span>
          </div>
        </div>
      `,
    });

    const VaultWebsiteTagsCell = defineComponent({
      name: 'VaultWebsiteTagsCell',
      components: { PvTag: Tag },
      props: {
        data: { type: Object, required: true },
      },
      setup(props) {
        const tags = computed(() => {
          const value = (props.data as Record<string, unknown>).tags;
          return Array.isArray(value) ? value : [];
        });
        return { tags };
      },
      template: `
        <div class="flex flex-wrap items-center gap-xs">
          <PvTag
            v-for="(tag, idx) in tags"
            :key="idx"
            :value="tag"
            severity="secondary"
          />
          <span v-if="tags.length === 0" class="text-body-md text-neutral-subtle">--</span>
        </div>
      `,
    });

    const VaultCredentialNameCell = defineComponent({
      name: 'VaultCredentialNameCell',
      props: { data: { type: Object, required: true } },
      components: {
        LockClosedIcon,
        CreditCardIcon,
        DocumentTextIcon,
        KeyIcon,
        FingerPrintIcon,
      },
      setup() {
        const typeConfig: Record<string, { bg: string; color: string; component: any }> = {
          'Password': { bg: '#E0F7F6', color: '#41C8C3', component: markRaw(LockClosedIcon) },
          'Payment Card': { bg: '#FFF3E0', color: '#FF9800', component: markRaw(CreditCardIcon) },
          'Secured Note': { bg: '#E3F2FD', color: '#2196F3', component: markRaw(DocumentTextIcon) },
          'Key': { bg: '#FCE4EC', color: '#E91E63', component: markRaw(KeyIcon) },
          '2FA': { bg: '#E8F5E9', color: '#4CAF50', component: markRaw(FingerPrintIcon) },
        };
        return { typeConfig };
      },
      template: `
        <div class="flex items-center gap-sm pl-2">
          <div
            class="flex items-center justify-center rounded-sm shrink-0"
            style="width: 32px; height: 32px;"
            :style="{ backgroundColor: typeConfig[data.type]?.bg || '#F5F5F5' }"
          >
            <component
              :is="typeConfig[data.type]?.component"
              class="w-4 h-4"
              :style="{ color: typeConfig[data.type]?.color || '#666', strokeWidth: '2px' }"
            />
          </div>
          <div class="flex flex-col min-w-0 flex-1">
            <a
              href="#"
              class="truncate cursor-pointer hover:underline"
              style="font-size: 14px; font-weight: 600; line-height: 20px; color: var(--color-neutral-base, #0F202F);"
              @click.prevent
            >{{ data.name }}</a>
            <span style="font-size: 10px; font-weight: 400; line-height: 14px; color: var(--color-neutral-muted, #6B7280); overflow: hidden; text-overflow: ellipsis;">{{ data.type }}</span>
          </div>
        </div>
      `,
    });

    const LinkCredentialsPickerNameCell = defineComponent({
      name: 'LinkCredentialsPickerNameCell',
      props: { data: { type: Object, required: true } },
      components: {
        LockClosedIcon,
        CreditCardIcon,
        DocumentTextIcon,
        KeyIcon,
        FingerPrintIcon,
      },
      setup() {
        const typeConfig: Record<string, { bg: string; color: string; component: any }> = {
          Password: { bg: '#E0F7F6', color: '#41C8C3', component: markRaw(LockClosedIcon) },
          'Payment Card': { bg: '#FFF3E0', color: '#FF9800', component: markRaw(CreditCardIcon) },
          'Secured Note': { bg: '#E3F2FD', color: '#2196F3', component: markRaw(DocumentTextIcon) },
          Key: { bg: '#FCE4EC', color: '#E91E63', component: markRaw(KeyIcon) },
          '2FA': { bg: '#E8F5E9', color: '#4CAF50', component: markRaw(FingerPrintIcon) },
        };
        return { typeConfig };
      },
      template: `
        <div class="flex items-center gap-2 py-1.5 px-2">
          <div
            class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
            :style="{ backgroundColor: typeConfig[data.type]?.bg || '#F5F5F5' }"
          >
            <component
              :is="typeConfig[data.type]?.component"
              class="h-5 w-5"
              :style="{ color: typeConfig[data.type]?.color || '#666', strokeWidth: '2px' }"
            />
          </div>
          <div class="flex min-w-0 flex-1 flex-col">
            <span class="truncate text-body-md-link text-neutral-base">{{ data.name }}</span>
            <span class="truncate text-body-xs text-neutral-muted">{{ data.type }}</span>
          </div>
        </div>
      `,
    });

    const LinkCredentialsPickerLastUsedCell = defineComponent({
      name: 'LinkCredentialsPickerLastUsedCell',
      props: {
        label: { type: String, default: '' },
      },
      template: `
        <span class="min-w-0 max-w-full truncate text-right text-body-md text-neutral-base">{{ label }}</span>
      `,
    });

    const AddUsersPickerUserCell = defineComponent({
      name: 'AddUsersPickerUserCell',
      props: { data: { type: Object, required: true } },
      template: `
        <div class="flex min-w-0 flex-col py-1.5">
          <span class="truncate text-body-md font-semibold text-neutral-base">{{ data.name }}</span>
          <span class="truncate text-body-xs text-neutral-muted">{{ data.email }}</span>
        </div>
      `,
    });

    const VaultWebsiteActionCell = defineComponent({
      name: 'VaultWebsiteActionCell',
      components: { PvMenu: Menu, PvButton: Button },
      props: {
        menuItems: { type: Array, default: () => [] },
      },
      setup() {
        const menu = ref<InstanceType<typeof Menu> | null>(null);
        function toggleMenu(event: Event) {
          menu.value?.toggle(event);
        }
        const menuPt = {
          root: { class: 'bg-neutral-surface rounded-lg shadow-lg border border-neutral-default_solid' },
          list: { class: 'flex flex-col w-full py-1' },
          item: { class: 'w-full' },
          itemLink: { class: 'px-3 py-2 text-body-md text-neutral-base hover:bg-neutral-hover cursor-pointer flex items-center w-full' },
          itemLabel: ({ context }: { context: { item?: { class?: string } } }) => ({
            class: `text-body-md ${context.item?.class ?? 'text-neutral-base'}`,
          }),
        };
        return { menu, toggleMenu, EllipsisHorizontalIcon, menuPt };
      },
      template: `
        <div class="flex items-center gap-xs">
          <PvButton
            label="Connect"
            severity="secondary"
            variant="outlined"
            size="small"
          />
          <PvButton
            v-if="menuItems.length"
            severity="secondary"
            variant="text"
            size="small"
            aria-label="More actions"
            @click="toggleMenu"
          >
            <template #icon="iconProps">
              <component :is="EllipsisHorizontalIcon" :class="iconProps.class" />
            </template>
          </PvButton>
          <PvMenu
            v-if="menuItems.length"
            ref="menu"
            :model="menuItems"
            popup
            :pt="menuPt"
            style="z-index: 9999;"
          />
        </div>
      `,
    });

    const VaultCredentialActionCell = defineComponent({
      name: 'VaultCredentialActionCell',
      components: { PvButton: Button, PvMenu: Menu, EllipsisHorizontalIcon },
      props: { menuItems: { type: Array, required: true } },
      setup() {
        const menu = ref<InstanceType<typeof Menu> | null>(null);
        const toggle = (event: Event) => menu.value?.toggle(event);
        return { menu, toggle };
      },
      template: `
        <div class="flex items-center gap-xs">
          <PvButton label="Quick View" severity="secondary" variant="outlined" size="small" />
          <PvButton severity="secondary" variant="text" size="small" @click="toggle($event)" aria-haspopup="true">
            <template #icon="iconProps">
              <EllipsisHorizontalIcon :class="iconProps.class" />
            </template>
          </PvButton>
          <PvMenu ref="menu" :model="menuItems" popup />
        </div>
      `,
    });

    const VaultFolderNameCell = defineComponent({
      name: 'VaultFolderNameCell',
      props: { data: { type: Object, required: true } },
      components: { FolderIcon },
      setup(props) {
        const resourceLabel = computed(() => {
          const n = Number((props.data as Record<string, unknown>).resourceCount ?? 0);
          return `${n} Resource${n === 1 ? '' : 's'}`;
        });
        return { resourceLabel };
      },
      template: `
        <div class="flex items-center gap-3 pl-2">
          <div
            class="flex items-center justify-center rounded-sm shrink-0 w-7 h-7"
            style="background-color: #E0F7F6;"
          >
            <FolderIcon
              class="w-4 h-4"
              :style="{ color: '#41C8C3', strokeWidth: '2px' }"
            />
          </div>
          <div class="flex flex-col min-w-0 flex-1">
            <a
              href="#"
              class="truncate cursor-pointer hover:underline"
              style="font-size: 14px; font-weight: 600; line-height: 20px; color: var(--color-neutral-base, #0F202F);"
              @click.prevent
            >{{ data.name }}</a>
            <span style="font-size: 10px; font-weight: 400; line-height: 14px; color: var(--color-neutral-muted, #6B7280); overflow: hidden; text-overflow: ellipsis;">{{ resourceLabel }}</span>
          </div>
        </div>
      `,
    });

    const VaultFolderActionCell = defineComponent({
      name: 'VaultFolderActionCell',
      components: { PvButton: Button, PvMenu: Menu, EllipsisHorizontalIcon },
      props: { menuItems: { type: Array, required: true } },
      setup() {
        const menu = ref<InstanceType<typeof Menu> | null>(null);
        const toggle = (event: Event) => menu.value?.toggle(event);
        return { menu, toggle };
      },
      template: `
        <div class="flex items-center gap-xs">
          <PvButton label="Manage Access" severity="secondary" variant="outlined" size="small" />
          <PvButton severity="secondary" variant="text" size="small" @click="toggle($event)" aria-haspopup="true">
            <template #icon="iconProps">
              <EllipsisHorizontalIcon :class="iconProps.class" />
            </template>
          </PvButton>
          <PvMenu ref="menu" :model="menuItems" popup />
        </div>
      `,
    });

    const VaultUserGroupNameCell = defineComponent({
      name: 'VaultUserGroupNameCell',
      props: { data: { type: Object, required: true } },
      template: `
        <div class="flex flex-col min-w-0 pl-2">
          <a
            href="#"
            class="truncate cursor-pointer hover:underline"
            style="font-size: 14px; font-weight: 600; line-height: 20px; color: var(--color-neutral-base, #0F202F);"
            @click.prevent
          >{{ data.name }}</a>
          <span
            class="truncate"
            style="font-size: 10px; font-weight: 400; line-height: 14px; color: var(--color-neutral-muted, #6B7280);"
          >{{ data.description }}</span>
        </div>
      `,
    });

    const VaultUserGroupMembersCell = defineComponent({
      name: 'VaultUserGroupMembersCell',
      props: { data: { type: Object, required: true } },
      template: `
        <div
          class="flex min-h-12 w-full min-w-0 items-center self-stretch overflow-hidden py-1.5 px-2 text-neutral-base"
        >
          <span class="min-w-0 flex-1 truncate text-body-md tabular-nums">{{ data.members }}</span>
        </div>
      `,
    });

    const vaultWebsitesActionMenuItems = [
      { id: 'link-credential', label: 'Link Credential' },
      { id: 'share', label: 'Share' },
      { id: 'export', label: 'Export' },
      { id: 'delete', label: 'Delete', class: 'text-danger-base' },
    ];

    const vaultCredentialsActionMenuItems = [
      { label: 'Details' },
      { label: 'Activity' },
      { label: 'History' },
      { label: 'Share' },
      { label: 'Duplicate' },
      { label: 'Archive' },
      { separator: true },
      { label: 'Delete', class: 'text-error-base' },
    ];

    const vaultFoldersActionMenuItems = [
      { label: 'Rename' },
      { label: 'Share' },
      { label: 'Duplicate' },
      { separator: true },
      { label: 'Delete', class: 'text-error-base' },
    ];

    const vaultCredentialsActionButtons = [
      { icon: markRaw(PencilSquareIcon), ariaLabel: 'Edit' },
      { icon: markRaw(Square2StackIcon), ariaLabel: 'Copy' },
      { icon: markRaw(TrashIcon), ariaLabel: 'Delete' },
    ];

    const vaultWebsitesColumns = [
      {
        field: 'name',
        header: 'Name',
        sortable: true,
        component: markRaw(VaultWebsiteNameCell),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ data: sp.data }),
      },
      {
        field: 'tags',
        header: 'Tags',
        component: markRaw(VaultWebsiteTagsCell),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ data: sp.data }),
      },
      {
        field: 'lastSeen',
        header: 'Last Seen',
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.lastSeen }),
      },
      {
        field: 'actions',
        header: 'Actions',
        width: '140px',
        component: markRaw(VaultWebsiteActionCell),
        componentProps: () => ({ menuItems: vaultWebsitesActionMenuItems }),
      },
    ];

    const vaultCredentialsColumns = [
      {
        field: 'name',
        header: 'Name',
        sortable: true,
        component: markRaw(VaultCredentialNameCell),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ data: sp.data }),
      },
      {
        field: 'expirationDate',
        header: 'Expiration Date',
        sortable: true,
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.expirationDate }),
      },
      {
        field: 'tags',
        header: 'Tags',
        component: markRaw(VaultWebsiteTagsCell),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ data: sp.data }),
      },
      {
        field: 'lastTimeUsed',
        header: 'Last Time Used',
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.lastTimeUsed }),
      },
      {
        field: 'actions',
        header: 'Actions',
        width: '160px',
        component: markRaw(VaultCredentialActionCell),
        componentProps: () => ({ menuItems: vaultCredentialsActionMenuItems }),
      },
    ];

    const vaultFoldersColumns = [
      {
        field: 'name',
        header: 'Folder',
        sortable: true,
        component: markRaw(VaultFolderNameCell),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ data: sp.data }),
      },
      {
        field: 'owner',
        header: 'Owner',
        sortable: true,
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.owner }),
      },
      {
        field: 'users',
        header: 'Users',
        sortable: true,
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ label: String(sp.data.users) }),
      },
      {
        field: 'lastUpdated',
        header: 'Last Updated',
        sortable: true,
        component: markRaw(DataTableCellText),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.lastUpdated }),
      },
      {
        field: 'actions',
        header: 'Actions',
        width: '200px',
        component: markRaw(VaultFolderActionCell),
        componentProps: () => ({ menuItems: vaultFoldersActionMenuItems }),
      },
    ];

    const vaultUserGroupsColumns = [
      {
        field: 'name',
        header: 'User Groups',
        sortable: true,
        component: markRaw(VaultUserGroupNameCell),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ data: sp.data }),
      },
      {
        field: 'members',
        header: 'Members',
        sortable: true,
        width: '208px',
        component: markRaw(VaultUserGroupMembersCell),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ data: sp.data }),
      },
    ];

    const linkCredentialsPickerData = [
      { id: 'lc-1', name: 'Google', type: 'Password', lastTimeUsed: 'Mar 15, 2024 @ 08:23 AM' },
      { id: 'lc-2', name: 'Microsoft', type: 'Password', lastTimeUsed: 'Mar 16, 2024 @ 10:05 AM' },
      { id: 'lc-3', name: 'Apple', type: '2FA', lastTimeUsed: 'Mar 17, 2024 @ 11:47 AM' },
      { id: 'lc-4', name: 'Facebook', type: 'Key', lastTimeUsed: 'Mar 18, 2024 @ 02:14 PM' },
      { id: 'lc-5', name: 'Netflix', type: 'Password', lastTimeUsed: 'Mar 19, 2024 @ 04:32 PM' },
      { id: 'lc-6', name: 'Tesla', type: 'Payment Card', lastTimeUsed: 'Mar 20, 2024 @ 09:08 AM' },
    ];
    const linkCredentialsPickerFilterOptions = [
      { label: 'Credentials: All', value: 'all' },
      { label: 'Password', value: 'password' },
      { label: 'Payment Card', value: 'payment-card' },
      { label: '2FA', value: '2fa' },
      { label: 'Key', value: 'key' },
    ];
    const linkCredentialsPickerColumns = [
      {
        field: 'name',
        header: 'Name',
        sortable: true,
        component: markRaw(LinkCredentialsPickerNameCell),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ data: sp.data }),
      },
      {
        field: 'lastTimeUsed',
        header: 'Last Time Used',
        sortable: true,
        component: markRaw(LinkCredentialsPickerLastUsedCell),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ label: String(sp.data.lastTimeUsed ?? '') }),
      },
    ];

    const addUsersPickerColumns = [
      {
        field: 'name',
        header: 'User',
        sortable: true,
        component: markRaw(AddUsersPickerUserCell),
        componentProps: (sp: { data: Record<string, unknown> }) => ({ data: sp.data }),
      },
    ];

    const showWebShieldDialog = ref(false);
    const showServersDialog = ref(false);
    const showDatabasesDialog = ref(false);
    const webShieldDialogTab = ref('general');
    const serversDialogTab = ref('general');
    const databasesDialogTab = ref('general');

    const webShieldForm = ref({
      name: '',
      uri: '',
      webShield: false,
      connector: null as string | null,
      tags: [] as string[],
      notes: '',
    });

    const serverForm = ref({
      name: '',
      address: '',
      pool: null as string | null,
      connector: null as string | null,
      recordVideo: false,
      os: null as string | null,
      protocol: null as string | null,
      port: '',
      disableClipboard: false,
      disableFileTransfer: false,
      security: 'Auto',
      remoteApp: false,
      tags: [] as string[],
      notes: '',
    });

    const databaseForm = ref({
      name: '',
      address: '',
      provider: null as string | null,
      connector: null as string | null,
      port: '',
      tags: [] as string[],
      notes: '',
    });

    const sessionActivityCollapsed = ref(false);
    const lastRecordingCollapsed = ref(false);

    function openWebShieldDialog() {
      webShieldDialogTab.value = 'general';
      showWebShieldDialog.value = true;
    }

    function openServersDialog() {
      serversDialogTab.value = 'general';
      showServersDialog.value = true;
    }

    function openDatabasesDialog() {
      databasesDialogTab.value = 'general';
      showDatabasesDialog.value = true;
    }

    function openPasswordVaultConfig() {
      if (typeof window !== 'undefined') {
        window.open('https://sedemo.vault.jumpcloud.com', '_blank');
      }
    }

    const placeholderText = computed(() => {
      if (currentPage.value === 'password-vault') {
        return 'Password Vault is enabled. Configure vault settings and access policies here.';
      }
      if (currentPage.value.startsWith('pam-')) {
        return 'Configure and manage PAM settings for this section.';
      }
      if (currentPage.value === 'home') {
        return 'Overview content goes here.';
      }
      return 'This section is not wired in the story yet.';
    });

    return {
      menuItems,
      profileMenuItems,
      pamEnabled,
      passwordVaultEnabled,
      currentPage,
      activeItem,
      passwordVaultIcon,
      privilegedResourcesTab,
      privilegedResourcesTabs,
      privilegedManagementTab,
      privilegedManagementTabs,
      pamTab,
      pamTabs,
      pageTitle,
      overlayConfig,
      overlayActive,
      passwordVaultTab,
      passwordVaultTabs,
      pamStatCards,
      passwordVaultStatCards,
      passwordVaultMostConnectedResources,
      passwordVaultMostConnectedColumns,
      credentialExpirationsSummary,
      credentialExpirations,
      credentialExpiredSummary,
      credentialExpired,
      weakCredentialsSummary,
      weakCredentials,
      unusedCredentialsSummary,
      unusedCredentials,
      credentialTypeOptions,
      credentialTagOptions,
      credentialColumns,
      filteredCredentialsData,
      draftCredentialTypes,
      draftCredentialTags,
      mostAccessedResources,
      recentConnections,
      sessionActivityBars,
      maxSessionValue,
      lastRecordingData,
      lastRecordingColumns,
      webShieldData,
      serversData,
      databasesData,
      resourceColumns,
      databaseColumns,
      blockingRulesData,
      blockingRulesColumns,
      sessionHistoryData,
      sessionHistoryColumns,
      jumpServersData,
      jumpServersColumns,
      sessionHistoryExportOptions,
      resourceStatusOptions,
      connectorOptions,
      jumpServerOptions,
      poolOptions,
      osOptions,
      protocolOptions,
      providerOptions,
      tagOptions,
      resourceFilterChips,
      resourceDraftFilterCount,
      showResourceFilterDialog,
      openResourceFilterDialog,
      applyResourceFilters,
      cancelResourceFilters,
      clearDraftResourceFilters,
      clearAllResourceFilters,
      removeResourceFilterChip,
      credentialFilterChips,
      credentialDraftFilterCount,
      showCredentialFilterDialog,
      openCredentialFilterDialog,
      applyCredentialFilters,
      cancelCredentialFilters,
      clearDraftCredentialFilters,
      clearAllCredentialFilters,
      removeCredentialFilterChip,
      handleCredentialSearch,
      openCredentialDialog,
      showPrivilegedCredentialFilterDialog,
      appliedPrivilegedCredentialTypes,
      appliedPrivilegedCredentialTags,
      draftPrivilegedCredentialTypes,
      draftPrivilegedCredentialTags,
      privilegedCredentialSearch,
      privilegedCredentialFilterChips,
      filteredPrivilegedCredentialsData,
      openPrivilegedCredentialFilterDialog,
      clearAllPrivilegedCredentialFilters,
      removePrivilegedCredentialFilterChip,
      handlePrivilegedCredentialSearch,
      openPrivilegedCredentialDialog,
      userGroupsData,
      selectedUserGroupRows,
      showEnrollGroupsDialog,
      enrollGroupsSearch,
      selectedGroupsToEnroll,
      filteredAvailableGroups,
      allGroupsSelected,
      toggleSelectAllGroups,
      userGroupsColumns,
      enrollSelectedGroups,
      removeSelectedUserGroups,
      sharingUsersData,
      sharingGroupsData,
      sharingTab,
      selectedSharingUsers,
      selectedSharingGroups,
      sharingSearch,
      filteredSharingUsers,
      filteredSharingGroups,
      showSelectExistingCredentialDialog,
      showAddNewCredentialDialog,
      selectedExistingCredentialId,
      newCredentialForm,
      existingCredentialSearch,
      addedCredentials,
      filteredExistingCredentials,
      confirmSelectExistingCredential,
      confirmAddNewCredential,
      pwmUserGroupsData,
      pwmSelectedUserGroupRows,
      pwmShowEnrollGroupsDialog,
      pwmEnrollGroupsSearch,
      pwmSelectedGroupsToEnroll,
      pwmFilteredAvailableGroups,
      pwmAllGroupsSelected,
      pwmToggleSelectAllGroups,
      pwmUserGroupsColumns,
      pwmEnrollSelectedGroups,
      pwmRemoveSelectedUserGroups,
      vaultWebsitesData,
      vaultWebsitesSelection,
      vaultWebsitesView,
      addWebsiteSections,
      addWebsiteActiveSection,
      addWebsiteWebsiteDetailsCollapsed,
      addWebsiteLinkedCredentialsCollapsed,
      addWebsiteUserPermissionsCollapsed,
      addWebsiteAutofillParametersCollapsed,
      addWebsiteFolderOptions,
      addWebsiteForm,
      openAddWebsite,
      closeAddWebsite,
      goToAddWebsiteSection,
      showLinkCredentialsDialog,
      linkCredentialsPickerSelection,
      linkCredentialsPickerSearch,
      linkCredentialsPickerFilter,
      linkCredentialsPickerData,
      linkCredentialsPickerFilterOptions,
      linkCredentialsPickerColumns,
      openLinkCredentialsDialog,
      closeLinkCredentialsDialog,
      showAddUsersDialog,
      addUsersPickerSearch,
      addUsersPickerSelection,
      addUsersPickerDisplayData,
      addUsersPickerColumns,
      openAddUsersDialog,
      closeAddUsersDialog,
      vaultCredentialsData,
      vaultCredentialsSelection,
      vaultFoldersData,
      vaultFoldersSelection,
      vaultFoldersColumns,
      vaultUserGroupsData,
      vaultUserGroupsPageData,
      vaultUserGroupsFirst,
      vaultUserGroupsRows,
      vaultUserGroupsTotalRecords,
      onVaultUserGroupsPage,
      vaultUserGroupsSelection,
      vaultUserGroupsColumns,
      vaultWebsitesStatusOptions,
      vaultCredentialsStatusOptions,
      vaultWebsitesConnectorOptions,
      vaultCredentialsConnectorOptions,
      vaultWebsitesJumpServerOptions,
      vaultCredentialsJumpServerOptions,
      showVaultWebsitesFilterDialog,
      draftVaultWebsitesStatus,
      draftVaultWebsitesConnectors,
      draftVaultWebsitesJumpServers,
      draftVaultWebsitesTags,
      draftVaultWebsitesAddress,
      vaultWebsitesTagOptions,
      showVaultCredentialsFilterDialog,
      draftVaultCredentialsStatus,
      draftVaultCredentialsConnectors,
      draftVaultCredentialsJumpServers,
      draftVaultCredentialsTags,
      draftVaultCredentialsExpirationDate,
      vaultCredentialsTagOptions,
      vaultWebsitesDraftFilterCount,
      vaultCredentialsDraftFilterCount,
      vaultWebsitesFilterChips,
      vaultCredentialsFilterChips,
      openVaultWebsitesFilterDialog,
      applyVaultWebsitesFilters,
      cancelVaultWebsitesFilters,
      clearVaultWebsitesDraftFilters,
      clearAllVaultWebsitesFilters,
      removeVaultWebsitesFilterChip,
      openVaultWebsitesDialog,
      openVaultCredentialsFilterDialog,
      applyVaultCredentialsFilters,
      cancelVaultCredentialsFilters,
      clearVaultCredentialsDraftFilters,
      clearAllVaultCredentialsFilters,
      removeVaultCredentialsFilterChip,
      openVaultCredentialsDialog,
      openVaultNewFolder,
      openVaultUsersAdd,
      vaultWebsitesColumns,
      vaultCredentialsColumns,
      showWebShieldDialog,
      showServersDialog,
      showDatabasesDialog,
      webShieldDialogTab,
      serversDialogTab,
      databasesDialogTab,
      webShieldForm,
      serverForm,
      databaseForm,
      sessionActivityCollapsed,
      lastRecordingCollapsed,
      goToSessionHistory,
      goToPamTab,
      openWebShieldDialog,
      openServersDialog,
      openDatabasesDialog,
      openPasswordVaultConfig,
      placeholderText,
      onNavClick,
    };
  },
  template: `
    <div class="flex h-screen overflow-hidden">
      <AppNavigation
        :menuItems="menuItems"
        :profileMenuItems="profileMenuItems"
        :activeItem="activeItem"
        :collapsible="true"
        :topNavToggle="true"
        @click="onNavClick"
      />
      <div
        class="flex-1 flex flex-col min-w-0 overflow-auto"
        :style="overlayActive ? 'background-color: #F7F7FB;' : undefined"
      >
        <TopBar
          :showBackButton="currentPage === 'password-vault' && passwordVaultTab === 'websites' && vaultWebsitesView === 'add'"
          @back="closeAddWebsite"
        />
        <template v-if="currentPage === 'pam' && !overlayConfig">
          <PageHeader
            title="Privileged Access Management"
            :tabs="pamTabs"
            :activeTab="pamTab"
            @update:activeTab="pamTab = $event"
          />
        </template>
        <template v-else-if="currentPage === 'password-vault'">
          <template v-if="passwordVaultTab === 'websites' && vaultWebsitesView === 'add'">
            <div
              class="flex items-center gap-2 self-stretch border-b border-neutral-default_solid bg-neutral-surface py-4 px-6"
            >
              <div class="flex size-8 shrink-0 items-center justify-center rounded-md bg-info-soft">
                <GlobeAltIcon class="size-5 text-branding-base" />
              </div>
              <span class="text-heading-3 text-neutral-base">Add Website</span>
            </div>
          </template>
          <PageHeader
            v-else
            :title="pageTitle"
            :icon="passwordVaultIcon"
            :tabs="!overlayConfig ? passwordVaultTabs : undefined"
            :activeTab="!overlayConfig ? passwordVaultTab : undefined"
            @update:activeTab="!overlayConfig ? passwordVaultTab = $event : null"
          >
            <template v-if="!overlayConfig" #actions>
              <div class="flex items-center gap-sm">
                <PvButton
                  label="Settings"
                  severity="secondary"
                  variant="outlined"
                />
                <PvButton
                  severity="secondary"
                  variant="outlined"
                  aria-label="More actions"
                >
                  <template #icon="iconProps">
                    <EllipsisHorizontalIcon :class="iconProps.class" />
                  </template>
                </PvButton>
              </div>
            </template>
          </PageHeader>
        </template>
        <PageHeader v-else :title="pageTitle" />

        <ListPageLayout v-if="overlayConfig" class="w-full! h-full!">
          <div
            class="flex min-h-full w-full items-center justify-center pb-16"
            style="background-color: #F7F7FB;"
          >
            <div
              class="flex flex-col items-center justify-center text-center gap-md"
              style="width: 596px; height: 495px;"
            >
              <img
                src="/overlay-image.png"
                alt="Overlay illustration"
                class="block"
                style="width: 360px; height: 360px;"
              />
              <div class="flex flex-col items-center gap-sm" style="width: 579px;">
                <div class="text-heading-2 text-neutral-base">{{ overlayConfig.title }}</div>
                <div class="text-body-md text-neutral-subtle">{{ overlayConfig.description }}</div>
              </div>
              <div
                class="flex items-center justify-between"
                style="width: 362px;"
              >
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="width: 134px; color: #4373C7; font-size: 14px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; font-family: 'SF Pro Text', sans-serif; line-height: normal;"
                >
                  Learn More
                  <ArrowTopRightOnSquareIcon class="size-4" style="color: #4373C7;" />
                </a>
                <PvButton
                  :label="overlayConfig.ctaLabel"
                  style="width: 212px;"
                  @click="overlayConfig.onCta"
                />
              </div>
            </div>
          </div>
        </ListPageLayout>

        <DashboardPageLayout
          v-else-if="currentPage === 'pam' && pamTab === 'overview'"
          class="w-full! h-full!"
        >
          <div class="flex flex-col gap-lg w-full">
            <div class="grid grid-cols-3 gap-lg">
              <DashboardStatCard
                v-for="stat in pamStatCards"
                :key="stat.header"
                :header="stat.header"
                :value="stat.value"
                :icon="stat.icon"
                class="w-full"
              />
            </div>

            <div class="w-full">
              <DashboardTopList
                header="Most Accessed Resources (Last 30 days)"
                :items="mostAccessedResources"
                summaryLabel="resources"
                trendValue="18%"
                trendLabel="from last month"
              />
            </div>

            <CollapsiblePanel
              v-model:collapsed="sessionActivityCollapsed"
              header="Session Activity"
              toggleable
            >
              <template #titleicon="iconProps">
                <ChartBarSquareIcon :class="iconProps.class" />
              </template>
              <template #toggleicon="iconProps">
                <ChevronRightIcon :class="iconProps.class" />
              </template>
              <div class="flex flex-col gap-sm">
                <div
                  v-for="item in sessionActivityBars"
                  :key="item.date"
                  class="flex items-center gap-sm"
                >
                  <div class="w-12 text-body-sm text-neutral-subtle text-right shrink-0">
                    {{ item.date }}
                  </div>
                  <div class="flex-1">
                    <div class="w-full h-4 rounded-sm bg-neutral-surface overflow-hidden">
                      <div
                        class="h-4 rounded-sm bg-branding-base"
                        :style="{ width: ((item.value / maxSessionValue) * 100) + '%' }"
                      />
                    </div>
                  </div>
                  <div class="w-8 text-body-sm text-neutral-base text-right shrink-0">
                    {{ item.value }}
                  </div>
                </div>
              </div>
            </CollapsiblePanel>

            <CollapsiblePanel
              v-model:collapsed="lastRecordingCollapsed"
              header="Last Recording Available"
              toggleable
            >
              <template #titleicon="iconProps">
                <VideoCameraIcon :class="iconProps.class" />
              </template>
              <template #actions>
                <PvButton
                  label="See All"
                  variant="outlined"
                  severity="secondary"
                  size="small"
                  @click="goToSessionHistory"
                />
              </template>
              <template #toggleicon="iconProps">
                <ChevronRightIcon :class="iconProps.class" />
              </template>
              <CircuitDataTable
                :columns="lastRecordingColumns"
                :data="lastRecordingData"
                :card="false"
                size="small"
              />
            </CollapsiblePanel>
          </div>

          <template #sidebar>
            <div class="w-full h-full flex flex-col">
              <DashboardRecentActivity class="flex-1 w-full" :activities="recentConnections" />
            </div>
          </template>
        </DashboardPageLayout>

        <template v-else-if="currentPage === 'password-vault'">
          <div style="background-color: #FFFFFF;">
            <DashboardPageLayout
              v-if="passwordVaultTab === 'overview'"
              class="w-full! h-full!"
              maxWidth="1440"
            >
              <div class="flex flex-col gap-lg w-full">
                <div class="grid grid-cols-4 gap-4">
                  <CollapsiblePanel
                    v-for="stat in passwordVaultStatCards"
                    :key="stat.header"
                    :header="stat.header"
                    class="w-full"
                  >
                    <div class="flex flex-col gap-sm">
                      <div class="text-heading-0 text-neutral-base">{{ stat.value }}</div>
                      <div class="flex items-center gap-xs">
                        <ArrowUpIcon v-if="stat.showArrow" class="w-4 h-4 text-success-base" />
                        <span class="text-body-sm-bold text-success-base">{{ stat.changeValue }}</span>
                        <span class="text-body-sm text-neutral-subtle">{{ stat.changeLabel }}</span>
                      </div>
                    </div>
                  </CollapsiblePanel>
                </div>

                <CollapsiblePanel header="Most Connected Resources" class="w-full">
                  <CircuitDataTable
                    :columns="passwordVaultMostConnectedColumns"
                    :data="passwordVaultMostConnectedResources"
                    :card="false"
                    size="small"
                  />
                </CollapsiblePanel>

                <div class="grid grid-cols-2 gap-4">
                  <CollapsiblePanel header="Credential Expirations" class="w-full">
                    <template #actions>
                      <PvButton label="View All" severity="secondary" variant="outlined" size="small" />
                    </template>
                    <div class="flex flex-col gap-sm">
                      <div class="flex items-center gap-xs text-body-sm">
                        <span class="text-body-sm-bold text-error-base">{{ credentialExpirationsSummary.count }}</span>
                        <span class="text-body-sm text-neutral-base">{{ credentialExpirationsSummary.label }}</span>
                        <div class="h-4 w-px bg-neutral-default_solid"></div>
                        <span class="text-body-sm text-neutral-subtle">{{ credentialExpirationsSummary.range }}</span>
                      </div>
                      <div class="flex flex-col divide-y divide-neutral-default_solid border-t border-neutral-default_solid">
                        <div
                          v-for="item in credentialExpirations"
                          :key="item.name"
                          class="flex items-center justify-between py-2"
                        >
                          <div class="flex flex-col">
                            <span class="text-body-sm-semi-bold text-neutral-base">{{ item.name }}</span>
                            <span v-if="item.email" class="text-body-xs text-neutral-subtle">{{ item.email }}</span>
                          </div>
                          <div class="flex items-center gap-xs text-body-sm">
                            <span v-if="item.metaLabel" class="text-neutral-subtle">{{ item.metaLabel }}</span>
                            <span class="text-body-sm-semi-bold" :class="item.metaClass">{{ item.metaValue }}</span>
                            <div class="h-4 w-px bg-neutral-default_solid"></div>
                            <PvButton severity="secondary" variant="text" size="small" aria-label="More actions">
                              <template #icon="iconProps">
                                <EllipsisHorizontalIcon :class="iconProps.class" />
                              </template>
                            </PvButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsiblePanel>

                  <CollapsiblePanel header="Credential Expired" class="w-full">
                    <template #actions>
                      <PvButton label="View All" severity="secondary" variant="outlined" size="small" />
                    </template>
                    <div class="flex flex-col gap-sm">
                      <div class="flex items-center gap-xs text-body-sm">
                        <span class="text-body-sm-bold text-error-base">{{ credentialExpiredSummary.count }}</span>
                        <span class="text-body-sm text-neutral-base">{{ credentialExpiredSummary.label }}</span>
                        <div class="h-4 w-px bg-neutral-default_solid"></div>
                        <span class="text-body-sm text-neutral-subtle">{{ credentialExpiredSummary.range }}</span>
                      </div>
                      <div class="flex flex-col divide-y divide-neutral-default_solid border-t border-neutral-default_solid">
                        <div
                          v-for="item in credentialExpired"
                          :key="item.name"
                          class="flex items-center justify-between py-2"
                        >
                          <div class="flex flex-col">
                            <span class="text-body-sm-semi-bold text-neutral-base">{{ item.name }}</span>
                            <span v-if="item.email" class="text-body-xs text-neutral-subtle">{{ item.email }}</span>
                          </div>
                          <div class="flex items-center gap-xs text-body-sm">
                            <span v-if="item.metaLabel" class="text-neutral-subtle">{{ item.metaLabel }}</span>
                            <span class="text-body-sm-semi-bold" :class="item.metaClass">{{ item.metaValue }}</span>
                            <div class="h-4 w-px bg-neutral-default_solid"></div>
                            <PvButton severity="secondary" variant="text" size="small" aria-label="More actions">
                              <template #icon="iconProps">
                                <EllipsisHorizontalIcon :class="iconProps.class" />
                              </template>
                            </PvButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsiblePanel>

                  <CollapsiblePanel header="Weak Credentials" class="w-full">
                    <template #actions>
                      <PvButton label="View All" severity="secondary" variant="outlined" size="small" />
                    </template>
                    <div class="flex flex-col gap-sm">
                      <div class="flex items-center gap-xs text-body-sm">
                        <span class="text-body-sm-bold text-error-base">{{ weakCredentialsSummary.count }}</span>
                        <span class="text-body-sm text-neutral-base">{{ weakCredentialsSummary.label }}</span>
                      </div>
                      <div class="flex flex-col divide-y divide-neutral-default_solid border-t border-neutral-default_solid">
                        <div
                          v-for="item in weakCredentials"
                          :key="item.name"
                          class="flex items-center justify-between py-2"
                        >
                          <div class="flex flex-col">
                            <span class="text-body-sm-semi-bold text-neutral-base">{{ item.name }}</span>
                          </div>
                          <div class="flex items-center gap-xs text-body-sm">
                            <span class="text-body-sm-semi-bold" :class="item.metaClass">{{ item.metaValue }}</span>
                            <div class="h-4 w-px bg-neutral-default_solid"></div>
                            <PvButton severity="secondary" variant="text" size="small" aria-label="More actions">
                              <template #icon="iconProps">
                                <EllipsisHorizontalIcon :class="iconProps.class" />
                              </template>
                            </PvButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsiblePanel>

                  <CollapsiblePanel header="Unused Credentials" class="w-full">
                    <template #actions>
                      <PvButton label="View All" severity="secondary" variant="outlined" size="small" />
                    </template>
                    <div class="flex flex-col gap-sm">
                      <div class="flex items-center gap-xs text-body-sm">
                        <span class="text-body-sm-bold text-error-base">{{ unusedCredentialsSummary.count }}</span>
                        <span class="text-body-sm text-neutral-base">{{ unusedCredentialsSummary.label }}</span>
                      </div>
                      <div class="flex flex-col divide-y divide-neutral-default_solid border-t border-neutral-default_solid">
                        <div
                          v-for="item in unusedCredentials"
                          :key="item.name"
                          class="flex items-center justify-between py-2"
                        >
                          <div class="flex flex-col">
                            <span class="text-body-sm-semi-bold text-neutral-base">{{ item.name }}</span>
                          </div>
                          <div class="flex items-center gap-xs text-body-sm">
                            <span v-if="item.metaLabel" class="text-neutral-subtle">{{ item.metaLabel }}</span>
                            <span class="text-body-sm-semi-bold" :class="item.metaClass">{{ item.metaValue }}</span>
                            <div class="h-4 w-px bg-neutral-default_solid"></div>
                            <PvButton severity="secondary" variant="text" size="small" aria-label="More actions">
                              <template #icon="iconProps">
                                <EllipsisHorizontalIcon :class="iconProps.class" />
                              </template>
                            </PvButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsiblePanel>
                </div>
              </div>
            </DashboardPageLayout>

            <ListPageLayout
              v-else-if="passwordVaultTab === 'user-groups'"
              class="w-full! h-full!"
            >
              <div class="flex flex-col h-full gap-lg">
                <div class="flex flex-col h-full relative">
                  <CircuitDataTable
                    :columns="pwmUserGroupsColumns"
                    :data="pwmUserGroupsData"
                    :card="true"
                    :scrollable="true"
                    scrollHeight="flex"
                    :paginator="true"
                    :rows="10"
                    :selection="pwmSelectedUserGroupRows"
                    selectionMode="multiple"
                    @update:selection="pwmSelectedUserGroupRows = $event"
                  >
                    <template #toolbar>
                      <div class="flex items-center gap-sm mb-2">
                        <DataTableToolbar
                          addButtonLabel="Add"
                          :showAddButton="true"
                          :showFilterButton="false"
                          :showRefreshButton="false"
                          :showColumnsButton="false"
                          :showDownloadButton="false"
                          :showSaveViewButton="false"
                          @add="pwmShowEnrollGroupsDialog = true"
                        />
                        <PvButton
                          v-if="pwmSelectedUserGroupRows.length > 0"
                          label="Remove Selected"
                          severity="danger"
                          variant="outlined"
                          size="small"
                          @click="pwmRemoveSelectedUserGroups"
                        />
                      </div>
                    </template>
                  </CircuitDataTable>
                </div>
              </div>

              <PvDialog
                v-model:visible="pwmShowEnrollGroupsDialog"
                :draggable="false"
                modal
                header="Enroll User Groups"
                :style="{ width: '560px' }"
              >
                <template #closeicon><XMarkIcon /></template>
                <div class="flex flex-col gap-md">
                  <PvInputText
                    v-model="pwmEnrollGroupsSearch"
                    placeholder="Search groups"
                    class="w-full"
                  />
                  <div class="flex items-center gap-sm px-md py-sm border border-neutral-default_solid rounded-md">
                    <PvCheckbox
                      :modelValue="pwmAllGroupsSelected"
                      :binary="true"
                      @change="pwmToggleSelectAllGroups"
                    />
                    <span class="text-body-sm-semi-bold text-neutral-base">Select All</span>
                  </div>
                  <div class="flex flex-col divide-y divide-neutral-default_solid border border-neutral-default_solid rounded-md overflow-hidden">
                    <div
                      v-for="group in pwmFilteredAvailableGroups"
                      :key="group.id"
                      class="flex items-center gap-sm px-md py-sm"
                    >
                      <PvCheckbox
                        :value="group.id"
                        v-model="pwmSelectedGroupsToEnroll"
                      />
                      <span class="text-body-sm text-neutral-base">{{ group.name }}</span>
                    </div>
                  </div>
                </div>
                <template #footer>
                  <PvButton label="Cancel" severity="secondary" variant="text" @click="pwmShowEnrollGroupsDialog = false" />
                  <PvButton label="Enroll" :disabled="pwmSelectedGroupsToEnroll.length === 0" @click="pwmEnrollSelectedGroups" />
                </template>
              </PvDialog>
            </ListPageLayout>

            <ListPageLayout
              v-else-if="passwordVaultTab === 'websites'"
              class="w-full! h-full!"
            >
              <div v-if="vaultWebsitesView === 'list'" class="flex flex-col h-full gap-lg">
                <div class="flex flex-col h-full relative">
                  <CircuitDataTable
                    :columns="vaultWebsitesColumns"
                    :data="vaultWebsitesData"
                    :card="true"
                    :scrollable="true"
                    scrollHeight="flex"
                    :paginator="true"
                    :rows="100"
                    :selection="vaultWebsitesSelection"
                    selectionMode="multiple"
                    @update:selection="vaultWebsitesSelection = $event"
                    :pt="{
                      root: { class: 'flex flex-col h-full min-h-0' },
                      tableContainer: { class: 'flex-1 min-h-0 overflow-auto' },
                      footer: { class: 'shrink-0' },
                      headerCell: ({ context }) => ({
                        class: context?.column?.props?.selectionMode || context?.column?.selectionMode
                          ? 'flex items-center h-12 px-2 gap-0.5'
                          : '',
                      }),
                      bodyCell: ({ context }) => ({
                        class: context?.column?.props?.selectionMode || context?.column?.selectionMode
                          ? 'flex items-center h-12 px-2 gap-0.5'
                          : '',
                      }),
                      headerCheckbox: { class: 'flex items-center h-5' },
                      rowCheckbox: { class: 'flex items-center h-5' },
                    }"
                    :ptOptions="{ mergeSections: true, mergeProps: true }"
                  >
                    <template #toolbar>
                      <DataTableToolbar
                        addButtonLabel="Add"
                        :showAddButton="true"
                        :showFilterButton="true"
                        :showRefreshButton="false"
                        :showColumnsButton="false"
                        :showDownloadButton="false"
                        :showSaveViewButton="false"
                        :activeFilters="vaultWebsitesFilterChips"
                        :maxVisibleFilters="5"
                        @add="openVaultWebsitesDialog"
                        @filter="openVaultWebsitesFilterDialog"
                        @clear-all="clearAllVaultWebsitesFilters"
                        @filter-remove="removeVaultWebsitesFilterChip"
                      />
                    </template>
                  </CircuitDataTable>
                </div>
              </div>

              <div
                v-else
                class="flex flex-col h-full overflow-hidden"
                style="background-color: #F7F7FB;"
              >
                <div class="flex-1 overflow-auto">
                  <div class="flex justify-center px-lg py-lg">
                    <div class="flex gap-lg" style="max-width: 1024px;">
                      <div class="flex flex-col gap-md" style="width: 800px;">
                        <CollapsiblePanel
                          id="add-website-section-general"
                          v-model:collapsed="addWebsiteWebsiteDetailsCollapsed"
                          header="Website Details"
                          toggleable
                        >
                          <template #titleicon="iconProps">
                            <GlobeAltIcon :class="iconProps.class" />
                          </template>
                          <template #toggleicon="iconProps">
                            <ChevronRightIcon :class="iconProps.class" />
                          </template>
                          <div class="flex flex-col gap-lg">
                            <div class="grid grid-cols-2 gap-md">
                              <FormField label="Name" :required="true">
                                <template #default="{ inputId }">
                                  <PvInputText
                                    :id="inputId"
                                    v-model="addWebsiteForm.name"
                                    placeholder="Ex: JumpCloud"
                                    class="w-full"
                                  />
                                </template>
                              </FormField>
                              <FormField label="URI (Hostname, IP, Address, etc.)" :required="true">
                                <template #default="{ inputId }">
                                  <PvInputText
                                    :id="inputId"
                                    v-model="addWebsiteForm.uri"
                                    placeholder="Ex: www.jumpcloud.com"
                                    class="w-full"
                                  />
                                </template>
                              </FormField>
                            </div>
                            <div class="grid grid-cols-2 gap-md">
                              <FormField label="Tags">
                                <template #default="{ inputId }">
                                  <PvInputText
                                    :id="inputId"
                                    v-model="addWebsiteForm.tags"
                                    placeholder=""
                                    class="w-full"
                                  />
                                </template>
                              </FormField>
                              <FormField label="Folder">
                                <template #default="{ inputId }">
                                  <PvSelect
                                    :id="inputId"
                                    v-model="addWebsiteForm.folder"
                                    :options="addWebsiteFolderOptions"
                                    optionLabel="label"
                                    optionValue="value"
                                    placeholder="Select Folder"
                                    class="w-full!"
                                  />
                                </template>
                              </FormField>
                            </div>
                            <FormField label="Notes">
                              <template #default="{ inputId }">
                                <PvTextarea
                                  :id="inputId"
                                  v-model="addWebsiteForm.notes"
                                  :rows="4"
                                  class="w-full"
                                />
                              </template>
                            </FormField>
                          </div>
                        </CollapsiblePanel>

                        <CollapsiblePanel
                          id="add-website-section-link-credentials"
                          v-model:collapsed="addWebsiteLinkedCredentialsCollapsed"
                          header="Linked Credentials"
                          toggleable
                        >
                          <template #titleicon="iconProps">
                            <KeyIcon :class="iconProps.class" />
                          </template>
                          <template #toggleicon="iconProps">
                            <ChevronRightIcon :class="iconProps.class" />
                          </template>
                          <div
                            class="flex flex-col items-center justify-center gap-md rounded-md py-10 px-md"
                            style="background-color: #FDFDFD;"
                          >
                            <div class="flex items-center justify-center rounded-full bg-info-soft p-2.5">
                              <KeyIcon class="size-4 text-info-base" />
                            </div>
                            <p class="text-body-md text-neutral-muted text-center">
                              No credentials are currently linked.
                            </p>
                            <PvButton
                              label="Link Credentials"
                              severity="secondary"
                              variant="outlined"
                              size="small"
                              @click="openLinkCredentialsDialog"
                            />
                          </div>
                        </CollapsiblePanel>

                        <CollapsiblePanel
                          id="add-website-section-user-permissions"
                          v-model:collapsed="addWebsiteUserPermissionsCollapsed"
                          header="User Permissions"
                          toggleable
                        >
                          <template #titleicon="iconProps">
                            <UserGroupIcon :class="iconProps.class" />
                          </template>
                          <template #toggleicon="iconProps">
                            <ChevronRightIcon :class="iconProps.class" />
                          </template>
                          <div
                            class="flex flex-col items-center justify-center gap-md rounded-md py-10 px-md"
                            style="background-color: #FDFDFD;"
                          >
                            <div class="flex items-center justify-center rounded-full bg-info-soft p-2.5">
                              <UserGroupIcon class="size-4 text-info-base" />
                            </div>
                            <p class="text-body-md text-neutral-muted text-center">
                              Add users to this website to grant access.
                            </p>
                            <PvButton
                              label="Add Users"
                              severity="secondary"
                              variant="outlined"
                              size="small"
                              @click="openAddUsersDialog"
                            />
                          </div>
                        </CollapsiblePanel>

                        <CollapsiblePanel
                          id="add-website-section-autofill-parameters"
                          v-model:collapsed="addWebsiteAutofillParametersCollapsed"
                          header="Autofill Parameters"
                          toggleable
                        >
                          <template #titleicon="iconProps">
                            <Cog6ToothIcon :class="iconProps.class" />
                          </template>
                          <template #toggleicon="iconProps">
                            <ChevronRightIcon :class="iconProps.class" />
                          </template>
                          <div class="flex flex-col gap-lg">
                            <div class="flex flex-col gap-lg">
                              <div class="flex flex-col gap-1">
                                <span class="text-body-sm-semi-bold text-neutral-base">Field Selectors</span>
                                <span class="text-body-xs text-neutral-subtle">
                                  Provide the CSS selectors for the login from elements. Use the inspector tool in your browser to find them.
                                </span>
                              </div>
                              <div class="grid grid-cols-2 gap-md">
                                <FormField label="Username/ email field selector">
                                  <template #default="{ inputId }">
                                    <PvInputText
                                      :id="inputId"
                                      v-model="addWebsiteForm.usernameSelector"
                                      class="w-full"
                                    />
                                  </template>
                                </FormField>
                                <FormField label="Password field selector">
                                  <template #default="{ inputId }">
                                    <PvInputText
                                      :id="inputId"
                                      v-model="addWebsiteForm.passwordSelector"
                                      class="w-full"
                                    />
                                  </template>
                                </FormField>
                              </div>
                              <div class="grid grid-cols-2 gap-md">
                                <FormField label="Next button selector">
                                  <template #default="{ inputId }">
                                    <PvInputText
                                      :id="inputId"
                                      v-model="addWebsiteForm.nextButtonSelector"
                                      class="w-full"
                                    />
                                  </template>
                                </FormField>
                                <FormField label="Login button Selector">
                                  <template #default="{ inputId }">
                                    <PvInputText
                                      :id="inputId"
                                      v-model="addWebsiteForm.loginButtonSelector"
                                      class="w-full"
                                    />
                                  </template>
                                </FormField>
                              </div>
                              <FormField label="Field selector to hide">
                                <template #default="{ inputId }">
                                  <PvTextarea
                                    :id="inputId"
                                    v-model="addWebsiteForm.fieldSelectorToHide"
                                    :rows="3"
                                    class="w-full"
                                  />
                                </template>
                              </FormField>
                            </div>
                            <PvDivider />
                            <div class="flex flex-col gap-lg">
                              <div class="flex flex-col gap-1">
                                <span class="text-body-sm-semi-bold text-neutral-base">Behaviors &amp; Timing</span>
                                <span class="text-body-xs text-neutral-subtle">
                                  Adjust how the extension interacts with the page.
                                </span>
                              </div>
                              <div class="grid grid-cols-2 gap-md">
                                <FormField
                                  label="Delay after clicking next button (seconds)"
                                  labelTooltip="Time to wait after clicking the next button before continuing."
                                  helpText="Recommended: 1\u20132 seconds."
                                >
                                  <template #default="{ inputId }">
                                    <PvInputText
                                      :id="inputId"
                                      v-model="addWebsiteForm.delayAfterNext"
                                      class="w-full"
                                    />
                                  </template>
                                </FormField>
                                <FormField
                                  label="Fill delay (seconds)"
                                  labelTooltip="Time to wait before autofilling the form fields."
                                  helpText="Recommended: 0\u20131 seconds."
                                >
                                  <template #default="{ inputId }">
                                    <PvInputText
                                      :id="inputId"
                                      v-model="addWebsiteForm.fillDelay"
                                      class="w-full"
                                    />
                                  </template>
                                </FormField>
                              </div>
                              <CheckboxWithLabel v-model="addWebsiteForm.fillMultipleTimes" :binary="true">
                                <template #label>Fill in fields more than once</template>
                              </CheckboxWithLabel>
                              <CheckboxWithLabel v-model="addWebsiteForm.automaticLogin" :binary="true">
                                <template #label>Automatic Login</template>
                              </CheckboxWithLabel>
                            </div>
                          </div>
                        </CollapsiblePanel>
                      </div>

                      <nav
                        class="sticky top-0 shrink-0"
                        style="width: 180px;"
                        aria-label="Page sections"
                      >
                        <!-- Anchor nav — matches Figma Password Vault (node 187:53567): 1px track, 2px row gap, 32px row height, active = 2×16px bar -->
                        <div class="relative">
                          <span
                            class="pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-neutral-default_solid"
                            aria-hidden="true"
                          />
                          <ul class="relative m-0 flex list-none flex-col gap-0.5 py-1 p-0">
                            <li
                              v-for="section in addWebsiteSections"
                              :key="section.id"
                              class="relative flex h-8 shrink-0 items-stretch"
                            >
                              <button
                                type="button"
                                class="relative flex h-full min-h-0 w-full cursor-pointer items-center border-0 bg-transparent px-md text-left outline-none"
                                @click="goToAddWebsiteSection(section.id)"
                              >
                                <span
                                  v-if="addWebsiteActiveSection === section.id"
                                  class="pointer-events-none absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r-xs bg-branding-base"
                                  aria-hidden="true"
                                />
                                <!-- Figma Body S: 12px / 16px line → Circuit text-body-sm-*; px-md = 16px horizontal padding -->
                                <span
                                  class="min-w-0 flex-1 truncate"
                                  :class="addWebsiteActiveSection === section.id
                                    ? 'text-body-sm-bold text-neutral-base'
                                    : 'text-body-sm-semi-bold text-neutral-muted hover:text-neutral-base'"
                                >
                                  {{ section.label }}
                                </span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>

                <div class="shrink-0 border-t border-neutral-default_solid bg-neutral-surface px-lg py-md flex justify-end gap-sm">
                  <PvButton
                    label="Cancel"
                    severity="secondary"
                    variant="text"
                    @click="closeAddWebsite"
                  />
                  <PvButton label="Save" @click="closeAddWebsite" />
                </div>
              </div>

              <PvDialog
                v-model:visible="showLinkCredentialsDialog"
                :draggable="false"
                modal
                header="Link Credentials"
                :style="{ width: '672px', maxWidth: 'min(672px, 96vw)' }"
                :pt="{
                  footer: {
                    class: 'border-t border-neutral-default_solid bg-neutral-surface min-h-16 items-stretch gap-sm px-md py-0',
                  },
                }"
                :ptOptions="{ mergeSections: true, mergeProps: true }"
                @update:visible="!$event && closeLinkCredentialsDialog()"
              >
                <template #closeicon><XMarkIcon /></template>
                <div class="flex w-full max-w-[640px] flex-col items-start gap-0 self-center">
                  <CircuitDataTable
                    :columns="linkCredentialsPickerColumns"
                    :data="linkCredentialsPickerData"
                    :card="true"
                    :scrollable="true"
                    scrollHeight="328px"
                    :paginator="true"
                    :rows="5"
                    dataKey="id"
                    :selection="linkCredentialsPickerSelection"
                    selectionMode="multiple"
                    @update:selection="linkCredentialsPickerSelection = $event"
                    :pt="{
                      root: { class: 'flex w-full flex-col' },
                      tableContainer: { class: 'overflow-auto' },
                      footer: { class: 'flex min-h-16 shrink-0 items-center border-t border-neutral-default_solid' },
                      headerCell: ({ context }) => {
                        const col = context?.column;
                        const field = col?.props?.field;
                        const isSelection = col?.props?.selectionMode || col?.selectionMode;
                        const isLastUsed = field === 'lastTimeUsed';
                        return {
                          class: [
                            'flex items-center px-2 h-16',
                            isSelection ? 'gap-0.5' : '',
                            isLastUsed ? 'justify-end' : '',
                          ]
                            .filter(Boolean)
                            .join(' '),
                        };
                      },
                      bodyCell: ({ context }) => {
                        const col = context?.column;
                        const field = col?.props?.field;
                        const isSelection = col?.props?.selectionMode || col?.selectionMode;
                        const isLastUsed = field === 'lastTimeUsed';
                        return {
                          class: [
                            'flex items-center px-2',
                            isSelection ? 'gap-0.5' : '',
                            isLastUsed ? 'justify-end' : '',
                          ]
                            .filter(Boolean)
                            .join(' '),
                        };
                      },
                      headerCheckbox: { class: 'flex items-center h-5' },
                      rowCheckbox: { class: 'flex items-center h-5' },
                    }"
                    :ptOptions="{ mergeSections: true, mergeProps: true }"
                  >
                    <template #toolbar>
                      <!-- Figma: table toolbox 672×64 Hug — toolbar row h-16 (64px), gap-4; content column max 640 -->
                      <div
                        class="flex h-16 w-full shrink-0 items-center gap-4 border-b border-neutral-default_solid self-stretch"
                      >
                        <PvButton label="Add">
                          <template #icon="iconProps">
                            <PlusIcon :class="iconProps.class" />
                          </template>
                        </PvButton>
                        <div class="min-w-0 flex-1 basis-[min(100%,240px)]">
                          <PvIconField>
                            <PvInputIcon>
                              <MagnifyingGlassIcon />
                            </PvInputIcon>
                            <PvInputText
                              v-model="linkCredentialsPickerSearch"
                              placeholder="Search"
                              class="w-full"
                            />
                            <PvInputIcon class="pointer-events-none">
                              <span class="text-body-md text-field-placeholder select-none" aria-hidden="true">/</span>
                            </PvInputIcon>
                          </PvIconField>
                        </div>
                        <div class="flex min-w-48 shrink-0 items-center gap-2">
                          <FunnelIcon class="size-5 shrink-0 text-neutral-muted" aria-hidden="true" />
                          <PvSelect
                            v-model="linkCredentialsPickerFilter"
                            :options="linkCredentialsPickerFilterOptions"
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Credentials"
                            class="min-w-48 w-full!"
                          />
                        </div>
                      </div>
                    </template>
                  </CircuitDataTable>
                </div>
                <template #footer>
                  <div class="flex min-h-16 flex-1 items-center min-w-0" />
                  <div class="flex min-h-16 shrink-0 items-center gap-sm">
                    <PvButton
                      label="Cancel"
                      severity="secondary"
                      variant="text"
                      @click="closeLinkCredentialsDialog"
                    />
                    <PvButton label="Link Credentials" @click="closeLinkCredentialsDialog" />
                  </div>
                </template>
              </PvDialog>

              <PvDialog
                v-model:visible="showAddUsersDialog"
                :draggable="false"
                modal
                header="Add Users"
                :style="{ width: '672px', maxWidth: 'min(672px, 96vw)' }"
                :pt="{
                  footer: {
                    class: 'border-t border-neutral-default_solid bg-neutral-surface min-h-16 items-stretch gap-sm px-md py-0',
                  },
                }"
                :ptOptions="{ mergeSections: true, mergeProps: true }"
                @update:visible="!$event && closeAddUsersDialog()"
              >
                <template #closeicon><XMarkIcon /></template>
                <!-- Figma: content column 640×456 Hug — search row 64 + table 328 + paginator 64 -->
                <div class="flex w-full max-w-[640px] flex-col items-start gap-0 self-center">
                  <CircuitDataTable
                    :columns="addUsersPickerColumns"
                    :data="addUsersPickerDisplayData"
                    :card="true"
                    :scrollable="true"
                    scrollHeight="328px"
                    :paginator="true"
                    :rows="5"
                    dataKey="id"
                    :selection="addUsersPickerSelection"
                    selectionMode="multiple"
                    @update:selection="addUsersPickerSelection = $event"
                    :pt="{
                      root: { class: 'flex w-full flex-col' },
                      tableContainer: { class: 'overflow-auto' },
                      footer: { class: 'flex min-h-16 shrink-0 items-center border-t border-neutral-default_solid' },
                      headerCell: ({ context }) => {
                        const col = context?.column;
                        const isSelection = col?.props?.selectionMode || col?.selectionMode;
                        if (isSelection) {
                          return {
                            class: 'flex h-16 items-center gap-0.5 pl-2 pr-6',
                          };
                        }
                        return {
                          class:
                            'flex h-16 items-center pr-2 !ps-10',
                        };
                      },
                      bodyCell: ({ context }) => {
                        const col = context?.column;
                        const isSelection = col?.props?.selectionMode || col?.selectionMode;
                        if (isSelection) {
                          return {
                            class: 'flex items-center gap-0.5 pl-2 pr-6',
                          };
                        }
                        return {
                          class: 'flex items-center py-0 pr-2 !ps-10',
                        };
                      },
                      headerCheckbox: { class: 'flex items-center h-5' },
                      rowCheckbox: { class: 'flex items-center h-5' },
                    }"
                    :ptOptions="{ mergeSections: true, mergeProps: true }"
                  >
                    <template #toolbar>
                      <div
                        class="flex h-16 w-full shrink-0 items-center border-b border-neutral-default_solid self-stretch"
                      >
                        <div class="min-w-0 w-full">
                          <PvIconField>
                            <PvInputIcon>
                              <MagnifyingGlassIcon />
                            </PvInputIcon>
                            <PvInputText
                              v-model="addUsersPickerSearch"
                              placeholder="Search"
                              class="w-full"
                            />
                            <PvInputIcon class="pointer-events-none">
                              <span class="text-body-md text-field-placeholder select-none" aria-hidden="true">/</span>
                            </PvInputIcon>
                          </PvIconField>
                        </div>
                      </div>
                    </template>
                  </CircuitDataTable>
                </div>
                <template #footer>
                  <div class="flex min-h-16 flex-1 items-center min-w-0" />
                  <div class="flex min-h-16 shrink-0 items-center gap-sm">
                    <PvButton
                      label="Cancel"
                      severity="secondary"
                      variant="text"
                      @click="closeAddUsersDialog"
                    />
                    <PvButton label="Next" @click="closeAddUsersDialog" />
                  </div>
                </template>
              </PvDialog>

              <PvDialog
                v-model:visible="showVaultWebsitesFilterDialog"
                :draggable="false"
                modal
                header="Apply filters"
                :style="{ width: '560px' }"
                @update:visible="!$event && cancelVaultWebsitesFilters()"
              >
                <template #closeicon><XMarkIcon /></template>
                <div class="flex flex-col gap-md">
                  <FormField label="Tags">
                    <template #default="{ inputId }">
                      <PvMultiSelect
                        :id="inputId"
                        v-model="draftVaultWebsitesTags"
                        :options="vaultWebsitesTagOptions"
                        placeholder="All tags"
                        :maxSelectedLabels="2"
                        class="w-full"
                        :filter="true"
                        filterPlaceholder="Search tags..."
                        :showToggleAll="false"
                      />
                    </template>
                  </FormField>
                  <FormField label="Address">
                    <template #default="{ inputId }">
                      <PvInputText
                        :id="inputId"
                        v-model="draftVaultWebsitesAddress"
                        placeholder="Filter by domain or URL"
                        class="w-full"
                      />
                    </template>
                  </FormField>
                </div>
                <template #footer>
                  <div class="flex items-center flex-1 min-w-0">
                    <span class="text-body-sm text-neutral-subtle">{{ vaultWebsitesDraftFilterCount }} Filters applied</span>
                  </div>
                  <div class="flex gap-sm shrink-0">
                    <PvButton label="Cancel" severity="secondary" variant="text" @click="cancelVaultWebsitesFilters" />
                    <PvButton label="Clear All" severity="secondary" variant="outlined" @click="clearVaultWebsitesDraftFilters" />
                    <PvButton label="Apply" @click="applyVaultWebsitesFilters" />
                  </div>
                </template>
              </PvDialog>
            </ListPageLayout>

            <ListPageLayout
              v-else-if="passwordVaultTab === 'credentials'"
              class="w-full! h-full!"
            >
              <div class="flex flex-col h-full gap-lg">
                <div class="flex flex-col h-full relative">
                  <CircuitDataTable
                    :columns="vaultCredentialsColumns"
                    :data="vaultCredentialsData"
                    :card="true"
                    :scrollable="true"
                    scrollHeight="flex"
                    :paginator="true"
                    :rows="100"
                    :selection="vaultCredentialsSelection"
                    selectionMode="multiple"
                    @update:selection="vaultCredentialsSelection = $event"
                    :pt="{
                      root: { class: 'flex flex-col h-full min-h-0' },
                      tableContainer: { class: 'flex-1 min-h-0 overflow-auto' },
                      footer: { class: 'shrink-0' },
                    }"
                    :ptOptions="{ mergeSections: true, mergeProps: true }"
                  >
                    <template #toolbar>
                      <DataTableToolbar
                        addButtonLabel="Add"
                        :showAddButton="true"
                        :showFilterButton="true"
                        :showRefreshButton="false"
                        :showColumnsButton="false"
                        :showDownloadButton="false"
                        :showSaveViewButton="false"
                        :activeFilters="vaultCredentialsFilterChips"
                        :maxVisibleFilters="5"
                        @add="openVaultCredentialsDialog"
                        @filter="openVaultCredentialsFilterDialog"
                        @clear-all="clearAllVaultCredentialsFilters"
                        @filter-remove="removeVaultCredentialsFilterChip"
                      />
                    </template>
                  </CircuitDataTable>
                </div>
              </div>

              <PvDialog
                v-model:visible="showVaultCredentialsFilterDialog"
                :draggable="false"
                modal
                header="Apply filters"
                :style="{ width: '560px' }"
                @update:visible="!$event && cancelVaultCredentialsFilters()"
              >
                <template #closeicon><XMarkIcon /></template>
                <div class="flex flex-col gap-md">
                  <FormField label="Tags">
                    <template #default="{ inputId }">
                      <PvMultiSelect
                        :id="inputId"
                        v-model="draftVaultCredentialsTags"
                        :options="vaultCredentialsTagOptions"
                        placeholder="All tags"
                        :maxSelectedLabels="2"
                        class="w-full"
                        :filter="true"
                        filterPlaceholder="Search tags..."
                        :showToggleAll="false"
                      />
                    </template>
                  </FormField>
                  <FormField label="Expiration Date">
                    <template #default="{ inputId }">
                      <PvInputText
                        :id="inputId"
                        v-model="draftVaultCredentialsExpirationDate"
                        placeholder="Filter by date"
                        class="w-full"
                      />
                    </template>
                  </FormField>
                </div>
                <template #footer>
                  <div class="flex items-center flex-1 min-w-0">
                    <span class="text-body-sm text-neutral-subtle">{{ vaultCredentialsDraftFilterCount }} Filters applied</span>
                  </div>
                  <div class="flex gap-sm shrink-0">
                    <PvButton label="Cancel" severity="secondary" variant="text" @click="cancelVaultCredentialsFilters" />
                    <PvButton label="Clear All" severity="secondary" variant="outlined" @click="clearVaultCredentialsDraftFilters" />
                    <PvButton label="Apply" @click="applyVaultCredentialsFilters" />
                  </div>
                </template>
              </PvDialog>
            </ListPageLayout>

            <ListPageLayout
              v-else-if="passwordVaultTab === 'folders'"
              class="w-full! h-full!"
            >
              <div class="flex flex-col h-full gap-lg">
                <div class="flex flex-col h-full relative">
                  <CircuitDataTable
                    :columns="vaultFoldersColumns"
                    :data="vaultFoldersData"
                    dataKey="id"
                    :card="true"
                    :scrollable="true"
                    scrollHeight="flex"
                    :paginator="true"
                    :rows="100"
                    :selection="vaultFoldersSelection"
                    selectionMode="multiple"
                    @update:selection="vaultFoldersSelection = $event"
                    :pt="{
                      root: { class: 'flex flex-col h-full min-h-0' },
                      tableContainer: { class: 'flex-1 min-h-0 overflow-auto' },
                      footer: { class: 'shrink-0' },
                    }"
                    :ptOptions="{ mergeSections: true, mergeProps: true }"
                  >
                    <template #toolbar>
                      <DataTableToolbar
                        addButtonLabel="New"
                        :showAddButton="true"
                        :showFilterButton="false"
                        :showRefreshButton="false"
                        :showColumnsButton="false"
                        :showDownloadButton="false"
                        :showSaveViewButton="false"
                        @add="openVaultNewFolder"
                      />
                    </template>
                  </CircuitDataTable>
                </div>
              </div>
            </ListPageLayout>

            <ListPageLayout
              v-else-if="passwordVaultTab === 'users'"
              class="w-full! h-full!"
            >
              <div class="flex flex-col h-full gap-lg min-h-0">
                <!-- Toolbar only over the table column; table + resources share one row (no built-in paginator). -->
                <div class="w-full shrink-0 lg:max-w-[600px]">
                  <DataTableToolbar
                    addButtonLabel="Add"
                    :showAddButton="true"
                    :showFilterButton="false"
                    :showRefreshButton="false"
                    :showColumnsButton="false"
                    :showDownloadButton="false"
                    :showSaveViewButton="false"
                    @add="openVaultUsersAdd"
                  />
                </div>
                <div
                  class="grid w-full grid-cols-1 items-stretch gap-y-4 lg:grid-cols-[minmax(0,600px)_minmax(0,600px)] lg:gap-x-6 lg:gap-y-0"
                >
                  <div class="flex min-h-[400px] min-w-0 flex-col lg:min-h-0">
                    <CircuitDataTable
                      :columns="vaultUserGroupsColumns"
                      :data="vaultUserGroupsPageData"
                      dataKey="id"
                      :card="true"
                      :scrollable="false"
                      :paginator="false"
                      :selection="vaultUserGroupsSelection"
                      selectionMode="multiple"
                      @update:selection="vaultUserGroupsSelection = $event"
                      :pt="{
                        root: { class: 'flex flex-col min-h-0' },
                        tableContainer: { class: 'min-h-0' },
                        footer: { class: 'shrink-0' },
                        headerCell: ({ context }) => {
                          const col = context?.column;
                          const props = col?.props ?? col;
                          const field = props?.field;
                          const isSel = props?.selectionMode || col?.selectionMode;
                          if (isSel) return { class: 'flex items-center h-12 px-2 gap-0.5' };
                          if (field === 'members') {
                            return {
                              class:
                                'min-h-12 p-0 text-start [&_[data-pc-section=columnheadercontent]]:flex [&_[data-pc-section=columnheadercontent]]:min-h-12 [&_[data-pc-section=columnheadercontent]]:w-full [&_[data-pc-section=columnheadercontent]]:items-center [&_[data-pc-section=columnheadercontent]]:justify-start [&_[data-pc-section=columnheadercontent]]:gap-sm [&_[data-pc-section=columnheadercontent]]:overflow-hidden [&_[data-pc-section=columnheadercontent]]:py-1.5 [&_[data-pc-section=columnheadercontent]]:px-2 [&_[data-pc-section=columnheadercontent]]:text-neutral-base',
                            };
                          }
                          return {};
                        },
                        bodyCell: ({ context }) => {
                          const col = context?.column;
                          const props = col?.props ?? col;
                          const field = props?.field;
                          const isSel = props?.selectionMode || col?.selectionMode;
                          if (isSel) return { class: 'flex items-center h-12 px-2 gap-0.5' };
                          if (field === 'members') return { class: 'p-0 text-start align-middle' };
                          return {};
                        },
                        headerCheckbox: { class: 'flex items-center h-5' },
                        rowCheckbox: { class: 'flex items-center h-5' },
                      }"
                      :ptOptions="{ mergeSections: true, mergeProps: true }"
                    />
                  </div>
                  <div
                    class="flex min-h-[320px] min-w-0 w-full flex-col items-center justify-center gap-6 self-stretch overflow-x-auto rounded-lg border border-neutral-default_solid bg-neutral-surface px-lg py-xl lg:min-h-0 lg:w-[600px] lg:max-w-[600px]"
                  >
                    <ClipboardDocumentListIcon class="size-16 shrink-0 text-neutral-subtle opacity-80" aria-hidden="true" />
                    <p
                      class="text-body-md leading-5 text-neutral-subtle text-center whitespace-nowrap px-md"
                    >
                      Resources will be displayed here after selecting a User Group
                    </p>
                  </div>
                </div>
                <div class="w-full shrink-0 lg:max-w-[600px]">
                  <PvPaginator
                    :first="vaultUserGroupsFirst"
                    :rows="vaultUserGroupsRows"
                    :totalRecords="vaultUserGroupsTotalRecords"
                    :rowsPerPageOptions="[10, 25, 50, 100]"
                    @page="onVaultUserGroupsPage"
                  />
                </div>
              </div>
            </ListPageLayout>

      </div>
    </template>

        <ListPageLayout
          v-else-if="currentPage === 'pam' && pamTab === 'blocking-rules'"
          class="w-full! h-full!"
        >
          <div class="flex flex-col h-full gap-lg">
            <div class="flex flex-col h-full relative">
              <CircuitDataTable
                :columns="blockingRulesColumns"
                :data="blockingRulesData"
                :card="true"
                :scrollable="true"
                scrollHeight="flex"
                :paginator="true"
                :rows="10"
              >
                <template #toolbar>
                  <DataTableToolbar
                    addButtonLabel="Add"
                    :showAddButton="true"
                    :showFilterButton="false"
                    :showRefreshButton="false"
                    :showColumnsButton="false"
                    :showDownloadButton="false"
                    :showSaveViewButton="false"
                  />
                </template>
              </CircuitDataTable>
            </div>
          </div>
        </ListPageLayout>

        <ListPageLayout
          v-else-if="currentPage === 'pam' && pamTab === 'session-history'"
          class="w-full! h-full!"
        >
          <div class="flex flex-col h-full gap-lg">
            <div class="flex flex-col h-full relative">
              <CircuitDataTable
                :columns="sessionHistoryColumns"
                :data="sessionHistoryData"
                :card="true"
                :scrollable="true"
                scrollHeight="flex"
                :paginator="true"
                :rows="10"
              >
                <template #toolbar>
                  <DataTableToolbar
                    :showAddButton="false"
                    :showFilterButton="false"
                    :showRefreshButton="false"
                    :showColumnsButton="false"
                    :showDownloadButton="true"
                    :showSaveViewButton="false"
                    :exportOptions="sessionHistoryExportOptions"
                  />
                </template>
              </CircuitDataTable>
            </div>
          </div>
        </ListPageLayout>

        <ListPageLayout
          v-else-if="currentPage === 'pam' && pamTab === 'jump-servers'"
          class="w-full! h-full!"
        >
          <div class="flex flex-col h-full gap-lg">
            <div class="flex flex-col h-full relative">
              <CircuitDataTable
                :columns="jumpServersColumns"
                :data="jumpServersData"
                :card="true"
                :scrollable="true"
                scrollHeight="flex"
                :paginator="true"
                :rows="10"
              >
                <template #toolbar>
                  <DataTableToolbar
                    addButtonLabel="Add"
                    :showAddButton="true"
                    :showFilterButton="false"
                    :showRefreshButton="false"
                    :showColumnsButton="false"
                    :showDownloadButton="false"
                    :showSaveViewButton="false"
                  />
                </template>
              </CircuitDataTable>
            </div>
          </div>
        </ListPageLayout>

        <ListPageLayout
          v-else-if="currentPage === 'pam' && pamTab === 'privileged-resources'"
          class="w-full! h-full!"
        >
          <div class="flex flex-col h-full relative -mt-2">
            <div class="mb-4">
              <PvSelectButton
                v-model="privilegedResourcesTab"
                :options="privilegedResourcesTabs"
                optionLabel="label"
                optionValue="value"
                :allowEmpty="false"
              />
            </div>
            <template v-if="privilegedResourcesTab === 'web-shield'">
              <div class="flex flex-col h-full min-h-0">
                <CircuitDataTable
                  :columns="resourceColumns"
                  :data="webShieldData"
                  :card="true"
                  :scrollable="true"
                  scrollHeight="flex"
                  :paginator="true"
                  :rows="100"
                  :pt="{
                    root: { class: 'flex flex-col h-full min-h-0' },
                    tableContainer: { class: 'flex-1 min-h-0 overflow-auto' },
                    footer: { class: 'shrink-0' },
                  }"
                  :ptOptions="{ mergeSections: true, mergeProps: true }"
                >
                  <template #toolbar>
                    <DataTableToolbar
                      addButtonLabel="Add"
                      :showAddButton="true"
                      :showFilterButton="true"
                      :showRefreshButton="false"
                      :showColumnsButton="false"
                      :showDownloadButton="false"
                      :showSaveViewButton="false"
                      :activeFilters="resourceFilterChips"
                      :maxVisibleFilters="5"
                      @add="openWebShieldDialog"
                      @filter="openResourceFilterDialog"
                      @clear-all="clearAllResourceFilters"
                      @filter-remove="removeResourceFilterChip"
                    />
                  </template>
                </CircuitDataTable>
              </div>
            </template>

            <template v-else-if="privilegedResourcesTab === 'servers'">
              <div class="flex flex-col h-full min-h-0">
                <CircuitDataTable
                  :columns="resourceColumns"
                  :data="serversData"
                  :card="true"
                  :scrollable="true"
                  scrollHeight="flex"
                  :paginator="true"
                  :rows="100"
                  :pt="{
                    root: { class: 'flex flex-col h-full min-h-0' },
                    tableContainer: { class: 'flex-1 min-h-0 overflow-auto' },
                    footer: { class: 'shrink-0' },
                  }"
                  :ptOptions="{ mergeSections: true, mergeProps: true }"
                >
                  <template #toolbar>
                    <DataTableToolbar
                      addButtonLabel="Add"
                      :showAddButton="true"
                      :showFilterButton="true"
                      :showRefreshButton="false"
                      :showColumnsButton="false"
                      :showDownloadButton="false"
                      :showSaveViewButton="false"
                      :activeFilters="resourceFilterChips"
                      :maxVisibleFilters="5"
                      @add="openServersDialog"
                      @filter="openResourceFilterDialog"
                      @clear-all="clearAllResourceFilters"
                      @filter-remove="removeResourceFilterChip"
                    />
                  </template>
                </CircuitDataTable>
              </div>
            </template>

            <template v-else-if="privilegedResourcesTab === 'privileged-credentials'">
              <div class="flex flex-col h-full relative">
                <template v-if="privilegedResourcesTab === 'privileged-credentials'">
                  <div class="flex flex-col h-full min-h-0">
                    <CircuitDataTable
                      :columns="credentialColumns"
                      :data="filteredCredentialsData"
                      :card="true"
                      :scrollable="true"
                      scrollHeight="flex"
                      :paginator="true"
                      :rows="100"
                      :pt="{
                        root: { class: 'flex flex-col h-full min-h-0' },
                        tableContainer: { class: 'flex-1 min-h-0 overflow-auto' },
                        footer: { class: 'shrink-0' },
                      }"
                      :ptOptions="{ mergeSections: true, mergeProps: true }"
                    >
                      <template #toolbar>
                        <DataTableToolbar
                          addButtonLabel="Add"
                          searchPlaceholder="Search"
                          :showAddButton="true"
                          :showFilterButton="true"
                          :showRefreshButton="false"
                          :showColumnsButton="false"
                          :showDownloadButton="false"
                          :showSaveViewButton="false"
                          :activeFilters="privilegedCredentialFilterChips"
                          :maxVisibleFilters="5"
                          @add="openPrivilegedCredentialDialog"
                          @search="handlePrivilegedCredentialSearch"
                          @filter="openPrivilegedCredentialFilterDialog"
                          @clear-all="clearAllPrivilegedCredentialFilters"
                          @filter-remove="removePrivilegedCredentialFilterChip"
                        />
                      </template>
                    </CircuitDataTable>
                  </div>
                </template>
              </div>
            </template>

            <template v-else>
              <div class="flex flex-col h-full min-h-0">
                <CircuitDataTable
                  :columns="databaseColumns"
                  :data="databasesData"
                  :card="true"
                  :scrollable="true"
                  scrollHeight="flex"
                  :paginator="true"
                  :rows="100"
                  :pt="{
                    root: { class: 'flex flex-col h-full min-h-0' },
                    tableContainer: { class: 'flex-1 min-h-0 overflow-auto' },
                    footer: { class: 'shrink-0' },
                  }"
                  :ptOptions="{ mergeSections: true, mergeProps: true }"
                >
                  <template #toolbar>
                    <DataTableToolbar
                      addButtonLabel="Add"
                      :showAddButton="true"
                      :showFilterButton="true"
                      :showRefreshButton="false"
                      :showColumnsButton="false"
                      :showDownloadButton="false"
                      :showSaveViewButton="false"
                      :activeFilters="resourceFilterChips"
                      :maxVisibleFilters="5"
                      @add="openDatabasesDialog"
                      @filter="openResourceFilterDialog"
                      @clear-all="clearAllResourceFilters"
                      @filter-remove="removeResourceFilterChip"
                    />
                  </template>
                </CircuitDataTable>
              </div>
            </template>
          </div>

          <PvDialog
            v-model:visible="showResourceFilterDialog"
            :draggable="false"
            modal
            header="Apply filters"
            :style="{ width: '560px' }"
            @update:visible="!$event && cancelResourceFilters()"
          >
            <template #closeicon><XMarkIcon /></template>
            <div class="flex flex-col gap-md">
              <FormField label="Status">
                <template #default="{ inputId }">
                  <PvSelectButton
                    :id="inputId"
                    v-model="draftResourceStatus"
                    :options="resourceStatusOptions"
                    optionLabel="label"
                    optionValue="value"
                    :allowEmpty="false"
                  />
                </template>
              </FormField>
              <FormField label="Connector">
                <template #default="{ inputId }">
                  <PvMultiSelect
                    :id="inputId"
                    v-model="draftResourceConnectors"
                    :options="connectorOptions"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="All connectors"
                    :maxSelectedLabels="2"
                    class="w-full"
                  />
                </template>
              </FormField>
              <FormField label="Jump Server">
                <template #default="{ inputId }">
                  <PvMultiSelect
                    :id="inputId"
                    v-model="draftResourceJumpServers"
                    :options="jumpServerOptions"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="All jump servers"
                    :maxSelectedLabels="2"
                    class="w-full"
                  />
                </template>
              </FormField>
            </div>
            <template #footer>
              <div class="flex items-center flex-1 min-w-0">
                <span class="text-body-sm text-neutral-subtle">{{ resourceDraftFilterCount }} Filters applied</span>
              </div>
              <div class="flex gap-sm shrink-0">
                <PvButton label="Cancel" severity="secondary" variant="text" @click="cancelResourceFilters" />
                <PvButton label="Clear All" severity="secondary" variant="outlined" @click="clearDraftResourceFilters" />
                <PvButton label="Apply" @click="applyResourceFilters" />
              </div>
            </template>
          </PvDialog>

          <PvDialog
            v-model:visible="showWebShieldDialog"
            :draggable="false"
            modal
            header="Add Web Shield"
            :style="{ width: '720px' }"
          >
            <template #closeicon><XMarkIcon /></template>
            <PvTabs v-model:value="webShieldDialogTab">
              <PvTabList>
                <PvTab value="general">General</PvTab>
                <PvTab value="credentials">Privileged Credentials</PvTab>
                <PvTab value="sharing">Sharing Preferences</PvTab>
                <PvTab value="extension">Extension Parameters</PvTab>
                <PvTab value="web-shield">Web Shield</PvTab>
              </PvTabList>
              <PvTabPanels>
                <PvTabPanel value="general">
                  <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                    <FormField label="Name">
                      <template #default="{ inputId }">
                        <PvInputText :id="inputId" v-model="webShieldForm.name" class="w-full" />
                      </template>
                    </FormField>
                    <FormField label="URI">
                      <template #default="{ inputId }">
                        <PvInputText :id="inputId" v-model="webShieldForm.uri" class="w-full" />
                      </template>
                    </FormField>
                    <FormField label="Connector">
                      <template #default="{ inputId }">
                        <PvSelect
                          :id="inputId"
                          v-model="webShieldForm.connector"
                          :options="connectorOptions"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Select connector"
                          class="w-full!"
                        />
                      </template>
                    </FormField>
                    <FormField label="Tags">
                      <template #default="{ inputId }">
                        <PvMultiSelect
                          :id="inputId"
                          v-model="webShieldForm.tags"
                          :options="tagOptions"
                          placeholder="Select tags"
                          class="w-full"
                        />
                      </template>
                    </FormField>
                    <div class="col-span-2">
                      <CheckboxWithLabel v-model="webShieldForm.webShield" :binary="true">
                        <template #label>Web Shield</template>
                      </CheckboxWithLabel>
                    </div>
                    <FormField label="Notes" class="col-span-2">
                      <template #default="{ inputId }">
                        <PvTextarea :id="inputId" v-model="webShieldForm.notes" :rows="4" class="w-full" />
                      </template>
                    </FormField>
                  </div>
                </PvTabPanel>
                <PvTabPanel value="credentials">
                  <div class="flex flex-col gap-md">
                    <div class="flex gap-sm">
                      <PvButton
                        label="Add Existing"
                        severity="secondary"
                        variant="outlined"
                        size="small"
                        @click="showSelectExistingCredentialDialog = true"
                      />
                      <PvButton
                        label="Add New"
                        severity="secondary"
                        variant="outlined"
                        size="small"
                        @click="showAddNewCredentialDialog = true"
                      />
                    </div>
                  <div v-if="addedCredentials.length > 0" class="flex flex-col divide-y divide-neutral-default_solid border border-neutral-default_solid rounded-md overflow-hidden">
                    <div
                      v-for="(cred, index) in addedCredentials"
                      :key="cred.name"
                      class="flex items-center justify-between px-md py-sm"
                    >
                      <div class="flex flex-col">
                        <span class="text-body-sm-semi-bold text-neutral-base">{{ cred.name }}</span>
                        <span class="text-body-xs text-neutral-subtle">{{ cred.type }}</span>
                      </div>
                      <PvButton severity="secondary" variant="text" size="small" @click="addedCredentials.splice(index, 1)">
                        <template #icon><TrashIcon class="w-4 h-4" /></template>
                      </PvButton>
                    </div>
                  </div>
                  <div v-else class="text-body-sm text-neutral-subtle">No privileged credentials added yet.</div>
                  </div>

                  <!-- Select Existing Credential Dialog -->
                  <PvDialog
                    v-model:visible="showSelectExistingCredentialDialog"
                    :draggable="false"
                    modal
                    header="Select Privileged Credential"
                    :style="{ width: '560px' }"
                  >
                    <template #closeicon><XMarkIcon /></template>
                    <div class="flex flex-col gap-md">
                      <PvInputText v-model="existingCredentialSearch" placeholder="Search" class="w-full" />
                      <div class="flex flex-col divide-y divide-neutral-default_solid border border-neutral-default_solid rounded-md overflow-hidden max-h-64 overflow-y-auto">
                        <div
                          v-for="cred in filteredExistingCredentials"
                          :key="cred.name"
                          class="flex items-center gap-sm px-md py-sm cursor-pointer hover:bg-neutral-surface"
                          @click="selectedExistingCredentialId = cred.name"
                        >
                          <PvCheckbox :value="cred.name" v-model="selectedExistingCredentialId" :binary="false" />
                          <div class="flex flex-col">
                            <span class="text-body-sm-semi-bold text-neutral-base">{{ cred.name }}</span>
                            <span class="text-body-xs text-neutral-subtle">{{ cred.type }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <template #footer>
                      <PvButton label="Cancel" severity="secondary" variant="text" @click="showSelectExistingCredentialDialog = false" />
                      <PvButton label="Select" :disabled="!selectedExistingCredentialId" @click="confirmSelectExistingCredential" />
                    </template>
                  </PvDialog>

                  <!-- Add New Credential Dialog -->
                  <PvDialog
                    v-model:visible="showAddNewCredentialDialog"
                    :draggable="false"
                    modal
                    header="Add Privileged Credential"
                    :style="{ width: '480px' }"
                  >
                    <template #closeicon><XMarkIcon /></template>
                    <div class="flex flex-col gap-md">
                      <FormField label="Name">
                        <template #default="{ inputId }">
                          <PvInputText :id="inputId" v-model="newCredentialForm.name" placeholder="Credential name" class="w-full" />
                        </template>
                      </FormField>
                      <FormField label="Type">
                        <template #default="{ inputId }">
                          <PvSelect
                            :id="inputId"
                            v-model="newCredentialForm.type"
                            :options="['Password', 'SSH Key']"
                            class="w-full"
                          />
                        </template>
                      </FormField>
                      <FormField label="Username">
                        <template #default="{ inputId }">
                          <PvInputText :id="inputId" v-model="newCredentialForm.username" placeholder="Username" class="w-full" />
                        </template>
                      </FormField>
                      <FormField :label="newCredentialForm.type === 'SSH Key' ? 'Private Key' : 'Password'">
                        <template #default="{ inputId }">
                          <PvInputText :id="inputId" v-model="newCredentialForm.secret" placeholder="Enter value" class="w-full" />
                        </template>
                      </FormField>
                    </div>
                    <template #footer>
                      <PvButton label="Cancel" severity="secondary" variant="text" @click="showAddNewCredentialDialog = false" />
                      <PvButton label="Save" :disabled="!newCredentialForm.name" @click="confirmAddNewCredential" />
                    </template>
                  </PvDialog>
                </PvTabPanel>
                <PvTabPanel value="sharing">
                  <div class="flex flex-col gap-md">
                    <div class="flex gap-sm">
                      <PvButton
                        :label="\`Users (\${selectedSharingUsers.length})\`"
                        :severity="sharingTab === 'users' ? 'primary' : 'secondary'"
                        :variant="sharingTab === 'users' ? undefined : 'outlined'"
                        size="small"
                        @click="sharingTab = 'users'; sharingSearch = ''"
                      />
                      <PvButton
                        :label="\`User Groups (\${selectedSharingGroups.length})\`"
                        :severity="sharingTab === 'groups' ? 'primary' : 'secondary'"
                        :variant="sharingTab === 'groups' ? undefined : 'outlined'"
                        size="small"
                        @click="sharingTab = 'groups'; sharingSearch = ''"
                      />
                    </div>
                    <PvInputText
                      v-model="sharingSearch"
                      placeholder="Search"
                      class="w-full"
                    />
                    <div v-if="sharingTab === 'users'" class="flex flex-col divide-y divide-neutral-default_solid border border-neutral-default_solid rounded-md overflow-hidden">
                      <div
                        v-for="user in filteredSharingUsers"
                        :key="user.id"
                        class="flex items-center gap-sm px-md py-sm"
                      >
                        <PvCheckbox :value="user.id" v-model="selectedSharingUsers" />
                        <div class="flex flex-col">
                          <span class="text-body-sm-semi-bold text-neutral-base">{{ user.name }}</span>
                          <span class="text-body-xs text-neutral-subtle">{{ user.email }}</span>
                        </div>
                      </div>
                    </div>
                    <div v-else class="flex flex-col divide-y divide-neutral-default_solid border border-neutral-default_solid rounded-md overflow-hidden">
                      <div
                        v-for="group in filteredSharingGroups"
                        :key="group.id"
                        class="flex items-center gap-sm px-md py-sm"
                      >
                        <PvCheckbox :value="group.id" v-model="selectedSharingGroups" />
                        <span class="text-body-sm text-neutral-base">{{ group.name }}</span>
                      </div>
                    </div>
                  </div>
                </PvTabPanel>
                <PvTabPanel value="extension">
                  <div class="text-body-md text-neutral-subtle">Extension parameters go here.</div>
                </PvTabPanel>
                <PvTabPanel value="web-shield">
                  <div class="text-body-md text-neutral-subtle">Web Shield settings go here.</div>
                </PvTabPanel>
              </PvTabPanels>
            </PvTabs>
            <template #footer>
              <div class="flex items-center w-full"></div>
              <div class="flex gap-sm">
                <PvButton label="Cancel" severity="secondary" variant="text" @click="showWebShieldDialog = false" />
                <PvButton label="Save" />
              </div>
            </template>
          </PvDialog>

          <PvDialog
            v-model:visible="showServersDialog"
            :draggable="false"
            modal
            header="Add Server"
            :style="{ width: '720px' }"
          >
            <template #closeicon><XMarkIcon /></template>
            <PvTabs v-model:value="serversDialogTab">
              <PvTabList>
                <PvTab value="general">General</PvTab>
                <PvTab value="credentials">Privileged Credentials</PvTab>
                <PvTab value="sharing">Sharing Preferences</PvTab>
              </PvTabList>
              <PvTabPanels>
                <PvTabPanel value="general">
                  <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                    <FormField label="Name">
                      <template #default="{ inputId }">
                        <PvInputText :id="inputId" v-model="serverForm.name" class="w-full" />
                      </template>
                    </FormField>
                    <FormField label="IP/Hostname">
                      <template #default="{ inputId }">
                        <PvInputText :id="inputId" v-model="serverForm.address" class="w-full" />
                      </template>
                    </FormField>
                    <FormField label="Pool">
                      <template #default="{ inputId }">
                        <PvSelect
                          :id="inputId"
                          v-model="serverForm.pool"
                          :options="poolOptions"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Select pool"
                          class="w-full!"
                        />
                      </template>
                    </FormField>
                    <FormField label="Connector">
                      <template #default="{ inputId }">
                        <PvSelect
                          :id="inputId"
                          v-model="serverForm.connector"
                          :options="connectorOptions"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Select connector"
                          class="w-full!"
                        />
                      </template>
                    </FormField>
                    <FormField label="Operating System">
                      <template #default="{ inputId }">
                        <PvSelect
                          :id="inputId"
                          v-model="serverForm.os"
                          :options="osOptions"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Select OS"
                          class="w-full!"
                        />
                      </template>
                    </FormField>
                    <FormField label="Protocol">
                      <template #default="{ inputId }">
                        <PvSelect
                          :id="inputId"
                          v-model="serverForm.protocol"
                          :options="protocolOptions"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Select protocol"
                          class="w-full!"
                        />
                      </template>
                    </FormField>
                    <FormField label="Port">
                      <template #default="{ inputId }">
                        <PvInputText :id="inputId" v-model="serverForm.port" class="w-full" />
                      </template>
                    </FormField>
                    <div class="col-span-2 flex flex-col gap-sm">
                      <CheckboxWithLabel v-model="serverForm.recordVideo" :binary="true">
                        <template #label>Record Video</template>
                      </CheckboxWithLabel>
                      <CheckboxWithLabel v-model="serverForm.disableClipboard" :binary="true">
                        <template #label>Disable Clipboard</template>
                      </CheckboxWithLabel>
                      <CheckboxWithLabel v-model="serverForm.disableFileTransfer" :binary="true">
                        <template #label>Disable File Transfer</template>
                      </CheckboxWithLabel>
                      <CheckboxWithLabel v-model="serverForm.remoteApp" :binary="true">
                        <template #label>Remote App</template>
                      </CheckboxWithLabel>
                    </div>
                    <FormField label="Security" class="col-span-2">
                      <template #default>
                        <PvRadioButtonGroup v-model="serverForm.security" class="flex-col gap-sm">
                          <RadioButtonWithLabel value="Auto"><template #label>Auto</template></RadioButtonWithLabel>
                          <RadioButtonWithLabel value="NLA"><template #label>NLA</template></RadioButtonWithLabel>
                          <RadioButtonWithLabel value="NLA Extended"><template #label>NLA Extended</template></RadioButtonWithLabel>
                          <RadioButtonWithLabel value="TLS"><template #label>TLS</template></RadioButtonWithLabel>
                          <RadioButtonWithLabel value="VMConnect"><template #label>VMConnect</template></RadioButtonWithLabel>
                          <RadioButtonWithLabel value="Legacy RDP"><template #label>Legacy RDP</template></RadioButtonWithLabel>
                        </PvRadioButtonGroup>
                      </template>
                    </FormField>
                    <FormField label="Tags" class="col-span-2">
                      <template #default="{ inputId }">
                        <PvMultiSelect
                          :id="inputId"
                          v-model="serverForm.tags"
                          :options="tagOptions"
                          placeholder="Select tags"
                          class="w-full"
                        />
                      </template>
                    </FormField>
                    <FormField label="Notes" class="col-span-2">
                      <template #default="{ inputId }">
                        <PvTextarea :id="inputId" v-model="serverForm.notes" :rows="4" class="w-full" />
                      </template>
                    </FormField>
                  </div>
                </PvTabPanel>
                <PvTabPanel value="credentials">
                  <div class="flex flex-col gap-md">
                    <div class="flex gap-sm">
                      <PvButton
                        label="Add Existing"
                        severity="secondary"
                        variant="outlined"
                        size="small"
                        @click="showSelectExistingCredentialDialog = true"
                      />
                      <PvButton
                        label="Add New"
                        severity="secondary"
                        variant="outlined"
                        size="small"
                        @click="showAddNewCredentialDialog = true"
                      />
                    </div>
                  <div v-if="addedCredentials.length > 0" class="flex flex-col divide-y divide-neutral-default_solid border border-neutral-default_solid rounded-md overflow-hidden">
                    <div
                      v-for="(cred, index) in addedCredentials"
                      :key="cred.name"
                      class="flex items-center justify-between px-md py-sm"
                    >
                      <div class="flex flex-col">
                        <span class="text-body-sm-semi-bold text-neutral-base">{{ cred.name }}</span>
                        <span class="text-body-xs text-neutral-subtle">{{ cred.type }}</span>
                      </div>
                      <PvButton severity="secondary" variant="text" size="small" @click="addedCredentials.splice(index, 1)">
                        <template #icon><TrashIcon class="w-4 h-4" /></template>
                      </PvButton>
                    </div>
                  </div>
                  <div v-else class="text-body-sm text-neutral-subtle">No privileged credentials added yet.</div>
                  </div>

                  <!-- Select Existing Credential Dialog -->
                  <PvDialog
                    v-model:visible="showSelectExistingCredentialDialog"
                    :draggable="false"
                    modal
                    header="Select Privileged Credential"
                    :style="{ width: '560px' }"
                  >
                    <template #closeicon><XMarkIcon /></template>
                    <div class="flex flex-col gap-md">
                      <PvInputText v-model="existingCredentialSearch" placeholder="Search" class="w-full" />
                      <div class="flex flex-col divide-y divide-neutral-default_solid border border-neutral-default_solid rounded-md overflow-hidden max-h-64 overflow-y-auto">
                        <div
                          v-for="cred in filteredExistingCredentials"
                          :key="cred.name"
                          class="flex items-center gap-sm px-md py-sm cursor-pointer hover:bg-neutral-surface"
                          @click="selectedExistingCredentialId = cred.name"
                        >
                          <PvCheckbox :value="cred.name" v-model="selectedExistingCredentialId" :binary="false" />
                          <div class="flex flex-col">
                            <span class="text-body-sm-semi-bold text-neutral-base">{{ cred.name }}</span>
                            <span class="text-body-xs text-neutral-subtle">{{ cred.type }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <template #footer>
                      <PvButton label="Cancel" severity="secondary" variant="text" @click="showSelectExistingCredentialDialog = false" />
                      <PvButton label="Select" :disabled="!selectedExistingCredentialId" @click="confirmSelectExistingCredential" />
                    </template>
                  </PvDialog>

                  <!-- Add New Credential Dialog -->
                  <PvDialog
                    v-model:visible="showAddNewCredentialDialog"
                    :draggable="false"
                    modal
                    header="Add Privileged Credential"
                    :style="{ width: '480px' }"
                  >
                    <template #closeicon><XMarkIcon /></template>
                    <div class="flex flex-col gap-md">
                      <FormField label="Name">
                        <template #default="{ inputId }">
                          <PvInputText :id="inputId" v-model="newCredentialForm.name" placeholder="Credential name" class="w-full" />
                        </template>
                      </FormField>
                      <FormField label="Type">
                        <template #default="{ inputId }">
                          <PvSelect
                            :id="inputId"
                            v-model="newCredentialForm.type"
                            :options="['Password', 'SSH Key']"
                            class="w-full"
                          />
                        </template>
                      </FormField>
                      <FormField label="Username">
                        <template #default="{ inputId }">
                          <PvInputText :id="inputId" v-model="newCredentialForm.username" placeholder="Username" class="w-full" />
                        </template>
                      </FormField>
                      <FormField :label="newCredentialForm.type === 'SSH Key' ? 'Private Key' : 'Password'">
                        <template #default="{ inputId }">
                          <PvInputText :id="inputId" v-model="newCredentialForm.secret" placeholder="Enter value" class="w-full" />
                        </template>
                      </FormField>
                    </div>
                    <template #footer>
                      <PvButton label="Cancel" severity="secondary" variant="text" @click="showAddNewCredentialDialog = false" />
                      <PvButton label="Save" :disabled="!newCredentialForm.name" @click="confirmAddNewCredential" />
                    </template>
                  </PvDialog>
                </PvTabPanel>
                <PvTabPanel value="sharing">
                  <div class="flex flex-col gap-md">
                    <div class="flex gap-sm">
                      <PvButton
                        :label="\`Users (\${selectedSharingUsers.length})\`"
                        :severity="sharingTab === 'users' ? 'primary' : 'secondary'"
                        :variant="sharingTab === 'users' ? undefined : 'outlined'"
                        size="small"
                        @click="sharingTab = 'users'; sharingSearch = ''"
                      />
                      <PvButton
                        :label="\`User Groups (\${selectedSharingGroups.length})\`"
                        :severity="sharingTab === 'groups' ? 'primary' : 'secondary'"
                        :variant="sharingTab === 'groups' ? undefined : 'outlined'"
                        size="small"
                        @click="sharingTab = 'groups'; sharingSearch = ''"
                      />
                    </div>
                    <PvInputText
                      v-model="sharingSearch"
                      placeholder="Search"
                      class="w-full"
                    />
                    <div v-if="sharingTab === 'users'" class="flex flex-col divide-y divide-neutral-default_solid border border-neutral-default_solid rounded-md overflow-hidden">
                      <div
                        v-for="user in filteredSharingUsers"
                        :key="user.id"
                        class="flex items-center gap-sm px-md py-sm"
                      >
                        <PvCheckbox :value="user.id" v-model="selectedSharingUsers" />
                        <div class="flex flex-col">
                          <span class="text-body-sm-semi-bold text-neutral-base">{{ user.name }}</span>
                          <span class="text-body-xs text-neutral-subtle">{{ user.email }}</span>
                        </div>
                      </div>
                    </div>
                    <div v-else class="flex flex-col divide-y divide-neutral-default_solid border border-neutral-default_solid rounded-md overflow-hidden">
                      <div
                        v-for="group in filteredSharingGroups"
                        :key="group.id"
                        class="flex items-center gap-sm px-md py-sm"
                      >
                        <PvCheckbox :value="group.id" v-model="selectedSharingGroups" />
                        <span class="text-body-sm text-neutral-base">{{ group.name }}</span>
                      </div>
                    </div>
                  </div>
                </PvTabPanel>
              </PvTabPanels>
            </PvTabs>
            <template #footer>
              <div class="flex items-center w-full"></div>
              <div class="flex gap-sm">
                <PvButton label="Cancel" severity="secondary" variant="text" @click="showServersDialog = false" />
                <PvButton label="Save" />
              </div>
            </template>
          </PvDialog>

          <PvDialog
            v-model:visible="showDatabasesDialog"
            :draggable="false"
            modal
            header="Add Database"
            :style="{ width: '720px' }"
          >
            <template #closeicon><XMarkIcon /></template>
            <PvTabs v-model:value="databasesDialogTab">
              <PvTabList>
                <PvTab value="general">General</PvTab>
                <PvTab value="credentials">Privileged Credentials</PvTab>
                <PvTab value="sharing">Sharing Preferences</PvTab>
              </PvTabList>
              <PvTabPanels>
                <PvTabPanel value="general">
                  <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                    <FormField label="Name">
                      <template #default="{ inputId }">
                        <PvInputText :id="inputId" v-model="databaseForm.name" class="w-full" />
                      </template>
                    </FormField>
                    <FormField label="Address">
                      <template #default="{ inputId }">
                        <PvInputText :id="inputId" v-model="databaseForm.address" class="w-full" />
                      </template>
                    </FormField>
                    <FormField label="Provider">
                      <template #default="{ inputId }">
                        <PvSelect
                          :id="inputId"
                          v-model="databaseForm.provider"
                          :options="providerOptions"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Select provider"
                          class="w-full!"
                        />
                      </template>
                    </FormField>
                    <FormField label="Connector">
                      <template #default="{ inputId }">
                        <PvSelect
                          :id="inputId"
                          v-model="databaseForm.connector"
                          :options="connectorOptions"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Select connector"
                          class="w-full!"
                        />
                      </template>
                    </FormField>
                    <FormField label="Port">
                      <template #default="{ inputId }">
                        <PvInputText :id="inputId" v-model="databaseForm.port" class="w-full" />
                      </template>
                    </FormField>
                    <FormField label="Tags">
                      <template #default="{ inputId }">
                        <PvMultiSelect
                          :id="inputId"
                          v-model="databaseForm.tags"
                          :options="tagOptions"
                          placeholder="Select tags"
                          class="w-full"
                        />
                      </template>
                    </FormField>
                    <FormField label="Notes" class="col-span-2">
                      <template #default="{ inputId }">
                        <PvTextarea :id="inputId" v-model="databaseForm.notes" :rows="4" class="w-full" />
                      </template>
                    </FormField>
                  </div>
                </PvTabPanel>
                <PvTabPanel value="credentials">
                  <div class="flex flex-col gap-md">
                    <div class="flex gap-sm">
                      <PvButton
                        label="Add Existing"
                        severity="secondary"
                        variant="outlined"
                        size="small"
                        @click="showSelectExistingCredentialDialog = true"
                      />
                      <PvButton
                        label="Add New"
                        severity="secondary"
                        variant="outlined"
                        size="small"
                        @click="showAddNewCredentialDialog = true"
                      />
                    </div>
                  <div v-if="addedCredentials.length > 0" class="flex flex-col divide-y divide-neutral-default_solid border border-neutral-default_solid rounded-md overflow-hidden">
                    <div
                      v-for="(cred, index) in addedCredentials"
                      :key="cred.name"
                      class="flex items-center justify-between px-md py-sm"
                    >
                      <div class="flex flex-col">
                        <span class="text-body-sm-semi-bold text-neutral-base">{{ cred.name }}</span>
                        <span class="text-body-xs text-neutral-subtle">{{ cred.type }}</span>
                      </div>
                      <PvButton severity="secondary" variant="text" size="small" @click="addedCredentials.splice(index, 1)">
                        <template #icon><TrashIcon class="w-4 h-4" /></template>
                      </PvButton>
                    </div>
                  </div>
                  <div v-else class="text-body-sm text-neutral-subtle">No privileged credentials added yet.</div>
                  </div>

                  <!-- Select Existing Credential Dialog -->
                  <PvDialog
                    v-model:visible="showSelectExistingCredentialDialog"
                    :draggable="false"
                    modal
                    header="Select Privileged Credential"
                    :style="{ width: '560px' }"
                  >
                    <template #closeicon><XMarkIcon /></template>
                    <div class="flex flex-col gap-md">
                      <PvInputText v-model="existingCredentialSearch" placeholder="Search" class="w-full" />
                      <div class="flex flex-col divide-y divide-neutral-default_solid border border-neutral-default_solid rounded-md overflow-hidden max-h-64 overflow-y-auto">
                        <div
                          v-for="cred in filteredExistingCredentials"
                          :key="cred.name"
                          class="flex items-center gap-sm px-md py-sm cursor-pointer hover:bg-neutral-surface"
                          @click="selectedExistingCredentialId = cred.name"
                        >
                          <PvCheckbox :value="cred.name" v-model="selectedExistingCredentialId" :binary="false" />
                          <div class="flex flex-col">
                            <span class="text-body-sm-semi-bold text-neutral-base">{{ cred.name }}</span>
                            <span class="text-body-xs text-neutral-subtle">{{ cred.type }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <template #footer>
                      <PvButton label="Cancel" severity="secondary" variant="text" @click="showSelectExistingCredentialDialog = false" />
                      <PvButton label="Select" :disabled="!selectedExistingCredentialId" @click="confirmSelectExistingCredential" />
                    </template>
                  </PvDialog>

                  <!-- Add New Credential Dialog -->
                  <PvDialog
                    v-model:visible="showAddNewCredentialDialog"
                    :draggable="false"
                    modal
                    header="Add Privileged Credential"
                    :style="{ width: '480px' }"
                  >
                    <template #closeicon><XMarkIcon /></template>
                    <div class="flex flex-col gap-md">
                      <FormField label="Name">
                        <template #default="{ inputId }">
                          <PvInputText :id="inputId" v-model="newCredentialForm.name" placeholder="Credential name" class="w-full" />
                        </template>
                      </FormField>
                      <FormField label="Type">
                        <template #default="{ inputId }">
                          <PvSelect
                            :id="inputId"
                            v-model="newCredentialForm.type"
                            :options="['Password', 'SSH Key']"
                            class="w-full"
                          />
                        </template>
                      </FormField>
                      <FormField label="Username">
                        <template #default="{ inputId }">
                          <PvInputText :id="inputId" v-model="newCredentialForm.username" placeholder="Username" class="w-full" />
                        </template>
                      </FormField>
                      <FormField :label="newCredentialForm.type === 'SSH Key' ? 'Private Key' : 'Password'">
                        <template #default="{ inputId }">
                          <PvInputText :id="inputId" v-model="newCredentialForm.secret" placeholder="Enter value" class="w-full" />
                        </template>
                      </FormField>
                    </div>
                    <template #footer>
                      <PvButton label="Cancel" severity="secondary" variant="text" @click="showAddNewCredentialDialog = false" />
                      <PvButton label="Save" :disabled="!newCredentialForm.name" @click="confirmAddNewCredential" />
                    </template>
                  </PvDialog>
                </PvTabPanel>
                <PvTabPanel value="sharing">
                  <div class="flex flex-col gap-md">
                    <div class="flex gap-sm">
                      <PvButton
                        :label="\`Users (\${selectedSharingUsers.length})\`"
                        :severity="sharingTab === 'users' ? 'primary' : 'secondary'"
                        :variant="sharingTab === 'users' ? undefined : 'outlined'"
                        size="small"
                        @click="sharingTab = 'users'; sharingSearch = ''"
                      />
                      <PvButton
                        :label="\`User Groups (\${selectedSharingGroups.length})\`"
                        :severity="sharingTab === 'groups' ? 'primary' : 'secondary'"
                        :variant="sharingTab === 'groups' ? undefined : 'outlined'"
                        size="small"
                        @click="sharingTab = 'groups'; sharingSearch = ''"
                      />
                    </div>
                    <PvInputText
                      v-model="sharingSearch"
                      placeholder="Search"
                      class="w-full"
                    />
                    <div v-if="sharingTab === 'users'" class="flex flex-col divide-y divide-neutral-default_solid border border-neutral-default_solid rounded-md overflow-hidden">
                      <div
                        v-for="user in filteredSharingUsers"
                        :key="user.id"
                        class="flex items-center gap-sm px-md py-sm"
                      >
                        <PvCheckbox :value="user.id" v-model="selectedSharingUsers" />
                        <div class="flex flex-col">
                          <span class="text-body-sm-semi-bold text-neutral-base">{{ user.name }}</span>
                          <span class="text-body-xs text-neutral-subtle">{{ user.email }}</span>
                        </div>
                      </div>
                    </div>
                    <div v-else class="flex flex-col divide-y divide-neutral-default_solid border border-neutral-default_solid rounded-md overflow-hidden">
                      <div
                        v-for="group in filteredSharingGroups"
                        :key="group.id"
                        class="flex items-center gap-sm px-md py-sm"
                      >
                        <PvCheckbox :value="group.id" v-model="selectedSharingGroups" />
                        <span class="text-body-sm text-neutral-base">{{ group.name }}</span>
                      </div>
                    </div>
                  </div>
                </PvTabPanel>
              </PvTabPanels>
            </PvTabs>
            <template #footer>
              <div class="flex items-center w-full"></div>
              <div class="flex gap-sm">
                <PvButton label="Cancel" severity="secondary" variant="text" @click="showDatabasesDialog = false" />
                <PvButton label="Save" />
              </div>
            </template>
          </PvDialog>
        </ListPageLayout>

        <ListPageLayout
          v-else-if="currentPage === 'pam' && pamTab === 'user-groups'"
          class="w-full! h-full!"
        >
          <div class="flex flex-col h-full gap-lg">
            <div class="flex flex-col h-full relative">
              <CircuitDataTable
                :columns="userGroupsColumns"
                :data="userGroupsData"
                :card="true"
                :scrollable="true"
                scrollHeight="flex"
                :paginator="true"
                :rows="10"
                :selection="selectedUserGroupRows"
                selectionMode="multiple"
                @update:selection="selectedUserGroupRows = $event"
              >
                <template #toolbar>
                  <div class="flex items-center gap-sm mb-2">
                    <DataTableToolbar
                      addButtonLabel="Add"
                      :showAddButton="true"
                      :showFilterButton="false"
                      :showRefreshButton="false"
                      :showColumnsButton="false"
                      :showDownloadButton="false"
                      :showSaveViewButton="false"
                      @add="showEnrollGroupsDialog = true"
                    />
                    <PvButton
                      v-if="selectedUserGroupRows.length > 0"
                      label="Remove Selected"
                      severity="danger"
                      variant="outlined"
                      size="small"
                      @click="removeSelectedUserGroups"
                    />
                  </div>
                </template>
              </CircuitDataTable>
            </div>
          </div>

          <PvDialog
            v-model:visible="showEnrollGroupsDialog"
            :draggable="false"
            modal
            header="Enroll User Groups"
            :style="{ width: '560px' }"
          >
            <template #closeicon><XMarkIcon /></template>
            <div class="flex flex-col gap-md">
              <PvInputText
                v-model="enrollGroupsSearch"
                placeholder="Search groups"
                class="w-full"
              />
              <div class="flex items-center gap-sm px-md py-sm border border-neutral-default_solid rounded-md">
                <PvCheckbox
                  :modelValue="allGroupsSelected"
                  :binary="true"
                  @change="toggleSelectAllGroups"
                />
                <span class="text-body-sm-semi-bold text-neutral-base">Select All</span>
              </div>
              <div class="flex flex-col divide-y divide-neutral-default_solid border border-neutral-default_solid rounded-md overflow-hidden">
                <div
                  v-for="group in filteredAvailableGroups"
                  :key="group.id"
                  class="flex items-center gap-sm px-md py-sm"
                >
                  <PvCheckbox
                    :value="group.id"
                    v-model="selectedGroupsToEnroll"
                  />
                  <span class="text-body-sm text-neutral-base">{{ group.name }}</span>
                </div>
              </div>
            </div>
            <template #footer>
              <PvButton label="Cancel" severity="secondary" variant="text" @click="showEnrollGroupsDialog = false" />
              <PvButton label="Enroll" :disabled="selectedGroupsToEnroll.length === 0" @click="enrollSelectedGroups" />
            </template>
          </PvDialog>
        </ListPageLayout>


        <ListPageLayout v-else class="w-full! h-full!">
          <div class="flex min-h-full w-full items-center justify-center">
            <div class="text-body-md text-neutral-subtle text-center px-lg max-w-2xl">
              {{ placeholderText }}
            </div>
          </div>
        </ListPageLayout>
      </div>
    </div>
  `,
});

const meta: Meta<typeof AdminPortalWithPasswordManagerStory> = {
  title: "Projects/Gabriel's Playground/Admin Portal/Admin Portal (PAM and Password Vault)",
  component: AdminPortalWithPasswordManagerStory,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof AdminPortalWithPasswordManagerStory>;

export const Default: Story = {};
