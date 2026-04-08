import type { Meta, StoryObj } from '@storybook/vue3';
import type { Component, PropType } from 'vue';
import { ref, computed, watch, markRaw, defineComponent, h } from 'vue';
import {
  AppNavigation,
  CollapsiblePanel,
  DataTable as CircuitDataTable,
  FormField,
  Paginator,
  PageHeader,
  ToastNotification,
} from '@jumpcloud/circuit/components';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import {
  ArrowRightStartOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  CircleStackIcon,
  CommandLineIcon,
  GlobeAltIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  ServerIcon,
  StarIcon as StarOutline,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import { StarIcon as StarSolid } from '@heroicons/vue/24/solid';

import { SsoIcon } from '@jumpcloud/icons';

// ─── User Portal Navigation (flat, no nested items) ───

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
  { id: 26, name: 'JC Password Manager', logoColor: '#00897B', logoInitial: 'JC', type: 'sso', favorite: false },
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

type RequestType = 'Web Shield' | 'Database' | 'Server';

interface RequestableResource {
  id: number;
  name: string;
  type: RequestType;
  description: string;
}

const requestableResources: RequestableResource[] = [
  {
    id: 1,
    name: 'AWS Root Console',
    type: 'Web Shield',
    description: 'Access to AWS management console via browser isolation',
  },
  {
    id: 2,
    name: 'Prod PostgreSQL',
    type: 'Database',
    description: 'Production PostgreSQL database access',
  },
  {
    id: 3,
    name: 'Linux Bastion Server',
    type: 'Server',
    description: 'SSH access to production bastion host',
  },
  {
    id: 4,
    name: 'JC Admin Portal',
    type: 'Web Shield',
    description: 'Administrative access to JumpCloud admin portal',
  },
  {
    id: 5,
    name: 'Finance MySQL',
    type: 'Database',
    description: 'Access to finance reporting database',
  },
  {
    id: 6,
    name: 'Kubernetes Dashboard',
    type: 'Web Shield',
    description: 'Access to K8s cluster management dashboard',
  },
  {
    id: 7,
    name: 'EU Auth Server',
    type: 'Server',
    description: 'Access to EU region authentication server',
  },
  {
    id: 8,
    name: 'Snowflake Data Warehouse',
    type: 'Database',
    description: 'Access to analytics data warehouse',
  },
  {
    id: 9,
    name: 'Grafana Admin',
    type: 'Web Shield',
    description: 'Access to infrastructure monitoring dashboards',
  },
  {
    id: 10,
    name: 'PCI Compliance Server',
    type: 'Server',
    description: 'Access to PCI-scoped production server',
  },
];

const requestTypeIconMap: Record<RequestType, Component> = {
  'Web Shield': markRaw(GlobeAltIcon),
  Database: markRaw(CircleStackIcon),
  Server: markRaw(ServerIcon),
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
  'JC Password Manager': '/logos/jc-password-manager.png',
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

const UserPortalPrivilegedResourcesMenu = defineComponent({
  name: 'UserPortalPrivilegedResourcesMenu',
  components: {
    AppNavigation,
    CollapsiblePanel,
    CircuitDataTable,
    FormField,
    Paginator,
    PageHeader,
    ToastNotification,
    PvButton: Button,
    PvDialog: Dialog,
    PvIconField: IconField,
    PvInputIcon: InputIcon,
    PvInputText: InputText,
    PvTextarea: Textarea,
    SelectButton,
    PvTabs: Tabs,
    PvTabList: TabList,
    PvTab: Tab,
    PvTabPanels: TabPanels,
    PvTabPanel: TabPanel,
    MagnifyingGlassIcon,
    ArrowTopRightOnSquareIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    AppLogo,
    PrivilegedResourceLogo,
  },
  setup() {
    const apps = ref<PortalApp[]>(JSON.parse(JSON.stringify(initialApps)));
    const privilegedResources = ref<PrivilegedResource[]>(
      JSON.parse(JSON.stringify(initialPrivilegedResources)) as PrivilegedResource[],
    );
    const searchQuery = ref('');
    const currentView = ref<'all-applications' | 'privileged-resources' | 'requests' | 'security'>(
      'all-applications',
    );
    const appTab = ref<'all' | 'sso' | 'bookmarks' | 'websites' | 'favorites'>('all');
    const privilegedTab = ref<'all' | 'web-shield' | 'servers' | 'databases' | 'favorites'>('all');
    const first = ref(0);
    const rowsPerPage = ref(50);
    const viewMode = ref<'grid' | 'list'>('grid');
    const viewOptions = [
      { value: 'grid', icon: markRaw(Squares2X2Icon) },
      { value: 'list', icon: markRaw(ListBulletIcon) },
    ];

    const requests = ref<RequestableResource[]>(
      JSON.parse(JSON.stringify(requestableResources)) as RequestableResource[],
    );
    const requestExpandedMap = ref<Record<string, boolean>>({});
    const requestSearchQuery = ref('');
    const selectedRequest = ref<RequestableResource | null>(null);
    const showRequestDialog = ref(false);
    const requestReason = ref('');

    const navMenuItems = computed(() => [
      {
        label: 'All Applications',
        leftIcon: markRaw(SsoIcon),
        command: () => {
          currentView.value = 'all-applications';
        },
      },
      {
        label: 'Privileged Resources',
        leftIcon: markRaw(ServerStackIcon),
        command: () => {
          currentView.value = 'privileged-resources';
        },
      },
      {
        label: 'Requests',
        leftIcon: markRaw(ClipboardDocumentCheckIcon),
        command: () => {
          currentView.value = 'requests';
        },
      },
      {
        label: 'Tasks',
        leftIcon: markRaw(ListBulletIcon),
      },
      {
        label: 'Security',
        leftIcon: markRaw(ShieldCheckIcon),
        command: () => {
          currentView.value = 'security';
        },
      },
    ]);
    const navProfileMenuItems = profileMenuItems;

    const activeNavItem = computed(() => {
      if (currentView.value === 'all-applications') return 'all applications';
      if (currentView.value === 'privileged-resources') return 'privileged resources';
      if (currentView.value === 'requests') return 'requests';
      return 'security';
    });

    function isRequestCollapsed(key: string): boolean {
      return !requestExpandedMap.value[key];
    }

    function setRequestExpanded(key: string, expanded: boolean) {
      requestExpandedMap.value = { ...requestExpandedMap.value, [key]: expanded };
    }

    const filteredRequestableResources = computed(() => {
      const q = requestSearchQuery.value.trim().toLowerCase();
      if (!q) return requests.value;
      return requests.value.filter(resource => resource.name.toLowerCase().includes(q));
    });

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

    const allApps = computed(() => {
      let result = apps.value;
      if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(a => a.name.toLowerCase().includes(q));
      }
      return result;
    });

    const filteredSso = computed(() => {
      const q = searchQuery.value.toLowerCase();
      return apps.value.filter(a => a.type === 'sso' && (!q || a.name.toLowerCase().includes(q)));
    });

    const filteredBookmarks = computed(() => {
      const q = searchQuery.value.toLowerCase();
      return apps.value.filter(
        a => a.type === 'bookmark' && (!q || a.name.toLowerCase().includes(q)),
      );
    });

    const filteredWebsites = computed(() => {
      const q = searchQuery.value.toLowerCase();
      return apps.value.filter(
        a => a.type === 'website' && (!q || a.name.toLowerCase().includes(q)),
      );
    });

    const favoriteApps = computed(() => apps.value.filter(app => app.favorite));

    const filteredFavoriteApps = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      if (!q) return favoriteApps.value;
      return favoriteApps.value.filter(app => app.name.toLowerCase().includes(q));
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
      filteredPrivileged.value.filter(r => r.type === 'Server'),
    );

    const filteredPrivilegedDatabases = computed(() =>
      [...filteredPrivileged.value.filter(r => r.type === 'Database')].sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    );

    const favoritePrivilegedResources = computed(() =>
      [...privilegedResources.value]
        .filter(resource => resource.favorite)
        .sort((a, b) => a.name.localeCompare(b.name)),
    );

    const filteredFavoritePrivilegedResources = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      const filtered = favoritePrivilegedResources.value.filter(resource =>
        privilegedResourceSearchText(resource).toLowerCase().includes(q),
      );
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
    });

    const activePrivilegedSubList = computed(() => {
      if (privilegedTab.value === 'web-shield') return filteredPrivilegedWebShield.value;
      if (privilegedTab.value === 'servers') return filteredPrivilegedServers.value;
      if (privilegedTab.value === 'databases') return filteredPrivilegedDatabases.value;
      if (privilegedTab.value === 'favorites') return filteredFavoritePrivilegedResources.value;
      return filteredPrivileged.value;
    });

    const displayedApps = computed(() => {
      if (currentView.value !== 'all-applications') return [] as PortalApp[];
      if (appTab.value === 'all') {
        return allApps.value.slice(first.value, first.value + rowsPerPage.value);
      }
      if (appTab.value === 'sso') {
        return filteredSso.value.slice(first.value, first.value + rowsPerPage.value);
      }
      if (appTab.value === 'bookmarks') {
        return filteredBookmarks.value.slice(first.value, first.value + rowsPerPage.value);
      }
      if (appTab.value === 'websites') {
        return filteredWebsites.value.slice(first.value, first.value + rowsPerPage.value);
      }
      if (appTab.value === 'favorites') {
        return filteredFavoriteApps.value.slice(first.value, first.value + rowsPerPage.value);
      }
      return [] as PortalApp[];
    });

    const displayedPrivilegedSub = computed(() => {
      if (currentView.value !== 'privileged-resources') return [] as PrivilegedResource[];
      return activePrivilegedSubList.value.slice(first.value, first.value + rowsPerPage.value);
    });

    function formatTypeLabel(rawType: string): string {
      if (rawType === 'sso') return 'SSO';
      if (rawType === 'bookmark') return 'Bookmark';
      if (rawType === 'website') return 'Website';
      return rawType;
    }

    function buildListRowFromApp(app: PortalApp): ListRow {
      return {
        id: `app-${app.id}`,
        name: app.name,
        type: formatTypeLabel(app.type),
        favorite: app.favorite,
        kind: 'app',
        sourceId: app.id,
      };
    }

    function buildListRowFromResource(resource: PrivilegedResource): ListRow {
      return {
        id: `resource-${resource.id}`,
        name: resource.name,
        type: resource.type,
        favorite: resource.favorite,
        kind: 'resource',
        sourceId: resource.id,
      };
    }

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
          const displayLabel = formatTypeLabel(rawType);
          const severity = typeSeverityMap[rawType] ?? 'secondary';
          return h(Tag, { value: displayLabel, severity, class: '!normal-case' });
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

    const listRows = computed<ListRow[]>(() => {
      if (currentView.value === 'all-applications') {
        return displayedApps.value.map(buildListRowFromApp);
      }
      if (currentView.value === 'privileged-resources') {
        return displayedPrivilegedSub.value.map(buildListRowFromResource);
      }
      return [];
    });

    const totalRecords = computed(() => {
      if (currentView.value === 'all-applications') {
        if (appTab.value === 'sso') return filteredSso.value.length;
        if (appTab.value === 'bookmarks') return filteredBookmarks.value.length;
        if (appTab.value === 'websites') return filteredWebsites.value.length;
        if (appTab.value === 'favorites') return filteredFavoriteApps.value.length;
        return allApps.value.length;
      }
      if (currentView.value === 'privileged-resources') {
        if (privilegedTab.value === 'web-shield') return filteredPrivilegedWebShield.value.length;
        if (privilegedTab.value === 'servers') return filteredPrivilegedServers.value.length;
        if (privilegedTab.value === 'databases') return filteredPrivilegedDatabases.value.length;
        if (privilegedTab.value === 'favorites') return filteredFavoritePrivilegedResources.value.length;
        return filteredPrivileged.value.length;
      }
      return 0;
    });

    const allCount = computed(() => allApps.value.length);
    const ssoCount = computed(() => apps.value.filter(a => a.type === 'sso').length);
    const bookmarkCount = computed(() => apps.value.filter(a => a.type === 'bookmark').length);
    const websiteCount = computed(() => apps.value.filter(a => a.type === 'website').length);
    const favCount = computed(() => favoriteApps.value.length);
    const privilegedCount = computed(() => filteredPrivileged.value.length);
    const privilegedFavCount = computed(() => favoritePrivilegedResources.value.length);
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
      searchQuery,
      appTab,
      privilegedTab,
      first,
      rowsPerPage,
      viewMode,
      viewOptions,
      currentView,
      activeNavItem,
      navMenuItems,
      navProfileMenuItems,
      requests,
      requestSearchQuery,
      filteredRequestableResources,
      openRequestDialog,
      closeRequestDialog,
      handleRequestContinue,
      selectedRequest,
      showRequestDialog,
      requestReason,
      requestTypeIconMap,
      isRequestCollapsed,
      setRequestExpanded,
      listColumns,
      listRows,
      allApps,
      displayedApps,
      displayedPrivilegedSub,
      totalRecords,
      allCount,
      ssoCount,
      bookmarkCount,
      websiteCount,
      favCount,
      privilegedCount,
      privilegedFavCount,
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
            <p class="m-0 block p-4 text-body-xs text-neutral-base">Powered by <span class="text-body-xs-bold text-neutral-base">JumpCloud</span></p>
          </div>
        </template>
      </AppNavigation>

      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
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
                      <PvButton label="Select" variant="outlined" size="small" @click="openRequestDialog(resource)" />
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

            <template v-if="currentView === 'all-applications'">
              <PvTabs v-model:value="appTab" @update:value="first = 0">
                <PvTabList>
                  <PvTab value="all">All <span class="text-body-md text-tab-sub-text-base">({{ allCount }})</span></PvTab>
                  <PvTab value="sso">SSO <span class="text-body-md text-tab-sub-text-base">({{ ssoCount }})</span></PvTab>
                  <PvTab value="bookmarks">Bookmarks <span class="text-body-md text-tab-sub-text-base">({{ bookmarkCount }})</span></PvTab>
                  <PvTab value="websites">Websites <span class="text-body-md text-tab-sub-text-base">({{ websiteCount }})</span></PvTab>
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

                  <PvTabPanel value="websites">
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
                      <div v-if="displayedApps.length > 0" :key="'websites-apps'" class="grid w-full grid-cols-5 max-md:grid-cols-2 gap-4 pt-4 pb-6">
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
                      <div v-else :key="'websites-empty'" class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
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
                      <div v-if="displayedApps.length > 0" :key="'fav-apps'" class="grid w-full grid-cols-5 max-md:grid-cols-2 gap-4 pt-4 pb-6">
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
                      <div v-else :key="'fav-empty'" class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                        <span class="text-body-md">{{ searchQuery.trim() ? 'No favorites match your search' : 'No favorites yet' }}</span>
                        <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Star an application from any tab to add it here.' }}</span>
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
                        <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Star an application from any tab to add it here.' }}</span>
                      </div>
                    </div>
                  </PvTabPanel>
                </PvTabPanels>
              </PvTabs>
            </template>

            <template v-else-if="currentView === 'privileged-resources'">
              <PvTabs v-model:value="privilegedTab" @update:value="first = 0">
                <PvTabList>
                  <PvTab value="all">All <span class="text-body-md text-tab-sub-text-base">({{ privilegedCount }})</span></PvTab>
                  <PvTab value="web-shield">Web Shield <span class="text-body-md text-tab-sub-text-base">({{ webShieldResourceCount }})</span></PvTab>
                  <PvTab value="servers">Servers <span class="text-body-md text-tab-sub-text-base">({{ serverResourceCount }})</span></PvTab>
                  <PvTab value="databases">Databases <span class="text-body-md text-tab-sub-text-base">({{ databaseResourceCount }})</span></PvTab>
                  <PvTab value="favorites">Favorites <span class="text-body-md text-tab-sub-text-base">({{ privilegedFavCount }})</span></PvTab>
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
                      <div v-if="displayedPrivilegedSub.length > 0" :key="'privileged-all'" class="grid w-full grid-cols-5 max-md:grid-cols-2 gap-4 pt-4 pb-6">
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
                      <div v-else :key="'privileged-empty'" class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                        <span class="text-body-md">{{ searchQuery.trim() ? 'No privileged resources match your search' : 'No privileged resources assigned' }}</span>
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
                        <span class="text-body-md">{{ searchQuery.trim() ? 'No privileged resources match your search' : 'No privileged resources assigned' }}</span>
                        <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Contact your IT administrator to request access.' }}</span>
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
                      <div v-if="displayedPrivilegedSub.length > 0" :key="'privileged-favorites'" class="grid w-full grid-cols-5 max-md:grid-cols-2 gap-4 pt-4 pb-6">
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
                      <div v-else :key="'favorites-empty'" class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                        <span class="text-body-md">{{ searchQuery.trim() ? 'No favorites match your search' : 'No favorites yet' }}</span>
                        <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Star a privileged resource from any tab to add it here.' }}</span>
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
                        <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Star a privileged resource from any tab to add it here.' }}</span>
                      </div>
                    </div>
                  </PvTabPanel>
                </PvTabPanels>
              </PvTabs>
            </template>

            <template v-else-if="currentView === 'security'">
              <div class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
                <span class="text-body-md">Security content is coming soon.</span>
              </div>
            </template>

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
      </div>
    </div>
  `,
});

const meta: Meta<typeof UserPortalPrivilegedResourcesMenu> = {
  title: "Projects/Gabriel's Playground/User Portal/Privileged Resources Menu",
  component: UserPortalPrivilegedResourcesMenu,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof UserPortalPrivilegedResourcesMenu>;

export const Default: Story = {};
