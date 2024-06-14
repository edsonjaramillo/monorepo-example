import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  const isESM = options.format?.includes('esm') || false;
  return {
    entry: ['index.ts'],
    outDir: isESM ? 'dist' : 'dist/cjs',
    clean: isESM ? true : false,
    dts: true,
    sourcemap: true,
    splitting: false,
  };
});
