/** Figma VaultTypes presets — Password Vault credential / folder leading glyph. */
export const ALL_VAULT_PREVIEW_TYPES = [
  '2FA',
  'Folder',
  'ID Card',
  'Identity',
  'Key',
  'Note',
  'Password',
  'Payment Card',
  'Website',
] as const;

export type VaultPreviewType = (typeof ALL_VAULT_PREVIEW_TYPES)[number];

export function isVaultPreviewType(value: unknown): value is VaultPreviewType {
  return typeof value === 'string' && ALL_VAULT_PREVIEW_TYPES.includes(value as VaultPreviewType);
}

/** User-facing subtitle for Credentials name column (and similar). */
export function credentialTypeDisplayLabel(type: VaultPreviewType): string {
  const labels: Record<VaultPreviewType, string> = {
    '2FA': '2FA',
    Folder: 'Folder',
    'ID Card': 'ID Card',
    Identity: 'Identity',
    Key: 'Key',
    Note: 'Secured Note',
    Password: 'Password',
    'Payment Card': 'Payment Card',
    Website: 'Website',
  };
  return labels[type];
}
