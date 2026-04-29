/** Password Vault Credentials table — credential category + mock row shape */
export type CredentialCategory =
  | 'password'
  | 'payment_card'
  | 'key'
  | 'secure_note'
  | 'two_factor';

export type CredentialRow = {
  id: string;
  credentialType: CredentialCategory;
  categoryLabel: string;
  serviceName: string;
  /** ISO date string for expiration */
  expirationIso: string;
  /** ISO date/time for last used */
  lastUsedIso: string;
  tags: string[];
};
