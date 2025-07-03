export interface FormBlocks {
  formBlock: any
  requestFormBlock: any
}

export function extractFormBlocks(globals: any[]): FormBlocks {
  let formBlock = null
  let requestFormBlock = null

  for (const block of globals) {
    if (block.blockType === 'form' && !formBlock) formBlock = block
    if (block.blockType === 'request-form' && !requestFormBlock) requestFormBlock = block
    if (formBlock && requestFormBlock) break
  }

  return { formBlock, requestFormBlock }
}
