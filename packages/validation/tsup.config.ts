import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts', 'forms/index.ts', 'core/index.ts', 'env/index.ts'],
  format: 'esm',
  outDir: 'dist',
  clean: true,
  dts: true,
  sourcemap: true,
  splitting: false,
});
