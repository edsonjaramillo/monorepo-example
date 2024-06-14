import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  const isESM = options.format?.includes('esm') || false;
  return {
    entry: ['src/index.ts'],
    outDir: isESM ? 'dist' : 'dist/cjs',
    clean: true,
    dts: false,
    sourcemap: true,
    splitting: false,
  };
});
