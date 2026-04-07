import type { Meta, StoryObj } from '@storybook/vue3';
import type { PropType } from 'vue';
import { ref, computed, watch, markRaw, defineComponent, h } from 'vue';
import {
  AppNavigation,
  Paginator,
  ToastNotification,
} from '@jumpcloud/circuit/components';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import {
  ArrowRightStartOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  CircleStackIcon,
  CommandLineIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  ServerIcon,
  ServerStackIcon,
  StarIcon as StarOutline,
} from '@heroicons/vue/24/outline';
import { StarIcon as StarSolid } from '@heroicons/vue/24/solid';

import {
  SsoIcon,
  AccessIcon,
  CheckListIcon,
  PasswordManagerIcon,
} from '@jumpcloud/icons';

// ─── User Portal Navigation (flat, no nested items) ───

const menuItems = [
  { label: 'All Applications', leftIcon: markRaw(SsoIcon) },
  { label: 'Privileged Resources', leftIcon: markRaw(ServerStackIcon) },
  { label: 'Requests', leftIcon: markRaw(AccessIcon) },
  { label: 'Tasks', leftIcon: markRaw(CheckListIcon) },
  { label: 'Security', leftIcon: markRaw(PasswordManagerIcon) },
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
  favorite: boolean;
}

const initialApps: PortalApp[] = [
  { id: 1, name: '1Up Users', logoColor: '#4CAF50', logoInitial: '1U', favorite: false },
  { id: 2, name: 'ADP', logoColor: '#D42027', logoInitial: 'ADP', favorite: false },
  { id: 3, name: 'Approved Applications', logoColor: '#5C6BC0', logoInitial: 'AA', favorite: false },
  { id: 4, name: 'Atlassian (Jira and Confluence)', logoColor: '#0052CC', logoInitial: 'A', favorite: true },
  { id: 5, name: 'AWS Identity Center', logoColor: '#FF9900', logoInitial: 'AWS', favorite: true },
  { id: 6, name: 'AWS Sales Demo Admin', logoColor: '#232F3E', logoInitial: 'AWS', favorite: false },
  { id: 7, name: 'Codility', logoColor: '#7B1FA2', logoInitial: 'C', favorite: false },
  { id: 8, name: 'Culture Amp', logoColor: '#F44336', logoInitial: 'CA', favorite: false },
  { id: 9, name: 'Cursor', logoColor: '#37474F', logoInitial: 'C', favorite: false },
  { id: 10, name: 'Datadog', logoColor: '#632CA6', logoInitial: 'DD', favorite: true },
  { id: 11, name: 'Docker', logoColor: '#2496ED', logoInitial: 'D', favorite: true },
  { id: 12, name: 'Egencia', logoColor: '#003B71', logoInitial: 'E', favorite: false },
  { id: 13, name: 'Expensify', logoColor: '#1B8D17', logoInitial: 'E', favorite: false },
  { id: 14, name: 'Figma', logoColor: '#F24E1E', logoInitial: 'F', favorite: true },
  { id: 15, name: 'Firstbase', logoColor: '#000000', logoInitial: 'FB', favorite: false },
  { id: 16, name: 'GCS Lab', logoColor: '#34A853', logoInitial: 'G', favorite: true },
  { id: 17, name: 'GCS Lab ProMax', logoColor: '#1A237E', logoInitial: 'X', favorite: false },
  { id: 18, name: 'GitHub', logoColor: '#24292F', logoInitial: 'GH', favorite: true },
  { id: 19, name: 'Gong.io', logoColor: '#7C3AED', logoInitial: 'G', favorite: false },
  { id: 20, name: 'Google Gemini App', logoColor: '#4285F4', logoInitial: 'G', favorite: false },
  { id: 21, name: 'Google Workspace', logoColor: '#4285F4', logoInitial: 'GW', favorite: false },
  { id: 22, name: 'Harness', logoColor: '#0078D4', logoInitial: 'H', favorite: false },
  { id: 23, name: 'Internal API Docs', logoColor: '#00ACC1', logoInitial: 'JC', favorite: true },
  { id: 24, name: 'JC Brand Logos', logoColor: '#455A64', logoInitial: 'JC', favorite: true },
  { id: 25, name: 'JC Learning Hub', logoColor: '#1565C0', logoInitial: 'JC', favorite: false },
  { id: 26, name: 'JC Password Manager', logoColor: '#00897B', logoInitial: 'JC', favorite: false },
  { id: 27, name: 'JumpCloud Employee Website', logoColor: '#00BFA5', logoInitial: 'JC', favorite: false },
  { id: 28, name: 'JumpCloud Support Portal', logoColor: '#00838F', logoInitial: 'M', favorite: false },
  { id: 29, name: 'JumpDesk EU', logoColor: '#1E88E5', logoInitial: 'EU', favorite: false },
  { id: 30, name: 'JumpDesk PRD', logoColor: '#E53935', logoInitial: 'PRD', favorite: false },
  { id: 31, name: 'KnowBe4', logoColor: '#FF6F00', logoInitial: 'K4', favorite: false },
  { id: 32, name: 'Lever', logoColor: '#455A64', logoInitial: 'L', favorite: false },
  { id: 33, name: 'LinkedIn Learning', logoColor: '#0077B5', logoInitial: 'in', favorite: false },
  { id: 34, name: 'Microsoft 365', logoColor: '#D83B01', logoInitial: 'M', favorite: true },
  { id: 35, name: 'Parallels', logoColor: '#E4002B', logoInitial: 'P', favorite: false },
  { id: 36, name: 'Salesforce', logoColor: '#00A1E0', logoInitial: 'SF', favorite: true },
  { id: 37, name: 'Slack', logoColor: '#4A154B', logoInitial: 'S', favorite: true },
  { id: 38, name: 'Snowflake', logoColor: '#29B5E8', logoInitial: 'S', favorite: true },
  { id: 39, name: 'Zscaler', logoColor: '#0066CC', logoInitial: 'Z', favorite: true },
  { id: 40, name: 'Linear', logoColor: '#5E6AD2', logoInitial: 'L', favorite: false },
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

const UserPortalPrivilegedResourcesPage = defineComponent({
  name: 'UserPortalPrivilegedResourcesPage',
  components: {
    AppNavigation,
    Paginator,
    ToastNotification,
    PvButton: Button,
    PvIconField: IconField,
    PvInputIcon: InputIcon,
    PvInputText: InputText,
    PvTabs: Tabs,
    PvTabList: TabList,
    PvTab: Tab,
    PvTabPanels: TabPanels,
    PvTabPanel: TabPanel,
    MagnifyingGlassIcon,
    ArrowTopRightOnSquareIcon,
    AppLogo,
    PrivilegedResourceLogo,
  },
  setup() {
    const apps = ref<PortalApp[]>(JSON.parse(JSON.stringify(initialApps)));
    const privilegedResources = ref<PrivilegedResource[]>(initialPrivilegedResources);
    const searchQuery = ref('');
    const activeTab = ref<'all' | 'favorites'>('all');
    const activeNav = ref('all applications');
    const privilegedSubTab = ref<'web-shield' | 'servers' | 'databases' | 'favorites'>('web-shield');
    const first = ref(0);
    const rowsPerPage = ref(50);

    const navMenuItems = menuItems;
    const navProfileMenuItems = profileMenuItems;

    /** AppNavigation emits PrimeVue TieredMenu `processedItem` (label lives on `.item`). */
    function onNavClick(processedItem: { item?: { label?: string } }) {
      const label = processedItem.item?.label ?? '';
      activeNav.value = label.trim().toLowerCase();
      first.value = 0;
    }

    const allApps = computed(() => {
      let result = apps.value;
      if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(a => a.name.toLowerCase().includes(q));
      }
      return result;
    });

    const favoriteApps = computed(() => allApps.value.filter(a => a.favorite));

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

    const filteredPrivilegedFavorites = computed(() =>
      filteredPrivileged.value.filter(r => r.favorite),
    );

    const activePrivilegedSubList = computed(() => {
      if (privilegedSubTab.value === 'web-shield') return filteredPrivilegedWebShield.value;
      if (privilegedSubTab.value === 'servers') return filteredPrivilegedServers.value;
      if (privilegedSubTab.value === 'databases') return filteredPrivilegedDatabases.value;
      if (privilegedSubTab.value === 'favorites') return filteredPrivilegedFavorites.value;
      return [] as PrivilegedResource[];
    });

    const displayedApps = computed(() => {
      const source = activeTab.value === 'favorites' ? favoriteApps.value : allApps.value;
      return source.slice(first.value, first.value + rowsPerPage.value);
    });

    const displayedPrivilegedSub = computed(() =>
      activePrivilegedSubList.value.slice(first.value, first.value + rowsPerPage.value),
    );

    const totalRecords = computed(() => {
      if (activeNav.value === 'privileged resources') {
        return activePrivilegedSubList.value.length;
      }
      if (activeNav.value !== 'all applications') {
        return 0;
      }
      if (activeTab.value === 'favorites') return favoriteApps.value.length;
      return allApps.value.length;
    });

    const allCount = computed(() => allApps.value.length);
    const favCount = computed(() => favoriteApps.value.length);
    const webShieldResourceCount = computed(() => filteredPrivilegedWebShield.value.length);
    const serverResourceCount = computed(() => filteredPrivilegedServers.value.length);
    const databaseResourceCount = computed(() => filteredPrivilegedDatabases.value.length);
    const privilegedFavCount = computed(() => filteredPrivilegedFavorites.value.length);

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
      activeTab,
      activeNav,
      privilegedSubTab,
      first,
      rowsPerPage,
      navMenuItems,
      navProfileMenuItems,
      onNavClick,
      allApps,
      favoriteApps,
      displayedApps,
      displayedPrivilegedSub,
      totalRecords,
      allCount,
      favCount,
      webShieldResourceCount,
      serverResourceCount,
      databaseResourceCount,
      privilegedFavCount,
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
        :activeItem="activeNav"
        :collapsible="true"
        :topNavToggle="true"
        @click="onNavClick"
      >
        <template #custom-text>
          <div class="w-full border-b border-navigation-default">
            <p class="m-0 block p-4 text-body-xs text-neutral-base">Powered by <span class="text-body-xs-bold text-neutral-base">JumpCloud</span></p>
          </div>
        </template>
      </AppNavigation>

      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">

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
                <template v-if="activeNav === 'all applications'">
                  <h1 class="text-heading-1 text-neutral-base m-0">Welcome, Gabriel</h1>
                  <div class="text-body-sm text-neutral-base mt-1">Launch your apps with a single click.</div>
                </template>
                <template v-else-if="activeNav === 'privileged resources'">
                  <h1 class="text-heading-1 text-neutral-base m-0">Privileged Resources</h1>
                  <div class="text-body-sm text-neutral-base mt-1">Launch your privileged resources with a single click.</div>
                </template>
                <template v-else>
                  <div class="text-body-sm text-neutral-base">Use the sidebar to choose a section.</div>
                </template>
              </div>
              <div class="w-57.5 shrink-0">
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
            </div>

            <template v-if="activeNav === 'all applications'">
            <PvTabs v-model:value="activeTab" @update:value="first = 0">
              <PvTabList>
                <PvTab value="all">All Applications <span class="text-body-md text-tab-sub-text-base">({{ allCount }})</span></PvTab>
                <PvTab value="favorites">Favorites <span class="text-body-md text-tab-sub-text-base">({{ favCount }})</span></PvTab>
              </PvTabList>

              <PvTabPanels>

                <PvTabPanel value="all">
                  <Transition
                    enter-active-class="transition-opacity duration-200 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition-opacity duration-150 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                    mode="out-in"
                  >
                    <div :key="activeTab" class="grid w-full grid-cols-5 max-md:grid-cols-2 gap-4 pt-4 pb-6">
                      <div
                        v-for="app in displayedApps"
                        :key="app.id"
                        class="group flex min-w-0 flex-col rounded-md border border-neutral-default_solid bg-neutral-base cursor-pointer hover:shadow-e200 transition-shadow overflow-hidden"
                      >
                        <div class="flex items-center justify-between pt-2 pb-0 px-2">
                          <ArrowTopRightOnSquareIcon class="size-4 shrink-0 text-neutral-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                          <button
                            type="button"
                            class="border-0 bg-transparent cursor-pointer p-0 size-6 shrink-0 flex items-center justify-center leading-none"
                            @click.stop="toggleFavorite(app)"
                            :aria-label="app.favorite ? 'Remove from favorites' : 'Add to favorites'"
                          >
                            <component :is="app.favorite ? StarSolid : StarOutline" class="size-4" :class="app.favorite ? 'text-branding-base' : 'text-neutral-subtle'" />
                          </button>
                        </div>
                        <div class="p-2 border-t border-transparent">
                          <AppLogo :app-name="app.name" :color="app.logoColor" :initial="app.logoInitial" />
                        </div>
                        <div class="flex min-w-0 items-center justify-center border-t border-neutral-default_solid p-2">
                          <div class="text-heading-5 text-neutral-base max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ app.name }}</div>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </PvTabPanel>

                <PvTabPanel value="favorites">
                  <Transition
                    enter-active-class="transition-opacity duration-200 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition-opacity duration-150 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                    mode="out-in"
                  >
                    <div :key="activeTab" class="grid w-full grid-cols-5 max-md:grid-cols-2 gap-4 pt-4 pb-6">
                      <div
                        v-for="app in displayedApps"
                        :key="app.id"
                        class="group flex min-w-0 flex-col rounded-md border border-neutral-default_solid bg-neutral-base cursor-pointer hover:shadow-e200 transition-shadow overflow-hidden"
                      >
                        <div class="flex items-center justify-between pt-2 pb-0 px-2">
                          <ArrowTopRightOnSquareIcon class="size-4 shrink-0 text-neutral-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                          <button
                            type="button"
                            class="border-0 bg-transparent cursor-pointer p-0 size-6 shrink-0 flex items-center justify-center leading-none"
                            @click.stop="toggleFavorite(app)"
                            :aria-label="app.favorite ? 'Remove from favorites' : 'Add to favorites'"
                          >
                            <component :is="app.favorite ? StarSolid : StarOutline" class="size-4" :class="app.favorite ? 'text-branding-base' : 'text-neutral-subtle'" />
                          </button>
                        </div>
                        <div class="p-2 border-t border-transparent">
                          <AppLogo :app-name="app.name" :color="app.logoColor" :initial="app.logoInitial" />
                        </div>
                        <div class="flex min-w-0 items-center justify-center border-t border-neutral-default_solid p-2">
                          <div class="text-heading-5 text-neutral-base max-w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ app.name }}</div>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </PvTabPanel>

              </PvTabPanels>
            </PvTabs>
            </template>

            <template v-else-if="activeNav === 'privileged resources'">
              <PvTabs v-model:value="privilegedSubTab" @update:value="first = 0">
                <PvTabList>
                  <PvTab value="web-shield">Web Shield <span class="text-body-md text-tab-sub-text-base">({{ webShieldResourceCount }})</span></PvTab>
                  <PvTab value="servers">Servers <span class="text-body-md text-tab-sub-text-base">({{ serverResourceCount }})</span></PvTab>
                  <PvTab value="databases">Databases <span class="text-body-md text-tab-sub-text-base">({{ databaseResourceCount }})</span></PvTab>
                  <PvTab value="favorites">Favorites <span class="text-body-md text-tab-sub-text-base">({{ privilegedFavCount }})</span></PvTab>
                </PvTabList>

                <PvTabPanels>
                  <PvTabPanel value="web-shield">
                    <Transition
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
                  </PvTabPanel>

                  <PvTabPanel value="servers">
                    <Transition
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
                  </PvTabPanel>

                  <PvTabPanel value="databases">
                    <Transition
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
                  </PvTabPanel>

                  <PvTabPanel value="favorites">
                    <Transition
                      enter-active-class="transition-opacity duration-200 ease-out"
                      enter-from-class="opacity-0"
                      enter-to-class="opacity-100"
                      leave-active-class="transition-opacity duration-150 ease-in"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0"
                      mode="out-in"
                    >
                      <div v-if="displayedPrivilegedSub.length > 0" :key="'favorites-list'" class="grid w-full grid-cols-5 max-md:grid-cols-2 gap-4 pt-4 pb-6">
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
                        <span class="text-body-md">{{ searchQuery.trim() ? 'No favorites match your search' : 'No favorite resources yet' }}</span>
                        <span class="text-body-sm mt-1">{{ searchQuery.trim() ? 'Try a different search or clear the search field.' : 'Star a resource from Web Shield, Servers, or Databases to add it here.' }}</span>
                      </div>
                    </Transition>
                  </PvTabPanel>
                </PvTabPanels>
              </PvTabs>
            </template>

            <div v-else class="flex flex-col items-center justify-center py-16 text-neutral-subtle">
              <span class="text-body-md">This section is not wired in the story yet</span>
              <span class="text-body-sm mt-1">Use All Applications or Privileged Resources in the sidebar.</span>
            </div>

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

      </div>
    </div>
  `,
});

const meta: Meta<typeof UserPortalPrivilegedResourcesPage> = {
  title: "Projects/Gabriel's Playground/User Portal/User Portal - Privileged Resources",
  component: UserPortalPrivilegedResourcesPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof UserPortalPrivilegedResourcesPage>;

export const Default: Story = {};
