import type { Meta, StoryObj } from '@storybook/vue3';
import type { Component, PropType } from 'vue';
import { ref, computed, watch, markRaw, defineComponent, h } from 'vue';
import {
  AppNavigation,
  CollapsiblePanel,
  DataTable as CircuitDataTable,
  DataTableCellLink,
  DataTableCellStatus,
  DataTableToolbar,
  DataTableCellText,
  FormField,
  Password,
  Paginator,
  PageHeader,
  ToastNotification,
} from '@jumpcloud/circuit/components';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import ListPageLayout from '@/components/layout/page-layouts/ListPageLayout.vue';
import DashboardPageLayout from '@/components/layout/page-layouts/DashboardPageLayout.vue';
import DashboardStatCard from '@/stories/projects/burak-agent0/features/agent0/dashboard/DashboardStatCard.vue';

import {
  ArrowLeftIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ChartBarSquareIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  CircleStackIcon,
  CommandLineIcon,
  EllipsisHorizontalIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  HomeIcon,
  KeyIcon,
  LockClosedIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  Square2StackIcon,
  Squares2X2Icon,
  ServerIcon,
  StarIcon as StarOutline,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import { BookmarkIcon, StarIcon as StarSolid } from '@heroicons/vue/24/solid';

import {
  SsoIcon,
  AccessIcon,
  CheckListIcon,
  PasswordManagerIcon,
} from '@jumpcloud/icons';

// ─── User Portal Navigation (flat, no nested items) ───

/** Sidebar for the classic User Portal "All Applications" area — no separate Privileged Resources nav item. */
const menuItemsAllApplications = [
  { label: 'All Applications', leftIcon: markRaw(SsoIcon) },
  { label: 'Password Vault', leftIcon: markRaw(LockClosedIcon) },
  { label: 'Requests', leftIcon: markRaw(AccessIcon) },
  { label: 'Tasks', leftIcon: markRaw(CheckListIcon) },
  { label: 'Security', leftIcon: markRaw(LockClosedIcon) },
];

const menuItemsPasswordVault = [
  { label: 'Home', leftIcon: markRaw(HomeIcon) },
  { label: 'Websites', leftIcon: markRaw(GlobeAltIcon) },
  { label: 'Credentials', leftIcon: markRaw(KeyIcon) },
  { label: 'Access Requests', leftIcon: markRaw(ClipboardDocumentCheckIcon) },
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
      { label: 'Logout', rightIcon: markRaw(ArrowRightStartOnRectangleIcon) },
      { separator: true },
      { label: 'Change Password' },
      { label: 'Go to Admin Portal', rightIcon: markRaw(ArrowTopRightOnSquareIcon) },
    ],
  },
];

// ─── Application Data ───

interface PortalApp {
  id: number;
  name: string;
  logoColor: string;
  logoInitial: string;
  type: 'sso' | 'bookmark' | 'website';
  favorite: boolean;
}

const initialApps: PortalApp[] = [
  { id: 1, name: '1Up Users', logoColor: '#4CAF50', logoInitial: '1U', type: 'sso', favorite: false },
  { id: 2, name: 'ADP', logoColor: '#D42027', logoInitial: 'ADP', type: 'sso', favorite: false },
  { id: 3, name: 'Approved Applications', logoColor: '#5C6BC0', logoInitial: 'AA', type: 'bookmark', favorite: false },
  { id: 4, name: 'Atlassian (Jira and Confluence)', logoColor: '#0052CC', logoInitial: 'A', type: 'sso', favorite: true },
  { id: 5, name: 'AWS Identity Center', logoColor: '#FF9900', logoInitial: 'AWS', type: 'sso', favorite: true },
  { id: 6, name: 'AWS Sales Demo Admin', logoColor: '#232F3E', logoInitial: 'AWS', type: 'sso', favorite: false },
  { id: 7, name: 'Codility', logoColor: '#7B1FA2', logoInitial: 'C', type: 'sso', favorite: false },
  { id: 8, name: 'Culture Amp', logoColor: '#F44336', logoInitial: 'CA', type: 'sso', favorite: false },
  { id: 9, name: 'Cursor', logoColor: '#37474F', logoInitial: 'C', type: 'bookmark', favorite: false },
  { id: 10, name: 'Datadog', logoColor: '#632CA6', logoInitial: 'DD', type: 'sso', favorite: true },
  { id: 11, name: 'Docker', logoColor: '#2496ED', logoInitial: 'D', type: 'sso', favorite: true },
  { id: 12, name: 'Egencia', logoColor: '#003B71', logoInitial: 'E', type: 'sso', favorite: false },
  { id: 13, name: 'Expensify', logoColor: '#1B8D17', logoInitial: 'E', type: 'sso', favorite: false },
  { id: 14, name: 'Figma', logoColor: '#F24E1E', logoInitial: 'F', type: 'sso', favorite: true },
  { id: 15, name: 'Firstbase', logoColor: '#000000', logoInitial: 'FB', type: 'sso', favorite: false },
  { id: 16, name: 'GCS Lab', logoColor: '#34A853', logoInitial: 'G', type: 'website', favorite: true },
  { id: 17, name: 'GCS Lab ProMax', logoColor: '#1A237E', logoInitial: 'X', type: 'website', favorite: false },
  { id: 18, name: 'GitHub', logoColor: '#24292F', logoInitial: 'GH', type: 'sso', favorite: true },
  { id: 19, name: 'Gong.io', logoColor: '#7C3AED', logoInitial: 'G', type: 'sso', favorite: false },
  { id: 20, name: 'Google Gemini App', logoColor: '#4285F4', logoInitial: 'G', type: 'bookmark', favorite: false },
  { id: 21, name: 'Google Workspace', logoColor: '#4285F4', logoInitial: 'GW', type: 'sso', favorite: false },
  { id: 22, name: 'Harness', logoColor: '#0078D4', logoInitial: 'H', type: 'sso', favorite: false },
  { id: 23, name: 'Internal API Docs', logoColor: '#00ACC1', logoInitial: 'JC', type: 'bookmark', favorite: true },
  { id: 24, name: 'JC Brand Logos', logoColor: '#455A64', logoInitial: 'JC', type: 'bookmark', favorite: true },
  { id: 25, name: 'JC Learning Hub', logoColor: '#1565C0', logoInitial: 'JC', type: 'website', favorite: false },
  { id: 26, name: 'Password Vault', logoColor: '#00897B', logoInitial: 'JC', type: 'sso', favorite: false },
  { id: 27, name: 'JumpCloud Employee Website', logoColor: '#00BFA5', logoInitial: 'JC', type: 'bookmark', favorite: false },
  { id: 28, name: 'JumpCloud Support Portal', logoColor: '#00838F', logoInitial: 'M', type: 'website', favorite: false },
  { id: 29, name: 'JumpDesk EU', logoColor: '#1E88E5', logoInitial: 'EU', type: 'website', favorite: false },
  { id: 30, name: 'JumpDesk PRD', logoColor: '#E53935', logoInitial: 'PRD', type: 'website', favorite: false },
  { id: 31, name: 'KnowBe4', logoColor: '#FF6F00', logoInitial: 'K4', type: 'sso', favorite: false },
  { id: 32, name: 'Lever', logoColor: '#455A64', logoInitial: 'L', type: 'sso', favorite: false },
  { id: 33, name: 'LinkedIn Learning', logoColor: '#0077B5', logoInitial: 'in', type: 'sso', favorite: false },
  { id: 34, name: 'Microsoft 365', logoColor: '#D83B01', logoInitial: 'M', type: 'sso', favorite: true },
  { id: 35, name: 'Parallels', logoColor: '#E4002B', logoInitial: 'P', type: 'sso', favorite: false },
  { id: 36, name: 'Salesforce', logoColor: '#00A1E0', logoInitial: 'SF', type: 'sso', favorite: true },
  { id: 37, name: 'Slack', logoColor: '#4A154B', logoInitial: 'S', type: 'sso', favorite: true },
  { id: 38, name: 'Snowflake', logoColor: '#29B5E8', logoInitial: 'S', type: 'sso', favorite: true },
  { id: 39, name: 'Zscaler', logoColor: '#0066CC', logoInitial: 'Z', type: 'sso', favorite: true },
  { id: 40, name: 'Linear', logoColor: '#5E6AD2', logoInitial: 'L', type: 'sso', favorite: false },
  {
    id: 41,
    name: 'AWS Documentation',
    logoColor: '#FF9900',
    logoInitial: 'AWS',
    type: 'bookmark',
    favorite: false,
  },
  { id: 42, name: 'AWS Status', logoColor: '#FF9900', logoInitial: 'AWS', type: 'bookmark', favorite: false },
  {
    id: 43,
    name: 'GitHub Status',
    logoColor: '#24292E',
    logoInitial: 'GH',
    type: 'bookmark',
    favorite: false,
  },
  {
    id: 44,
    name: 'Atlassian Status',
    logoColor: '#0052CC',
    logoInitial: 'AT',
    type: 'bookmark',
    favorite: false,
  },
  {
    id: 45,
    name: 'Company Wiki',
    logoColor: '#6366F1',
    logoInitial: 'WK',
    type: 'bookmark',
    favorite: false,
  },
  {
    id: 46,
    name: 'Security Policies',
    logoColor: '#EF4444',
    logoInitial: 'SP',
    type: 'bookmark',
    favorite: false,
  },
  {
    id: 47,
    name: 'Employee Handbook',
    logoColor: '#10B981',
    logoInitial: 'EH',
    type: 'bookmark',
    favorite: false,
  },
  {
    id: 48,
    name: 'Team Directory',
    logoColor: '#8B5CF6',
    logoInitial: 'TD',
    type: 'bookmark',
    favorite: false,
  },
  {
    id: 49,
    name: 'Holiday Calendar',
    logoColor: '#F59E0B',
    logoInitial: 'HC',
    type: 'bookmark',
    favorite: false,
  },
  {
    id: 50,
    name: 'Kubernetes Docs',
    logoColor: '#326CE5',
    logoInitial: 'K8S',
    type: 'bookmark',
    favorite: false,
  },
  {
    id: 51,
    name: 'Excalidraw',
    logoColor: '#6B7280',
    logoInitial: 'EX',
    type: 'bookmark',
    favorite: false,
  },
  {
    id: 52,
    name: 'draw.io',
    logoColor: '#F08705',
    logoInitial: 'DIO',
    type: 'bookmark',
    favorite: false,
  },
  {
    id: 53,
    name: 'JSON Formatter',
    logoColor: '#3B82F6',
    logoInitial: 'JSON',
    type: 'bookmark',
    favorite: false,
  },
  {
    id: 54,
    name: 'Incident Runbooks',
    logoColor: '#DC2626',
    logoInitial: 'IR',
    type: 'bookmark',
    favorite: false,
  },
  {
    id: 55,
    name: 'Org Chart',
    logoColor: '#059669',
    logoInitial: 'ORG',
    type: 'bookmark',
    favorite: false,
  },
];

// ─── Privileged Resource Data ───

type ResourceType = 'Server' | 'Database' | 'Bastion' | 'Web Shield';

interface PrivilegedResource {
  id: number;
  name: string;
  type: ResourceType;
  favorite: boolean;
  host?: string;
  url?: string;
  description?: string;
  logo?: string;
}

type UnifiedFavoriteItem =
  | { kind: 'app'; favoriteKey: string; app: PortalApp }
  | { kind: 'resource'; favoriteKey: string; resource: PrivilegedResource };

interface ListRow {
  id: string;
  name: string;
  type: string;
  favorite: boolean;
  kind: 'app' | 'resource';
  sourceId: number;
}

function privilegedResourceSearchText(r: PrivilegedResource): string {
  const parts = [r.name];
  if (r.type === 'Web Shield') {
    parts.push(r.url ?? '', r.description ?? '');
  } else {
    parts.push(r.host ?? '');
  }
  return parts.join(' ');
}

const initialPrivilegedResources: PrivilegedResource[] = [
  { id: 1, name: 'Ubuntu Server', type: 'Server', host: 'api-01.prod.internal', favorite: true },
  { id: 2, name: 'PostgreSQL', type: 'Database', host: '10.0.2.12', favorite: true },
  { id: 3, name: 'Oracle', type: 'Database', host: 'oracle-db.internal', favorite: false },
  { id: 4, name: 'Windows Server', type: 'Server', host: '10.0.1.88', favorite: false },
  { id: 5, name: 'Redis', type: 'Database', host: 'redis-cache.internal', favorite: true },
  { id: 6, name: 'Debian', type: 'Server', host: 'staging-01.internal', favorite: false },
  { id: 7, name: 'MySQL', type: 'Database', host: '10.0.2.77', favorite: false },
  { id: 8, name: 'Ubuntu Server 24.04', type: 'Server', host: '10.0.2.54', favorite: true },
  { id: 9, name: 'Auth Server', type: 'Server', host: 'auth-01.prod.internal', logo: '/logos/ubuntu.png', favorite: true },
  { id: 10, name: 'DB Replica', type: 'Database', host: '10.0.2.91', logo: '/logos/postgre.png', favorite: true },
  { id: 11, name: 'Cache Server', type: 'Database', host: 'cache-01.internal', logo: '/logos/redis.png', favorite: false },
  { id: 12, name: 'Reporting DB', type: 'Database', host: '10.0.2.83', logo: '/logos/mysql.png', favorite: false },
  { id: 13, name: 'Backup Server', type: 'Server', host: 'backup-01.internal', logo: '/logos/debian.png', favorite: false },
  { id: 14, name: 'Monitoring DB', type: 'Database', host: '10.0.2.99', logo: '/logos/postgre.png', favorite: false },
  { id: 15, name: 'App Server', type: 'Server', host: 'app-01.prod.internal', logo: '/logos/ubuntu.png', favorite: true },
  { id: 16, name: 'Legacy DB', type: 'Database', host: 'oracle-legacy.internal', logo: '/logos/oracle.png', favorite: false },
  { id: 17, name: 'Dev Server', type: 'Server', host: '10.0.1.77', logo: '/logos/debian.png', favorite: true },
  { id: 18, name: 'Analytics DB', type: 'Database', host: 'analytics-02.internal', logo: '/logos/mysql.png', favorite: false },
  { id: 19, name: 'Windows Server 2', type: 'Server', host: 'win-srv-02.internal', logo: '/logos/windows-server.png', favorite: false },
  { id: 20, name: 'Windows Server 3', type: 'Server', host: '10.0.1.91', logo: '/logos/windows-server.png', favorite: false },
  { id: 21, name: 'Windows Server 4', type: 'Server', host: 'win-srv-04.internal', logo: '/logos/windows-server.png', favorite: false },
  { id: 22, name: 'Windows Server 5', type: 'Server', host: '10.0.1.103', logo: '/logos/windows-server.png', favorite: false },
  { id: 23, name: 'Windows Server 6', type: 'Server', host: 'win-srv-06.internal', logo: '/logos/windows-server.png', favorite: false },
  {
    id: 24,
    name: 'AWS Root Access',
    type: 'Web Shield',
    url: 'https://console.aws.amazon.com',
    description: 'AWS Management Console',
    logo: '/logos/aws.png',
    favorite: true,
  },
  {
    id: 25,
    name: 'Fortinet FortiGate',
    type: 'Web Shield',
    url: 'https://fortigate.internal',
    description: 'FortiGate firewall admin panel',
    favorite: false,
  },
  {
    id: 26,
    name: 'GitLab Admin',
    type: 'Web Shield',
    url: 'https://gitlab.internal/admin',
    description: 'GitLab instance administration panel',
    favorite: false,
  },
  {
    id: 27,
    name: 'Grafana',
    type: 'Web Shield',
    url: 'https://grafana.internal',
    description: 'Observability and monitoring dashboards',
    favorite: true,
  },
  {
    id: 28,
    name: 'Kibana',
    type: 'Web Shield',
    url: 'https://kibana.internal',
    description: 'Elasticsearch log visualization',
    favorite: false,
  },
  {
    id: 29,
    name: 'Kubernetes Dashboard',
    type: 'Web Shield',
    url: 'https://k8s-dashboard.internal',
    description: 'Kubernetes cluster management UI',
    favorite: false,
  },
  {
    id: 30,
    name: 'Palo Alto Firewall',
    type: 'Web Shield',
    url: 'https://firewall-01.internal',
    description: 'Next-gen firewall management console',
    favorite: false,
  },
  {
    id: 31,
    name: 'pfSense',
    type: 'Web Shield',
    url: 'https://pfsense.internal',
    description: 'pfSense firewall and router console',
    favorite: false,
  },
  {
    id: 32,
    name: 'Proxmox VE',
    type: 'Web Shield',
    url: 'https://proxmox-01.internal:8006',
    description: 'Proxmox Virtual Environment admin',
    logo: '/logos/proxmox.png',
    favorite: false,
  },
  {
    id: 33,
    name: 'Vault UI',
    type: 'Web Shield',
    url: 'https://vault.internal:8200',
    description: 'HashiCorp Vault web interface',
    favorite: true,
  },
  {
    id: 34,
    name: 'PostgreSQL 2',
    type: 'Database',
    host: '10.0.2.101',
    logo: '/logos/postgre.png',
    favorite: false,
  },
  {
    id: 35,
    name: 'PostgreSQL 3',
    type: 'Database',
    host: 'pg-03.prod.internal',
    logo: '/logos/postgre.png',
    favorite: false,
  },
  {
    id: 36,
    name: 'PostgreSQL 4',
    type: 'Database',
    host: '10.0.2.114',
    logo: '/logos/postgre.png',
    favorite: false,
  },
  {
    id: 37,
    name: 'PostgreSQL 5',
    type: 'Database',
    host: 'pg-05.prod.internal',
    logo: '/logos/postgre.png',
    favorite: false,
  },
  {
    id: 38,
    name: 'PostgreSQL 6',
    type: 'Database',
    host: '10.0.2.128',
    logo: '/logos/postgre.png',
    favorite: false,
  },
  {
    id: 39,
    name: 'Oracle 2',
    type: 'Database',
    host: 'oracle-02.internal',
    logo: '/logos/oracle.png',
    favorite: false,
  },
  {
    id: 40,
    name: 'Oracle 3',
    type: 'Database',
    host: '10.0.2.133',
    logo: '/logos/oracle.png',
    favorite: false,
  },
  {
    id: 41,
    name: 'Oracle 4',
    type: 'Database',
    host: 'oracle-04.internal',
    logo: '/logos/oracle.png',
    favorite: false,
  },
  {
    id: 42,
    name: 'Oracle 5',
    type: 'Database',
    host: '10.0.2.141',
    logo: '/logos/oracle.png',
    favorite: false,
  },
  {
    id: 43,
    name: 'Oracle 6',
    type: 'Database',
    host: 'oracle-06.internal',
    logo: '/logos/oracle.png',
    favorite: false,
  },
  {
    id: 44,
    name: 'Oracle 7',
    type: 'Database',
    host: '10.0.2.155',
    logo: '/logos/oracle.png',
    favorite: false,
  },
  {
    id: 45,
    name: 'Oracle 8',
    type: 'Database',
    host: 'oracle-08.internal',
    logo: '/logos/oracle.png',
    favorite: false,
  },
  {
    id: 46,
    name: 'Oracle 9',
    type: 'Database',
    host: '10.0.2.162',
    logo: '/logos/oracle.png',
    favorite: false,
  },
  {
    id: 47,
    name: 'Oracle 10',
    type: 'Database',
    host: 'oracle-10.internal',
    logo: '/logos/oracle.png',
    favorite: false,
  },
  {
    id: 48,
    name: 'Oracle 11',
    type: 'Database',
    host: '10.0.2.178',
    logo: '/logos/oracle.png',
    favorite: false,
  },
  {
    id: 49,
    name: 'AWS Root Console',
    type: 'Web Shield',
    url: 'https://console.aws.amazon.com/root',
    logo: '/logos/aws.png',
    favorite: false,
  },
  {
    id: 50,
    name: 'Kubernetes Dashboard 2',
    type: 'Web Shield',
    url: 'https://k8s-dashboard-02.internal',
    logo: '/logos/kubernetes.png',
    favorite: false,
  },
  {
    id: 51,
    name: 'Kubernetes Dashboard 3',
    type: 'Web Shield',
    url: 'https://k8s-dashboard-03.internal',
    logo: '/logos/kubernetes.png',
    favorite: false,
  },
  {
    id: 52,
    name: 'Kubernetes Dashboard 4',
    type: 'Web Shield',
    url: 'https://k8s-dashboard-04.internal',
    logo: '/logos/kubernetes.png',
    favorite: false,
  },
  {
    id: 53,
    name: 'Kubernetes Dashboard 5',
    type: 'Web Shield',
    url: 'https://k8s-dashboard-05.internal',
    logo: '/logos/kubernetes.png',
    favorite: false,
  },
  {
    id: 54,
    name: 'Kubernetes Dashboard 6',
    type: 'Web Shield',
    url: 'https://k8s-dashboard-06.internal',
    logo: '/logos/kubernetes.png',
    favorite: false,
  },
  {
    id: 55,
    name: 'Proxmox VE 2',
    type: 'Web Shield',
    url: 'https://proxmox-02.internal:8006',
    logo: '/logos/proxmox.png',
    favorite: false,
  },
];

