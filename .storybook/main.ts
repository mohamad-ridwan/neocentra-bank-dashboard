import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/nextjs",
  "staticDirs": [
    "../public"
  ],
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'shared_remote/store': path.resolve(process.cwd(), '../neocentra-bank-shared/src/store/index.ts'),
        'shared_remote/Button': path.resolve(process.cwd(), '../neocentra-bank-shared/src/components/ui/button.tsx'),
        'shared_remote/Input': path.resolve(process.cwd(), '../neocentra-bank-shared/src/components/ui/input.tsx'),
        'shared_remote/apiHelper': path.resolve(process.cwd(), '../neocentra-bank-shared/src/utils/apiHelper.ts'),
        'shared_remote/AuthWrapper': path.resolve(process.cwd(), '../neocentra-bank-shared/src/components/AuthWrapper.tsx'),
        'shared_remote/Tooltip': path.resolve(process.cwd(), '../neocentra-bank-shared/src/components/ui/tooltip.tsx'),
        'shared_remote/useRemoteCSS': path.resolve(process.cwd(), '../neocentra-bank-shared/src/hooks/useRemoteCSS.ts'),
        'shared_remote/federatedStats': path.resolve(process.cwd(), '../neocentra-bank-shared/src/utils/federated-stats.ts'),
        'shared_remote/Skeleton': path.resolve(process.cwd(), '../neocentra-bank-shared/src/components/ui/skeleton.tsx'),
      };
    }

    const sharedPath = path.resolve(process.cwd(), '../neocentra-bank-shared/src');
    
    const includeSharedPath = (rules: any[]) => {
      rules.forEach((rule) => {
        if (!rule) return;
        if (rule.oneOf) {
          includeSharedPath(rule.oneOf);
        }
        if (rule.test && rule.test instanceof RegExp) {
          if (rule.test.test('file.ts') || rule.test.test('file.tsx') || rule.test.test('file.js') || rule.test.test('file.jsx')) {
            if (rule.include) {
              if (Array.isArray(rule.include)) {
                if (!rule.include.includes(sharedPath)) {
                  rule.include.push(sharedPath);
                }
              } else {
                rule.include = [rule.include, sharedPath];
              }
            }
          }
        }
      });
    };
    
    if (config.module?.rules) {
      includeSharedPath(config.module.rules);
    }

    return config;
  }
};
export default config;