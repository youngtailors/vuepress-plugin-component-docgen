import * as path from 'path'
import { parse } from 'vue-docgen-api'

import {
  IDirContext,
  IComponentFileContext,
  IComponentContext,
} from '../../types'
import {
  extractFileExtension,
  getFilePathnamesWithFilter,
  extractFileName,
} from '../../utils/file'
import logger from '../../utils/logger'
// import { camelToHyphen } from '../../utils/common'

const isVueFile = (pathname: string): boolean => {
  return extractFileExtension(pathname) === 'vue'
}

export const buildLink = ({
  // name,
  relativePathname,
  distDirPrefix,
}: {
  name?: string
  relativePathname: string
  distDirPrefix: string
}): string => {
  // const slug = camelToHyphen(name)
  const pathnamelist = relativePathname.split('/')
  pathnamelist.pop()

  // return `/${path.join(distDirPrefix, ...pathnamelist, slug)}/`
  return `/${path.join(distDirPrefix, ...pathnamelist)}/`
}

const buildDocgenPathname = ({
  dirContext,
  link,
}: {
  dirContext: IDirContext
  link: string
}): string => {
  return path.join(dirContext.docgenDir, link).replace(/\/$/, '') + '.md'
}

export const buildComponentContext = ({
  dirContext,
  componentFileContext,
}: {
  dirContext: IDirContext
  componentFileContext: IComponentFileContext
}): IComponentContext => {
  const link = buildLink({
    ...componentFileContext,
    distDirPrefix: dirContext.prefix,
  })

  const docgenPathname = buildDocgenPathname({ dirContext, link })

  return {
    ...componentFileContext,
    link,
    docgenPathname,
    existDocs: false,
  }
}

/**
 * @description it will create component file Context
 * @returns {object} return the component file context
 */
export const buildComponentFileContext = ({
  rootDir,
  absolutePathname,
}: {
  rootDir: string
  absolutePathname: string
}): IComponentFileContext => {
  const relativePathname = absolutePathname.replace(rootDir, '')
  const fileName = extractFileName(relativePathname) as string
  const dirName = relativePathname.replace(fileName, '')

  /**
   * we need the real display name given by the user
   * actually the name and fileName should be the same
   * maybe we could let them choose the filename they want but
   * i think it will cause error
   * TODO: we actually parse with vue-docgen-api 2 times for each one
   */
  const componentName = parse(absolutePathname).displayName || ''
  const name = fileName.split('.').shift() as string

  if (name !== componentName) {
    logger.error(
      new Error(
        `The displayName of ${name} is not existing or is not the same. Please provide the same name`,
      ),
    )
    process.exit(1)
  }

  const root = dirName === '/'

  return {
    absolutePathname,
    relativePathname,
    dirName,
    fileName,
    name,
    root,
  }
}

/**
 *
 * @description
 * get the components filepath informations
 * and create a map of context on it
 */

export const divideByDirectory = ({
  filePathnames,
  rootDir,
}: {
  filePathnames: string[]
  rootDir: string
}): Map<string, IComponentFileContext[]> => {
  const map = new Map()

  filePathnames
    .map((pathname: string) => {
      return buildComponentFileContext({ rootDir, absolutePathname: pathname })
    })
    .forEach(context => {
      const { dirName } = context
      const contextsInDir = map.get(dirName) || []
      contextsInDir.push(context)
      map.set(dirName, contextsInDir)
    })

  return map
}

/**
 * @param  {{dirContext:IDirContext}} {dirContext}
 * @description create the components context
 * @returns { object } return dirContext
 */
export default ({ dirContext }: { dirContext: IDirContext }) => {
  const { rootDir, include, exclude } = dirContext

  /**
   * create the final files path context of components
   */
  const vueFilePathnames = getFilePathnamesWithFilter(rootDir, {
    include,
    exclude,
  }).filter(isVueFile)

  /**
   * It create the components full context
   */
  const fileContextMap = divideByDirectory({
    filePathnames: vueFilePathnames,
    rootDir,
  })

  const componentContextMap = new Map()
  for (const [dirName, fileContexts] of fileContextMap.entries()) {
    const componentContexts = fileContexts.map(
      (componentFileContext: IComponentFileContext) => {
        return buildComponentContext({ dirContext, componentFileContext })
      },
    )
    componentContextMap.set(dirName, componentContexts)
  }

  return componentContextMap
}
