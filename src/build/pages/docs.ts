import { parse } from 'vue-docgen-api'
import { readFile } from '../../utils/file'
import { IComponentContext, IVuePressPage } from '../../types'
import { DocsParser, VueParser } from '../../parse'
import { urlFormatter } from './preview'
import { markdown } from './preview/templates'

export default ({ context }: { context: IComponentContext }): IVuePressPage => {
  const componentInfo = parse(context.absolutePathname)
  let docs = DocsParser(componentInfo)
  let preview = ''
  const source = readFile(context.absolutePathname)
  const vueParser = new VueParser({ source, fileName: context.fileName })
  const docsBlock = vueParser.getCustomBlock('docs')
  context.existDocs = docsBlock !== null
  if (docsBlock) {
    preview = docsBlock.content.replace(/(\r\n|\n|\r)/gm, '')
  }

  const parameters = urlFormatter(context, source, preview)

  const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}&json=1`
  docs += docsBlock === null ? '' : markdown(url)

  return {
    path: context.link,
    content: docs,
  }
}
