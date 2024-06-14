import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts', 'datetime/index.ts'],
  format: 'esm',
  outDir: 'dist',
  clean: true,
  dts: true,
  sourcemap: true,
  splitting: false,
});
