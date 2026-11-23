// Claude Code Stop hook: runs `npm run check:fast` when the agent finishes a turn
// that left changes, and hands failures back to the agent to fix.
import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf8') || '{}');

const changes = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' });
if (changes.trim() === '') process.exit(0);

const run = spawnSync('npm', ['run', '--silent', 'check:fast'], { encoding: 'utf8' });
if (run.status === 0) process.exit(0);

const output = `${run.stdout}${run.stderr}`.trim().split('\n').slice(-80).join('\n');

// Block once. If the agent already had a retry, let it stop and leave the failure to the person.
if (input.stop_hook_active) {
  process.stderr.write(`check:fast still fails after a retry:\n${output}\n`);
  process.exit(0);
}
process.stderr.write(
  `check:fast failed. Fix these before finishing; do not weaken a rule or threshold to pass:\n${output}\n`,
);
process.exit(2);
