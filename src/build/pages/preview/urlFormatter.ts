import { getParameters } from 'codesandbox-import-utils/lib/api/define'
import { IComponentContext } from '../../../types'
import { main, app, packageJson } from './templates'

export const urlFormatter = (context: IComponentContext, source, preview) => {
  return getParameters({
    files: {
      'index.js': {
        content: main(context),
        isBinary: false,
      },
      'component.vue': {
        content: source,
        isBinary: false,
      },
      'App.vue': {
        content: app(preview),
        isBinary: false,
      },
      'package.json': {
        content: packageJson(),
        isBinary: false,
      },
    },
  })
}
