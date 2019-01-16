import {
  parse,
  SFCDescriptor,
  SFCCustomBlock,
} from '@vue/component-compiler-utils'
import * as compiler from 'vue-template-compiler'

/**
 * @description What this file do ?
 * for more understanding
 * https://github.com/vuejs/component-compiler-utils
 */
export default class VueParser {
  private descriptor: SFCDescriptor

  /**
   * getting the source code of a component and it's filename
   * giving the compiler from vue-template-compiler
   * save into the descriptor the description of each blocks founded
   */
  constructor({ source, fileName }: { source: string; fileName: string }) {
    this.descriptor = parse({
      source,
      compiler,
      filename: fileName,
    })
  }

  /**
   *
   * @param blockName
   * @description it is getting a string as docs
   * and return all informations about one custom block find here
   * we mostly call for getting the docs block
   */
  getCustomBlock(blockName: string): SFCCustomBlock | null {
    return (
      this.descriptor.customBlocks.find(block => block.type === blockName) ||
      null
    )
  }
}
