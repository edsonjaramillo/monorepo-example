export const UsersKeys = {
  all: 'users',
  byId(id: string) {
    return `users:${id}`;
  },
  credentials(email: string) {
    return `users:${email}:credentials`;
  },
};
