export const SessionsKeys = {
  all: 'sessions',
  byId(id: string) {
    return `sessions:${id}`;
  },
};
