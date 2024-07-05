export const NODE_ENV = ['development', 'production', 'staging', 'test'] as const;
export type NodeEnv = (typeof NODE_ENV)[number];

export const folders = ['users', 'misc'] as const;
export type Folders = (typeof folders)[number];
