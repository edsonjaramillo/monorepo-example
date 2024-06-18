import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      include: ['packages/common/tests/**/*.test.ts'],
      name: 'common',
      environment: 'node',
    },
  },
]);
