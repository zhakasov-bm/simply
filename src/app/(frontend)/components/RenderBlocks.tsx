// components/RenderBlocks.tsx
import { Page } from '@/payload-types'
import { blocksMap } from './componentsMap'

export default function RenderBlocks({ layout }: { layout: Page['layout'] }) {
  return (
    <>
      {layout?.map((block) => {
        const Block = blocksMap[block.blockType]
        if (!Block) return null
        return <Block block={block} key={block.id} />
      })}
    </>
  )
}
