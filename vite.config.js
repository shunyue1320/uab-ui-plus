import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


const transformIndexHtml = (code) => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return code.replace(/__MAIN__/, '/website/main.prod.js')
    default:
      return code.replace(/__MAIN__/, '/website/main.dev.js')
  }
}


// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [
    {
      name: 'website-transform',
      enforce: 'pre',
      transform (code, id) {
        if (id.endsWith('.html')) {
          return { code: transformIndexHtml(code), map: null }
        }
      },
      transformIndexHtml
    },
    vue()
  ],
  // https://cn.vitejs.dev/config/#resolve-alias
  resolve: {
    alias: process.env.NODE_ENV !== 'production'
      ? [ {find: 'uab-ui-plus', replacement: path.resolve(__dirname, './src')} ]
      : undefined
  },
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    __DEV__: process.env.NODE_ENV !== 'production'
  },
  optimizeDeps: {
    include: [
      'vue'
    ],
    exclude: ['__MAIN__']
  },
  // https://cn.vitejs.dev/config/#esbuild
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
})
