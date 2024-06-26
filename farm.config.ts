import { resolve } from 'node:path';
import { defineConfig } from '@farmfe/core';
import farmJsPluginLess from '@farmfe/js-plugin-less';
import farmJsPluginSvgr from '@farmfe/js-plugin-svgr';

export default defineConfig(async (env) => {
  return {
    compilation: {
      input: {
        index: './index.farm.html'
      },
      progress: false,
      presetEnv: false,
      resolve: {
        symlinks: true,
        alias: {
          '@': resolve(process.cwd(), './src'),
          // 'react-dom': resolve(process.cwd(), './node_modules/react-dom'),
          // react: resolve(process.cwd(), './node_modules/react')
        }
      },
      output: {
        path: './build',
        filename: 'assets/[resourceName].[contentHash].[ext]',
        assetsFilename: 'static/[resourceName].[contentHash].[ext]'
      },
      partialBundling: {
        targetMinSize: 1024 * 2
      },
    },
    server: {
      cors: true,
      port: 6260
    },
    plugins: [
      [
        '@farmfe/plugin-react',
        {
          refresh: process.env.NODE_ENV === 'development',
          development: process.env.NODE_ENV === 'development',
          runtime: 'automatic'
        }
      ],
      farmJsPluginLess(),
      farmJsPluginSvgr()
    ]
  };
});