// ─── Requests Data ───

type RequestType = 'Web Shield' | 'Database' | 'Server' | 'SSO' | 'Access';
type RequestCategory = 'privileged' | 'sso' | 'access';

interface RequestableResource {
  id: number;
  name: string;
  type: RequestType;
  category: RequestCategory;
  description: string;
}

const requestableResources: RequestableResource[] = [
  {
    id: 1,
    name: 'AWS Root Console',
    type: 'Web Shield',
    category: 'privileged',
    description: 'Access to AWS management console via browser isolation',
  },
  {
    id: 2,
    name: 'Prod PostgreSQL',
    type: 'Database',
    category: 'privileged',
    description: 'Production PostgreSQL database access',
  },
  {
    id: 3,
    name: 'Linux Bastion Server',
    type: 'Server',
    category: 'privileged',
    description: 'SSH access to production bastion host',
  },
  {
    id: 4,
    name: 'JC Admin Portal',
    type: 'Web Shield',
    category: 'privileged',
    description: 'Administrative access to JumpCloud admin portal',
  },
  {
    id: 5,
    name: 'Finance MySQL',
    type: 'Database',
    category: 'privileged',
    description: 'Access to finance reporting database',
  },
  {
    id: 6,
    name: 'Kubernetes Dashboard',
    type: 'Web Shield',
    category: 'privileged',
    description: 'Access to K8s cluster management dashboard',
  },
  {
    id: 7,
    name: 'EU Auth Server',
    type: 'Server',
    category: 'privileged',
    description: 'Access to EU region authentication server',
  },
  {
    id: 8,
    name: 'Snowflake Data Warehouse',
    type: 'Database',
    category: 'privileged',
    description: 'Access to analytics data warehouse',
  },
  {
    id: 9,
    name: 'Grafana Admin',
    type: 'Web Shield',
    category: 'privileged',
    description: 'Access to infrastructure monitoring dashboards',
  },
  {
    id: 10,
    name: 'PCI Compliance Server',
    type: 'Server',
    category: 'privileged',
    description: 'Access to PCI-scoped production server',
  },
  {
    id: 11,
    name: 'Google Workspace',
    type: 'SSO',
    category: 'sso',
    description: 'Request access to Google Workspace SSO application',
  },
  {
    id: 12,
    name: 'Slack',
    type: 'SSO',
    category: 'sso',
    description: 'Request access to Slack workspace',
  },
  {
    id: 13,
    name: 'Salesforce',
    type: 'SSO',
    category: 'sso',
    description: 'Request access to Salesforce SSO application',
  },
  {
    id: 14,
    name: 'GitHub',
    type: 'SSO',
    category: 'sso',
    description: 'Request access to GitHub organization',
  },
  {
    id: 15,
    name: 'Okta',
    type: 'SSO',
    category: 'sso',
    description: 'Request access to Okta admin portal',
  },
  {
    id: 16,
    name: 'Microsoft 365',
    type: 'SSO',
    category: 'sso',
    description: 'Request access to Microsoft 365 apps',
  },
  {
    id: 17,
    name: 'Figma',
    type: 'SSO',
    category: 'sso',
    description: 'Request access to Figma workspace',
  },
  {
    id: 18,
    name: 'Zoom',
    type: 'SSO',
    category: 'sso',
    description: 'Request access to Zoom account',
  },
  {
    id: 19,
    name: 'Jira',
    type: 'SSO',
    category: 'sso',
    description: 'Request access to Jira projects',
  },
  {
    id: 20,
    name: 'Notion',
    type: 'SSO',
    category: 'sso',
    description: 'Request access to Notion workspace',
  },
  {
    id: 21,
    name: 'Admin elevation request',
    type: 'Access',
    category: 'access',
    description: 'Request temporary admin access on your laptop',
  },
];

// ─── Password Vault Data ───

interface CredentialRecord {
  id: number;
  name: string;
  type: string;
  expirationDate: string;
  tags: string[];
  lastTimeUsed: string;
}

interface WebsiteRecord {
  id: number;
  name: string;
  uri: string;
  tags: string[];
  lastTimeUsed: string;
}

const credentialsSeed: CredentialRecord[] = [
  { id: 1, name: 'AWS Root Account', type: 'Password', expirationDate: 'Jun 1, 2026', tags: ['cloud', 'prod'], lastTimeUsed: 'Apr 6, 2026' },
  { id: 2, name: 'GitHub Personal Token', type: 'Key', expirationDate: '--', tags: ['infra'], lastTimeUsed: 'Apr 4, 2026' },
  { id: 3, name: 'Ubuntu MFA', type: 'Key', expirationDate: '--', tags: ['linux'], lastTimeUsed: 'Apr 1, 2026' },
  { id: 4, name: 'Windows Admin', type: 'Password', expirationDate: 'Jun 2, 2026', tags: ['windows', 'prod'], lastTimeUsed: 'Apr 5, 2026' },
  { id: 5, name: 'MySQL Root', type: 'Password', expirationDate: '--', tags: ['prod'], lastTimeUsed: '--' },
  { id: 6, name: 'Okta Admin', type: 'Password', expirationDate: 'May 30, 2026', tags: ['cloud'], lastTimeUsed: 'Apr 6, 2026' },
  { id: 7, name: 'Prod SSH Key', type: 'Key', expirationDate: '--', tags: ['infra', 'prod'], lastTimeUsed: 'Mar 28, 2026' },
  { id: 8, name: 'Azure Service Principal', type: 'Key', expirationDate: 'Jul 9, 2026', tags: ['cloud'], lastTimeUsed: 'Apr 2, 2026' },
  { id: 9, name: 'Corp Visa Card', type: 'Payment Card', expirationDate: 'Dec 1, 2027', tags: ['finance'], lastTimeUsed: 'Mar 15, 2026' },
  { id: 10, name: 'Datadog API Key', type: 'Key', expirationDate: '--', tags: ['infra'], lastTimeUsed: 'Mar 22, 2026' },
  { id: 11, name: 'Linux Root', type: 'Password', expirationDate: '--', tags: ['linux'], lastTimeUsed: '--' },
  { id: 12, name: 'GCP Service Account', type: 'Key', expirationDate: 'Aug 15, 2026', tags: ['cloud', 'prod'], lastTimeUsed: 'Apr 3, 2026' },
  { id: 13, name: 'Secure DB Notes', type: 'Secure Note', expirationDate: '--', tags: ['prod'], lastTimeUsed: 'Mar 10, 2026' },
  { id: 14, name: 'Docker Hub', type: 'Password', expirationDate: '--', tags: ['infra'], lastTimeUsed: 'Mar 18, 2026' },
  { id: 15, name: 'Staging SSH Key', type: 'Key', expirationDate: '--', tags: ['infra'], lastTimeUsed: 'Mar 5, 2026' },
];

const websitesSeed: WebsiteRecord[] = [
  { id: 1, name: 'GitHub', uri: 'github.com', tags: ['dev'], lastTimeUsed: 'Apr 7, 2026' },
  { id: 2, name: 'AWS Console', uri: 'console.aws.amazon.com', tags: ['cloud'], lastTimeUsed: 'Apr 6, 2026' },
  { id: 3, name: 'Okta', uri: 'okta.com', tags: ['identity'], lastTimeUsed: 'Apr 5, 2026' },
  { id: 4, name: 'Datadog', uri: 'app.datadoghq.com', tags: ['monitoring'], lastTimeUsed: 'Apr 4, 2026' },
  { id: 5, name: 'Jira', uri: 'atlassian.net', tags: ['productivity'], lastTimeUsed: 'Apr 3, 2026' },
  { id: 6, name: 'Figma', uri: 'figma.com', tags: ['design'], lastTimeUsed: 'Apr 2, 2026' },
  { id: 7, name: 'Slack', uri: 'slack.com', tags: ['communication'], lastTimeUsed: 'Apr 1, 2026' },
  { id: 8, name: 'Notion', uri: 'notion.so', tags: ['productivity'], lastTimeUsed: 'Mar 30, 2026' },
  { id: 9, name: 'LinkedIn', uri: 'linkedin.com', tags: [], lastTimeUsed: 'Mar 28, 2026' },
  { id: 10, name: 'Gmail', uri: 'mail.google.com', tags: ['communication'], lastTimeUsed: 'Mar 25, 2026' },
];

const credentialTypeOptions = [
  { label: 'Password', value: 'Password' },
  { label: 'Key', value: 'Key' },
  { label: 'Secure Note', value: 'Secure Note' },
  { label: 'Payment Card', value: 'Payment Card' },
];

const credentialTagOptions = ['cloud', 'prod', 'infra', 'linux', 'windows', 'finance'];
const websiteTagOptions = ['dev', 'cloud', 'identity', 'monitoring', 'productivity', 'design', 'communication'];

const requestTypeIconMap: Record<RequestType, Component> = {
  'Web Shield': markRaw(GlobeAltIcon),
  Database: markRaw(CircleStackIcon),
  Server: markRaw(ServerIcon),
  SSO: markRaw(SsoIcon),
  Access: markRaw(LockClosedIcon),
};

// ─── Privileged resource logos (/public/logos/) ───

const RESOURCE_LOGOS: Record<string, string> = {
  'Ubuntu Server': '/logos/ubuntu.png',
  'Ubuntu Server 24.04': '/logos/ubuntu.png',
  Debian: '/logos/debian.png',
  'Windows Server': '/logos/windows-server.png',
  PostgreSQL: '/logos/postgre.png',
  Oracle: '/logos/oracle.png',
  Redis: '/logos/redis.png',
  MySQL: '/logos/mysql.png',
};

function resourceLogoSrc(resourceName: string): string | null {
  const trimmed = resourceName.trim();
  if (!trimmed) return null;
  if (RESOURCE_LOGOS[trimmed]) return RESOURCE_LOGOS[trimmed];
  const lower = trimmed.toLowerCase();
  for (const [key, src] of Object.entries(RESOURCE_LOGOS)) {
    if (key.toLowerCase() === lower) return src;
  }
  return null;
}

/**
 * Storybook preview uses `base: './'`. Root-absolute `/logos/...` URLs resolve from the
 * origin root and can 404; prefixing with `import.meta.env.BASE_URL` fixes loading inside `iframe.html`.
 */
