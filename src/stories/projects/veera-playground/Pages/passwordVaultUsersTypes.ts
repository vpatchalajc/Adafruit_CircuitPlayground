import type { VaultPreviewType } from './vaultDisplayTypes';

/** User Groups (master list) */
export type UserGroupRow = {
  id: string;
  name: string;
  memberCount: number;
  /** Base template name (for filters) — e.g. Creative Coders without " (2)" */
  templateKey: string;
};

/** Access grant row (detail tables — Websites or Credentials) */
export type AccessRow = {
  id: string;
  name: string;
  urlDisplay: string;
  permissions: string[];
  vaultPreviewType?: VaultPreviewType;
  credentialTypeLabel?: string;
};

/** Demo permission chips — matches Password Vault Users spec */
export const ACCESS_PERMISSION_CHIPS = ['Chip 01', 'Chip 02', 'Chip 03'] as const;
