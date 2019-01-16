import { IDocgenOptions } from '../types'

/**
 * @param  {IDocgenOptions} options IDocgenOptions
 * @description It actually just check if we get a rootdir if not add process.cwd
 * @return {string} actually nothin
 */
export const setDefaultOptions = (options: IDocgenOptions) => {
  options.rootDir = options.rootDir || process.cwd()
  // if (!options.rootDir) {
  //   return
  // }
  return ''
}
