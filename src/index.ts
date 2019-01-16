// constant config for app
import { NAME } from './constants'
// types config
import { IDocgenOptions, IVuePressOpenContext } from './types'
// default options for each env
import { setDefaultOptions } from './utils/environment'
// import logger from consola init
import logger from './utils/logger'

// all builds config
import {
  buildDirContext,
  buildComponentContext,
  buildPages,
  buildPlugins,
  buildWebpackConfig,
  buildEnhanceApp,
} from './build'

import { removeDir } from './utils/file'

/**
 * the module.export needed by vuepress
 * @param {IDocgenOptions} options IDocgenOptions
 * @param {IVuePressOpenContext} ctx IVuePressOpenContext
 * @description receive options that user pass receive ctx or context watch the types for more infos of what you receive
 * @returns {object} return the object that create plugin
 *  */
module.exports = (options: IDocgenOptions, ctx: IVuePressOpenContext) => {
  /**
   *  initOptions will update the rootdir options by options pass
   *  or by the current dir
   * */

  setDefaultOptions(options)
  /**
   * if definitely no rootDir just crash
   */
  if (typeof options.rootDir !== 'string') {
    logger.error(
      new Error(
        'Please set rootDir option. Because automatic project scan failed.',
      ),
    )
    process.exit(1)
  }

  // give the full dir context
  const dirContext = buildDirContext({
    rootDir: options.rootDir as string,
    include: options.include,
    exclude: options.exclude,
    prefix: options.prefix,
    ctx,
  })

  const componentContextMap = buildComponentContext({
    dirContext,
  })

  // reset folder dist
  removeDir(dirContext.docgenDir)

  /**
   * TODO: Watch & update
   * */

  /**
   * name of plugins
   * plugins : will just add plugins @vuepress/register-components
   * with the path from all of your components in rootDir
   *
   * chainewebpack for <docs> blocks
   *
   * enhanceAppFiles is that like a mixin ?
   *
   * additionalPages
   */
  return {
    name: NAME,
    plugins: buildPlugins({ dirContext }),
    chainWebpack: config => {
      buildWebpackConfig({ config })
    },
    enhanceAppFiles: buildEnhanceApp({ componentContextMap }),
    additionalPages: buildPages({ dirContext, componentContextMap }),
  }
}
