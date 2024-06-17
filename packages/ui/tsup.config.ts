import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['src/**/index.{ts,tsx}'],
    format: 'esm',
    target: 'es6',
    bundle: true,
    dts: true,
    outDir: 'dist',
    sourcemap: true,
    clean: true,
    watch: options.watch,
    splitting: !options.watch,
  };
});
