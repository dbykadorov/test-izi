import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            { sourceTag: 'type:feature', onlyDependOnLibsWithTags: ['type:ui','type:data-access','type:util','scope:shared'] },
            { sourceTag: 'type:ui', onlyDependOnLibsWithTags: ['type:ui','type:util','scope:shared'] },
            { sourceTag: 'type:data-access', onlyDependOnLibsWithTags: ['type:util','scope:shared'] },

            { sourceTag: 'layer:interface', onlyDependOnLibsWithTags: ['layer:application','scope:shared'] },
            { sourceTag: 'layer:application', onlyDependOnLibsWithTags: ['layer:domain','scope:shared'] },
            { sourceTag: 'layer:infrastructure', onlyDependOnLibsWithTags: ['layer:application','scope:shared'] },
            { sourceTag: 'layer:domain', onlyDependOnLibsWithTags: ['scope:shared'] },

            { sourceTag: 'scope:shared', onlyDependOnLibsWithTags: ['scope:shared'] },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
