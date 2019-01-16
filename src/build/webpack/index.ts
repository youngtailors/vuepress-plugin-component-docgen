import * as path from 'path'

/**
 * @param  {{config:any}} {config}
 * @description we add a custom loader for the docs blocktype
 * @return {void} nothing
 */
export default ({ config }: { config: any }) => {
  const loaderPath = path.resolve(__dirname, './loader.js')
  config.module
    .rule('docs')
    .oneOf('docs')
    .resourceQuery(/blockType=docs/)
    .use('through-loader')
    .loader(require.resolve(loaderPath))
    .end()
}
