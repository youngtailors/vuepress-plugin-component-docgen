import { IDirContext } from '../../types'
import {
  getDirPathnamesWithFilter,
  getFilePathnamesWithFilter,
} from '../../utils/file'

const isIncludeVueFile = (dirPathname: string): boolean => {
  return (
    getFilePathnamesWithFilter(dirPathname, {
      deep: false,
      include: ['**/*.vue', '*.vue'],
    }).length > 0
  )
}

/**
 * @param  {{dirContext:IDirContext}} {dirContext}
 * @description we get all vue file and register globally with the registrer-components
 * @return {object} it register globally all components
 */
export default ({ dirContext }: { dirContext: IDirContext }) => {
  const { rootDir, include, exclude } = dirContext

  // it create an array of full view path in the dir context
  const dirPathnames = getDirPathnamesWithFilter(rootDir, {
    include,
    exclude,
  }).filter(isIncludeVueFile)

  return [
    [
      '@vuepress/register-components',
      {
        componentsDir: dirPathnames,
      },
    ],
  ]
}
