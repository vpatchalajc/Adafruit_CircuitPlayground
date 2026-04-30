import type { VaultPreviewType } from './vaultDisplayTypes';

/** Kept for components that categorize credential vault types by shape (e.g. legacy name cells). */
export type CredentialCategory =
  | 'password'
  | 'payment_card'
  | 'key'
  | 'secure_note'
  | 'two_factor';

/** Credentials list page row — Circuit DataTable binding (matches Websites-style Name / Tags / Last Seen columns). */
export type CredentialRow = {
  id: string;
  name: string;
  url: string;
  tags: string[];
  /** Leading Name-column glyph — Figma VaultTypes */
  vaultPreviewType: VaultPreviewType;
  /** Subtitle under name (e.g. Password, Payment Card) — not the URL */
  credentialTypeLabel: string;
  /** ISO datetime for Last Seen column + sorting */
  lastSeenIso: string;
  /** Stable string used for Tags column sorting */
  tagsSortKey: string;
};
