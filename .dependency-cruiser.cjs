// Architecture rules. Each `comment` is the error text, so it says what to do instead.
/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment:
        'This import closes a cycle. Move the shared code into a third module that both files import.',
      from: {},
      to: { circular: true },
    },
    {
      name: 'web-not-into-api',
      severity: 'error',
      comment:
        'apps/web must not import from apps/api: the browser talks to the API over HTTP only. Put types both sides need into a shared workspace package and import that.',
      from: { path: '^apps/web/' },
      to: { path: '^apps/api/' },
    },
    {
      name: 'api-not-into-web',
      severity: 'error',
      comment:
        'apps/api must not import from apps/web. Put types both sides need into a shared workspace package and import that.',
      from: { path: '^apps/api/' },
      to: { path: '^apps/web/' },
    },
    {
      name: 'no-tests-from-production',
      severity: 'error',
      comment:
        'Production code must not import test files. Move the helper out of the spec file into a normal module.',
      from: { path: '^apps/[^/]+/src/', pathNot: '\\.(spec|e2e-spec)\\.ts$' },
      to: { path: '\\.(spec|e2e-spec)\\.ts$' },
    },
    {
      name: 'no-dev-deps-in-production',
      severity: 'error',
      comment:
        'Production code imports a devDependency. Move the package to "dependencies" in that app\'s package.json, or keep the import in test code.',
      from: { path: '^apps/[^/]+/src/', pathNot: '\\.(spec|e2e-spec)\\.ts$' },
      to: { dependencyTypes: ['npm-dev'], dependencyTypesNot: ['type-only'] },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    exclude: { path: '(^|/)(dist|coverage|\\.angular)/' },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
      extensions: ['.ts', '.js', '.json'],
    },
    reporterOptions: { text: { highlightFocused: true } },
  },
};
