import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts', 'atoms/index.ts', 'lib/index.ts', 'templates/index.ts'],
  format: 'esm',
  outDir: 'dist',
  clean: true,
  dts: true,
  sourcemap: true,
  splitting: false,
});
