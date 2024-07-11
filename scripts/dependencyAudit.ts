import { glob } from 'glob';
import fs from 'node:fs/promises';

type PackageJSON = Record<string, Record<string, string>>;

// Main function
async function main() {
  const depsMap = new Map<string, string>();

  const packageJsons = await getPackageJson();
  for (const packageJson of packageJsons) {
    const json = JSON.parse(await fs.readFile(packageJson, 'utf8')) as PackageJSON;

    const { devDependencies, dependencies } = json;
    const deps = { ...devDependencies, ...dependencies };

    for (const dependencyName in deps) {
      if (!Object.hasOwn(deps, dependencyName)) {
        continue;
      }

      const version = deps[dependencyName];
      if (!version) {
        continue;
      }

      if (!depsMap.has(dependencyName)) {
        depsMap.set(dependencyName, version);
        continue;
      }

      if (depsMap.get(dependencyName) !== version) {
        console.error(`Conflict found for ${dependencyName}`);
      }
    }
  }
}

// Function use glob to get all package.json files but ignore node_modules
async function getPackageJson() {
  const packageJsons = await glob('**/package.json', {
    ignore: ['**/node_modules/**'],
  });

  return packageJsons;
}

await main();
