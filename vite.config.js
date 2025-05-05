/* eslint-disable no-undef */
import {defineConfig, transformWithEsbuild} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        })
      },
    },
    react(),
  ],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: val => {
          return val.replace(/^~/, '')
        },
      },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, 'src/@core/scss'),
      },
      {
        find: '@images',
        replacement: path.resolve(__dirname, 'src/assets/images'),
      },
      {
        find: '@configs',
        replacement: path.resolve(__dirname, 'src/configs'),
      },
      {
        find: '@auth',
        replacement: path.resolve(__dirname, 'src/auth'),
      },
      {
        find: '@core',
        replacement: path.resolve(__dirname, 'src/@core'),
      },
      {
        find: '@utility',
        replacement: path.resolve(__dirname, 'src/utility'),
      },
      {
        find: '@layouts',
        replacement: path.resolve(__dirname, 'src/@core/layouts'),
      },
      {
        find: '@redux',
        replacement: path.resolve(__dirname, 'src/redux'),
      },
      {
        find: '@staff',
        replacement: path.resolve(__dirname, 'src/@staff'),
      },
      {
        find: '@agent',
        replacement: path.resolve(__dirname, 'src/@agent'),
      },
      {
        find: '@financial',
        replacement: path.resolve(__dirname, 'src/@financial'),
      },
      {
        find: '@navigation',
        replacement: path.resolve(__dirname, 'src/navigation'),
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, 'src/assets'),
      },
    ],
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
