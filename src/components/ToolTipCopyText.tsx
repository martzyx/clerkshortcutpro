import React from 'react'
import { Button as FlowbiteBtn, Tooltip } from 'flowbite-react'

const ToolTipCopyText: React.FC<{ toolTipLable?: string, content: string | number, defaultText?: string}> = ({ toolTipLable, content, defaultText}) => {
  return (
    <Tooltip style='light' content={toolTipLable} placement="top" trigger="hover">
      <FlowbiteBtn color='gray' className='border-none hover:border focus:border-none focus:ring-0 self-center' size='xs'>
        {content ? content : defaultText ? defaultText : 'Unknown'}
      </FlowbiteBtn>
    </Tooltip>
  )
}

export default ToolTipCopyText