import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: [
      'index.ts',
      'columns/index.ts',
      'schema/index.ts',
      'queries/index.ts',
      'types/index.ts',
    ],
    outDir: 'dist',
    clean: true,
    dts: true,
    sourcemap: true,
    splitting: false,
  };
});
