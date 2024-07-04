export const folders = ['users', 'misc'] as const;
export type Folders = (typeof folders)[number];
