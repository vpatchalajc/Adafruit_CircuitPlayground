/** User Groups (master list) */
export type UserGroupRow = {
  id: string;
  name: string;
  memberCount: number;
};

/** Access grant row (detail tables — Websites or Credentials) */
export type AccessRow = {
  id: string;
  name: string;
  urlDisplay: string;
  /** One or more permission labels for this grant */
  permissions: string[];
};

/** Read-only permission labels shown in access tables */
export const ACCESS_PERMISSION_LABELS = [
  'Manage',
  'View Details',
  'View Password',
  'Connect',
] as const;
