import { parse } from 'vue-docgen-api'
import { readFile } from '../../utils/file'
import { IComponentContext, IVuePressPage } from '../../types'
import { DocsParser, VueParser } from '../../parse'
import { urlFormatter } from './preview'
import { createPreviewCodeSandbox } from './preview/templates'

/**
 * @description What this file do ?
 * receiving context check IComponentContext for more infos of what you can have
 * @return {IVuePressPage} check type for more info about what you should return
 */
export default ({ context }: { context: IComponentContext }): IVuePressPage => {
  /**
   * coming from vue-docgen-api
   * extracting component info from a component file
   * no doc block extraction here
   * we need this + vueParser because of comments and descriptions
   */
  const componentInfo = parse(context.absolutePathname)

  /**
   * Compiling components informations with handlebar compiler
   * no doc block extraction here
   */
  let docs = DocsParser(componentInfo)

  let preview = ''

  /**
   * reading the file
   * TODO: is it important to be sync here?
   */
  const source = readFile(context.absolutePathname)

  /**
   * parsing the component file with the vueParser
   */
  const vueParser = new VueParser({ source, fileName: context.fileName })

  /**
   * getting access customBlock infos informations
   */
  const docsBlock = vueParser.getCustomBlock('docs')

  /**
   * if we found a custom doc block
   * relative later to src/build/pages/index-page-builder.ts
   */
  context.existDocs = docsBlock !== null

  /**
   * we need to sanitze the content because
   * vueParser adding \n etc
   * let the docsBlocks check because
   * sometime docsBlock can be null and throw error
   */
  if (docsBlock) {
    preview = docsBlock.content.replace(/(\r\n|\n|\r)/gm, '')

    /**
     * TODO: Maybe people will doest want codesandbox
     * so we can add the default preview we had
     * here
     */

    /**
     * format all paramaters we will add the for creating the
     * code preview by embed codesandbox into an iframe
     */
    const parameters = urlFormatter(context, source, preview)

    /**
     * this url let us create a codesandbox that we can embed later
     * it will return a codesandbox_id
     */
    const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}&json=1`

    /**
     * adding the preview codesandbox
     */
    docs += createPreviewCodeSandbox(url)
  } else {
    /**
     * if no docs found just taking default preview value with ''
     */
    docs += preview
  }

  return {
    path: context.link,
    content: docs,
  }
}
