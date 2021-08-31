
import { App } from 'vue'
import version from './version'
import * as components from './components'

export * from './components'
export { default as version } from './version'




type ComponentType = any

export interface NUiInstance {
  version: string
  componentPrefix: string
  install: (app: App) => void
}interface NUiCreateOptions {
  components?: ComponentType[]
  componentPrefix?: string
}

function create ({
  componentPrefix = 'U',
  components = []
}: NUiCreateOptions = {}): NUiInstance {
  const installTargets: App[] = []
  function registerComponent (
    app: App,
    name: string,
    component: ComponentType
  ): void {
    const registered = app.component(componentPrefix + name)
    if (!registered) {
      app.component(componentPrefix + name, component)
    }
  }
  function install (app: App): void {
    if (installTargets.includes(app)) return
    installTargets.push(app)
    components.forEach((component) => {
      const { name, alias } = component
      registerComponent(app, name, component)
      if (alias) {
        alias.forEach((aliasName: string) => {
          registerComponent(app, aliasName, component)
        })
      }
    })
  }
  return {
    version,
    componentPrefix,
    install
  }
}

console.log("Object.keys(components)------------------", Object.keys(components))
export default create({
  components: Object.keys(components).map(
    (key) => components[key as keyof typeof components]
  )
})
