import fs from 'fs/promises';
import { glob } from 'glob';

// Main function
async function main() {
  const depsMap = new Map<string, string>();

  const packageJsons = await getPackageJson();
  for (const packageJson of packageJsons) {
    const json = JSON.parse(await fs.readFile(packageJson, 'utf-8'));
    const { devDependencies, dependencies } = json;
    const deps = { ...devDependencies, ...dependencies };

    for (const dependencyName in deps) {
      const version = deps[dependencyName];
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

// function use glob to get all package.json files but ignore node_modules
async function getPackageJson() {
  const packageJsons = await glob('**/package.json', {
    ignore: ['**/node_modules/**'],
  });

  return packageJsons;
}

main();
