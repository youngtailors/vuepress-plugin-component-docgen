export interface IDocgenOptions {
  rootDir?: string
  include?: string | string[]
  exclude?: string | string[]
  prefix?: string
  vuePlugins?: [VuePLugin]
}

export interface VuePLugin {
  name?: string
  path?: string
}
