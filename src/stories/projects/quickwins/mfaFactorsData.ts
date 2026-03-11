import { markRaw } from 'vue';
import {
  RocketLaunchIcon,
  CloudArrowUpIcon,
  ClockIcon,
  FingerPrintIcon,
  CpuChipIcon,
  UserGroupIcon,
  Squares2X2Icon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
} from '@heroicons/vue/24/outline';
import type { Component } from 'vue';

export interface SupportedResource {
  icon: Component;
  label: string;
}

export interface MfaFactor {
  id: string;
  name: string;
  icon: Component;
  enabled: boolean;
  descriptionContent: string;
  supportedResources: SupportedResource[][];
  showAdditionalSettings?: boolean;
  additionalSettingsLabel?: string;
  additionalSettingsChecked?: boolean;
}

const userPortal = { icon: markRaw(UserGroupIcon), label: 'User Portal' };
const ssoApplications = { icon: markRaw(Squares2X2Icon), label: 'SSO Applications' };
const windows = { icon: markRaw(ComputerDesktopIcon), label: 'Windows' };
const macos = { icon: markRaw(DevicePhoneMobileIcon), label: 'MacOS' };
const linux = { icon: markRaw(ComputerDesktopIcon), label: 'Linux' };
const chrome = { icon: markRaw(GlobeAltIcon), label: 'Chrome' };
const edge = { icon: markRaw(GlobeAltIcon), label: 'Edge' };
const firefox = { icon: markRaw(GlobeAltIcon), label: 'Firefox' };
const safari = { icon: markRaw(GlobeAltIcon), label: 'Safari' };

export const defaultMfaFactors: MfaFactor[] = [
  {
    id: 'jumpcloud-go',
    name: 'JumpCloud Go',
    icon: markRaw(RocketLaunchIcon),
    enabled: false,
    descriptionContent:
      'Use JumpCloud Go for device-bounded MFA into web based resources for users on managed devices. [Learn More](https://jumpcloud.com/support)',
    supportedResources: [
      [userPortal, ssoApplications],
      [windows, macos, linux],
      [chrome, edge, firefox, safari],
    ],
  },
  {
    id: 'jumpcloud-protect',
    name: 'JumpCloud Protect - Mobile Push',
    icon: markRaw(CloudArrowUpIcon),
    enabled: true,
    descriptionContent:
      'Use push notifications on the JumpCloud Protect app to approve sign-in requests. [Learn More](https://jumpcloud.com/support)',
    supportedResources: [[userPortal, ssoApplications]],
    showAdditionalSettings: false,
  },
  {
    id: 'totp',
    name: 'Time Based One-Time Password (TOTP)',
    icon: markRaw(ClockIcon),
    enabled: true,
    descriptionContent:
      'Use authenticator apps (such as Google Authenticator or Microsoft Authenticator) to generate one-time codes. You can merge JumpCloud Protect Mobile Push and TOTP for a seamless, one-step configuration. [Learn More](https://jumpcloud.com/support)',
    supportedResources: [[userPortal, ssoApplications]],
  },
  {
    id: 'webauthn',
    name: 'WebAuthn',
    icon: markRaw(FingerPrintIcon),
    enabled: false,
    descriptionContent:
      'FIDO 2 Security Keys (such as Yubikey or Google Titan) or Device Authenticators (such as Touch ID or Windows Hello) can be used to verify logins. [Learn more](https://jumpcloud.com/support)',
    supportedResources: [[userPortal, ssoApplications]],
    showAdditionalSettings: true,
    additionalSettingsLabel: 'Allow Security Key self-registration for all end users',
    additionalSettingsChecked: false,
  },
  {
    id: 'duo',
    name: 'Duo Security',
    icon: markRaw(CpuChipIcon),
    enabled: false,
    descriptionContent:
      'Duo Security is a third-party MFA provider. Configure your Duo application in the Duo Admin Panel and connect it here to enforce MFA for your organization.',
    supportedResources: [[userPortal, ssoApplications]],
  },
];
