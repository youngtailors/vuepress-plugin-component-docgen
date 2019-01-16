import { getParameters } from 'codesandbox-import-utils/lib/api/define'
import { IComponentContext } from '../../types'
import { main, app, packageJson } from '../../template'

/**
 *
 * @param {IComponentContext} context IComponentContext
 * @param {string} source the source file component we want to preview
 * @param {string} preview the string of the parent App.vue
 * @description What this file do ?
 * @returns {object} it return the app context
 */
export default (context: IComponentContext, source, preview) => {
  return getParameters({
    files: {
      // It is the App context we can add store and other library here
      'index.js': {
        content: main(context),
        isBinary: false,
      },
      // the component that will take the component preview
      'component.vue': {
        content: source,
        isBinary: false,
      },
      // the global component vue
      'App.vue': {
        content: app(preview),
        isBinary: false,
      },
      // all dependecies we need
      'package.json': {
        content: JSON.stringify(packageJson()),
        isBinary: false,
      },
    },
  })
}
