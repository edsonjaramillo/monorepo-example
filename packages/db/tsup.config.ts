import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts', 'columns/index.ts', 'schema/index.ts', 'queries/index.ts', 'types/index.ts'],
  format: 'esm',
  outDir: 'dist',
  clean: true,
  dts: true,
  sourcemap: true,
  splitting: false,
});
