import * as components from './components'

const install = (Vue, options = {}) => {
  for (let key in components) {
    let _key = options.prefix ? options.prefix + key : key
    Vue.component(_key, components[key])
  }

  Vue.prototype.$MWEUI = {
    size: options.size || '',
    zIndex: options.zIndex || 2000
  };
  // Vue.prototype.$actionsheet = components.MweActionsheetJsApi;
  // Vue.prototype.$popbox = components.MwePopboxJsApi;
  Vue.prototype.$toast = components.MweToastJsApi;
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { install }