import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';

const root = fileURLToPath(new URL('..', import.meta.url));

config({ path: path.join(root, '.env') });

const testDatabaseUrl = process.env.TEST_DATABASE_URL;

if (!testDatabaseUrl) {
  console.error('TEST_DATABASE_URL is not set');
  process.exit(1);
}

const env = {
  ...process.env,
  DATABASE_URL: testDatabaseUrl,
};

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: root,
      env,
      stdio: 'inherit',
      windowsHide: true,
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(`${args.join(' ')} exited with code ${code}`),
        );
      }
    });
  });
}

const prismaCli = path.join(root, 'node_modules', 'prisma', 'build', 'index.js');
const vitestCli = path.join(root, 'node_modules', 'vitest', 'vitest.mjs');

await run([prismaCli, 'generate']);
await run([prismaCli, 'migrate', 'deploy']);
await run([vitestCli, 'run', '--config', './vitest.config.e2e.ts']);
