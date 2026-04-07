import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, defineComponent, markRaw, ref } from 'vue';
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
  RadioButtonWithLabel,
} from '@jumpcloud/circuit/components';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import RadioButtonGroup from 'primevue/radiobuttongroup';
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import Menu from 'primevue/menu';
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import Tabs from 'primevue/tabs';
import Textarea from 'primevue/textarea';
import {
  RocketLaunchIcon,
  HomeIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  BellIcon,
  UserIcon,
  UsersIcon,
  CommandLineIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CircleStackIcon,
  ChevronRightIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  EllipsisHorizontalIcon,
  GlobeAltIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  PowerIcon,
  PlayCircleIcon,
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
      { separator: true },
      { label: 'LDAP' },
      { label: 'RADIUS' },
    ],
  },
  {
    label: 'PAM',
    leftIcon: markRaw(ServerStackIcon),
    isNew: true,
    items: [
      { label: 'Privileged Resources', isNew: true },
      { label: 'Blocking Rules', isNew: true },
      { label: 'Session History', isNew: true },
      { label: 'Jump Servers', isNew: true },
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

const AdminPortalStory = defineComponent({
  name: 'AdminPortalStory',
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
    PvButton: Button,
    PvDialog: Dialog,
    PvInputText: InputText,
    PvTextarea: Textarea,
    PvSelect: Select,
    PvMultiSelect: MultiSelect,
    PvTabs: Tabs,
    PvTabList: TabList,
    PvTab: Tab,
    PvTabPanels: TabPanels,
    PvTabPanel: TabPanel,
    PvSelectButton: SelectButton,
    PvRadioButtonGroup: RadioButtonGroup,
    ChartBarSquareIcon,
    CircleStackIcon,
    ChevronRightIcon,
    GlobeAltIcon,
    NoSymbolIcon,
    PowerIcon,
    ServerIcon,
    ServerStackIcon,
    VideoCameraIcon,
    XMarkIcon,
  },
  setup() {
    const pamEnabled = ref(false);
    const passwordVaultEnabled = ref(false);
    const currentPage = ref('home');
    const activeItem = ref('home');
    const privilegedResourcesTab = ref('overview');
    const privilegedResourcesTabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'Web Shield', value: 'web-shield' },
      { label: 'Servers', value: 'servers' },
      { label: 'Databases', value: 'databases' },
    ];

    const pageKeyByLabel: Record<string, string> = {
      Home: 'home',
      'Password Vault': 'password-vault',
      PAM: 'pam-privileged-resources',
      'Privileged Resources': 'pam-privileged-resources',
      'Blocking Rules': 'pam-blocking-rules',
      'Session History': 'pam-session-history',
      'Jump Servers': 'pam-jump-servers',
    };

    const pageTitleByKey: Record<string, string> = {
      home: 'Home',
      'password-vault': 'Password Vault',
      'pam-privileged-resources': 'Privileged Resources',
      'pam-blocking-rules': 'Blocking Rules',
      'pam-session-history': 'Session History',
      'pam-jump-servers': 'Jump Servers',
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
      currentPage.value = pageKey;
      if (pageKey === 'pam-privileged-resources') {
        privilegedResourcesTab.value = 'overview';
      }
      setActiveItemFromLabel(activeLabel);
    }

    function goToSessionHistory() {
      goToPage('pam-session-history', 'Session History');
    }

    function onNavClick(processedItem: { item?: { label?: string } }) {
      const label = processedItem.item?.label?.trim() ?? '';
      if (!label) return;
      goToPage(pageKeyFromLabel(label), label);
    }

    const pageTitle = computed(() => pageTitleFromKey(currentPage.value));

    const isPamPage = computed(() => currentPage.value.startsWith('pam-'));
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
      goToPage('pam-privileged-resources', 'PAM');
    }

    const overlayConfig = computed(() => {
      if (showPasswordVaultOverlay.value) {
        return {
          title: 'Password Vault: Secure Credential Management',
          description:
            "Create, store, and protect user credentials, and centrally manage passwords using JumpCloud's Password Vault.",
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

    const availabilityTokenMapping: Record<string, { label: string; severity: string }> = {
      'In Use': { label: 'In Use', severity: 'danger' },
      Available: { label: 'Available', severity: 'success' },
    };

    const blockingSeverityTokenMapping = {
      Alert: { label: 'Alert', severity: 'warn' },
      Critical: { label: 'Critical', severity: 'danger' },
      Emergency: { label: 'Emergency', severity: 'danger' },
      Warning: { label: 'Warning', severity: 'warn' },
    };

    const sessionStatusTokenMapping = {
      Active: { label: 'Active', severity: 'success' },
      Ended: { label: 'Ended', severity: 'info' },
      Failed: { label: 'Failed', severity: 'danger' },
      Recording: { label: 'Recording', severity: 'info' },
    };

    const pamStatCards = [
      { header: 'Web Shield', value: '201', icon: markRaw(GlobeAltIcon) },
      { header: 'Servers', value: '158', icon: markRaw(ServerIcon) },
      { header: 'Databases', value: '298', icon: markRaw(CircleStackIcon) },
      { header: 'Active Sessions', value: '91', icon: markRaw(PowerIcon) },
      { header: 'Blocking Rules', value: '11', icon: markRaw(NoSymbolIcon) },
      { header: 'Jump Servers', value: '5', icon: markRaw(ArrowsRightLeftIcon) },
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
          return availabilityTokenMapping[status] ?? { label: status, severity: 'info' };
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
          return availabilityTokenMapping[status] ?? { label: status, severity: 'info' };
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
      { field: 'severity', header: 'Severity', component: markRaw(DataTableCellStatus), tokenMapping: blockingSeverityTokenMapping },
      { field: 'tags', header: 'Tags', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.tags }) },
      {
        field: 'actions',
        header: 'Actions',
        component: markRaw(ActionMenuCell),
        componentProps: () => ({ iconButtons: blockingRuleActionButtons, menuItems: [] }),
      },
    ];

    const sessionHistoryData = [
      { name: 'Finance Admin Console', sessionId: 'S-10291', connector: 'Connector-01', credential: 'aws-root', category: 'Website', email: 'gabriel.ramos@jumpcloud.com', start: 'Apr 6, 2026 09:42', end: 'Apr 6, 2026 10:01', status: 'Ended' },
      { name: 'Prod PostgreSQL', sessionId: 'S-10288', connector: 'Connector-02', credential: 'svc-pam', category: 'Computer', email: 'albert.weihermann@jumpcloud.com', start: 'Apr 6, 2026 08:12', end: 'Apr 6, 2026 08:54', status: 'Ended' },
      { name: 'HR Admin Console', sessionId: 'S-10277', connector: 'Connector-03', credential: 'hr-admin', category: 'Website', email: 'gabriel.ramos@jumpcloud.com', start: 'Apr 5, 2026 17:20', end: 'Apr 5, 2026 17:43', status: 'Ended' },
      { name: 'EU MSSQL', sessionId: 'S-10261', connector: 'Connector-04', credential: 'db-admin', category: 'Computer', email: 'albert.weihermann@jumpcloud.com', start: 'Apr 5, 2026 14:02', end: 'Apr 5, 2026 14:36', status: 'Failed' },
      { name: 'Payroll Admin Console', sessionId: 'S-10244', connector: 'Connector-01', credential: 'payroll-admin', category: 'Website', email: 'gabriel.ramos@jumpcloud.com', start: 'Apr 4, 2026 12:18', end: 'Apr 4, 2026 12:49', status: 'Ended' },
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
      { name: 'JS-AWS-E1', address: '10.14.8.10', connector: 'Connector-01', tags: 'AWS, Prod', lastConnection: 'Today 9:31 AM', status: 'In Use' },
      { name: 'JS-EU-DC', address: '10.22.17.40', connector: 'Connector-04', tags: 'EU, DC', lastConnection: 'Mar 24, 2026', status: 'Available' },
      { name: 'JS-PROD-01', address: '10.33.2.18', connector: 'Connector-02', tags: 'Prod, PCI', lastConnection: 'Today 8:45 AM', status: 'In Use' },
      { name: 'JS-LEGACY-01', address: '10.40.11.7', connector: 'Connector-05', tags: 'Legacy', lastConnection: 'Mar 20, 2026', status: 'Available' },
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
          return availabilityTokenMapping[status] ?? { label: status, severity: 'info' };
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
      privilegedResourcesTab,
      privilegedResourcesTabs,
      pageTitle,
      overlayConfig,
      overlayActive,
      pamStatCards,
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
      openWebShieldDialog,
      openServersDialog,
      openDatabasesDialog,
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
        <TopBar />
        <template v-if="currentPage === 'pam-privileged-resources' && !overlayConfig">
          <PageHeader
            :title="pageTitle"
            :tabs="privilegedResourcesTabs"
            :activeTab="privilegedResourcesTab"
            @update:activeTab="privilegedResourcesTab = $event"
          />
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
                style="width: 362px; height: 32px;"
              >
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="width: 134px; color: #4373C7; font-size: 14px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; font-family: 'SF Pro Text', sans-serif; line-height: normal;"
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <g clip-path="url(#clip0_21_35)">
                      <path d="M4.51175 12.7299L11.2701 5.97155L11.3474 11.9541C11.3536 12.4322 11.7509 12.8295 12.229 12.8357C12.7071 12.8419 13.0883 12.4607 13.0821 11.9826L12.9778 3.90376C12.9716 3.42565 12.5804 3.03449 12.1023 3.02831L4.02331 2.91168C3.5452 2.9055 3.16403 3.28668 3.1702 3.76479C3.17638 4.2429 3.56754 4.63406 4.04565 4.64023L10.0283 4.72978L3.26998 11.4881C2.93721 11.8209 2.94434 12.3726 3.28582 12.714C3.62731 13.0555 4.17897 13.0627 4.51175 12.7299Z" fill="#4373C7"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_21_35">
                        <rect width="16" height="16" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <PvButton
                  :label="overlayConfig.ctaLabel"
                  class="h-full"
                  style="width: 212px;"
                  @click="overlayConfig.onCta"
                />
              </div>
            </div>
          </div>
        </ListPageLayout>

        <DashboardPageLayout
          v-else-if="currentPage === 'pam-privileged-resources' && privilegedResourcesTab === 'overview'"
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

        <ListPageLayout
          v-else-if="currentPage === 'pam-privileged-resources'"
          class="w-full! h-full!"
        >
          <div class="flex flex-col h-full relative">
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
                <PvTab value="credentials">Credentials</PvTab>
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
                  <div class="text-body-md text-neutral-subtle">Credentials configuration goes here.</div>
                </PvTabPanel>
                <PvTabPanel value="sharing">
                  <div class="text-body-md text-neutral-subtle">Sharing preferences go here.</div>
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
                <PvTab value="credentials">Credentials</PvTab>
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
                  <div class="text-body-md text-neutral-subtle">Credentials configuration goes here.</div>
                </PvTabPanel>
                <PvTabPanel value="sharing">
                  <div class="text-body-md text-neutral-subtle">Sharing preferences go here.</div>
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
                <PvTab value="credentials">Credentials</PvTab>
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
                  <div class="text-body-md text-neutral-subtle">Credentials configuration goes here.</div>
                </PvTabPanel>
                <PvTabPanel value="sharing">
                  <div class="text-body-md text-neutral-subtle">Sharing preferences go here.</div>
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

        <ListPageLayout v-else-if="currentPage === 'pam-blocking-rules'" class="w-full! h-full!">
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
                  addButtonLabel="Add Blocking Rule"
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
        </ListPageLayout>

        <ListPageLayout v-else-if="currentPage === 'pam-session-history'" class="w-full! h-full!">
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
        </ListPageLayout>

        <ListPageLayout v-else-if="currentPage === 'pam-jump-servers'" class="w-full! h-full!">
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

const meta: Meta<typeof AdminPortalStory> = {
  title: "Projects/Gabriel's Playground/Admin Portal/PAM and Password Manager",
  component: AdminPortalStory,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof AdminPortalStory>;

export const Default: Story = {};
