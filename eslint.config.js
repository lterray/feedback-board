// One ESLint config for the whole repo. Prettier owns formatting, so
// eslint-config-prettier comes last and switches off every style rule.
import js from '@eslint/js';
import angular from 'angular-eslint';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

// Loose starting limits. Tighten them as the code grows; never raise them to make a change pass.
const sizeAndComplexity = {
  complexity: ['error', 12],
  'max-lines': ['error', { max: 400, skipBlankLines: true, skipComments: true }],
  'max-lines-per-function': ['error', { max: 80, skipBlankLines: true, skipComments: true }],
  'max-params': ['error', 4],
  '@typescript-eslint/no-explicit-any': 'error',
};

export default defineConfig(
  globalIgnores([
    '**/dist/',
    '**/coverage/',
    '**/.angular/',
    'playwright-report/',
    'test-results/',
    '.claude/skills/',
  ]),
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.strictTypeChecked],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: sizeAndComplexity,
  },
  {
    files: ['apps/web/**/*.ts'],
    extends: [angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
    },
  },
  {
    files: ['apps/web/**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
  },
  {
    files: ['apps/api/**/*.ts'],
    rules: {
      // Nest modules are classes with decorators and no members.
      '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.e2e-spec.ts', 'e2e/**/*.ts'],
    rules: { 'max-lines-per-function': 'off' },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  prettier,
);
