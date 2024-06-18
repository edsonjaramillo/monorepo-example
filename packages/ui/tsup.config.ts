import { defineConfig } from 'tsup';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig((options) => {
  const watchMode = options.watch;
  return {
    entry: ['src/index.ts'],
    format: 'esm',
    target: 'esnext',
    outDir: 'dist',
    clean: true,
    dts: true,
    minify: isProduction,
    splitting: isProduction,
    watch: !isProduction && watchMode,
    sourcemap: !isProduction,
  };
});
