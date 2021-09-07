import path from 'path'
import fs from 'fs-extra'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import demoLoader from './build/loaders/md-docs-loader'
import docLoader from './build/loaders/md-entry-loader'

const transformIndexHtml = (code) => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return code.replace(/__MAIN__/, '/src/main.prod.js')
    default:
      return code.replace(/__MAIN__/, '/src/main.dev.js')
  }
}

const fileRegex = /\.(md|entry)$/
// 作用：
const vuePlugin = vue({
  // https://github.com/vitejs/vite/tree/main/packages/plugin-vue#readme
  include: [/\.vue$/, /\.md$/, /\.entry$/]
})
async function getTransformedVueSrc (path) {
  if (path.endsWith('.docs.md')) {
    const code = await fs.readFile(path, 'utf-8')
    return demoLoader(code, path)
  } else if (path.endsWith('.md')) {
    const code = await fs.readFile(path, 'utf-8')
    return docLoader(code, path)
  }
}


// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [
    { // 通过环境变量判断走哪个入口 main 
      name: 'src-transform',
      enforce: 'pre',
      transform (code, id) {
        if (id.endsWith('.html')) {
          return { code: transformIndexHtml(code), map: null }
        }
      },
      transformIndexHtml
    },
    { // md 文件转成 sfc 组件
      name: 'vite-plugin-md',
      transform (_, id) {
        if (fileRegex.test(id)) {
          return getTransformedVueSrc(id)
        }
      },
      async handleHotUpdate (ctx) {
        const { file } = ctx
        if (fileRegex.test(file)) {
          const code = await getTransformedVueSrc(file)
          return vuePlugin.handleHotUpdate({
            ...ctx,
            read: () => code
          })
        }
      }
    },
    vuePlugin
  ],
  // https://cn.vitejs.dev/config/#resolve-alias
  resolve: {
    alias: process.env.NODE_ENV !== 'production'
      ? [ {find: 'uab-ui-plus', replacement: path.resolve(__dirname, './package/index.ts')} ]
      : undefined
  },
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    __DEV__: process.env.NODE_ENV !== 'production'
  },
  optimizeDeps: {
    include: [
      // 'vue'
    ],
    exclude: ['__MAIN__']
  },
  // https://cn.vitejs.dev/config/#esbuild
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
})
