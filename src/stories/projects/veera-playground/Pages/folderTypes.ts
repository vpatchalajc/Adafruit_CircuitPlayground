/** Password Vault — Folders list row */
export type FolderRow = {
  id: string;
  folderName: string;
  /** e.g. 23 Resources */
  resourceCount: number;
  ownerFullName: string;
  usersWithAccessCount: number;
  /** ISO string for Last updated */
  lastUpdatedIso: string;
};