function publicAssetUrl(pathFromPublicRoot: string): string {
  const trimmed = pathFromPublicRoot.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const p = trimmed.replace(/^\//, '');
  const rawBase = import.meta.env.BASE_URL ?? '/';
  if (rawBase === '/' || rawBase === '') return `/${p}`;
  const base = rawBase.replace(/\/+$/, '');
  if (base === '' || base === '/') return `/${p}`;
  return `${base}/${p}`;
}

const UBUNTU_LOGO = '/logos/ubuntu.png';

const WEB_SHIELD_LOGOS: Record<string, string> = {
  'Fortinet FortiGate': '/logos/fortinet.png',
  'GitLab Admin': '/logos/gitlab.png',
  Grafana: '/logos/grafana.png',
  'Kubernetes Dashboard': '/logos/kubernetes.png',
  'Palo Alto Firewall': '/logos/paloalto.png',
  pfSense: '/logos/pfsense.png',
};

function webShieldLogoSrc(resourceName: string): string | null {
  const trimmed = resourceName.trim();
  if (!trimmed) return null;
  if (WEB_SHIELD_LOGOS[trimmed]) return WEB_SHIELD_LOGOS[trimmed];
  const lower = trimmed.toLowerCase();
  for (const [key, src] of Object.entries(WEB_SHIELD_LOGOS)) {
    if (key.toLowerCase() === lower) return src;
  }
  return null;
}

function resolvePrivilegedLogoUrl(
  resource: Pick<PrivilegedResource, 'name' | 'type' | 'logo'>,
): string | null {
  const override = resource.logo?.trim();
  if (override) return publicAssetUrl(override);

  if (resource.type === 'Web Shield') {
    const mapped = webShieldLogoSrc(resource.name);
    if (mapped) return publicAssetUrl(mapped);
    return null;
  }

  const name = resource.name.trim();
  if (resource.type === 'Server' && /\bubuntu\b/i.test(name)) {
    return publicAssetUrl(UBUNTU_LOGO);
  }

  const raw = resourceLogoSrc(name);
  return raw ? publicAssetUrl(raw) : null;
}

const PRIVILEGED_FALLBACK_ICON_BG = '#41cfcb';

// ─── Local logos (/public/logos/) ───

const APP_LOGOS: Record<string, string> = {
  '15Five': '/logos/15five.png',
  Adobe: '/logos/adobe.png',
  ADP: '/logos/adp.png',
  Apple: '/logos/apple.png',
  AssetSonar: '/logos/assetsonar.png',
  'Atlassian (Jira and Confluence)': '/logos/atlassian.png',
  'AWS Identity Center': '/logos/aws.png',
  'AWS Sales Demo Admin': '/logos/aws.png',
  'AWS - JumpCloud': '/logos/aws.png',
  Box: '/logos/box.png',
  'Cisco Meraki': '/logos/cisco-meraki.png',
  'Culture Amp': '/logos/cultureamp.png',
  Datadog: '/logos/datadog.png',
  Docker: '/logos/docker.png',
  Dropbox: '/logos/dropbox.png',
  Expensify: '/logos/expensify.png',
  Figma: '/logos/figma.png',
  GitHub: '/logos/github.png',
  'Gong.io': '/logos/gong.png',
  'GCS Lab ProMax': '/logos/proxmox.png',
  Google: '/logos/google.png',
  'Google Workspace': '/logos/google.png',
  'Google Gemini App': '/logos/google.png',
  Harness: '/logos/harness.png',
  '1Up Users': '/logos/1up.png',
  Codility: '/logos/codility.png',
  Cursor: '/logos/cursor.png',
  Egencia: '/logos/egencia.png',
  Firstbase: '/logos/firstbase.png',
  'Password Vault': '/logos/jumpcloud-vault.png',
  'Password Manager': '/logos/jc-password-manager.png',
  'JumpDesk EU': '/logos/jumpdesk-eu.png',
  'JumpDesk PRD': '/logos/jumpdesk-prod.png',
  Knowbe4: '/logos/knowbe4.png',
  Proxmox: '/logos/proxmox.png',
  Lever: '/logos/lever.png',
  Microsoft: '/logos/microsoft.png',
  'Microsoft 365': '/logos/microsoft.png',
  Parallels: '/logos/paralells.png',
  Salesforce: '/logos/salesforce.png',
  Slack: '/logos/slack.png',
  Snowflake: '/logos/snowflake.png',
  Zscaler: '/logos/zscaler.png',
};

function localLogoSrc(appName: string): string | null {
  const trimmed = appName.trim();
  if (!trimmed) return null;
  if (APP_LOGOS[trimmed]) return APP_LOGOS[trimmed];
  const lower = trimmed.toLowerCase();
  for (const [key, src] of Object.entries(APP_LOGOS)) {
    if (key.toLowerCase() === lower) return src;
  }
  return null;
}

// ─── App logo (static file + initials fallback) ───

const AppLogo = markRaw(defineComponent({
  name: 'AppLogo',
  props: {
    appName: { type: String, required: true },
    color: { type: String, required: true },
    initial: { type: String, required: true },
  },
  setup(props) {
    const imageFailed = ref(false);
    const logoSrc = computed(() => localLogoSrc(props.appName));

    watch(
      () => props.appName,
      () => {
        imageFailed.value = false;
      },
    );

    function onImgError(e: Event) {
      (e.currentTarget as HTMLImageElement).style.display = 'none';
      imageFailed.value = true;
    }

    return () => {
      const src = logoSrc.value;
      const showImg = Boolean(src && !imageFailed.value);
      const showFallback = !src || imageFailed.value;

      return h(
        'div',
        {
          class: 'flex flex-col items-center justify-center min-w-0',
          style: { height: '60px', width: '100%' },
        },
        [
          showImg
            ? h('img', {
                key: src!,
                src: src!,
                alt: `${props.appName} logo`,
                class: 'max-h-full max-w-full object-contain',
                onError: onImgError,
              })
            : null,
          showFallback
            ? h(
                'div',
                {
                  class:
                    'flex items-center justify-center rounded-md font-semibold text-white size-12 text-body-md shrink-0',
                  style: { backgroundColor: props.color },
                },
                props.initial,
              )
            : null,
        ],
      );
    };
  },
}));

// ─── Privileged resource logo (file + type-based icon fallback) ───

const PrivilegedResourceLogo = markRaw(defineComponent({
  name: 'PrivilegedResourceLogo',
  props: {
    resourceName: { type: String, required: true },
    resourceType: { type: String as PropType<ResourceType>, required: true },
    logoPath: { type: String, default: undefined },
  },
  setup(props) {
    const imageFailed = ref(false);
    const logoSrc = computed(() =>
      resolvePrivilegedLogoUrl({
        name: props.resourceName,
        type: props.resourceType,
        logo: props.logoPath,
      }),
    );

    watch(
      () => [props.resourceName, props.logoPath, props.resourceType] as const,
      () => {
        imageFailed.value = false;
      },
    );

    function onImgError(e: Event) {
      (e.currentTarget as HTMLImageElement).style.display = 'none';
      imageFailed.value = true;
    }

    function fallbackIconVNode() {
      if (props.resourceType === 'Server') {
        return h(ServerIcon, { class: 'size-5 text-white' });
      }
      if (props.resourceType === 'Database') {
        return h(CircleStackIcon, { class: 'size-5 text-white' });
      }
      if (props.resourceType === 'Web Shield') {
        return h(GlobeAltIcon, { class: 'size-5 text-white' });
      }
      return h(CommandLineIcon, { class: 'size-5 text-white' });
    }

    return () => {
      const src = logoSrc.value;
      const showImg = Boolean(src && !imageFailed.value);
      const showFallback = !src || imageFailed.value;

      return h(
        'div',
        {
          class: 'flex flex-col items-center justify-center min-w-0',
          style: { height: '60px', width: '100%' },
        },
        [
          showImg
            ? h('img', {
                key: src!,
                src: src!,
                alt: `${props.resourceName} logo`,
                class: 'max-h-full max-w-full object-contain',
                onError: onImgError,
              })
            : null,
          showFallback
            ? h(
                'div',
                {
                  class:
                    'flex items-center justify-center rounded-md size-12 shrink-0',
                  style: { backgroundColor: PRIVILEGED_FALLBACK_ICON_BG },
                },
                [fallbackIconVNode()],
              )
            : null,
        ],
      );
    };
  },
}));

// ─── Component Definition ───

const UserPortalAllAppsWithPrivilegedResourcesPage = defineComponent({
  name: 'UserPortalAllAppsWithPrivilegedResourcesPage',
  components: {
    AppNavigation,
    CollapsiblePanel,
    CircuitDataTable,
    DataTableToolbar,
    FormField,
    DashboardPageLayout,
    DashboardStatCard,
    ListPageLayout,
    Password,
    Paginator,
    PageHeader,
    ToastNotification,
    PvButton: Button,
    PvDialog: Dialog,
    PvIconField: IconField,
    PvInputIcon: InputIcon,
    PvInputText: InputText,
    PvMultiSelect: MultiSelect,
    PvSelect: Select,
    PvTextarea: Textarea,
    SelectButton,
    PvTabs: Tabs,
    PvTabList: TabList,
    PvTab: Tab,
    PvTabPanels: TabPanels,
    PvTabPanel: TabPanel,
    ChartBarSquareIcon,
    MagnifyingGlassIcon,
    ArrowLeftIcon,
    ArrowTopRightOnSquareIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    BookmarkIcon,
    ClipboardDocumentListIcon,
    AppLogo,
    PrivilegedResourceLogo,
  },
  setup() {
    const apps = ref<PortalApp[]>(JSON.parse(JSON.stringify(initialApps)));
    const privilegedResources = ref<PrivilegedResource[]>(
      JSON.parse(JSON.stringify(initialPrivilegedResources)) as PrivilegedResource[],
    );
    const searchQuery = ref('');
    const currentView = ref<'portal' | 'requests' | 'password-vault'>('portal');
    const currentPage = ref<'portal' | 'vault-home' | 'vault-websites' | 'vault-credentials' | 'vault-access-requests'>('portal');
    const previousUserPortalView = ref<'portal' | 'requests' | 'password-vault'>('portal');
    const activeVaultItem = ref('home');
    const inPasswordVault = ref(false);
    const activeTab = ref<
      'all' | 'sso' | 'bookmarks' | 'web-shield' | 'servers' | 'databases' | 'favorites'
    >('all');
    const first = ref(0);
    const rowsPerPage = ref(50);
    const viewMode = ref<'grid' | 'list'>('grid');
    const viewOptions = [
      { value: 'grid', icon: markRaw(Squares2X2Icon) },
      { value: 'list', icon: markRaw(ListBulletIcon) },
    ];

    watch(rowsPerPage, () => {
      first.value = 0;
    });
    watch(searchQuery, () => {
      first.value = 0;
    });

    const requests = ref<RequestableResource[]>(
      JSON.parse(JSON.stringify(requestableResources)) as RequestableResource[],
    );
    const requestsTab = ref<'resources' | 'privileged' | 'access'>('resources');
    const requestExpandedMap = ref<Record<string, boolean>>({});
    const requestSearchQuery = ref('');
    const vaultRequestSearchQuery = ref('');
    const selectedRequest = ref<RequestableResource | null>(null);
    const showRequestDialog = ref(false);
    const requestReason = ref('');
    const passwordVaultTab = ref<'overview' | 'websites' | 'credentials'>('overview');
    const passwordVaultTabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'Websites', value: 'websites' },
      { label: 'Credentials', value: 'credentials' },
    ];
    const vaultPasswordVaultStatCards = [
      {
        header: 'Total Secrets',
        value: '3,482',
        icon: markRaw(ClipboardDocumentListIcon),
        changeValue: '9%',
        changeLabel: 'vs last month',
        showArrow: true,
      },
      {
        header: 'Weak Credentials',
        value: '11',
        icon: markRaw(ExclamationTriangleIcon),
        changeValue: '-2',
        changeLabel: 'vs last month',
        showArrow: true,
      },
    ];
    const vaultPasswordVaultLoginCount = 26;
    const vaultPasswordVaultLastLogins = [
      { name: 'Sarah Chen', email: 'sarah.chen@acme.com', time: '8 minutes ago' },
      { name: 'Marcus Rodriguez', email: 'marcus.rodriguez@acme.com', time: '36 minutes ago' },
      { name: 'Emily Johnson', email: 'emily.johnson@acme.com', time: '2 hours ago' },
      { name: 'Michael Smith', email: 'michael.smith@acme.com', time: '16 hours ago' },
      { name: 'Olivia Patel', email: 'olivia.patel@acme.com', time: '22 hours ago' },
    ];
    const vaultExpiringSecretsSummary = { count: 9, label: 'Expiring in the next 7 days' };
    const vaultExpiringSecrets = [
      { name: 'AWS Root Key', metaLabel: 'Expires in', metaValue: '3 days' },
      { name: 'Okta Admin', metaLabel: 'Expires in', metaValue: '5 days' },
      { name: 'Finance MySQL', metaLabel: 'Expires in', metaValue: '6 days' },
      { name: 'GitHub Deploy Key', metaLabel: 'Expires in', metaValue: '7 days' },
      { name: 'Azure AD App', metaLabel: 'Expires in', metaValue: '7 days' },
    ];
    const vaultWeakSecretsSummary = { count: 11, label: 'Secrets' };
    const vaultWeakSecrets = [
      { name: 'AWS Billing', risk: 'Weak API Key' },
      { name: 'Payroll Admin', risk: 'Weak Password' },
      { name: 'ServiceNow Admin', risk: 'Weak Password' },
      { name: 'Datadog Root', risk: 'Weak API Key' },
    ];
    const vaultUnusedSecretsSummary = { count: 14, label: 'Unused' };
    const vaultUnusedSecrets = [
      { name: 'AWS Ops Key', metaLabel: 'Last Used', metaValue: '46 days ago' },
      { name: 'Stripe Admin', metaLabel: 'Last Used', metaValue: '123 days ago' },
      { name: 'Grafana Admin', metaLabel: 'Last Used', metaValue: '53 days ago' },
      { name: 'MySQL Prod', metaLabel: 'Last Used', metaValue: '66 days ago' },
    ];
    const vaultSecretsAddedBars = [
      { date: 'Aug 1', value: 68 },
      { date: 'Sep 1', value: 74 },
      { date: 'Oct 1', value: 88 },
      { date: 'Nov 1', value: 92 },
      { date: 'Dec 1', value: 124 },
      { date: 'Jan 1', value: 158 },
      { date: 'Feb 1', value: 142 },
      { date: 'Mar 1', value: 176 },
      { date: 'Apr 1', value: 168 },
      { date: 'Apr 7', value: 132 },
    ];
    const vaultMaxSecretsAddedValue = computed(() =>
      Math.max(...vaultSecretsAddedBars.map(item => item.value)),
    );
    const vaultWebsitesData = [
      { name: 'Gmail', address: 'https://mail.google.com', jumpServer: '--', status: 'Available', lastConnection: 'Today 9:15 AM' },
      { name: 'LinkedIn', address: 'https://www.linkedin.com', jumpServer: '--', status: 'Available', lastConnection: 'Today 8:30 AM' },
      { name: 'Slack', address: 'https://slack.com', jumpServer: '--', status: 'In Use', lastConnection: 'Today 10:00 AM' },
      { name: 'Notion', address: 'https://www.notion.so', jumpServer: '--', status: 'Available', lastConnection: 'Yesterday 3:00 PM' },
      { name: 'Figma', address: 'https://www.figma.com', jumpServer: '--', status: 'Available', lastConnection: 'Today 9:45 AM' },
      { name: 'GitHub', address: 'https://github.com', jumpServer: '--', status: 'In Use', lastConnection: 'Today 11:00 AM' },
      { name: 'Spotify', address: 'https://www.spotify.com', jumpServer: '--', status: 'Available', lastConnection: 'Yesterday 6:00 PM' },
      { name: 'Twitter / X', address: 'https://twitter.com', jumpServer: '--', status: 'Available', lastConnection: 'Mar 30, 2026' },
      { name: 'Netflix', address: 'https://www.netflix.com', jumpServer: '--', status: 'Available', lastConnection: 'Apr 1, 2026' },
      { name: 'Amazon', address: 'https://www.amazon.com', jumpServer: '--', status: 'Available', lastConnection: 'Mar 28, 2026' },
      { name: 'Dropbox', address: 'https://www.dropbox.com', jumpServer: '--', status: 'Available', lastConnection: 'Apr 2, 2026' },
      { name: 'Zoom', address: 'https://zoom.us', jumpServer: '--', status: 'In Use', lastConnection: 'Today 10:30 AM' },
      { name: 'Trello', address: 'https://trello.com', jumpServer: '--', status: 'Available', lastConnection: 'Apr 3, 2026' },
      { name: 'Reddit', address: 'https://www.reddit.com', jumpServer: '--', status: 'Available', lastConnection: 'Yesterday 9:00 PM' },
      { name: 'PayPal', address: 'https://www.paypal.com', jumpServer: '--', status: 'Available', lastConnection: 'Mar 25, 2026' },
    ];
    const vaultCredentialsData = [
      { name: 'Gmail Password', address: 'gabriel.ramos@gmail.com', status: 'Available', lastConnection: 'Today 9:15 AM' },
      { name: 'LinkedIn Password', address: 'gabriel.ramos@linkedin.com', status: 'Available', lastConnection: 'Today 8:30 AM' },
      { name: 'Slack Password', address: 'gabriel@jumpcloud.com', status: 'In Use', lastConnection: 'Today 10:00 AM' },
      { name: 'Notion Password', address: 'gabriel.ramos@notion.so', status: 'Available', lastConnection: 'Yesterday 3:00 PM' },
      { name: 'Figma Password', address: 'gabriel@jumpcloud.com', status: 'Available', lastConnection: 'Today 9:45 AM' },
      { name: 'GitHub Token', address: 'gabriel-ramos', status: 'In Use', lastConnection: 'Today 11:00 AM' },
      { name: 'Spotify Password', address: 'gabriel.ramos@gmail.com', status: 'Available', lastConnection: 'Yesterday 6:00 PM' },
      { name: 'Twitter / X Password', address: 'gabriel_ramos', status: 'Available', lastConnection: 'Mar 30, 2026' },
      { name: 'Netflix Password', address: 'gabriel.ramos@gmail.com', status: 'Available', lastConnection: 'Apr 1, 2026' },
      { name: 'Amazon Password', address: 'gabriel.ramos@gmail.com', status: 'Available', lastConnection: 'Mar 28, 2026' },
      { name: 'Dropbox Password', address: 'gabriel@jumpcloud.com', status: 'Available', lastConnection: 'Apr 2, 2026' },
      { name: 'Zoom Password', address: 'gabriel@jumpcloud.com', status: 'In Use', lastConnection: 'Today 10:30 AM' },
      { name: 'Trello Password', address: 'gabriel.ramos@trello.com', status: 'Available', lastConnection: 'Apr 3, 2026' },
      { name: 'PayPal Password', address: 'gabriel.ramos@gmail.com', status: 'Available', lastConnection: 'Mar 25, 2026' },
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
    const credentials = ref<CredentialRecord[]>(
      JSON.parse(JSON.stringify(credentialsSeed)) as CredentialRecord[],
    );
    const websites = ref<WebsiteRecord[]>(
      JSON.parse(JSON.stringify(websitesSeed)) as WebsiteRecord[],
    );
    const credentialSearch = ref('');
    const websiteSearch = ref('');
    const showCredentialDialog = ref(false);
    const showWebsiteDialog = ref(false);
    const editingCredential = ref<CredentialRecord | null>(null);
    const editingWebsite = ref<WebsiteRecord | null>(null);
    const credentialForm = ref({
      type: 'Password',
      name: '',
      username: '',
      password: '',
      expirationDate: '',
      tags: '',
      notes: '',
    });
    const websiteForm = ref({
      name: '',
      uri: '',
      tags: '',
      notes: '',
    });
    const showCredentialFilterDialog = ref(false);
    const appliedCredentialTypes = ref<string[]>([]);
    const appliedCredentialTags = ref<string[]>([]);
    const draftCredentialTypes = ref<string[]>([]);
    const draftCredentialTags = ref<string[]>([]);
    const showWebsiteFilterDialog = ref(false);
    const appliedWebsiteTags = ref<string[]>([]);
    const draftWebsiteTags = ref<string[]>([]);
    const showVaultWebsitesFilterDialog = ref(false);
    const appliedVaultWebsitesStatus = ref('All');
    const appliedVaultWebsitesConnectors = ref([] as string[]);
    const appliedVaultWebsitesJumpServers = ref([] as string[]);
    const draftVaultWebsitesStatus = ref('All');
    const draftVaultWebsitesConnectors = ref([] as string[]);
    const draftVaultWebsitesJumpServers = ref([] as string[]);
    const showVaultCredentialsFilterDialog = ref(false);
    const appliedVaultCredentialsStatus = ref('All');
    const appliedVaultCredentialsConnectors = ref([] as string[]);
    const appliedVaultCredentialsJumpServers = ref([] as string[]);
    const draftVaultCredentialsStatus = ref('All');
    const draftVaultCredentialsConnectors = ref([] as string[]);
    const draftVaultCredentialsJumpServers = ref([] as string[]);

    const portalNavMenuItems = computed(() =>
      menuItemsAllApplications.map(item => {
        if (item.label === 'Requests') {
          return {
            label: 'Requests',
            leftIcon: markRaw(ClipboardDocumentCheckIcon),
            command: () => {
              currentView.value = 'requests';
            },
          };
        }
        if (item.label === 'Password Vault') {
          return {
            ...item,
            command: () => {
              currentView.value = 'password-vault';
            },
          };
        }
        if (item.label === 'All Applications') {
          return {
            ...item,
            command: () => {
              currentView.value = 'portal';
            },
          };
        }
        return item;
      }),
    );
    const navMenuItems = computed(() => {
      if (!inPasswordVault.value) return portalNavMenuItems.value;
      return menuItemsPasswordVault.map(item => ({
        ...item,
        command: () => {
          activeVaultItem.value = item.label.toLowerCase();
          if (item.label === 'Home') {
            currentPage.value = 'vault-home';
          }
          if (item.label === 'Websites') {
            currentPage.value = 'vault-websites';
          }
          if (item.label === 'Credentials') {
            currentPage.value = 'vault-credentials';
          }
          if (item.label === 'Access Requests') {
            currentPage.value = 'vault-access-requests';
          }
        },
      }));
    });
    const navProfileMenuItems = profileMenuItems;

    const activeNavItem = computed(() => {
      if (inPasswordVault.value) return activeVaultItem.value;
      if (currentView.value === 'password-vault') return 'password vault';
      if (currentView.value === 'requests') {
        return (
          navMenuItems.value.find(item => item.label.startsWith('Requests'))?.label.toLowerCase() ??
          'requests'
        );
      }
      return 'all applications';
    });

    function isRequestCollapsed(key: string): boolean {
      return !requestExpandedMap.value[key];
    }

    function setRequestExpanded(key: string, expanded: boolean) {
      requestExpandedMap.value = { ...requestExpandedMap.value, [key]: expanded };
    }

    const filteredRequestableResources = computed(() => {
      const q = requestSearchQuery.value.trim().toLowerCase();
      const category =
        requestsTab.value === 'privileged'
          ? 'privileged'
          : requestsTab.value === 'access'
            ? 'access'
            : 'sso';
      const filteredByCategory = requests.value.filter(resource => resource.category === category);
      if (!q) return filteredByCategory;
      return filteredByCategory.filter(resource => resource.name.toLowerCase().includes(q));
    });
    const filteredVaultRequestableResources = computed(() => {
      const q = vaultRequestSearchQuery.value.trim().toLowerCase();
      const filteredByCategory = requests.value.filter(resource => resource.category === 'sso');
      if (!q) return filteredByCategory;
      return filteredByCategory.filter(resource => resource.name.toLowerCase().includes(q));
    });

    const requestResourcesCount = computed(
      () => requests.value.filter(resource => resource.category === 'sso').length,
    );
    const requestPrivilegedCount = computed(
      () => requests.value.filter(resource => resource.category === 'privileged').length,
    );
    const requestAccessCount = computed(
      () => requests.value.filter(resource => resource.category === 'access').length,
    );

    function openRequestDialog(resource: RequestableResource) {
      selectedRequest.value = resource;
      requestReason.value = '';
      showRequestDialog.value = true;
    }

    function closeRequestDialog() {
      showRequestDialog.value = false;
    }

    function handleRequestContinue() {
      showRequestDialog.value = false;
    }

    function formatGroupedValues(values: string[], maxVisible = 2): string {
      if (values.length <= maxVisible) return values.join(', ');
      return `${values.slice(0, maxVisible).join(', ')}, +${values.length - maxVisible}`;
    }

    function formatTags(values: string[]): string {
      return values.length > 0 ? values.join(', ') : '--';
    }

    const credentialDraftFilterCount = computed(() => {
      let count = 0;
      if (draftCredentialTypes.value.length > 0) count += 1;
      if (draftCredentialTags.value.length > 0) count += 1;
      return count;
    });

    const websiteDraftFilterCount = computed(() => {
      let count = 0;
      if (draftWebsiteTags.value.length > 0) count += 1;
      return count;
    });
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

    const credentialFilterChips = computed(() => {
      const chips = [];
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

    const websiteFilterChips = computed(() => {
      const chips = [];
      if (appliedWebsiteTags.value.length > 0) {
        chips.push({
          id: 'tags',
          key: 'Tags',
          operator: 'is',
          value: formatGroupedValues(appliedWebsiteTags.value),
        });
      }
      return chips;
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

    const filteredCredentialsData = computed(() => {
      const q = credentialSearch.value.trim().toLowerCase();
      let result = credentials.value;
      if (q) {
        result = result.filter(credential => {
          const searchText = [
            credential.name,
            credential.type,
            credential.expirationDate,
            credential.lastTimeUsed,
            credential.tags.join(' '),
          ]
            .join(' ')
            .toLowerCase();
          return searchText.includes(q);
        });
      }
      if (appliedCredentialTypes.value.length > 0) {
        result = result.filter(credential => appliedCredentialTypes.value.includes(credential.type));
      }
      if (appliedCredentialTags.value.length > 0) {
        result = result.filter(credential =>
          credential.tags.some(tag => appliedCredentialTags.value.includes(tag)),
        );
      }
      return result;
    });

    const filteredWebsitesData = computed(() => {
      const q = websiteSearch.value.trim().toLowerCase();
      let result = websites.value;
      if (q) {
        result = result.filter(website => {
          const searchText = [website.name, website.uri, website.lastTimeUsed, website.tags.join(' ')]
            .join(' ')
            .toLowerCase();
          return searchText.includes(q);
        });
      }
      if (appliedWebsiteTags.value.length > 0) {
        result = result.filter(website =>
          website.tags.some(tag => appliedWebsiteTags.value.includes(tag)),
        );
      }
      return result;
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

    function openWebsiteFilterDialog() {
      draftWebsiteTags.value = [...appliedWebsiteTags.value];
      showWebsiteFilterDialog.value = true;
    }

    function applyWebsiteFilters() {
      appliedWebsiteTags.value = [...draftWebsiteTags.value];
      showWebsiteFilterDialog.value = false;
    }

    function cancelWebsiteFilters() {
      showWebsiteFilterDialog.value = false;
    }

    function clearDraftWebsiteFilters() {
      draftWebsiteTags.value = [];
    }

    function clearAllWebsiteFilters() {
      appliedWebsiteTags.value = [];
    }

    function removeWebsiteFilterChip(chip: { id?: string }) {
      const chipId = chip.id ?? '';
      if (chipId === 'tags') appliedWebsiteTags.value = [];
    }

    function handleWebsiteSearch(value: string) {
      websiteSearch.value = value;
    }

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
      console.log('Add vault website');
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

    const credentialDialogTitle = computed(() =>
      editingCredential.value ? 'Edit Credential' : 'Add Credential',
    );

    const websiteDialogTitle = computed(() =>
      editingWebsite.value ? 'Edit Website' : 'Add Website',
    );

    function openAddCredentialDialog() {
      editingCredential.value = null;
      credentialForm.value = {
        type: 'Password',
        name: '',
        username: '',
        password: '',
        expirationDate: '',
        tags: '',
        notes: '',
      };
      showCredentialDialog.value = true;
    }

    function openEditCredentialDialog(credential: CredentialRecord) {
      editingCredential.value = credential;
      credentialForm.value = {
        type: credential.type,
        name: credential.name,
        username: '',
        password: '',
        expirationDate: credential.expirationDate,
        tags: credential.tags.join(', '),
        notes: '',
      };
      showCredentialDialog.value = true;
    }

    function closeCredentialDialog() {
      showCredentialDialog.value = false;
    }

    function openAddWebsiteDialog() {
      editingWebsite.value = null;
      websiteForm.value = {
        name: '',
        uri: '',
        tags: '',
        notes: '',
      };
      showWebsiteDialog.value = true;
    }

    function openEditWebsiteDialog(website: WebsiteRecord) {
      editingWebsite.value = website;
      websiteForm.value = {
        name: website.name,
        uri: website.uri,
        tags: website.tags.join(', '),
        notes: '',
      };
      showWebsiteDialog.value = true;
    }

    function closeWebsiteDialog() {
      showWebsiteDialog.value = false;
    }

    function openPasswordVault() {
      if (typeof window !== 'undefined') {
        window.open('https://sedemo.vault.jumpcloud.com', '_blank');
      }
    }

    function enterPasswordVault() {
      previousUserPortalView.value = currentView.value;
      inPasswordVault.value = true;
      currentPage.value = 'vault-home';
      activeVaultItem.value = 'home';
    }

    function leavePasswordVault() {
      inPasswordVault.value = false;
      currentView.value = previousUserPortalView.value;
      currentPage.value = 'portal';
    }

    const allApps = computed(() => {
      let result = apps.value;
      if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(a => a.name.toLowerCase().includes(q));
      }
      return result.sort((a, b) => a.name.localeCompare(b.name));
    });

    const allItems = computed(() => {
      const items = [
        ...apps.value,
        ...privilegedResources.value,
      ];
      const q = searchQuery.value.trim().toLowerCase();
      const filteredItems = items.filter(item => {
        if (!q) return true;
        return item.name.toLowerCase().includes(q);
      });
      return filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    });

    const filteredSso = computed(() => {
      const q = searchQuery.value.toLowerCase();
      return apps.value
        .filter(a => a.type === 'sso' && (!q || a.name.toLowerCase().includes(q)))
        .sort((a, b) => a.name.localeCompare(b.name));
    });

    const filteredBookmarks = computed(() => {
      const q = searchQuery.value.toLowerCase();
      return apps.value
        .filter(a => a.type === 'bookmark' && (!q || a.name.toLowerCase().includes(q)))
        .sort((a, b) => a.name.localeCompare(b.name));
    });

    /** All favorited apps and privileged resources (shared state; not search-filtered). */
    const allUnifiedFavorites = computed((): UnifiedFavoriteItem[] => {
      const items: UnifiedFavoriteItem[] = [];
      for (const a of apps.value) {
        if (a.favorite) items.push({ kind: 'app', favoriteKey: `app-${a.id}`, app: a });
      }
      for (const r of privilegedResources.value) {
        if (r.favorite) {
          items.push({ kind: 'resource', favoriteKey: `resource-${r.id}`, resource: r });
        }
      }
      items.sort((x, y) => {
        const nx = x.kind === 'app' ? x.app.name : x.resource.name;
        const ny = y.kind === 'app' ? y.app.name : y.resource.name;
        return nx.localeCompare(ny);
      });
      return items;
    });

    const filteredUnifiedFavorites = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      if (!q) return allUnifiedFavorites.value;
      return allUnifiedFavorites.value.filter(item => {
        if (item.kind === 'app') return item.app.name.toLowerCase().includes(q);
        return privilegedResourceSearchText(item.resource).toLowerCase().includes(q);
      });
    });

    const sortedPrivilegedResources = computed(() =>
      [...privilegedResources.value].sort((a, b) => a.name.localeCompare(b.name)),
    );

    const filteredPrivileged = computed(() => {
      const source = sortedPrivilegedResources.value;
      if (!searchQuery.value.trim()) return source;
      const q = searchQuery.value.toLowerCase();
      return source.filter(r => privilegedResourceSearchText(r).toLowerCase().includes(q));
    });

    const filteredPrivilegedWebShield = computed(() =>
      [...filteredPrivileged.value.filter(r => r.type === 'Web Shield')].sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    );

    const filteredPrivilegedServers = computed(() =>
      filteredPrivileged.value
        .filter(r => r.type === 'Server')
        .sort((a, b) => a.name.localeCompare(b.name)),
    );

    const filteredPrivilegedDatabases = computed(() =>
      [...filteredPrivileged.value.filter(r => r.type === 'Database')].sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    );

    const activePrivilegedSubList = computed(() => {
      if (activeTab.value === 'web-shield') return filteredPrivilegedWebShield.value;
      if (activeTab.value === 'servers') return filteredPrivilegedServers.value;
      if (activeTab.value === 'databases') return filteredPrivilegedDatabases.value;
      return [] as PrivilegedResource[];
    });

    const displayedApps = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      if (activeTab.value === 'all') {
        const source = q
          ? allItems.value.filter(item => item.name.toLowerCase().includes(q))
          : allItems.value;
        return source.slice(first.value, first.value + rowsPerPage.value);
      }
      if (activeTab.value === 'sso') {
        return filteredSso.value.slice(first.value, first.value + rowsPerPage.value);
      }
      if (activeTab.value === 'bookmarks') {
        return filteredBookmarks.value.slice(first.value, first.value + rowsPerPage.value);
      }
      return [] as PortalApp[];
    });

    const displayedUnifiedFavorites = computed(() => {
      if (activeTab.value !== 'favorites') return [] as UnifiedFavoriteItem[];
      return filteredUnifiedFavorites.value.slice(first.value, first.value + rowsPerPage.value);
    });

    const displayedPrivilegedSub = computed(() =>
      activePrivilegedSubList.value.slice(first.value, first.value + rowsPerPage.value),
    );

    function toggleListFavorite(row: ListRow) {
      if (row.kind === 'app') {
        const app = apps.value.find(item => item.id === row.sourceId);
        if (app) toggleFavorite(app);
      } else {
        const resource = privilegedResources.value.find(item => item.id === row.sourceId);
        if (resource) togglePrivilegedFavorite(resource);
      }
    }

    const ListNameCell = markRaw(defineComponent({
      name: 'ListNameCell',
      props: {
        data: { type: Object as PropType<ListRow>, required: true },
      },
      setup(props) {
        return () => {
          const starIcon = props.data.favorite
            ? h(StarSolid, { class: 'w-4 h-4 text-branding-base shrink-0' })
            : h(StarOutline, { class: 'w-4 h-4 text-neutral-subtle shrink-0' });

          return h(
            'div',
            { class: 'flex items-center gap-2 min-w-0 pl-2' },
            [
              h(
                'button',
                {
                  type: 'button',
                  class: 'border-0 bg-transparent p-0 cursor-pointer flex items-center',
                  onClick: (event: MouseEvent) => {
                    event.stopPropagation();
                    toggleListFavorite(props.data);
                  },
                },
                [starIcon],
              ),
              h('span', { class: 'text-body-md text-neutral-base truncate font-semibold' }, props.data.name),
            ],
          );
        };
      },
    }));

    const ListActionCell = markRaw(defineComponent({
      name: 'ListActionCell',
      setup() {
        return () =>
          h(
            Button,
            {
              severity: 'secondary',
              variant: 'text',
            },
            {
              icon: () => h(ArrowTopRightOnSquareIcon, { class: 'w-4 h-4' }),
            },
          );
      },
    }));

    const typeSeverityMap: Record<string, string> = {
      sso: 'success',
      SSO: 'success',
      bookmark: 'info',
      Bookmark: 'info',
      website: 'secondary',
      Website: 'secondary',
      'Web Shield': 'warn',
      Server: 'accent-purple',
      Database: 'accent-aster',
    };

    const ListTypeCell = markRaw(defineComponent({
      name: 'ListTypeCell',
      props: {
        data: { type: Object as PropType<ListRow>, required: true },
      },
      setup(props) {
        return () => {
          const rawType = props.data.type;
          const displayLabel = rawType === 'sso'
            ? 'SSO'
            : rawType === 'bookmark'
              ? 'Bookmark'
              : rawType === 'website'
                ? 'Website'
                : rawType;
          const severity = typeSeverityMap[rawType] ?? 'secondary';
          return h(Tag, { value: displayLabel, severity, class: '!normal-case' });
        };
      },
    }));

    const listColumns = [
      {
        field: 'name',
        header: 'Name',
        sortable: true,
        component: ListNameCell,
        componentProps: (slotProps: { data: ListRow }) => ({
          data: slotProps.data,
        }),
      },
      {
        field: 'type',
        header: 'Type',
        sortable: true,
        component: ListTypeCell,
        componentProps: (slotProps: { data: ListRow }) => ({
          data: slotProps.data,
        }),
      },
      {
        field: 'actions',
        header: 'Actions',
        width: '80px',
        component: ListActionCell,
      },
    ];

    const VaultNameCell = markRaw(defineComponent({
      name: 'VaultNameCell',
      props: {
        data: { type: Object as PropType<CredentialRecord | WebsiteRecord>, required: true },
        onClick: {
          type: Function as PropType<(row: CredentialRecord | WebsiteRecord) => void>,
          required: true,
        },
      },
      setup(props) {
        return () =>
          h('div', { class: 'flex items-center pl-2' }, [
            h(
              'button',
              {
                type: 'button',
                class:
                  'text-body-md font-semibold text-neutral-base cursor-pointer hover:text-primary-base hover:underline transition-colors',
                onClick: () => props.onClick(props.data),
              },
              props.data.name,
            ),
          ]);
      },
    }));

    const VaultActionCell = markRaw(defineComponent({
      name: 'VaultActionCell',
      setup() {
        return () =>
          h(
            Button,
            {
              severity: 'secondary',
              variant: 'text',
              'aria-label': 'Delete',
            },
            {
              icon: () => h(TrashIcon, { class: 'w-4 h-4' }),
            },
          );
      },
    }));

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

    const vaultWebsitesActionMenuItems = [
      { id: 'sessions', label: 'Sessions' },
      { id: 'details', label: 'Details' },
      { id: 'activity', label: 'Activity' },
      { id: 'approval-requests', label: 'Approval Requests' },
      { id: 'duplicates', label: 'Duplicates' },
      { id: 'archive', label: 'Archive' },
    ];

    const vaultWebsitesActionButtons = [
      { icon: markRaw(PencilSquareIcon), ariaLabel: 'Edit' },
      { icon: markRaw(Square2StackIcon), ariaLabel: 'Copy' },
      { icon: markRaw(TrashIcon), ariaLabel: 'Delete' },
    ];

    const vaultCredentialsActionMenuItems = [
      { id: 'sessions', label: 'Sessions' },
      { id: 'details', label: 'Details' },
      { id: 'activity', label: 'Activity' },
      { id: 'approval-requests', label: 'Approval Requests' },
      { id: 'duplicates', label: 'Duplicates' },
      { id: 'archive', label: 'Archive' },
    ];

    const vaultCredentialsActionButtons = [
      { icon: markRaw(PencilSquareIcon), ariaLabel: 'Edit' },
      { icon: markRaw(Square2StackIcon), ariaLabel: 'Copy' },
      { icon: markRaw(TrashIcon), ariaLabel: 'Delete' },
    ];

    const privilegedAvailabilityTokenMapping: Record<string, { label: string; severity: string }> = {
      'In Use': { label: 'In Use', severity: 'danger' },
      Available: { label: 'Available', severity: 'success' },
    };

    const credentialColumns = [
      {
        field: 'name',
        header: 'Name',
        sortable: true,
        component: VaultNameCell,
        componentProps: (slotProps: { data: CredentialRecord }) => ({
          data: slotProps.data,
          onClick: openEditCredentialDialog,
        }),
      },
      {
        field: 'type',
        header: 'Type',
        sortable: true,
        component: markRaw(DataTableCellText),
        componentProps: (slotProps: { data: CredentialRecord }) => ({ label: slotProps.data.type }),
      },
      {
        field: 'expirationDate',
        header: 'Expiration Date',
        sortable: true,
        component: markRaw(DataTableCellText),
        componentProps: (slotProps: { data: CredentialRecord }) => ({
          label: slotProps.data.expirationDate,
        }),
      },
      {
        field: 'tags',
        header: 'Tags',
        component: markRaw(DataTableCellText),
        componentProps: (slotProps: { data: CredentialRecord }) => ({
          label: formatTags(slotProps.data.tags),
        }),
      },
      {
        field: 'lastTimeUsed',
        header: 'Last Time Used',
        sortable: true,
        component: markRaw(DataTableCellText),
        componentProps: (slotProps: { data: CredentialRecord }) => ({
          label: slotProps.data.lastTimeUsed,
        }),
      },
      {
        field: 'actions',
        header: 'Actions',
        width: '80px',
        component: VaultActionCell,
      },
    ];

    const websiteColumns = [
      {
        field: 'name',
        header: 'Name',
        sortable: true,
        component: VaultNameCell,
        componentProps: (slotProps: { data: WebsiteRecord }) => ({
          data: slotProps.data,
          onClick: openEditWebsiteDialog,
        }),
      },
      {
        field: 'uri',
        header: 'URI',
        sortable: true,
        component: markRaw(DataTableCellText),
        componentProps: (slotProps: { data: WebsiteRecord }) => ({ label: slotProps.data.uri }),
      },
      {
        field: 'tags',
        header: 'Tags',
        component: markRaw(DataTableCellText),
        componentProps: (slotProps: { data: WebsiteRecord }) => ({
          label: formatTags(slotProps.data.tags),
        }),
      },
      {
        field: 'lastTimeUsed',
        header: 'Last Time Used',
        sortable: true,
        component: markRaw(DataTableCellText),
        componentProps: (slotProps: { data: WebsiteRecord }) => ({
          label: slotProps.data.lastTimeUsed,
        }),
      },
      {
        field: 'actions',
        header: 'Actions',
        width: '80px',
        component: VaultActionCell,
      },
    ];

    const vaultWebsitesColumns = [
      { field: 'name', header: 'Name', sortable: true, component: markRaw(DataTableCellLink), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.name, href: '#' }) },
      { field: 'address', header: 'Address', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.address }) },
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
        component: markRaw(VaultActionMenuCell),
        componentProps: () => ({ iconButtons: vaultWebsitesActionButtons, menuItems: vaultWebsitesActionMenuItems }),
      },
    ];

    const vaultCredentialsColumns = [
      { field: 'name', header: 'Name', sortable: true, component: markRaw(DataTableCellLink), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.name, href: '#' }) },
      { field: 'address', header: 'Username / Email', component: markRaw(DataTableCellText), componentProps: (sp: { data: Record<string, unknown> }) => ({ label: sp.data.address }) },
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
        component: markRaw(VaultActionMenuCell),
        componentProps: () => ({ iconButtons: vaultCredentialsActionButtons, menuItems: vaultCredentialsActionMenuItems }),
      },
    ];

    function isPortalApp(item: PortalApp | PrivilegedResource): item is PortalApp {
      return item.type === 'sso' || item.type === 'bookmark' || item.type === 'website';
    }

    function buildListRowFromItem(item: PortalApp | PrivilegedResource): ListRow {
      const prefix = isPortalApp(item) ? 'app' : 'resource';
      const typeLabel = item.type === 'sso' ? 'SSO' : item.type === 'bookmark' ? 'Bookmark' : item.type;
      return {
        id: `${prefix}-${item.id}`,
        name: item.name,
        type: typeLabel,
        favorite: item.favorite,
        kind: prefix,
        sourceId: item.id,
      };
    }

    function buildListRowFromFavorite(item: UnifiedFavoriteItem): ListRow {
      if (item.kind === 'app') {
        return {
          id: item.favoriteKey,
          name: item.app.name,
          type: item.app.type === 'sso' ? 'SSO' : item.app.type === 'bookmark' ? 'Bookmark' : item.app.type,
          favorite: item.app.favorite,
          kind: 'app',
          sourceId: item.app.id,
        };
      }
      return {
        id: item.favoriteKey,
        name: item.resource.name,
        type: item.resource.type,
        favorite: item.resource.favorite,
        kind: 'resource',
        sourceId: item.resource.id,
      };
    }

    const listRows = computed<ListRow[]>(() => {
      if (activeTab.value === 'favorites') {
        return displayedUnifiedFavorites.value.map(buildListRowFromFavorite);
      }
      if (activeTab.value === 'web-shield' || activeTab.value === 'servers' || activeTab.value === 'databases') {
        return displayedPrivilegedSub.value.map(buildListRowFromItem);
      }
      return (displayedApps.value as Array<PortalApp | PrivilegedResource>).map(buildListRowFromItem);
    });

    const totalRecords = computed(() => {
      if (currentView.value !== 'portal') return 0;
      if (activeTab.value === 'all') return allItems.value.length;
      if (activeTab.value === 'sso') return filteredSso.value.length;
      if (activeTab.value === 'bookmarks') return filteredBookmarks.value.length;
      if (activeTab.value === 'web-shield') return filteredPrivilegedWebShield.value.length;
      if (activeTab.value === 'servers') return filteredPrivilegedServers.value.length;
      if (activeTab.value === 'databases') return filteredPrivilegedDatabases.value.length;
      if (activeTab.value === 'favorites') return filteredUnifiedFavorites.value.length;
      return allApps.value.length;
    });

    const allCount = computed(() => allItems.value.length);
    const ssoCount = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      return apps.value.filter(a => a.type === 'sso' && (!q || a.name.toLowerCase().includes(q))).length;
    });
    const bookmarkCount = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      return apps.value.filter(a => a.type === 'bookmark' && (!q || a.name.toLowerCase().includes(q))).length;
    });
    const favCount = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      if (!q) return allUnifiedFavorites.value.length;
      return allUnifiedFavorites.value.filter(item => {
        const name = item.kind === 'app' ? item.app.name : item.resource.name;
        return name.toLowerCase().includes(q);
      }).length;
    });
    const webShieldResourceCount = computed(() => filteredPrivilegedWebShield.value.length);
    const serverResourceCount = computed(() => filteredPrivilegedServers.value.length);
    const databaseResourceCount = computed(() => filteredPrivilegedDatabases.value.length);

    function privilegedResourceSubtitle(r: PrivilegedResource): string {
      if (r.type === 'Web Shield') return r.url ?? '';
      return r.host ?? '';
    }

    function toggleFavorite(app: PortalApp) {
      const found = apps.value.find(a => a.id === app.id);
      if (found) found.favorite = !found.favorite;
    }

    function togglePrivilegedFavorite(resource: PrivilegedResource) {
      const found = privilegedResources.value.find(r => r.id === resource.id);
      if (found) found.favorite = !found.favorite;
    }

    function handlePageChange(event: { first: number; rows: number }) {
      if (event.rows !== rowsPerPage.value) {
        rowsPerPage.value = event.rows;
        first.value = 0;
      } else {
        first.value = event.first;
      }
    }

    return {
      apps,
      inPasswordVault,
      searchQuery,
      activeTab,
      currentPage,
      first,
      rowsPerPage,
      viewMode,
      viewOptions,
      currentView,
      activeNavItem,
      navMenuItems,
      navProfileMenuItems,
      passwordVaultTabs,
      requests,
      requestsTab,
      requestResourcesCount,
      requestPrivilegedCount,
      requestAccessCount,
      requestSearchQuery,
      vaultRequestSearchQuery,
      filteredRequestableResources,
      filteredVaultRequestableResources,
      openRequestDialog,
      closeRequestDialog,
      handleRequestContinue,
      selectedRequest,
      showRequestDialog,
      requestReason,
      requestTypeIconMap,
      isRequestCollapsed,
      setRequestExpanded,
      passwordVaultTab,
      credentialColumns,
      websiteColumns,
      vaultPasswordVaultStatCards,
      vaultPasswordVaultLoginCount,
      vaultPasswordVaultLastLogins,
      vaultSecretsAddedBars,
      vaultMaxSecretsAddedValue,
      vaultWeakSecretsSummary,
      vaultWeakSecrets,
      vaultExpiringSecretsSummary,
      vaultExpiringSecrets,
      vaultUnusedSecretsSummary,
      vaultUnusedSecrets,
      vaultWebsitesData,
      vaultCredentialsData,
      vaultWebsitesColumns,
      vaultCredentialsColumns,
      vaultWebsitesFilterChips,
      vaultCredentialsFilterChips,
      vaultWebsitesDraftFilterCount,
      vaultCredentialsDraftFilterCount,
      vaultWebsitesStatusOptions,
      vaultCredentialsStatusOptions,
      vaultWebsitesConnectorOptions,
      vaultCredentialsConnectorOptions,
      vaultWebsitesJumpServerOptions,
      vaultCredentialsJumpServerOptions,
      draftVaultWebsitesStatus,
      draftVaultWebsitesConnectors,
      draftVaultWebsitesJumpServers,
      draftVaultCredentialsStatus,
      draftVaultCredentialsConnectors,
      draftVaultCredentialsJumpServers,
      showVaultWebsitesFilterDialog,
      showVaultCredentialsFilterDialog,
      openVaultWebsitesDialog,
      openVaultCredentialsDialog,
      openVaultWebsitesFilterDialog,
      openVaultCredentialsFilterDialog,
      applyVaultWebsitesFilters,
      applyVaultCredentialsFilters,
      cancelVaultWebsitesFilters,
      cancelVaultCredentialsFilters,
      clearVaultWebsitesDraftFilters,
      clearVaultCredentialsDraftFilters,
      clearAllVaultWebsitesFilters,
      clearAllVaultCredentialsFilters,
      removeVaultWebsitesFilterChip,
      removeVaultCredentialsFilterChip,
      filteredCredentialsData,
      filteredWebsitesData,
      credentialFilterChips,
      websiteFilterChips,
      credentialDialogTitle,
      websiteDialogTitle,
      credentialForm,
      websiteForm,
      credentialTypeOptions,
      credentialTagOptions,
      websiteTagOptions,
      credentialDraftFilterCount,
      websiteDraftFilterCount,
      showCredentialDialog,
      showWebsiteDialog,
      showCredentialFilterDialog,
      showWebsiteFilterDialog,
      draftCredentialTypes,
      draftCredentialTags,
      draftWebsiteTags,
      openAddCredentialDialog,
      openAddWebsiteDialog,
      enterPasswordVault,
      leavePasswordVault,
      openPasswordVault,
      closeCredentialDialog,
      closeWebsiteDialog,
      handleCredentialSearch,
      handleWebsiteSearch,
      openCredentialFilterDialog,
      openWebsiteFilterDialog,
      cancelCredentialFilters,
      cancelWebsiteFilters,
      clearDraftCredentialFilters,
      clearDraftWebsiteFilters,
      clearAllCredentialFilters,
      clearAllWebsiteFilters,
      removeCredentialFilterChip,
      removeWebsiteFilterChip,
      applyCredentialFilters,
      applyWebsiteFilters,
      allApps,
      displayedApps,
      displayedUnifiedFavorites,
      displayedPrivilegedSub,
      listColumns,
      listRows,
      totalRecords,
      allCount,
      ssoCount,
      bookmarkCount,
      favCount,
      webShieldResourceCount,
      serverResourceCount,
      databaseResourceCount,
      privilegedResourceSubtitle,
      toggleFavorite,
      togglePrivilegedFavorite,
      handlePageChange,
      StarOutline: markRaw(StarOutline),
      StarSolid: markRaw(StarSolid),
    };
  },
  template: `
    <div class="flex h-screen overflow-hidden">
      <ToastNotification />

      <AppNavigation
        :menuItems="navMenuItems"
        :profileMenuItems="navProfileMenuItems"
        :activeItem="activeNavItem"
        :collapsible="true"
        :topNavToggle="true"
      >
        <template #custom-text>
          <div class="w-full border-b border-navigation-default">
            <div v-if="inPasswordVault" class="p-4">
              <PvButton
                label="Back to User Portal"
                severity="secondary"
                variant="outlined"
                class="w-full"
                @click="leavePasswordVault"
              >
                <template #icon="iconProps">
                  <ArrowLeftIcon :class="iconProps.class" />
                </template>
              </PvButton>
            </div>
            <p v-else class="m-0 block p-4 text-body-xs text-neutral-base">
              Powered by <span class="text-body-xs-bold text-neutral-base">JumpCloud</span>
            </p>
          </div>
        </template>
      </AppNavigation>

      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <template v-if="currentPage === 'vault-home'">
          <DashboardPageLayout class="w-full! h-full!">
            <div class="flex flex-col gap-lg w-full">
              <div class="grid grid-cols-[max-content_1fr] gap-6 items-stretch">
                <div class="flex flex-col gap-6 items-start">
                  <DashboardStatCard
                    v-for="stat in vaultPasswordVaultStatCards"
                    :key="stat.header"
                    :header="stat.header"
                    :value="stat.value"
                    :icon="stat.icon"
                    :changeValue="stat.changeValue"
                    :changeLabel="stat.changeLabel"
                    :showArrow="stat.showArrow"
                    class="w-fit h-fit"
                  />
                </div>

                <CollapsiblePanel header="Secrets Added Over Time" class="w-full h-full">
                  <template #titleicon="iconProps">
                    <ChartBarSquareIcon :class="iconProps.class" />
                  </template>
                  <div class="flex flex-col h-full">
                    <div class="flex flex-col gap-sm flex-1">
                      <div
                        v-for="item in vaultSecretsAddedBars"
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
                              :style="{ width: ((item.value / vaultMaxSecretsAddedValue) * 100) + '%' }"
                            />
                          </div>
                        </div>
                        <div class="w-8 text-body-sm text-neutral-base text-right shrink-0">
                          {{ item.value }}
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsiblePanel>
              </div>

              <div class="grid grid-cols-2 gap-6">
                <CollapsiblePanel header="Weak Secrets" class="w-full overflow-hidden flex flex-col h-[264px]">
                  <template #actions>
                    <PvButton label="View All" severity="secondary" variant="outlined" size="small" />
                  </template>
                  <div class="flex flex-col gap-sm h-full">
                    <div class="flex items-center gap-xs flex-shrink-0">
                      <span class="text-body-sm-bold text-error-base">{{ vaultWeakSecretsSummary.count }}</span>
                      <span class="text-body-sm text-neutral-base">{{ vaultWeakSecretsSummary.label }}</span>
                    </div>
                    <div class="flex flex-col divide-y divide-neutral-default_solid border-t border-neutral-default_solid flex-1 overflow-y-auto">
                      <div
                        v-for="secret in vaultWeakSecrets"
                        :key="secret.name"
                        class="flex items-center justify-between py-3"
                      >
                        <span class="text-body-sm-semi-bold text-neutral-base">{{ secret.name }}</span>
                        <span class="text-body-sm-semi-bold text-error-base">{{ secret.risk }}</span>
                      </div>
                    </div>
                  </div>
                </CollapsiblePanel>

                <CollapsiblePanel header="Expiring Secrets" class="w-full overflow-hidden flex flex-col h-[264px]">
                  <template #actions>
                    <PvButton label="View All" severity="secondary" variant="outlined" size="small" />
                  </template>
                  <div class="flex flex-col gap-sm h-full">
                    <div class="flex items-center gap-xs flex-shrink-0">
                      <span class="text-body-sm-bold text-error-base">{{ vaultExpiringSecretsSummary.count }}</span>
                      <span class="text-body-sm text-neutral-base">{{ vaultExpiringSecretsSummary.label }}</span>
                    </div>
                    <div class="flex flex-col divide-y divide-neutral-default_solid border-t border-neutral-default_solid flex-1 overflow-y-auto">
                      <div
                        v-for="secret in vaultExpiringSecrets"
                        :key="secret.name"
                        class="flex items-center justify-between py-3"
                      >
                        <span class="text-body-sm-semi-bold text-neutral-base">{{ secret.name }}</span>
                        <div class="flex items-center gap-xs text-body-sm">
                          <span class="text-neutral-subtle">{{ secret.metaLabel }}</span>
                          <span class="text-body-sm-semi-bold text-error-base">{{ secret.metaValue }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsiblePanel>
              </div>

              <div class="grid grid-cols-2 gap-6">
                <CollapsiblePanel header="Unused Secrets" class="w-full overflow-hidden flex flex-col h-[264px]">
                  <template #actions>
                    <PvButton label="View All" severity="secondary" variant="outlined" size="small" />
                  </template>
                  <div class="flex flex-col gap-sm h-full">
                    <div class="flex items-center gap-xs flex-shrink-0">
                      <span class="text-body-sm-bold text-error-base">{{ vaultUnusedSecretsSummary.count }}</span>
                      <span class="text-body-sm text-neutral-base">{{ vaultUnusedSecretsSummary.label }}</span>
                    </div>
                    <div class="flex flex-col divide-y divide-neutral-default_solid border-t border-neutral-default_solid flex-1 overflow-y-auto">
                      <div
                        v-for="secret in vaultUnusedSecrets"
                        :key="secret.name"
                        class="flex items-center justify-between py-3"
                      >
                        <span class="text-body-sm-semi-bold text-neutral-base">{{ secret.name }}</span>
                        <div class="flex items-center gap-xs text-body-sm">
                          <span class="text-neutral-subtle">{{ secret.metaLabel }}</span>
                          <span class="text-body-sm-semi-bold text-error-base">{{ secret.metaValue }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsiblePanel>
              </div>
            </div>
          </DashboardPageLayout>
        </template>
        <template v-else-if="currentPage === 'vault-access-requests'">
          <PageHeader
            title="Access Requests"
          >
            <template #subtitle>
              <span class="text-body-md text-neutral-subtle">Search for and select a resource to request access.</span>
            </template>
          </PageHeader>

          <div class="flex-1 min-h-0 overflow-auto bg-neutral-surface">
            <div class="w-full max-w-3xl mx-auto px-6 py-6">
              <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between">
                  <div class="w-72">
                    <PvIconField>
                      <PvInputIcon>
                        <MagnifyingGlassIcon />
                      </PvInputIcon>
                      <PvInputText
                        v-model="vaultRequestSearchQuery"
                        placeholder="Search resources..."
                        class="w-full"
                      />
                    </PvIconField>
                  </div>
                </div>

                <div class="flex flex-col gap-4">
                  <CollapsiblePanel
                    v-for="resource in filteredVaultRequestableResources"
                    :key="resource.id"
                    toggleable
                    :collapsed="isRequestCollapsed('vault-request-' + resource.id)"
                    @update:collapsed="setRequestExpanded('vault-request-' + resource.id, !$event)"
                    :header="resource.name"
                  >
                    <template #titleicon="iconProps">
                      <component :is="requestTypeIconMap[resource.type]" :class="iconProps.class" />
                    </template>
                    <template #actions>
                      <PvButton
                        label="Select"
                        variant="outlined"
                        size="small"
                        @click="resource.category === 'access' ? console.log('Admin elevation request selected') : openRequestDialog(resource)"
                      />
                    </template>
                    <template #toggleicon="iconProps">
                      <ChevronRightIcon :class="iconProps.class" />
                    </template>
                    <div class="flex flex-col gap-2">
                      <p class="text-body-md text-neutral-base">{{ resource.description }}</p>
                      <p class="text-body-sm text-neutral-subtle">Type: {{ resource.type }}</p>
                    </div>
                  </CollapsiblePanel>

                  <div v-if="filteredVaultRequestableResources.length === 0" class="flex flex-col items-center gap-3 py-12">
                    <CheckCircleIcon class="size-10 text-success-base" />
                    <p class="text-body-md text-neutral-subtle">No resources match your search.</p>
                  </div>
                </div>
              </div>

              <PvDialog
                v-model:visible="showRequestDialog"
                :draggable="false"
                modal
                header="Resource Request"
                :style="{ width: '560px' }"
              >
                <template #closeicon><XMarkIcon /></template>

                <div class="flex flex-col gap-md">
                  <FormField label="Request Name">
                    <template #default="{ inputId }">
                      <PvInputText
                        :id="inputId"
                        :modelValue="selectedRequest?.name ?? ''"
                        class="w-full"
                        readonly
                      />
                    </template>
                  </FormField>

                  <FormField label="Request Description">
                    <template #default="{ inputId }">
                      <PvTextarea
                        :id="inputId"
                        :modelValue="selectedRequest?.description ?? ''"
                        class="w-full"
                        :rows="3"
                        readonly
                      />
                    </template>
                  </FormField>

                  <FormField label="Reason for request" required>
                    <template #default="{ inputId }">
                      <PvTextarea
                        :id="inputId"
                        v-model="requestReason"
                        class="w-full"
                        :rows="4"
                        placeholder="Explain why access is needed."
                        required
                      />
                    </template>
                  </FormField>
                </div>

                <template #footer>
                  <div class="flex items-center flex-1 min-w-0"></div>
                  <div class="flex gap-sm shrink-0">
                    <PvButton label="Cancel" severity="secondary" variant="text" @click="closeRequestDialog" />
                    <PvButton label="Continue" @click="handleRequestContinue" />
                  </div>
                </template>
              </PvDialog>
            </div>
          </div>
        </template>
        <template v-else-if="currentPage === 'vault-credentials'">
          <ListPageLayout class="w-full! h-full!">
            <div class="flex flex-col h-full gap-lg">
              <PageHeader title="Credentials" class="-ml-6" />
              <div class="flex flex-col h-full relative">
                <CircuitDataTable
                  :columns="vaultCredentialsColumns"
                  :data="vaultCredentialsData"
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
                <FormField label="Status">
                  <template #default="{ inputId }">
                    <SelectButton
                      :id="inputId"
                      v-model="draftVaultCredentialsStatus"
                      :options="vaultCredentialsStatusOptions"
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
                      v-model="draftVaultCredentialsConnectors"
                      :options="vaultCredentialsConnectorOptions"
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
                      v-model="draftVaultCredentialsJumpServers"
                      :options="vaultCredentialsJumpServerOptions"
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
        </template>
        <template v-else-if="currentPage === 'vault-websites'">
          <ListPageLayout class="w-full! h-full!">
            <div class="flex flex-col h-full gap-lg">
              <PageHeader title="Websites" class="-ml-6" />
              <div class="flex flex-col h-full relative">
                <CircuitDataTable
                  :columns="vaultWebsitesColumns"
                  :data="vaultWebsitesData"
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
                <FormField label="Status">
                  <template #default="{ inputId }">
                    <SelectButton
                      :id="inputId"
                      v-model="draftVaultWebsitesStatus"
                      :options="vaultWebsitesStatusOptions"
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
                      v-model="draftVaultWebsitesConnectors"
                      :options="vaultWebsitesConnectorOptions"
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
                      v-model="draftVaultWebsitesJumpServers"
                      :options="vaultWebsitesJumpServerOptions"
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
        </template>
        <template v-else>
        <PageHeader
          v-if="currentView === 'password-vault'"
          title="Password Vault"
          :tabs="passwordVaultTabs"
          :activeTab="passwordVaultTab"
          @update:activeTab="passwordVaultTab = $event"
        />
        <template v-if="currentView === 'requests'">
          <PageHeader
            title="Requests"
          >
            <template #subtitle>
              <span class="text-body-md text-neutral-subtle">Search for and select a resource to request access.</span>
            </template>
          </PageHeader>

          <div class="flex-1 min-h-0 overflow-auto bg-neutral-surface">
            <div class="w-full max-w-3xl mx-auto px-6 py-6">
              <div class="flex flex-col gap-4">
                <PvTabs v-model:value="requestsTab">
                  <PvTabList>
                    <PvTab value="resources">Resources <span class="text-body-md text-tab-sub-text-base">({{ requestResourcesCount }})</span></PvTab>
                    <PvTab value="privileged">Privileged Resources <span class="text-body-md text-tab-sub-text-base">({{ requestPrivilegedCount }})</span></PvTab>
                    <PvTab value="access">Access <span class="text-body-md text-tab-sub-text-base">({{ requestAccessCount }})</span></PvTab>
                  </PvTabList>
                </PvTabs>
                <div class="flex items-center justify-between">
                  <div class="w-72">
                    <PvIconField>
                      <PvInputIcon>
                        <MagnifyingGlassIcon />
                      </PvInputIcon>
                      <PvInputText
                        v-model="requestSearchQuery"
                        placeholder="Search resources..."
                        class="w-full"
                      />
                    </PvIconField>
                  </div>
                </div>

                <div class="flex flex-col gap-4">
                  <CollapsiblePanel
                    v-for="resource in filteredRequestableResources"
                    :key="resource.id"
                    toggleable
                    :collapsed="isRequestCollapsed('request-' + resource.id)"
                    @update:collapsed="setRequestExpanded('request-' + resource.id, !$event)"
                    :header="resource.name"
                  >
                    <template #titleicon="iconProps">
                      <component :is="requestTypeIconMap[resource.type]" :class="iconProps.class" />
                    </template>
                    <template #actions>
                      <PvButton
                        label="Select"
                        variant="outlined"
                        size="small"
                        @click="resource.category === 'access' ? console.log('Admin elevation request selected') : openRequestDialog(resource)"
                      />
                    </template>
                    <template #toggleicon="iconProps">
                      <ChevronRightIcon :class="iconProps.class" />
                    </template>
                    <div class="flex flex-col gap-2">
                      <p class="text-body-md text-neutral-base">{{ resource.description }}</p>
                      <p class="text-body-sm text-neutral-subtle">Type: {{ resource.type }}</p>
                    </div>
                  </CollapsiblePanel>

                  <div v-if="filteredRequestableResources.length === 0" class="flex flex-col items-center gap-3 py-12">
                    <CheckCircleIcon class="size-10 text-success-base" />
                    <p class="text-body-md text-neutral-subtle">No resources match your search.</p>
                  </div>
                </div>
              </div>

              <PvDialog
                v-model:visible="showRequestDialog"
                :draggable="false"
                modal
                header="Resource Request"
                :style="{ width: '560px' }"
              >
                <template #closeicon><XMarkIcon /></template>

                <div class="flex flex-col gap-md">
                  <FormField label="Request Name">
                    <template #default="{ inputId }">
                      <PvInputText
                        :id="inputId"
                        :modelValue="selectedRequest?.name ?? ''"
                        class="w-full"
                        readonly
                      />
                    </template>
                  </FormField>

                  <FormField label="Request Description">
                    <template #default="{ inputId }">
                      <PvTextarea
                        :id="inputId"
                        :modelValue="selectedRequest?.description ?? ''"
                        class="w-full"
                        :rows="3"
                        readonly
                      />
                    </template>
                  </FormField>

                  <FormField label="Reason for request" required>
                    <template #default="{ inputId }">
                      <PvTextarea
                        :id="inputId"
                        v-model="requestReason"
                        class="w-full"
                        :rows="4"
                        placeholder="Explain why access is needed."
                        required
                      />
                    </template>
                  </FormField>
                </div>

                <template #footer>
                  <div class="flex items-center flex-1 min-w-0"></div>
                  <div class="flex gap-sm shrink-0">
                    <PvButton label="Cancel" severity="secondary" variant="text" @click="closeRequestDialog" />
                    <PvButton label="Continue" @click="handleRequestContinue" />
                  </div>
                </template>
              </PvDialog>
            </div>
          </div>
        </template>

        <ListPageLayout v-else-if="currentView === 'password-vault'" class="w-full! h-full!">
          <div class="flex flex-col h-full relative">
            <template v-if="passwordVaultTab === 'overview'">
              <DashboardPageLayout class="w-full! h-full!">
                <div class="flex flex-col gap-lg w-full">
                  <div class="grid grid-cols-[max-content_1fr] gap-6 items-stretch">
                    <div class="flex flex-col gap-6 items-start">
                      <DashboardStatCard
                        v-for="stat in vaultPasswordVaultStatCards"
                        :key="stat.header"
                        :header="stat.header"
                        :value="stat.value"
                        :icon="stat.icon"
                        :changeValue="stat.changeValue"
                        :changeLabel="stat.changeLabel"
                        :showArrow="stat.showArrow"
                        class="w-fit h-fit"
                      />
                    </div>

                    <CollapsiblePanel header="Secrets Added Over Time" class="w-full h-full">
                      <template #titleicon="iconProps">
                        <ChartBarSquareIcon :class="iconProps.class" />
                      </template>
                      <div class="flex flex-col h-full">
                        <div class="flex flex-col gap-sm flex-1">
                          <div
                            v-for="item in vaultSecretsAddedBars"
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
                                  :style="{ width: ((item.value / vaultMaxSecretsAddedValue) * 100) + '%' }"
                                />
                              </div>
                            </div>
                            <div class="w-8 text-body-sm text-neutral-base text-right shrink-0">
                              {{ item.value }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsiblePanel>
                  </div>

                  <div class="grid grid-cols-2 gap-6">
                    <CollapsiblePanel header="Weak Secrets" class="w-full overflow-hidden flex flex-col h-[264px]">
                      <template #actions>
                        <PvButton label="View All" severity="secondary" variant="outlined" size="small" />
                      </template>
                      <div class="flex flex-col gap-sm h-full">
                        <div class="flex items-center gap-xs flex-shrink-0">
                          <span class="text-body-sm-bold text-error-base">{{ vaultWeakSecretsSummary.count }}</span>
                          <span class="text-body-sm text-neutral-base">{{ vaultWeakSecretsSummary.label }}</span>
                        </div>
                        <div class="flex flex-col divide-y divide-neutral-default_solid border-t border-neutral-default_solid flex-1 overflow-y-auto">
                          <div
                            v-for="secret in vaultWeakSecrets"
                            :key="secret.name"
                            class="flex items-center justify-between py-3"
                          >
                            <span class="text-body-sm-semi-bold text-neutral-base">{{ secret.name }}</span>
                            <span class="text-body-sm-semi-bold text-error-base">{{ secret.risk }}</span>
                          </div>
                        </div>
                      </div>
                    </CollapsiblePanel>

                    <CollapsiblePanel header="Expiring Secrets" class="w-full overflow-hidden flex flex-col h-[264px]">
                      <template #actions>
                        <PvButton label="View All" severity="secondary" variant="outlined" size="small" />
                      </template>
                      <div class="flex flex-col gap-sm h-full">
                        <div class="flex items-center gap-xs flex-shrink-0">
                          <span class="text-body-sm-bold text-error-base">{{ vaultExpiringSecretsSummary.count }}</span>
                          <span class="text-body-sm text-neutral-base">{{ vaultExpiringSecretsSummary.label }}</span>
                        </div>
                        <div class="flex flex-col divide-y divide-neutral-default_solid border-t border-neutral-default_solid flex-1 overflow-y-auto">
                          <div
                            v-for="secret in vaultExpiringSecrets"
                            :key="secret.name"
                            class="flex items-center justify-between py-3"
                          >
                            <span class="text-body-sm-semi-bold text-neutral-base">{{ secret.name }}</span>
                            <div class="flex items-center gap-xs text-body-sm">
                              <span class="text-neutral-subtle">{{ secret.metaLabel }}</span>
                              <span class="text-body-sm-semi-bold text-error-base">{{ secret.metaValue }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsiblePanel>
                  </div>

                  <div class="grid grid-cols-2 gap-6">
                    <CollapsiblePanel header="Unused Secrets" class="w-full overflow-hidden flex flex-col h-[264px]">
                      <template #actions>
                        <PvButton label="View All" severity="secondary" variant="outlined" size="small" />
                      </template>
                      <div class="flex flex-col gap-sm h-full">
                        <div class="flex items-center gap-xs flex-shrink-0">
                          <span class="text-body-sm-bold text-error-base">{{ vaultUnusedSecretsSummary.count }}</span>
                          <span class="text-body-sm text-neutral-base">{{ vaultUnusedSecretsSummary.label }}</span>
                        </div>
                        <div class="flex flex-col divide-y divide-neutral-default_solid border-t border-neutral-default_solid flex-1 overflow-y-auto">
                          <div
                            v-for="secret in vaultUnusedSecrets"
                            :key="secret.name"
                            class="flex items-center justify-between py-3"
                          >
                            <span class="text-body-sm-semi-bold text-neutral-base">{{ secret.name }}</span>
                            <div class="flex items-center gap-xs text-body-sm">
                              <span class="text-neutral-subtle">{{ secret.metaLabel }}</span>
                              <span class="text-body-sm-semi-bold text-error-base">{{ secret.metaValue }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsiblePanel>
                  </div>
                </div>
              </DashboardPageLayout>
            </template>
            <template v-else-if="passwordVaultTab === 'websites'">
              <div class="flex flex-col h-full gap-lg">
                <div class="flex flex-col h-full relative">
                  <CircuitDataTable
                    :columns="vaultWebsitesColumns"
                    :data="vaultWebsitesData"
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
                  <FormField label="Status">
                    <template #default="{ inputId }">
                      <SelectButton
                        :id="inputId"
                        v-model="draftVaultWebsitesStatus"
                        :options="vaultWebsitesStatusOptions"
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
                        v-model="draftVaultWebsitesConnectors"
                        :options="vaultWebsitesConnectorOptions"
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
                        v-model="draftVaultWebsitesJumpServers"
                        :options="vaultWebsitesJumpServerOptions"
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
                    <span class="text-body-sm text-neutral-subtle">{{ vaultWebsitesDraftFilterCount }} Filters applied</span>
                  </div>
                  <div class="flex gap-sm shrink-0">
                    <PvButton label="Cancel" severity="secondary" variant="text" @click="cancelVaultWebsitesFilters" />
                    <PvButton label="Clear All" severity="secondary" variant="outlined" @click="clearVaultWebsitesDraftFilters" />
                    <PvButton label="Apply" @click="applyVaultWebsitesFilters" />
                  </div>
                </template>
              </PvDialog>
            </template>
            <template v-else>
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
                  <FormField label="Status">
                    <template #default="{ inputId }">
                      <SelectButton
                        :id="inputId"
                        v-model="draftVaultCredentialsStatus"
                        :options="vaultCredentialsStatusOptions"
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
                        v-model="draftVaultCredentialsConnectors"
                        :options="vaultCredentialsConnectorOptions"
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
                        v-model="draftVaultCredentialsJumpServers"
                        :options="vaultCredentialsJumpServerOptions"
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
                    <span class="text-body-sm text-neutral-subtle">{{ vaultCredentialsDraftFilterCount }} Filters applied</span>
                  </div>
                  <div class="flex gap-sm shrink-0">
                    <PvButton label="Cancel" severity="secondary" variant="text" @click="cancelVaultCredentialsFilters" />
                    <PvButton label="Clear All" severity="secondary" variant="outlined" @click="clearVaultCredentialsDraftFilters" />
                    <PvButton label="Apply" @click="applyVaultCredentialsFilters" />
                  </div>
                </template>
              </PvDialog>
            </template>
          </div>

          <PvDialog
            v-model:visible="showCredentialDialog"
            :draggable="false"
            modal
            :header="credentialDialogTitle"
            :style="{ width: '560px' }"
            @update:visible="!$event && closeCredentialDialog()"
          >
                <template #closeicon><XMarkIcon /></template>

                <div class="flex flex-col gap-md">
                  <FormField label="Credential Type">
                    <template #default="{ inputId }">
                      <PvSelect
                        :id="inputId"
                        v-model="credentialForm.type"
                        :options="credentialTypeOptions"
                        optionLabel="label"
                        optionValue="value"
                        class="w-full!"
                      />
                    </template>
                  </FormField>

                  <FormField label="Name">
                    <template #default="{ inputId }">
                      <PvInputText :id="inputId" v-model="credentialForm.name" class="w-full" />
                    </template>
                  </FormField>

                  <FormField label="Username">
                    <template #default="{ inputId }">
                      <PvInputText :id="inputId" v-model="credentialForm.username" class="w-full" />
                    </template>
                  </FormField>

                  <FormField label="Password">
                    <template #default="{ inputId }">
                      <Password :inputId="inputId" v-model="credentialForm.password" toggleMask />
                    </template>
                  </FormField>

                  <FormField label="Expiration Date">
                    <template #default="{ inputId }">
                      <PvInputText
                        :id="inputId"
                        v-model="credentialForm.expirationDate"
                        placeholder="MM/DD/YYYY"
                        class="w-full"
                      />
                    </template>
                  </FormField>

                  <FormField label="Tags">
                    <template #default="{ inputId }">
                      <PvInputText
                        :id="inputId"
                        v-model="credentialForm.tags"
                        placeholder="Add tags"
                        class="w-full"
                      />
                    </template>
                  </FormField>

                  <FormField label="Notes">
                    <template #default="{ inputId }">
                      <PvTextarea :id="inputId" v-model="credentialForm.notes" class="w-full" :rows="3" />
                    </template>
                  </FormField>
                </div>

                <template #footer>
                  <div class="flex items-center flex-1 min-w-0"></div>
                  <div class="flex gap-sm shrink-0">
                    <PvButton label="Cancel" severity="secondary" variant="text" @click="closeCredentialDialog" />
                    <PvButton label="Save" @click="closeCredentialDialog" />
                  </div>
                </template>
          </PvDialog>

          <PvDialog
            v-model:visible="showWebsiteDialog"
            :draggable="false"
            modal
            :header="websiteDialogTitle"
            :style="{ width: '560px' }"
            @update:visible="!$event && closeWebsiteDialog()"
          >
                <template #closeicon><XMarkIcon /></template>

                <div class="flex flex-col gap-md">
                  <FormField label="Name">
                    <template #default="{ inputId }">
                      <PvInputText :id="inputId" v-model="websiteForm.name" class="w-full" />
                    </template>
                  </FormField>

                  <FormField label="URI">
                    <template #default="{ inputId }">
                      <PvInputText
                        :id="inputId"
                        v-model="websiteForm.uri"
                        placeholder="https://"
                        class="w-full"
                      />
                    </template>
                  </FormField>

                  <FormField label="Tags">
                    <template #default="{ inputId }">
                      <PvInputText
                        :id="inputId"
                        v-model="websiteForm.tags"
                        placeholder="Add tags"
                        class="w-full"
                      />
                    </template>
                  </FormField>

                  <FormField label="Notes">
                    <template #default="{ inputId }">
                      <PvTextarea :id="inputId" v-model="websiteForm.notes" class="w-full" :rows="3" />
                    </template>
                  </FormField>
                </div>

                <template #footer>
                  <div class="flex items-center flex-1 min-w-0"></div>
                  <div class="flex gap-sm shrink-0">
                    <PvButton label="Cancel" severity="secondary" variant="text" @click="closeWebsiteDialog" />
                    <PvButton label="Save" @click="closeWebsiteDialog" />
                  </div>
                </template>
          </PvDialog>

          <PvDialog
            v-model:visible="showCredentialFilterDialog"
            :draggable="false"
            modal
            header="Apply filters"
            :style="{ width: '560px' }"
            @update:visible="!$event && cancelCredentialFilters()"
          >
                <template #closeicon><XMarkIcon /></template>
                <div class="flex flex-col gap-md">
                  <FormField label="Type">
                    <template #default="{ inputId }">
                      <PvMultiSelect
                        :id="inputId"
                        v-model="draftCredentialTypes"
                        :options="credentialTypeOptions"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="All types"
                        :maxSelectedLabels="2"
                        class="w-full"
                      />
                    </template>
                  </FormField>
                  <FormField label="Tags">
                    <template #default="{ inputId }">
                      <PvMultiSelect
                        :id="inputId"
                        v-model="draftCredentialTags"
                        :options="credentialTagOptions"
                        placeholder="All tags"
                        :maxSelectedLabels="2"
                        class="w-full"
                      />
                    </template>
                  </FormField>
                </div>
                <template #footer>
                  <div class="flex items-center flex-1 min-w-0">
                    <span class="text-body-sm text-neutral-subtle">{{ credentialDraftFilterCount }} Filters applied</span>
                  </div>
                  <div class="flex gap-sm shrink-0">
                    <PvButton label="Cancel" severity="secondary" variant="text" @click="cancelCredentialFilters" />
                    <PvButton label="Clear All" severity="secondary" variant="outlined" @click="clearDraftCredentialFilters" />
                    <PvButton label="Apply" @click="applyCredentialFilters" />
                  </div>
                </template>
          </PvDialog>

          <PvDialog
            v-model:visible="showWebsiteFilterDialog"
            :draggable="false"
            modal
            header="Apply filters"
            :style="{ width: '560px' }"
            @update:visible="!$event && cancelWebsiteFilters()"
          >
                <template #closeicon><XMarkIcon /></template>
                <div class="flex flex-col gap-md">
                  <FormField label="Tags">
                    <template #default="{ inputId }">
                      <PvMultiSelect
                        :id="inputId"
                        v-model="draftWebsiteTags"
                        :options="websiteTagOptions"
                        placeholder="All tags"
                        :maxSelectedLabels="2"
                        class="w-full"
                      />
                    </template>
                  </FormField>
                </div>
                <template #footer>
                  <div class="flex items-center flex-1 min-w-0">
                    <span class="text-body-sm text-neutral-subtle">{{ websiteDraftFilterCount }} Filters applied</span>
                  </div>
                  <div class="flex gap-sm shrink-0">
                    <PvButton label="Cancel" severity="secondary" variant="text" @click="cancelWebsiteFilters" />
                    <PvButton label="Clear All" severity="secondary" variant="outlined" @click="clearDraftWebsiteFilters" />
                    <PvButton label="Apply" @click="applyWebsiteFilters" />
                  </div>
                </template>
          </PvDialog>
        </ListPageLayout>

        <template v-else>
          <div class="shrink-0 flex items-center justify-end gap-3 h-10 px-4 border-b border-neutral-default_solid bg-neutral-base">
            <PvButton label="Launch Admin Portal" severity="secondary" size="small" iconPos="right">
              <template #icon>
                <ArrowTopRightOnSquareIcon class="size-3.5" />
              </template>
            </PvButton>
            <a href="#" class="text-body-sm text-link-base hover:underline flex items-center gap-1">
              Learn more
              <ArrowTopRightOnSquareIcon class="size-3.5" />
            </a>
          </div>

          <div class="flex-1 flex flex-col min-h-0 overflow-y-scroll bg-neutral-surface">
            <div class="w-full max-w-5xl mx-auto px-8">

            <div class="flex items-start justify-between pt-6 pb-4">
              <div>
                <h1 class="text-heading-1 text-neutral-base m-0">Welcome, Gabriel</h1>
                <div class="text-body-sm text-neutral-base mt-1">Launch your apps and privileged resources with a single click.</div>
              </div>
              <div class="flex items-center gap-3 shrink-0">
                <div class="w-57.5">
                  <PvIconField>
                    <PvInputIcon>
                      <MagnifyingGlassIcon />
                    </PvInputIcon>
                    <PvInputText
                      v-model="searchQuery"
                      placeholder="Search..."
                      class="w-full"
                    />
                  </PvIconField>
                </div>
                <SelectButton
                  v-model="viewMode"
                  :options="viewOptions"
                  optionValue="value"
                  :allowEmpty="false"
                >
                  <template #option="{ option }">
                    <component :is="option.icon" class="w-4 h-4" />
                  </template>
                </SelectButton>
              </div>
            </div>

            <PvTabs v-model:value="activeTab" @update:value="first = 0">
              <PvTabList>
                <PvTab value="all">All <span class="text-body-md text-tab-sub-text-base">({{ allCount }})</span></PvTab>
                <PvTab value="sso">SSO <span class="text-body-md text-tab-sub-text-base">({{ ssoCount }})</span></PvTab>
                <PvTab value="bookmarks">Bookmarks <span class="text-body-md text-tab-sub-text-base">({{ bookmarkCount }})</span></PvTab>
                <PvTab value="web-shield">Web Shield <span class="text-body-md text-tab-sub-text-base">({{ webShieldResourceCount }})</span></PvTab>
                <PvTab value="servers">Servers <span class="text-body-md text-tab-sub-text-base">({{ serverResourceCount }})</span></PvTab>
                <PvTab value="databases">Databases <span class="text-body-md text-tab-sub-text-base">({{ databaseResourceCount }})</span></PvTab>
                <PvTab value="favorites">Favorites <span class="text-body-md text-tab-sub-text-base">({{ favCount }})</span></PvTab>
              </PvTabList>

              <PvTabPanels>

                <PvTabPanel value="all">
                  <Transition
                    v-if="viewMode === 'grid'"
                    enter-active-class="transition-opacity duration-200 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition-opacity duration-150 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                    mode="out-in"
                  >
                    <div v-if="displayedApps.length > 0" :key="'all-apps'" class="grid w-full grid-cols-5 max-md:grid-cols-2 gap-4 pt-4 pb-6">
                      <template
                        v-for="item in displayedApps"
                        :key="item.type === 'Web Shield' || item.type === 'Server' || item.type === 'Database' ? 'resource-' + item.id : 'app-' + item.id"
                      >
                        <div
                          v-if="item.type === 'Web Shield' || item.type === 'Server' || item.type === 'Database'"
                          class="group flex min-w-0 flex-col rounded-md border border-neutral-default_solid bg-neutral-base cursor-pointer hover:shadow-e200 transition-shadow overflow-hidden"
                        >
                          <div class="flex items-center justify-between pt-2 pb-0 px-2">
                            <ArrowTopRightOnSquareIcon class="size-4 shrink-0 text-neutral-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                            <button
                              type="button"
                              class="border-0 bg-transparent cursor-pointer p-0 size-6 shrink-0 flex items-center justify-center leading-none"
                              @click.stop="togglePrivilegedFavorite(item)"
                              :aria-label="item.favorite ? 'Remove from favorites' : 'Add to favorites'"
                            >
                              <component :is="item.favorite ? StarSolid : StarOutline" class="size-4" :class="item.favorite ? 'text-branding-base' : 'text-neutral-subtle'" />
                            </button>
                          </div>
                          <div class="p-2 border-t border-transparent">
                            <PrivilegedResourceLogo
                              :resource-name="item.name"
                              :resource-type="item.type"
                              :logo-path="item.logo"
                            />
                          </div>
                          <div class="flex min-w-0 flex-col items-center justify-center gap-1 border-t border-neutral-default_solid p-2">
                            <div class="text-heading-5 text-neutral-base max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ item.name }}</div>
                            <div class="text-body-sm text-neutral-subtle max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ privilegedResourceSubtitle(item) }}</div>
                          </div>
                        </div>
                        <div
                          v-else
                          class="group flex min-w-0 flex-col rounded-md border border-neutral-default_solid bg-neutral-base cursor-pointer hover:shadow-e200 transition-shadow overflow-hidden"
                          @click="item.name === 'Password Vault' && enterPasswordVault()"
                        >
                          <div class="flex items-center justify-between pt-2 pb-0 px-2">
                            <ArrowTopRightOnSquareIcon class="size-4 shrink-0 text-neutral-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div class="flex items-center gap-1">
                              <BookmarkIcon v-if="item.type === 'bookmark'" class="size-4 text-branding-base" />
                              <button
                                type="button"
                                class="border-0 bg-transparent cursor-pointer p-0 size-6 shrink-0 flex items-center justify-center leading-none"
                                @click.stop="toggleFavorite(item)"
                                :aria-label="item.favorite ? 'Remove from favorites' : 'Add to favorites'"
                              >
                                <component :is="item.favorite ? StarSolid : StarOutline" class="size-4" :class="item.favorite ? 'text-branding-base' : 'text-neutral-subtle'" />
                              </button>
                            </div>
                          </div>
                          <div class="p-2 border-t border-transparent">
                            <AppLogo :app-name="item.name" :color="item.logoColor" :initial="item.logoInitial" />
                          </div>
                          <div class="flex min-w-0 items-center justify-center border-t border-neutral-default_solid p-2">
                            <div class="text-heading-5 text-neutral-base max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ item.name }}</div>
                          </div>
                        </div>
                      </template>
                    </div>
                    <div v-else :key="'all-empty'" class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                      <span class="text-body-md">{{ searchQuery.trim() ? 'No applications match your search' : 'No applications available' }}</span>
                      <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Contact your IT administrator if you need access.' }}</span>
                    </div>
                  </Transition>
                  <div v-else class="pt-4 pb-6">
                    <div v-if="listRows.length > 0">
                      <CircuitDataTable
                        :data="listRows"
                        :columns="listColumns"
                      />
                    </div>
                    <div v-else class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                      <span class="text-body-md">{{ searchQuery.trim() ? 'No applications match your search' : 'No applications available' }}</span>
                      <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Contact your IT administrator if you need access.' }}</span>
                    </div>
                  </div>
                </PvTabPanel>

                <PvTabPanel value="sso">
                  <Transition
                    v-if="viewMode === 'grid'"
                    enter-active-class="transition-opacity duration-200 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition-opacity duration-150 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                    mode="out-in"
                  >
                    <div v-if="displayedApps.length > 0" :key="'sso-apps'" class="grid w-full grid-cols-5 max-md:grid-cols-2 gap-4 pt-4 pb-6">
                      <div
                        v-for="app in displayedApps"
                        :key="app.id"
                        class="group flex min-w-0 flex-col rounded-md border border-neutral-default_solid bg-neutral-base cursor-pointer hover:shadow-e200 transition-shadow overflow-hidden"
                        @click="app.name === 'Password Vault' && enterPasswordVault()"
                      >
                        <div class="flex items-center justify-between pt-2 pb-0 px-2">
                          <ArrowTopRightOnSquareIcon class="size-4 shrink-0 text-neutral-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div class="flex items-center gap-1">
                            <BookmarkIcon v-if="app.type === 'bookmark'" class="size-4 text-branding-base" />
                            <button
                              type="button"
                              class="border-0 bg-transparent cursor-pointer p-0 size-6 shrink-0 flex items-center justify-center leading-none"
                              @click.stop="toggleFavorite(app)"
                              :aria-label="app.favorite ? 'Remove from favorites' : 'Add to favorites'"
                            >
                              <component :is="app.favorite ? StarSolid : StarOutline" class="size-4" :class="app.favorite ? 'text-branding-base' : 'text-neutral-subtle'" />
                            </button>
                          </div>
                        </div>
                        <div class="p-2 border-t border-transparent">
                          <AppLogo :app-name="app.name" :color="app.logoColor" :initial="app.logoInitial" />
                        </div>
                        <div class="flex min-w-0 items-center justify-center border-t border-neutral-default_solid p-2">
                          <div class="text-heading-5 text-neutral-base max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ app.name }}</div>
                        </div>
                      </div>
                    </div>
                    <div v-else :key="'sso-empty'" class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                      <span class="text-body-md">{{ searchQuery.trim() ? 'No applications match your search' : 'No applications available' }}</span>
                      <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Contact your IT administrator if you need access.' }}</span>
                    </div>
                  </Transition>
                  <div v-else class="pt-4 pb-6">
                    <div v-if="listRows.length > 0">
                      <CircuitDataTable
                        :data="listRows"
                        :columns="listColumns"
                      />
                    </div>
                    <div v-else class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                      <span class="text-body-md">{{ searchQuery.trim() ? 'No applications match your search' : 'No applications available' }}</span>
                      <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Contact your IT administrator if you need access.' }}</span>
                    </div>
                  </div>
                </PvTabPanel>

                <PvTabPanel value="bookmarks">
                  <Transition
                    v-if="viewMode === 'grid'"
                    enter-active-class="transition-opacity duration-200 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition-opacity duration-150 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                    mode="out-in"
                  >
                    <div v-if="displayedApps.length > 0" :key="'bookmarks-apps'" class="grid w-full grid-cols-5 max-md:grid-cols-2 gap-4 pt-4 pb-6">
                      <div
                        v-for="app in displayedApps"
                        :key="app.id"
                        class="group flex min-w-0 flex-col rounded-md border border-neutral-default_solid bg-neutral-base cursor-pointer hover:shadow-e200 transition-shadow overflow-hidden"
                      >
                        <div class="flex items-center justify-between pt-2 pb-0 px-2">
                          <ArrowTopRightOnSquareIcon class="size-4 shrink-0 text-neutral-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div class="flex items-center gap-1">
                            <BookmarkIcon v-if="app.type === 'bookmark'" class="size-4 text-branding-base" />
                            <button
                              type="button"
                              class="border-0 bg-transparent cursor-pointer p-0 size-6 shrink-0 flex items-center justify-center leading-none"
                              @click.stop="toggleFavorite(app)"
                              :aria-label="app.favorite ? 'Remove from favorites' : 'Add to favorites'"
                            >
                              <component :is="app.favorite ? StarSolid : StarOutline" class="size-4" :class="app.favorite ? 'text-branding-base' : 'text-neutral-subtle'" />
                            </button>
                          </div>
                        </div>
                        <div class="p-2 border-t border-transparent">
                          <AppLogo :app-name="app.name" :color="app.logoColor" :initial="app.logoInitial" />
                        </div>
                        <div class="flex min-w-0 items-center justify-center border-t border-neutral-default_solid p-2">
                          <div class="text-heading-5 text-neutral-base max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ app.name }}</div>
                        </div>
                      </div>
                    </div>
                    <div v-else :key="'bookmarks-empty'" class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                      <span class="text-body-md">{{ searchQuery.trim() ? 'No applications match your search' : 'No applications available' }}</span>
                      <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Contact your IT administrator if you need access.' }}</span>
                    </div>
                  </Transition>
                  <div v-else class="pt-4 pb-6">
                    <div v-if="listRows.length > 0">
                      <CircuitDataTable
                        :data="listRows"
                        :columns="listColumns"
                      />
                    </div>
                    <div v-else class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                      <span class="text-body-md">{{ searchQuery.trim() ? 'No applications match your search' : 'No applications available' }}</span>
                      <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Contact your IT administrator if you need access.' }}</span>
                    </div>
                  </div>
                </PvTabPanel>

                <PvTabPanel value="web-shield">
                  <Transition
                    v-if="viewMode === 'grid'"
                    enter-active-class="transition-opacity duration-200 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition-opacity duration-150 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                    mode="out-in"
                  >
                    <div v-if="displayedPrivilegedSub.length > 0" :key="'web-shield-list'" class="grid w-full grid-cols-5 max-md:grid-cols-2 gap-4 pt-4 pb-6">
                      <div
                        v-for="res in displayedPrivilegedSub"
                        :key="res.id"
                        class="group flex min-w-0 flex-col rounded-md border border-neutral-default_solid bg-neutral-base cursor-pointer hover:shadow-e200 transition-shadow overflow-hidden"
                      >
                        <div class="flex items-center justify-between pt-2 pb-0 px-2">
                          <ArrowTopRightOnSquareIcon class="size-4 shrink-0 text-neutral-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                          <button
                            type="button"
                            class="border-0 bg-transparent cursor-pointer p-0 size-6 shrink-0 flex items-center justify-center leading-none"
                            @click.stop="togglePrivilegedFavorite(res)"
                            :aria-label="res.favorite ? 'Remove from favorites' : 'Add to favorites'"
                          >
                            <component :is="res.favorite ? StarSolid : StarOutline" class="size-4" :class="res.favorite ? 'text-branding-base' : 'text-neutral-subtle'" />
                          </button>
                        </div>
                        <div class="p-2 border-t border-transparent">
                          <PrivilegedResourceLogo
                            :resource-name="res.name"
                            resource-type="Web Shield"
                            :logo-path="res.logo"
                          />
                        </div>
                        <div class="flex min-w-0 flex-col items-center justify-center gap-1 border-t border-neutral-default_solid p-2">
                          <div class="text-heading-5 text-neutral-base max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ res.name }}</div>
                          <div class="text-body-sm text-neutral-subtle max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ privilegedResourceSubtitle(res) }}</div>
                        </div>
                      </div>
                    </div>
                    <div v-else :key="'web-shield-empty'" class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                      <span class="text-body-md">{{ searchQuery.trim() ? 'No Web Shield resources match your search' : 'No Web Shield resources assigned' }}</span>
                      <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Contact your IT administrator to request access.' }}</span>
                    </div>
                  </Transition>
                  <div v-else class="pt-4 pb-6">
                    <div v-if="listRows.length > 0">
                      <CircuitDataTable
                        :data="listRows"
                        :columns="listColumns"
                      />
                    </div>
                    <div v-else class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                      <span class="text-body-md">{{ searchQuery.trim() ? 'No Web Shield resources match your search' : 'No Web Shield resources assigned' }}</span>
                      <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Contact your IT administrator to request access.' }}</span>
                    </div>
                  </div>
                </PvTabPanel>

                <PvTabPanel value="servers">
                  <Transition
                    v-if="viewMode === 'grid'"
                    enter-active-class="transition-opacity duration-200 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition-opacity duration-150 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                    mode="out-in"
                  >
                    <div v-if="displayedPrivilegedSub.length > 0" :key="'servers-list'" class="grid w-full grid-cols-5 max-md:grid-cols-2 gap-4 pt-4 pb-6">
                      <div
                        v-for="res in displayedPrivilegedSub"
                        :key="res.id"
                        class="group flex min-w-0 flex-col rounded-md border border-neutral-default_solid bg-neutral-base cursor-pointer hover:shadow-e200 transition-shadow overflow-hidden"
                      >
                        <div class="flex items-center justify-between pt-2 pb-0 px-2">
                          <ArrowTopRightOnSquareIcon class="size-4 shrink-0 text-neutral-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                          <button
                            type="button"
                            class="border-0 bg-transparent cursor-pointer p-0 size-6 shrink-0 flex items-center justify-center leading-none"
                            @click.stop="togglePrivilegedFavorite(res)"
                            :aria-label="res.favorite ? 'Remove from favorites' : 'Add to favorites'"
                          >
                            <component :is="res.favorite ? StarSolid : StarOutline" class="size-4" :class="res.favorite ? 'text-branding-base' : 'text-neutral-subtle'" />
                          </button>
                        </div>
                        <div class="p-2 border-t border-transparent">
                          <PrivilegedResourceLogo
                            :resource-name="res.name"
                            :resource-type="res.type"
                            :logo-path="res.logo"
                          />
                        </div>
                        <div class="flex min-w-0 flex-col items-center justify-center gap-1 border-t border-neutral-default_solid p-2">
                          <div class="text-heading-5 text-neutral-base max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ res.name }}</div>
                          <div class="text-body-sm text-neutral-subtle max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ privilegedResourceSubtitle(res) }}</div>
                        </div>
                      </div>
                    </div>
                    <div v-else :key="'servers-empty'" class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                      <span class="text-body-md">{{ searchQuery.trim() ? 'No servers match your search' : 'No server resources assigned' }}</span>
                      <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Contact your IT administrator to request access.' }}</span>
                    </div>
                  </Transition>
                  <div v-else class="pt-4 pb-6">
                    <div v-if="listRows.length > 0">
                      <CircuitDataTable
                        :data="listRows"
                        :columns="listColumns"
                      />
                    </div>
                    <div v-else class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                      <span class="text-body-md">{{ searchQuery.trim() ? 'No servers match your search' : 'No server resources assigned' }}</span>
                      <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Contact your IT administrator to request access.' }}</span>
                    </div>
                  </div>
                </PvTabPanel>

                <PvTabPanel value="databases">
                  <Transition
                    v-if="viewMode === 'grid'"
                    enter-active-class="transition-opacity duration-200 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition-opacity duration-150 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                    mode="out-in"
                  >
                    <div v-if="displayedPrivilegedSub.length > 0" :key="'databases-list'" class="grid w-full grid-cols-5 max-md:grid-cols-2 gap-4 pt-4 pb-6">
                      <div
                        v-for="res in displayedPrivilegedSub"
                        :key="res.id"
                        class="group flex min-w-0 flex-col rounded-md border border-neutral-default_solid bg-neutral-base cursor-pointer hover:shadow-e200 transition-shadow overflow-hidden"
                      >
                        <div class="flex items-center justify-between pt-2 pb-0 px-2">
                          <ArrowTopRightOnSquareIcon class="size-4 shrink-0 text-neutral-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                          <button
                            type="button"
                            class="border-0 bg-transparent cursor-pointer p-0 size-6 shrink-0 flex items-center justify-center leading-none"
                            @click.stop="togglePrivilegedFavorite(res)"
                            :aria-label="res.favorite ? 'Remove from favorites' : 'Add to favorites'"
                          >
                            <component :is="res.favorite ? StarSolid : StarOutline" class="size-4" :class="res.favorite ? 'text-branding-base' : 'text-neutral-subtle'" />
                          </button>
                        </div>
                        <div class="p-2 border-t border-transparent">
                          <PrivilegedResourceLogo
                            :resource-name="res.name"
                            :resource-type="res.type"
                            :logo-path="res.logo"
                          />
                        </div>
                        <div class="flex min-w-0 flex-col items-center justify-center gap-1 border-t border-neutral-default_solid p-2">
                          <div class="text-heading-5 text-neutral-base max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ res.name }}</div>
                          <div class="text-body-sm text-neutral-subtle max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ privilegedResourceSubtitle(res) }}</div>
                        </div>
                      </div>
                    </div>
                    <div v-else :key="'databases-empty'" class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                      <span class="text-body-md">{{ searchQuery.trim() ? 'No databases match your search' : 'No database resources assigned' }}</span>
                      <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Contact your IT administrator to request access.' }}</span>
                    </div>
                  </Transition>
                  <div v-else class="pt-4 pb-6">
                    <div v-if="listRows.length > 0">
                      <CircuitDataTable
                        :data="listRows"
                        :columns="listColumns"
                      />
                    </div>
                    <div v-else class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                      <span class="text-body-md">{{ searchQuery.trim() ? 'No databases match your search' : 'No database resources assigned' }}</span>
                      <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Contact your IT administrator to request access.' }}</span>
                    </div>
                  </div>
                </PvTabPanel>

                <PvTabPanel value="favorites">
                  <Transition
                    v-if="viewMode === 'grid'"
                    enter-active-class="transition-opacity duration-200 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition-opacity duration-150 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                    mode="out-in"
                  >
                    <div v-if="displayedUnifiedFavorites.length > 0" :key="'fav-unified'" class="grid w-full grid-cols-5 max-md:grid-cols-2 gap-4 pt-4 pb-6">
                      <template v-for="item in displayedUnifiedFavorites" :key="item.favoriteKey">
                        <div
                          v-if="item.kind === 'app'"
                          class="group flex min-w-0 flex-col rounded-md border border-neutral-default_solid bg-neutral-base cursor-pointer hover:shadow-e200 transition-shadow overflow-hidden"
                        >
                        <div class="flex items-center justify-between pt-2 pb-0 px-2">
                          <ArrowTopRightOnSquareIcon class="size-4 shrink-0 text-neutral-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div class="flex items-center gap-1">
                            <BookmarkIcon v-if="item.app.type === 'bookmark'" class="size-4 text-branding-base" />
                            <button
                              type="button"
                              class="border-0 bg-transparent cursor-pointer p-0 size-6 shrink-0 flex items-center justify-center leading-none"
                              @click.stop="toggleFavorite(item.app)"
                              :aria-label="item.app.favorite ? 'Remove from favorites' : 'Add to favorites'"
                            >
                              <component :is="item.app.favorite ? StarSolid : StarOutline" class="size-4" :class="item.app.favorite ? 'text-branding-base' : 'text-neutral-subtle'" />
                            </button>
                          </div>
                        </div>
                          <div class="p-2 border-t border-transparent">
                            <AppLogo :app-name="item.app.name" :color="item.app.logoColor" :initial="item.app.logoInitial" />
                          </div>
                          <div class="flex min-w-0 items-center justify-center border-t border-neutral-default_solid p-2">
                            <div class="text-heading-5 text-neutral-base max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ item.app.name }}</div>
                          </div>
                        </div>
                        <div
                          v-else
                          class="group flex min-w-0 flex-col rounded-md border border-neutral-default_solid bg-neutral-base cursor-pointer hover:shadow-e200 transition-shadow overflow-hidden"
                        >
                          <div class="flex items-center justify-between pt-2 pb-0 px-2">
                            <ArrowTopRightOnSquareIcon class="size-4 shrink-0 text-neutral-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                            <button
                              type="button"
                              class="border-0 bg-transparent cursor-pointer p-0 size-6 shrink-0 flex items-center justify-center leading-none"
                              @click.stop="togglePrivilegedFavorite(item.resource)"
                              :aria-label="item.resource.favorite ? 'Remove from favorites' : 'Add to favorites'"
                            >
                              <component :is="item.resource.favorite ? StarSolid : StarOutline" class="size-4" :class="item.resource.favorite ? 'text-branding-base' : 'text-neutral-subtle'" />
                            </button>
                          </div>
                          <div class="p-2 border-t border-transparent">
                            <PrivilegedResourceLogo
                              :resource-name="item.resource.name"
                              :resource-type="item.resource.type"
                              :logo-path="item.resource.logo"
                            />
                          </div>
                          <div class="flex min-w-0 flex-col items-center justify-center gap-1 border-t border-neutral-default_solid p-2">
                            <div class="text-heading-5 text-neutral-base max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ item.resource.name }}</div>
                            <div class="text-body-sm text-neutral-subtle max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ privilegedResourceSubtitle(item.resource) }}</div>
                          </div>
                        </div>
                      </template>
                    </div>
                    <div v-else :key="'fav-empty'" class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                      <span class="text-body-md">{{ searchQuery.trim() ? 'No favorites match your search' : 'No favorites yet' }}</span>
                      <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Star an application or privileged resource from any tab to add it here.' }}</span>
                    </div>
                  </Transition>
                  <div v-else class="pt-4 pb-6">
                    <div v-if="listRows.length > 0">
                      <CircuitDataTable
                        :data="listRows"
                        :columns="listColumns"
                      />
                    </div>
                    <div v-else class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                      <span class="text-body-md">{{ searchQuery.trim() ? 'No favorites match your search' : 'No favorites yet' }}</span>
                      <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Star an application or privileged resource from any tab to add it here.' }}</span>
                    </div>
                  </div>
                </PvTabPanel>

              </PvTabPanels>
            </PvTabs>

          </div>
        </div>

        <div v-if="totalRecords > 0" class="shrink-0 border-t border-neutral-default_solid bg-neutral-base px-4">
          <Paginator
            :first="first"
            :rows="rowsPerPage"
            :totalRecords="totalRecords"
            :rowsPerPageOptions="[
              { label: '50 Items per page', value: 50 },
              { label: '25 Items per page', value: 25 },
              { label: '10 Items per page', value: 10 },
            ]"
            @page="handlePageChange"
          />
        </div>

        </template>
        </template>
      </div>
    </div>
  `,
});

const meta: Meta<typeof UserPortalAllAppsWithPrivilegedResourcesPage> = {
  title: "Projects/Gabriel's Playground/User Portal/User Portal with Password Manager",
  component: UserPortalAllAppsWithPrivilegedResourcesPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof UserPortalAllAppsWithPrivilegedResourcesPage>;

export const Default: Story = {};
