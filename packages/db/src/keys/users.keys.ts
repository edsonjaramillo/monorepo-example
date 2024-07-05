export const UsersKeys = {
  bulk(limit: number, offset: number) {
    return `users:bulk:l:${limit}:o:${offset}`;
  },

  byId(id: string) {
    return `users:${id}`;
  },

  credentials(email: string) {
    return `users:${email}:credentials`;
  },

  count() {
    return 'users:count';
  },

  onCreate() {
    return ['users:bulk:*', 'users:count'];
  },

  onUpdate(id: string, email: string) {
    return ['users:bulk:*', 'users:count', `users:${id}`, `users:${email}:credentials`];
  },
};
