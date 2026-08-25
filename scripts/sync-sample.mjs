import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const projectRoot = resolve(import.meta.dirname, '..');
const sourceRoot = resolve(
  process.env.THE_VERY_SOIL_SOURCE || resolve(projectRoot, '../The-Very-Soil'),
);
const sourceEntry = resolve(sourceRoot, 'main.tex');
const sourcePdf = resolve(sourceRoot, 'build/main.pdf');
const outputDirectory = resolve(projectRoot, 'public/downloads');
const outputPdf = resolve(outputDirectory, 'the-very-soil-sample.pdf');

if (!existsSync(sourceEntry)) {
  throw new Error(
    `Translation source not found at ${sourceEntry}. Set THE_VERY_SOIL_SOURCE to the translation repository path.`,
  );
}

const run = (command, args, cwd = projectRoot) => {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} exited with status ${result.status}`);
  }
};

run('latexmk', ['-xelatex', 'main.tex'], sourceRoot);

if (!existsSync(sourcePdf)) {
  throw new Error(`Expected screen PDF was not generated at ${sourcePdf}.`);
}

mkdirSync(outputDirectory, { recursive: true });
run('mutool', [
  'merge',
  '-o',
  outputPdf,
  '-O',
  'compress,compress-fonts,compress-images,garbage=deduplicate',
  sourcePdf,
  '1-20',
]);

console.log(`Updated 20-page sample: ${outputPdf}`);
