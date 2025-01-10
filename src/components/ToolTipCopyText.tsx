import React, { useState } from 'react'
import { Button as FlowbiteBtn, Tooltip } from 'flowbite-react'

const ToolTipCopyText: React.FC<{ toolTipLable?: string, content: string | number, defaultText?: string}> = ({ toolTipLable, content, defaultText}) => {
  const [copy, setCopy] = useState(toolTipLable)

  const handleCopyClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigator.clipboard.writeText(content.toString());
    setCopy('Copied!')
    setTimeout(() => {
      setCopy(toolTipLable)
    }, 2000)
  }

  return (
    <Tooltip style='light' content={copy} placement="top" trigger="hover">
      <FlowbiteBtn 
      onClick={(event: React.MouseEvent) => handleCopyClick(event)}
      color='gray' className='border-none hover:border focus:border-none focus:ring-0 self-center' size='xs'>
        {content ? content : defaultText ? defaultText : 'Unknown'}
      </FlowbiteBtn>
    </Tooltip>
  )
}

export default ToolTipCopyText